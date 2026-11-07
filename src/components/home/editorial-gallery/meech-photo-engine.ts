/* Motor WebGL inspirado en meech213.com/photo (tira 3D + scroll). */
import * as THREE from "three";
import type { MeechPhotoItem } from "./meech-photo-data";

type EngineOptions = {
  onReady?: () => void;
  onItemClick?: (item: MeechPhotoItem) => void;
};

const paper = "#f5f4f1";
const cardWidth = 1.05;
const cardHeight = cardWidth * (4 / 3);
const cardGap = 0.38;
const wheelGain = 0.0042;
const dragGain = 0.012;

/** Plano inclinado + arco (referencia meech213.com/photo). */
const rigYaw = THREE.MathUtils.degToRad(-24);
const rigPitch = THREE.MathUtils.degToRad(5.5);
const cardPitch = THREE.MathUtils.degToRad(16);
const yawA = THREE.MathUtils.degToRad(-32);
const yawB = THREE.MathUtils.degToRad(30);
const viewFocusOffset = 2.35;
const arcDepth = 0.42;
const arcYaw = 0.052;
const arcScale = 0.085;

function resolveCssColor(value: string, fallback: string): string {
  if (typeof document === "undefined") return fallback;
  if (!value.startsWith("var(")) return value;
  const probe = document.createElement("span");
  probe.style.color = value;
  document.documentElement.append(probe);
  const resolved = getComputedStyle(probe).color;
  probe.remove();
  return resolved || fallback;
}

function createCardTexture(
  renderer: THREE.WebGLRenderer,
  color: string,
  label: string,
): THREE.CanvasTexture {
  const width = 720;
  const height = 960;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    const fallback = new THREE.CanvasTexture(canvas);
    fallback.colorSpace = THREE.SRGBColorSpace;
    return fallback;
  }

  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "rgba(255,255,255,0.92)";
  ctx.lineWidth = 14;
  ctx.strokeRect(7, 7, width - 14, height - 14);

  ctx.save();
  ctx.globalAlpha = 0.14;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height * 0.22);
  ctx.restore();

  ctx.save();
  ctx.translate(width * 0.08, height * 0.72);
  ctx.rotate(-0.21);
  ctx.font = "italic 500 72px var(--font-display, 'Instrument Serif', Georgia, serif)";
  ctx.fillStyle = "rgba(255,255,255,0.94)";
  ctx.shadowColor = "rgba(0,0,0,0.35)";
  ctx.shadowBlur = 18;
  ctx.fillText(label, 0, 0);
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

export class MeechPhotoEngine {
  private canvas: HTMLCanvasElement;
  private items: MeechPhotoItem[];
  private options: EngineOptions;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private rig: THREE.Group;
  private cards: THREE.Mesh[] = [];
  private cardItems: MeechPhotoItem[] = [];
  private textures: THREE.CanvasTexture[] = [];
  private raycaster = new THREE.Raycaster();
  private pointer = new THREE.Vector2();
  private scroll = 0;
  private targetScroll = 0;
  private maxScroll = 0;
  private dragging = false;
  private dragStartX = 0;
  private dragScrollStart = 0;
  private dragMoved = 0;
  private raf = 0;
  private clock = new THREE.Clock();
  private disposed = false;
  private resizeObserver: ResizeObserver | null = null;

  constructor(
    canvas: HTMLCanvasElement,
    items: MeechPhotoItem[],
    options: EngineOptions = {},
  ) {
    this.canvas = canvas;
    this.items = items;
    this.options = options;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.setClearColor(paper, 1);

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(paper, 7, 20);

    this.camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    this.camera.position.set(1.15, 0.1, 6.4);
    this.camera.lookAt(-0.35, -0.06, 0);

    this.rig = new THREE.Group();
    this.rig.rotation.order = "YXZ";
    this.rig.rotation.y = rigYaw;
    this.rig.rotation.x = rigPitch;
    this.scene.add(this.rig);

    this.rebuildCards(items);
    this.bindEvents();
    this.resize();
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(canvas);
    this.options.onReady?.();
    this.tick();
  }

  setItems(items: MeechPhotoItem[]) {
    this.items = items;
    this.rebuildCards(items);
  }

  private rebuildCards(items: MeechPhotoItem[]) {
    for (const mesh of this.cards) {
      this.rig.remove(mesh);
      mesh.geometry.dispose();
      (mesh.material as THREE.Material).dispose();
    }
    for (const texture of this.textures) texture.dispose();
    this.cards = [];
    this.cardItems = [];
    this.textures = [];

    const totalWidth = items.length * (cardWidth + cardGap);
    const startX = -totalWidth / 2 + cardWidth / 2;
    this.maxScroll = Math.max(0, totalWidth - cardWidth * 2.2);

    items.forEach((item, index) => {
      const color = resolveCssColor(item.color, "#1d1d1f");
      const texture = createCardTexture(this.renderer, color, item.label);
      this.textures.push(texture);

      const geometry = new THREE.PlaneGeometry(cardWidth, cardHeight, 1, 1);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geometry, material);
      const x = startX + index * (cardWidth + cardGap);
      const baseYaw = index % 2 === 0 ? yawA : yawB;
      const roll = THREE.MathUtils.degToRad(index % 2 === 0 ? -3 : 2.5);
      mesh.position.set(x, 0, 0);
      mesh.rotation.order = "YXZ";
      mesh.rotation.set(cardPitch, baseYaw, roll);
      mesh.userData.item = item;
      mesh.userData.baseX = x;
      mesh.userData.baseYaw = baseYaw;
      mesh.userData.baseRoll = roll;
      this.rig.add(mesh);
      this.cards.push(mesh);
      this.cardItems.push(item);
    });

    this.scroll = THREE.MathUtils.clamp(this.scroll, 0, this.maxScroll);
    this.targetScroll = this.scroll;
    this.rig.position.x = -this.scroll;
    this.layoutCardsInArc();
  }

  private bindEvents() {
    this.canvas.addEventListener("wheel", this.onWheel, { passive: false });
    this.canvas.addEventListener("pointerdown", this.onPointerDown);
    this.canvas.addEventListener("pointermove", this.onPointerMove);
    this.canvas.addEventListener("pointerup", this.onPointerUp);
    this.canvas.addEventListener("pointerleave", this.onPointerUp);
    this.canvas.addEventListener("click", this.onClick);
  }

  private unbindEvents() {
    this.canvas.removeEventListener("wheel", this.onWheel);
    this.canvas.removeEventListener("pointerdown", this.onPointerDown);
    this.canvas.removeEventListener("pointermove", this.onPointerMove);
    this.canvas.removeEventListener("pointerup", this.onPointerUp);
    this.canvas.removeEventListener("pointerleave", this.onPointerUp);
    this.canvas.removeEventListener("click", this.onClick);
  }

  private onWheel = (event: WheelEvent) => {
    event.preventDefault();
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY)
      ? event.deltaX
      : event.deltaY;
    this.targetScroll = THREE.MathUtils.clamp(
      this.targetScroll + delta * wheelGain,
      0,
      this.maxScroll,
    );
  };

  private onPointerDown = (event: PointerEvent) => {
    if (event.button !== 0) return;
    this.dragging = true;
    this.dragMoved = 0;
    this.dragStartX = event.clientX;
    this.dragScrollStart = this.targetScroll;
    this.canvas.setPointerCapture(event.pointerId);
    this.canvas.style.cursor = "grabbing";
  };

  private onPointerMove = (event: PointerEvent) => {
    if (!this.dragging) return;
    const delta = event.clientX - this.dragStartX;
    this.dragMoved = Math.max(this.dragMoved, Math.abs(delta));
    this.targetScroll = THREE.MathUtils.clamp(
      this.dragScrollStart - delta * dragGain,
      0,
      this.maxScroll,
    );
  };

  private onPointerUp = (event: PointerEvent) => {
    if (!this.dragging) return;
    this.dragging = false;
    this.canvas.releasePointerCapture(event.pointerId);
    this.canvas.style.cursor = "grab";
  };

  private onClick = (event: MouseEvent) => {
    if (this.dragMoved > 6) return;
    const rect = this.canvas.getBoundingClientRect();
    this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const hits = this.raycaster.intersectObjects(this.cards, false);
    const hit = hits[0];
    if (!hit) return;
    const item = hit.object.userData.item as MeechPhotoItem | undefined;
    if (item) this.options.onItemClick?.(item);
  };

  private resize = () => {
    const parent = this.canvas.parentElement;
    if (!parent) return;
    const width = parent.clientWidth;
    const height = parent.clientHeight;
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  };

  private layoutCardsInArc() {
    const focusX = this.scroll + viewFocusOffset;

    for (const mesh of this.cards) {
      const baseX = mesh.userData.baseX as number;
      const baseYaw = mesh.userData.baseYaw as number;
      const baseRoll = mesh.userData.baseRoll as number;
      const dx = baseX - focusX;
      const depth = Math.pow(Math.abs(dx) * arcDepth, 1.15);
      const scale = 1 - Math.min(Math.abs(dx) * arcScale, 0.38);

      mesh.position.set(baseX, 0, -depth);
      mesh.rotation.set(cardPitch, baseYaw + dx * arcYaw, baseRoll);
      mesh.scale.setScalar(scale);
    }
  }

  private tick = () => {
    if (this.disposed) return;
    const delta = this.clock.getDelta();
    this.scroll = THREE.MathUtils.damp(this.scroll, this.targetScroll, 8, delta);
    this.rig.position.x = -this.scroll;
    this.layoutCardsInArc();

    this.renderer.render(this.scene, this.camera);
    this.raf = requestAnimationFrame(this.tick);
  };

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    this.unbindEvents();
    this.resizeObserver?.disconnect();
    for (const mesh of this.cards) {
      mesh.geometry.dispose();
      (mesh.material as THREE.Material).dispose();
    }
    for (const texture of this.textures) texture.dispose();
    this.renderer.dispose();
  }
}
