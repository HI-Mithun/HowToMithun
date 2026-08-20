from pathlib import Path
from datetime import datetime
import re

from PIL import Image
from PIL.ExifTags import TAGS


# =========================================================
# SETTINGS
# =========================================================

FOLDER = Path("C:\\Users\\himit\\HowToMithun\\src\\content\\sketches")

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


# EXIF fields, in order of preference
EXIF_DATE_FIELDS = [
    "DateTimeOriginal",
    "DateTimeDigitized",
    "DateTime",
]


# =========================================================
# EXIF DATE
# =========================================================

def get_exif_date(image_path):
    """
    Look for the actual image date in EXIF metadata.

    Priority:
        1. DateTimeOriginal
        2. DateTimeDigitized
        3. DateTime

    Returns:
        (date, source)

    Example:
        ("2024-05-10", "EXIF DateTimeOriginal")

    If no EXIF date is found:
        (None, None)
    """

    try:
        with Image.open(image_path) as img:

            exif = img.getexif()

            if not exif:
                return None, None

            # Convert EXIF IDs into readable names
            exif_data = {}

            for tag_id, value in exif.items():

                tag_name = TAGS.get(
                    tag_id,
                    tag_id
                )

                exif_data[tag_name] = value

            # Check each date field
            for field in EXIF_DATE_FIELDS:

                if field not in exif_data:
                    continue

                value = exif_data[field]

                if not value:
                    continue

                value = str(value).strip()

                # Common EXIF date formats
                date_formats = [
                    "%Y:%m:%d %H:%M:%S",
                    "%Y-%m-%d %H:%M:%S",
                    "%Y:%m:%d",
                    "%Y-%m-%d",
                ]

                for date_format in date_formats:

                    try:

                        date = datetime.strptime(
                            value,
                            date_format
                        )

                        return (
                            date.strftime("%Y-%m-%d"),
                            f"EXIF {field}"
                        )

                    except ValueError:
                        continue

    except Exception as e:

        print(
            f"  WARNING: Could not read EXIF "
            f"from {image_path.name}: {e}"
        )

    return None, None


# =========================================================
# WINDOWS CREATION DATE
# =========================================================

def get_creation_date(image_path):
    """
    Get Windows file creation date.

    This is ONLY used if no EXIF date is available.
    """

    timestamp = image_path.stat().st_ctime

    return datetime.fromtimestamp(
        timestamp
    ).strftime("%Y-%m-%d")


# =========================================================
# BEST DATE
# =========================================================

def get_best_date(image_path):
    """
    Get the best available date.

    Priority:

        EXIF DateTimeOriginal
            ↓
        EXIF DateTimeDigitized
            ↓
        EXIF DateTime
            ↓
        Windows creation date
    """

    date, source = get_exif_date(
        image_path
    )

    if date:

        return date, source

    # No useful EXIF metadata
    date = get_creation_date(
        image_path
    )

    return (
        date,
        "Windows file creation date"
    )


# =========================================================
# FIND MATCHING IMAGE
# =========================================================

def find_matching_image(md_file):
    """
    Find the image with the same base filename.

    Example:

        arabic-calligraphy.md

    matches:

        arabic-calligraphy.jpg
        arabic-calligraphy.png
        arabic-calligraphy.webp
    """

    for extension in IMAGE_EXTENSIONS:

        image = md_file.with_suffix(
            extension
        )

        if image.exists():

            return image

    return None


# =========================================================
# UPDATE DATE
# =========================================================

def update_date(content, date):
    """
    Replace the existing date field.

    This modifies ONLY:

        date: ...

    Everything else remains untouched.
    """

    pattern = r"^date:\s*.*$"

    # Existing date field
    if re.search(
        pattern,
        content,
        re.MULTILINE
    ):

        return re.sub(
            pattern,
            f"date: {date}",
            content,
            count=1,
            flags=re.MULTILINE
        )

    # If somehow the .md doesn't have a date field,
    # add it after the opening ---
    return re.sub(
        r"^---\s*$",
        f"---\ndate: {date}",
        content,
        count=1,
        flags=re.MULTILINE
    )


# =========================================================
# MAIN
# =========================================================

updated = 0
already_correct = 0
missing_md = 0
missing_image = 0
creation_fallback = 0


# Loop through IMAGES, not Markdown files
for image in FOLDER.iterdir():

    # Ignore directories
    if not image.is_file():
        continue

    # Ignore non-images
    if image.suffix.lower() not in IMAGE_EXTENSIONS:
        continue

    # Find corresponding Markdown file
    md_file = image.with_suffix(".md")

    # -----------------------------------------------------
    # NO MARKDOWN FILE
    # -----------------------------------------------------

    if not md_file.exists():

        print(
            f"SKIPPED: {image.name} "
            f"→ matching .md not found"
        )

        missing_md += 1

        continue

    # -----------------------------------------------------
    # GET IMAGE DATE
    # -----------------------------------------------------

    date, source = get_best_date(
        image
    )

    # -----------------------------------------------------
    # WARNING FOR FALLBACK
    # -----------------------------------------------------

    if source == "Windows file creation date":

        print(
            f"WARNING: {image.name} "
            f"→ {date} "
            f"(NO EXIF DATE)"
        )

        creation_fallback += 1

    else:

        print(
            f"FOUND: {image.name} "
            f"→ {date} ({source})"
        )

    # -----------------------------------------------------
    # READ MARKDOWN
    # -----------------------------------------------------

    content = md_file.read_text(
        encoding="utf-8"
    )

    # Get current date, if present
    match = re.search(
        r"^date:\s*(.*?)\s*$",
        content,
        re.MULTILINE
    )

    current_date = None

    if match:

        current_date = (
            match.group(1)
            .strip()
            .strip('"')
            .strip("'")
        )

    # -----------------------------------------------------
    # NO CHANGE NEEDED
    # -----------------------------------------------------

    if current_date == date:

        print(
            f"  → Already correct: "
            f"{md_file.name}"
        )

        already_correct += 1

        continue

    # -----------------------------------------------------
    # UPDATE DATE
    # -----------------------------------------------------

    updated_content = update_date(
        content,
        date
    )

    md_file.write_text(
        updated_content,
        encoding="utf-8"
    )

    print(
        f"  → UPDATED: {md_file.name} "
        f"{current_date} → {date}"
    )

    updated += 1


# =========================================================
# SUMMARY
# =========================================================

print()
print("=" * 65)
print("DATE UPDATE COMPLETE")
print("=" * 65)

print(f"Dates updated:                 {updated}")
print(f"Dates already correct:        {already_correct}")
print(f"Images without matching .md:  {missing_md}")
print(f"Used Windows creation date:    {creation_fallback}")

print("=" * 65)