import os
import json
from json.decoder import JSONDecodeError

type Metadata = dict[str, str | int | float | None]
pages: list[Metadata] = []

META_PREFIX = "<!--meta start"
META_SUFFIX = "meta end-->"

def extract_metadata(file:  str):
    print(f"process metadata: {file}", end="")
    with open(file, "r") as f:
        contents = f.read()

    try:
        json_source = contents.split(META_PREFIX)[1].split(META_SUFFIX)[0]
        metadata: Metadata = json.loads(json_source)
        pages.append(metadata)
        print()
    except IndexError as e:
        print(f" IndexError: {e}")
        return
    except JSONDecodeError as e:
        print(f" JSONDecodeError: {e}")
        return

def process_metadata():
    for root, _, files in os.walk("dist/", topdown=True):
        for file in files:
            if not file.endswith(".html"):
                continue
            extract_metadata(os.path.join(root, file))

