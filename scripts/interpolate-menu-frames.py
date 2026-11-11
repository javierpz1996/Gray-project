#!/usr/bin/env python3
"""Interpola fotogramas clave y limita el tamaño máximo del globo (ref. fotograma 1)."""
from __future__ import annotations

import shutil
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
MENU_DIR = ROOT / "public/Imagenes/Varias/menu"
CLAVE_DIR = MENU_DIR / "clave"

KEY_COUNT = 12
STEPS_PER_SEGMENT = 1  # solo claves normalizadas → 12 fotogramas
FRAME_COUNT = KEY_COUNT * STEPS_PER_SEGMENT


def load_clave() -> list[Image.Image]:
    CLAVE_DIR.mkdir(parents=True, exist_ok=True)
    existing = sorted(MENU_DIR.glob("fotograma_*.png"))
    clave_files = sorted(CLAVE_DIR.glob("fotograma_*.png"))

    if len(clave_files) < KEY_COUNT and len(existing) >= KEY_COUNT:
        for i in range(1, KEY_COUNT + 1):
            src = MENU_DIR / f"fotograma_{i:02d}.png"
            dst = CLAVE_DIR / f"fotograma_{i:02d}.png"
            if src.is_file() and not dst.is_file():
                shutil.copy2(src, dst)
        clave_files = sorted(CLAVE_DIR.glob("fotograma_*.png"))

    if len(clave_files) < KEY_COUNT:
        raise SystemExit(
            f"Faltan fotogramas clave en {CLAVE_DIR} (se necesitan {KEY_COUNT})."
        )

    frames: list[Image.Image] = []
    for i in range(1, KEY_COUNT + 1):
        path = CLAVE_DIR / f"fotograma_{i:02d}.png"
        if not path.is_file():
            raise SystemExit(f"No existe {path}")
        frames.append(Image.open(path).convert("RGBA"))
    return frames


def content_bbox(img: Image.Image) -> tuple[int, int, int, int] | None:
    return img.split()[-1].getbbox()


def normalize_max_size(
    img: Image.Image,
    ref_bbox: tuple[int, int, int, int],
) -> Image.Image:
    """Solo encoge si el contenido supera el marco de referencia (sin agrandar)."""
    bbox = content_bbox(img)
    if bbox is None:
        return img

    ref_w = ref_bbox[2] - ref_bbox[0]
    ref_h = ref_bbox[3] - ref_bbox[1]
    ref_cx = (ref_bbox[0] + ref_bbox[2]) / 2
    ref_cy = (ref_bbox[1] + ref_bbox[3]) / 2

    w = bbox[2] - bbox[0]
    h = bbox[3] - bbox[1]
    scale = min(1.0, ref_w / w, ref_h / h)

    if scale >= 0.995:
        return img

    new_w = max(1, int(img.width * scale))
    new_h = max(1, int(img.height * scale))
    scaled = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", img.size, (0, 0, 0, 0))
    paste_x = int(ref_cx - new_w / 2)
    paste_y = int(ref_cy - new_h / 2)
    canvas.paste(scaled, (paste_x, paste_y), scaled)
    return canvas


def blend(a: Image.Image, b: Image.Image, t: float) -> Image.Image:
    return Image.blend(a, b, t)


def main() -> None:
    keys = load_clave()
    ref_bbox = content_bbox(keys[0])
    if ref_bbox is None:
        raise SystemExit("El fotograma clave 1 no tiene contenido visible.")

    keys = [normalize_max_size(k, ref_bbox) for k in keys]
    out_index = 1

    for i in range(KEY_COUNT):
        next_i = (i + 1) % KEY_COUNT
        a, b = keys[i], keys[next_i]
        for step in range(STEPS_PER_SEGMENT):
            if step == 0:
                frame = a
            else:
                frame = normalize_max_size(
                    blend(a, b, step / STEPS_PER_SEGMENT),
                    ref_bbox,
                )
            out_path = MENU_DIR / f"fotograma_{out_index:02d}.png"
            frame.save(out_path, optimize=True)
            print("wrote", out_path.relative_to(ROOT))
            out_index += 1

    for extra in MENU_DIR.glob("fotograma_*.png"):
        num = int(extra.stem.split("_")[1])
        if num > FRAME_COUNT:
            extra.unlink()
            print("removed", extra.relative_to(ROOT))

    if out_index - 1 != FRAME_COUNT:
        raise SystemExit(
            f"Se esperaban {FRAME_COUNT} fotogramas, se escribieron {out_index - 1}"
        )


if __name__ == "__main__":
    main()
