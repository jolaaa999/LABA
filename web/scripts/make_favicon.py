from PIL import Image
from pathlib import Path

src = Path(
    r"C:\Users\10748\.cursor\projects\d-Desktop\assets"
    r"\c__Users_10748_AppData_Roaming_Cursor_User_workspaceStorage_"
    r"8bedcda7d6c3e3dc3787766ee59160bf_images_"
    r"05c6416b7fd71e25832910f6e4301219-d6deeb3c-d2c5-4bd7-abda-01f9d17fe0f1.png"
)
out_dir = Path(r"d:\Desktop\百度飞桨\web\public")

img = Image.open(src).convert("RGBA")
w, h = img.size
cx, cy = w / 2.0, h / 2.0
r = min(w, h) / 2.0 - 1.5
pixels = img.load()

for y in range(h):
    for x in range(w):
        dx = x + 0.5 - cx
        dy = y + 0.5 - cy
        if dx * dx + dy * dy > r * r:
            pixels[x, y] = (0, 0, 0, 0)

out_png = out_dir / "favicon.png"
img.save(out_png, "PNG")
img.resize((32, 32), Image.Resampling.LANCZOS).save(out_dir / "favicon-32.png", "PNG")
img.resize((16, 16), Image.Resampling.LANCZOS).save(out_dir / "favicon-16.png", "PNG")
print(f"saved {out_png} size={img.size}")
