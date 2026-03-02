import os

DEV_PREFIX = "<!--dev start-->"
DEV_SUFFIX = "<!--dev end-->"

def remove_dev(source: str) -> str:
    if DEV_PREFIX not in source:
        return source
    if DEV_SUFFIX not in source:
        return source

    return source.split(DEV_PREFIX)[0] + source.split(DEV_SUFFIX)[1]

def process_file(path: str) -> None:
    with open(path, "r") as file:
        contents = file.read()
        removed = remove_dev(contents)

    with open(path, "w") as file:
        _ = file.write(removed)
        print(f"    {path}")

def dev_remove():
    print("removing dev blocks")
    for root, _, files in os.walk(".", topdown=True):
        for file in files:
            if not file.endswith(".html"):
                continue
            process_file(os.path.join(root, file))

