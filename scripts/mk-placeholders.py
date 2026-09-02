"""
Generate swap-in placeholders for the Macedonian photography slots.

TEMPORARY. Each file is a designed stand-in carrying the shot it represents, so
the page renders and nothing 404s while the real photographs are being added.
Overwrite each file in public/photography/mk/ with the real image at the same
filename and delete this script.
"""

import os

from PIL import Image, ImageDraw, ImageFont

SHOTS = [
    ("klinika-recepcija", 1440, 1080, "Приемен пулт во клиника", "Рецепција, пациент и тим во позадина"),
    ("restoran-smena", 1440, 1080, "Ресторан во полна смена", "Менаџер ја води смената, полна сала"),
    ("fabrika-pakuvanje", 1440, 1080, "Пакување во фабрика", "Линија за пакување, контрола на квалитет"),
    ("mlekarnica-shalter", 1440, 1080, "Млекарница и продавница", "Шалтер со производи, разговор со сопственик"),
    ("salon-mebel", 1440, 1080, "Салон за мебел", "Продажба со таблет пред клиенти"),
    ("linija-dzem", 1030, 1440, "Производствена линија", "Полнење и затворање теглички"),
    ("lakirnica", 1030, 1440, "Лакирница", "Работник бои метален елемент"),
    ("kopce-stop", 1536, 1024, "Погон и опрема", "Детаљ од производствена хала"),
    ("proizvod-salfeti", 1536, 1024, "Производ на полица", "Пакувања подготвени за пазар"),
]

ICE = (242, 247, 253)
MIST = (211, 228, 247)
RULE = (157, 187, 221)
INK = (15, 32, 56)
BLUE = (11, 94, 215)
OUT = "public/photography/mk"


def font(size):
    for path in ("C:/Windows/Fonts/segoeui.ttf", "C:/Windows/Fonts/arial.ttf"):
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except Exception:
                pass
    return ImageFont.load_default()


def main():
    os.makedirs(OUT, exist_ok=True)
    for name, w, h, title, sub in SHOTS:
        im = Image.new("RGB", (w, h), ICE)
        d = ImageDraw.Draw(im)

        # Banded ground, so it reads as a designed stand-in and not a broken image.
        d.rectangle([0, int(h * 0.62), w, h], fill=MIST)
        d.line([(0, int(h * 0.62)), (w, int(h * 0.62))], fill=RULE, width=3)
        d.rectangle(
            [int(w * 0.08), int(h * 0.30), int(w * 0.42), int(h * 0.62)],
            fill=(228, 238, 251),
        )
        d.ellipse(
            [
                int(w * 0.58),
                int(h * 0.34),
                int(w * 0.58) + int(w * 0.16),
                int(h * 0.34) + int(w * 0.16),
            ],
            fill=(255, 255, 255),
        )
        d.rectangle([12, 12, w - 12, h - 12], outline=RULE, width=3)

        ft = font(max(26, int(w * 0.040)))
        fs = font(max(18, int(w * 0.024)))
        fl = font(max(15, int(w * 0.019)))
        y = int(h * 0.70)
        d.text((int(w * 0.08), y), title, font=ft, fill=INK)
        d.text((int(w * 0.08), y + int(w * 0.052)), sub, font=fs, fill=(58, 77, 105))
        d.text(
            (int(w * 0.08), y + int(w * 0.092)),
            f"ЗАМЕНИ СО: {name}.jpg",
            font=fl,
            fill=BLUE,
        )

        im.save(f"{OUT}/{name}.jpg", quality=86)
        print(f"{name}.jpg  {w}x{h}")


if __name__ == "__main__":
    main()
