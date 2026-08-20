from pathlib import Path
from datetime import datetime
import re

from PIL import Image
from PIL.ExifTags import TAGS


# Folder containing the images and Markdown files
FOLDER = Path("C:\\Users\\himit\\HowToMithun\\src\\content\\sketches")


# Image extensions to look for
IMAGE_EXTENSIONS = {
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
    ".gif",
    ".avif",
    ".tiff",
    ".tif",
}


def get_exif_date(image_path):
    """
    Get the original date from EXIF DateTimeOriginal.

    Returns:
        YYYY-MM-DD
        or None if unavailable.
    """

    try:
        with Image.open(image_path) as img:
            exif = img.getexif()

            if not exif:
                return None

            for tag_id, value in exif.items():

                tag_name = TAGS.get(tag_id, tag_id)

                if tag_name == "DateTimeOriginal":

                    try:
                        date = datetime.strptime(
                            str(value),
                            "%Y:%m:%d %H:%M:%S"
                        )

                        return date.strftime("%Y-%m-%d")

                    except ValueError:
                        return None

    except Exception as e:
        print(f"  Could not read EXIF: {e}")

    return None


def get_creation_date(image_path):
    """
    Get the Windows file creation date.
    """

    timestamp = image_path.stat().st_ctime

    return datetime.fromtimestamp(
        timestamp
    ).strftime("%Y-%m-%d")


def get_date(image_path):
    """
    Date priority:

    1. EXIF DateTimeOriginal
    2. Windows file creation date
    """

    exif_date = get_exif_date(image_path)

    if exif_date:
        return exif_date, "EXIF"

    return get_creation_date(image_path), "file creation date"


def date_is_empty(content):
    """
    Check whether the Markdown file contains:

        date: ""

    or

        date: ''

    or an empty date field.
    """

    match = re.search(
        r'^date:\s*(.*?)\s*$',
        content,
        re.MULTILINE
    )

    # No date field found
    if not match:
        return False

    value = match.group(1).strip()

    # Remove quotes
    value = value.strip('"').strip("'")

    return value == ""


def update_date(content, date):
    """
    Replace the existing date field with the new date.
    """

    return re.sub(
        r'^date:\s*.*$',
        f'date: {date}',
        content,
        count=1,
        flags=re.MULTILINE
    )


# ---------------------------------------------------------
# PROCESS FILES
# ---------------------------------------------------------

for md_file in FOLDER.glob("*.md"):

    content = md_file.read_text(
        encoding="utf-8"
    )

    # Only modify files where date is empty
    if not date_is_empty(content):
        print(
            f"SKIPPED: {md_file.name} "
            f"→ date already exists"
        )
        continue

    # Find corresponding image
    image = None

    for extension in IMAGE_EXTENSIONS:

        possible_image = md_file.with_suffix(extension)

        if possible_image.exists():
            image = possible_image
            break

    # No corresponding image
    if image is None:
        print(
            f"SKIPPED: {md_file.name} "
            f"→ corresponding image not found"
        )
        continue

    # Get date
    date, source = get_date(image)

    # Update ONLY the date
    updated_content = update_date(
        content,
        date
    )

    md_file.write_text(
        updated_content,
        encoding="utf-8"
    )

    print(
        f"UPDATED: {md_file.name} "
        f"→ {date} ({source})"
    )


print("\nDone!")