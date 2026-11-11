#!/usr/bin/env python3
"""Genera 9 fotogramas orbitando burbujas sobre burbujamenu.png."""
from __future__ import annotations

import math
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public/Imagenes/Varias/burbujamenu.png"
OUT_DIR = ROOT / "public/Imagenes/Varias/menu"

FRAME_COUNT = 9
OUT_W = 644
OUT_H = 610

ORANGE = (255, 120, 0, 255)
INK = (26, 13, 0, 255)

SATELLITES = [
    {"radius": 0.48, "phase": 0.0, "size": 22, "wiggle": 0.1},
    {"radius": 0.44, "phase": 2.1, "size": 17, "wiggle": 0.08},
    {"radius": 0.4, "phase": 4.25, "size": 14, "wiggle": 0.06},
]


def draw_motion_lines(draw: ImageDraw.ImageDraw, x: float, y: float, angle: float) -> None:
    import math as m

    for ox, length, rot in [(-14, 18, -0.35), (-8, 14, 0.05)]:
        rad = angle + rot
        x0 = x + ox * m.cos(angle)
        y0 = y + ox * m.sin(angle) - 8
        x1 = x0 + length * m.cos(rad)
        y1 = y0 + length * m.sin(rad)
        draw.line((x0, y0, x1, y1), fill=ORANGE, width=5)


def draw_satellite(draw: ImageDraw.ImageDraw, x: float, y: float, r: int) -> None:
    stroke = max(3, int(r * 0.22))
    draw.ellipse((x - r, y - r, x + r, y + r), fill=ORANGE, outline=INK, width=stroke)


def draw_pop_marks(draw: ImageDraw.ImageDraw, frame_index: int) -> None:
    wobble = frame_index * 0.35
    base_x = OUT_W * 0.12
    base_y = OUT_H * 0.14
    lines = [
        (42, -0.65 + wobble * 0.04),
        (34, -0.85 + wobble * 0.03),
        (28, -0.45 + wobble * 0.05),
    ]
    for i, (length, rot) in enumerate(lines):
        ox = base_x + i * 10
        oy = base_y + i * 6
        x1 = ox + length * math.cos(rot)
        y1 = oy + length * math.sin(rot)
        draw.line((ox, oy, x1, y1), fill=INK, width=7)


def main() -> None:
    base_src = Image.open(SRC).convert("RGBA")
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    cx = OUT_W * 0.5
    cy = OUT_H * 0.52

    for i in range(FRAME_COUNT):
        t = (i / FRAME_COUNT) * math.pi * 2
        pulse = 1 + 0.018 * math.sin(t * 2)
        draw_w = int(OUT_W * pulse)
        draw_h = int(OUT_H * pulse)
        ox = (OUT_W - draw_w) // 2
        oy = (OUT_H - draw_h) // 2

        base = base_src.resize((draw_w, draw_h), Image.Resampling.LANCZOS)
        frame = Image.new("RGBA", (OUT_W, OUT_H), (0, 0, 0, 0))
        frame.paste(base, (ox, oy), base)
        draw = ImageDraw.Draw(frame)

        spin = (i / FRAME_COUNT) * math.pi * 2

        for sat in SATELLITES:
            a = spin + sat["phase"] + sat["wiggle"] * math.sin(t + sat["phase"])
            r = OUT_W * sat["radius"]
            x = cx + math.cos(a) * r
            y = cy + math.sin(a) * r * 0.92
            draw_motion_lines(draw, x, y, a + math.pi / 2)
            draw_satellite(draw, x, y, sat["size"])

        draw_pop_marks(draw, i)

        out_path = OUT_DIR / f"burbu-anim-{i + 1:02d}.png"
        frame.save(out_path, optimize=True)
        print("wrote", out_path.relative_to(ROOT))


if __name__ == "__main__":
    main()
