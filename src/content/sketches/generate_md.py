from pathlib import Path

# Folder containing your images
FOLDER = Path("C:/Users/himit/HowToMithun/src/content/sketches")

# Image extensions to look for
IMAGE_EXTENSIONS = {
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
    ".gif",
    ".avif",
}

for image in FOLDER.iterdir():

    # Skip anything that isn't an image
    if not image.is_file() or image.suffix.lower() not in IMAGE_EXTENSIONS:
        continue

    # Expected Markdown filename
    md_file = image.with_suffix(".md")

    # Don't overwrite existing Markdown files
    if md_file.exists():
        print(f"SKIPPED: {image.name} → {md_file.name} already exists")
        continue

    # Markdown content
    content = f'''---
title: ""
date: ""
medium: ""
description: ""
image: "./{image.name}"
tags: []
---
'''

    md_file.write_text(content, encoding="utf-8")

    print(f"CREATED: {md_file.name}")

print("\nDone!")