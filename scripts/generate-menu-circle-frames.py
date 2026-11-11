#!/usr/bin/env python3
"""Hover del menú: círculo naranja fijo + satélites, mismo trazo que el globo."""
from __future__ import annotations

import math
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public/Imagenes/Varias/menu/circulo"

SIZE = 362
FRAMES = 8
ORANGE = (252, 137, 0, 255)
INK = (29, 10, 0, 255)

CX = SIZE / 2
CY = SIZE / 2
MAIN_R = 78
STROKE = 11

# Órbita fija: no cambia el radio del círculo grande.
SATELLITES = (
    {"orbit": 132, "phase": -0.4, "r": 22},
    {"orbit": 118, "phase": 1.7, "r": 16},
    {"orbit": 104, "phase": 3.6, "r": 13},
)


def disc(base: Image.Image, x: float, y: float, r: float) -> None:
    layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    draw.ellipse((x - r, y - r, x + r, y + r), fill=ORANGE, outline=INK, width=STROKE)
    base.alpha_composite(layer)


def pill(base: Image.Image, x: float, y: float, length: float, thick: float, angle: float) -> None:
    pad = int(length + thick + STROKE * 2)
    tile = Image.new("RGBA", (pad, pad), (0, 0, 0, 0))
    draw = ImageDraw.Draw(tile)
    cx = cy = pad / 2
    box = (cx - length / 2, cy - thick / 2, cx + length / 2, cy + thick / 2)
    draw.rounded_rectangle(box, radius=thick / 2, fill=ORANGE, outline=INK, width=max(4, STROKE // 2))
    tile = tile.rotate(-math.degrees(angle), resample=Image.Resampling.BICUBIC, expand=False)
    base.alpha_composite(tile, (int(x - pad / 2), int(y - pad / 2)))


def frame(index: int) -> Image.Image:
    img = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    spin = (index / FRAMES) * math.pi * 2

    disc(img, CX, CY, MAIN_R)

    for sat in SATELLITES:
        a = spin + sat["phase"]
        sx = CX + math.cos(a) * sat["orbit"]
        sy = CY + math.sin(a) * sat["orbit"] * 0.86
        # Dos rayitas cortas detrás del satélite, hacia afuera.
        outward = a
        pill(img, sx + math.cos(outward) * (sat["r"] + 16), sy + math.sin(outward) * (sat["r"] + 16), 18, 7, outward)
        pill(img, sx + math.cos(outward) * (sat["r"] + 28), sy + math.sin(outward) * (sat["r"] + 28), 12, 6, outward + 0.25)
        disc(img, sx, sy, sat["r"])

    # Tres cápsulas de énfasis arriba a la izquierda (como el globo).
    fan = -2.2 + math.sin(spin) * 0.08
    for i, length in enumerate((34, 28, 22)):
        ang = fan - i * 0.38
        pill(img, 78 + i * 10, 62 + i * 8, length, 14, ang)

    return img


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for i in range(FRAMES):
        path = OUT_DIR / f"fotograma_{i + 1:02d}.png"
        frame(i).save(path, optimize=True)
        print("wrote", path.relative_to(ROOT))
    for extra in OUT_DIR.glob("fotograma_*.png"):
        n = int(extra.stem.split("_")[1])
        if n > FRAMES:
            extra.unlink()
            print("removed", extra.name)


if __name__ == "__main__":
    main()
