import subprocess
import os
import tempfile
from PIL import Image

edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
public_dir = os.path.abspath("public")

banners = [
    ("banner_navy_728x90.html", "banner_navy_728x90.png"),
    ("banner_amber_728x90.html", "banner_amber_728x90.png"),
    ("banner_white_728x90.html", "banner_white_728x90.png"),
]

for html_file, png_file in banners:
    html_path = os.path.join(public_dir, html_file).replace("\\", "/")
    out_png = os.path.join(public_dir, png_file)
    temp_dir = tempfile.mkdtemp()
    
    cmd = [
        edge_path,
        "--headless=new",
        "--disable-gpu",
        "--hide-scrollbars",
        "--window-size=728,90",
        "--force-device-scale-factor=2",
        f"--user-data-dir={temp_dir}",
        f"--screenshot={out_png}",
        f"file:///{html_path}"
    ]
    
    try:
        proc = subprocess.run(cmd, capture_output=True, text=True, timeout=15)
        if os.path.exists(out_png):
            im = Image.open(out_png)
            # Crop to exact 2x ratio if needed or verify
            print(f"Generated {png_file}: {im.size} ({os.path.getsize(out_png)} bytes)")
            
            # Also create 1x standard resolution (728x90)
            im_1x = im.resize((728, 90), Image.Resampling.LANCZOS)
            std_png = os.path.join(public_dir, png_file.replace(".png", "_std.png"))
            im_1x.save(std_png, "PNG")
            print(f"Generated standard 1x {std_png}: {im_1x.size}")
        else:
            print(f"Failed to generate {png_file}, return code: {proc.returncode}")
    except Exception as e:
        print(f"Error for {html_file}: {e}")
