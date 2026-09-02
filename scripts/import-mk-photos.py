"""
Import the supplied Macedonian business photographs into public/photography/mk.

One-off. Maps each downloaded file onto its slot, converts to JPG, resizes to a
sensible web width and strips metadata. Run once, then this script and
mk-placeholders.py can both be deleted.

    python scripts/import-mk-photos.py
"""

import os

from PIL import Image

SRC = os.path.expanduser("~/Downloads")
OUT = "public/photography/mk"

# Downloaded filename -> slot filename. Identified visually before mapping.
MAPPING = [
    ("ChatGPT Image Sep 2, 2026, 02_55_09 PM.png", "proizvod-salfeti", 1600),
    ("ChatGPT Image Sep 2, 2026, 02_57_02 PM.png", "kopce-stop", 1600),
    ("ChatGPT Image Sep 2, 2026, 02_57_26 PM.png", "lakirnica", 1200),
    ("ChatGPT Image Sep 2, 2026, 02_57_51 PM.png", "linija-dzem", 1200),
    ("ChatGPT Image Sep 2, 2026, 03_03_02 PM (1).png", "fabrika-pakuvanje", 1600),
    ("ChatGPT Image Sep 2, 2026, 03_03_02 PM (2).png", "mlekarnica-shalter", 1600),
    ("ChatGPT Image Sep 2, 2026, 03_03_03 PM (3).png", "salon-mebel", 1600),
    ("ChatGPT Image Sep 2, 2026, 03_03_03 PM (4).png", "klinika-recepcija", 1600),
    ("ChatGPT Image Sep 2, 2026, 03_03_04 PM (5).png", "restoran-smena", 1600),
]


def main():
    os.makedirs(OUT, exist_ok=True)
    for src_name, slot, max_w in MAPPING:
        src = os.path.join(SRC, src_name)
        if not os.path.exists(src):
            print(f"MISSING  {src_name}")
            continue

        im = Image.open(src).convert("RGB")
        w, h = im.size
        if w > max_w:
            im = im.resize((max_w, round(h * max_w / w)), Image.LANCZOS)

        dest = os.path.join(OUT, f"{slot}.jpg")
        # No exif= argument, so metadata is dropped.
        im.save(dest, "JPEG", quality=82, optimize=True, progressive=True)
        kb = os.path.getsize(dest) / 1024
        orient = "portrait" if im.height > im.width else "landscape"
        print(f"{slot:<20} {im.width}x{im.height:<6} {orient:<10} {kb:6.0f} KB")


if __name__ == "__main__":
    main()
