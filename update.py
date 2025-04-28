import os
import hashlib
import json
from datetime import datetime

# STAGE ONE: SITEMAP BUILD
FORBIDDEN_DIRS = [
    "./r",
    "./.well-known",
    "./.git",
]
FORBIDDEN_FILES = [
    "404.html",
    "template.html"
]

def is_dir_forbidden(root: str) -> bool:
    if root in FORBIDDEN_DIRS:
        return True

    for dir in FORBIDDEN_DIRS:
        if root.startswith(dir):
            return True

    return False

def is_file_allowed(file: str) -> bool:
    if not file.endswith(".html"):
        return False

    if file in FORBIDDEN_FILES:
        return False
    
    return True


hashes = {}
HASH_FILE = ".page_hashes"

def load_hashes():
    global hashes

    if not os.path.exists(HASH_FILE):
        return
    with open(HASH_FILE) as f:
        hashes = json.load(f)

load_hashes()

def hash_file(path: str) -> str:
    with open(path, "rb") as f:
        algo = hashlib.sha256()
        algo.update(f.read())
    return algo.hexdigest()

def file_changed(path: str) -> bool:
    if path not in hashes:
        return True

    return hash_file(path) != hashes[path]["hash"]

def write_hashes():
    with open(HASH_FILE, "w") as f:
        json.dump(hashes, f, indent = 4)


# TODO: urlify() and stuff: relpaths starting with / instead of https://n3rdium.dev
TODAY = datetime.today().strftime('%Y-%m-%d')
map = []

def urlify(path: str) -> str:
    path = path.strip().strip("/").strip("./").strip("/")
    return f"/{path}".removesuffix("index.html")

def get_lastmod(path: str) -> str:
    if path not in hashes:
        return TODAY

    if file_changed(path):
        return TODAY

    return hashes[path]["lastmod"]

for (root, dirs, files) in os.walk(".", topdown = True):
    if is_dir_forbidden(root):
        continue

    for file in files:
        if not is_file_allowed(file):
            continue
        
        path = os.path.join(root, file)
        url = urlify(path)
        lastmod = get_lastmod(path)

        map.append({
            "url": url,
            "lastmod": lastmod
        })

        hashes[path] = {
            "hash": hash_file(path),
            "lastmod": lastmod
        }

write_hashes()

def build_sitemap_entry(map_item: dict) -> str:
    url, lastmod = map_item["url"], map_item["lastmod"]

    priority = 0.5
    if url.endswith("/"):
        priority = 0.75
    if url == "/":
        priority = 1.0

    return f"""    <url>
        <loc>{url}</loc>
        <lastmod>{lastmod}</lastmod>
        <priority>{priority}</priority>
    </url>"""

sitemap = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{"\n".join([build_sitemap_entry(item) for item in map])}
</urlset>
"""

with open("sitemap.xml", "w") as f:
    f.write(sitemap)

# STAGE TWO: PAGE INDEX UPDATE
SEARCH_PATHS = [
    "./blog/posts/",
    "./astro/history/",
]
BLACKLIST = [
    "template.html"
]

def date_to_timestamp(date: str) -> int:
    date_object = datetime.strptime(date, '%d-%m-%Y')
    return int(date_object.timestamp())

def the_key(thing: dict) -> int:
    return date_to_timestamp(thing["written"])

for root in SEARCH_PATHS:
    index = []

    for file in os.listdir(root):
        if file in BLACKLIST:
            continue

        if not file.endswith(".html"):
            continue

        path = os.path.join(root, file)
        url = urlify(path)
        
        with open(path) as f:
            metadata = f.read().split("N3RDIUM META START")[1].split("N3RDIUM META END")[0].strip()

        metadata = json.loads(metadata)
        metadata["url"] = url
        
        index.append(metadata)

    index.sort(key=the_key, reverse=True)

    with open(os.path.join(root, "index.json"), "w") as f:
        json.dump(index, f, indent=4)

