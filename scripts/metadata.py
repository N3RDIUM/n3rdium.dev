import os
import json
from datetime import date
from json.decoder import JSONDecodeError

type Metadata = dict[str, str | int | float | None]
type URL = str
pages: dict[URL, Metadata] = {}

META_PREFIX = "<!--meta start"
META_SUFFIX = "meta end-->"

def urlify(path: str) -> URL:
    return "https://n3rdium.dev/" + path.removeprefix(".").removeprefix("/")

def extract_metadata(file: str):
    print(f"    {file}", end="")
    with open(file, "r") as f:
        contents = f.read()

    try:
        json_source = contents.split(META_PREFIX)[1].split(META_SUFFIX)[0]
        metadata: Metadata = json.loads(json_source)
        url = urlify(file)
        pages[url] = metadata
        print()
    except IndexError as e:
        print(f" IndexError: {e}")
        return
    except JSONDecodeError as e:
        print(f" JSONDecodeError: {e}")
        return

DEFAULT_LASTMOD = date.today().strftime("%Y-%m-%d")
DEFAULT_CHANGEFREQ = "never"
DEFAULT_PRIORITY = 0.5

def build_sitemap_entry(url: URL, metadata: Metadata) -> str:
    lastmod = metadata.get("lastmod", DEFAULT_LASTMOD)
    changefreq = metadata.get("changefreq", DEFAULT_CHANGEFREQ)
    priority = metadata.get("priority", DEFAULT_PRIORITY)

    return f"""
    <url>
        <loc>{url}</loc>
        <lastmod>{lastmod}</lastmod>
        <changefreq>{changefreq}</changefreq>
        <priority>{priority}</priority>
    </url>"""

def build_sitemap() -> str:
    entries: list[str] = []

    for url, metadata in pages.items():
        print(f"    {url}", end="")
        if metadata.get("sitemap_invisible"):
            print(" [invisible]")
            continue
        entries.append(build_sitemap_entry(url, metadata))
        print()

    return f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">{"".join(entries)}
</urlset>
"""

def process_metadata():
    print("processing metadata")
    for root, _, files in os.walk(".", topdown=True):
        for file in files:
            if not file.endswith(".html"):
                continue
            extract_metadata(os.path.join(root, file))
    
    sitemap_path = "sitemap.xml"
    print(f"building main sitemap {sitemap_path}")
    sitemap = build_sitemap()
    with open(sitemap_path, "w") as f:
        _ = f.write(sitemap)

