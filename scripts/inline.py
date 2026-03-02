import os
from rjsmin import jsmin
from rcssmin import cssmin

css: dict[str, str] = {}
js: dict[str, str] = {}

def load_css(path: str):
    print(f"loading css from {path}")
    for style in os.listdir(path):
        if not style.endswith(".css"):
            continue

        with open(os.path.join(path, style), "r") as file:
            contents = file.read()
        name = style.removesuffix(".css")

        css[name] = str(cssmin(contents))
        print(f"    loaded css: {name}")

def load_js(path: str):
    print(f"loading js from {path}")
    for script in os.listdir("./js"):
        if not script.endswith(".js"):
            continue

        with open(os.path.join("./js/", script), "r") as file:
            contents = file.read()
        name = script.removesuffix(".js")

        js[name] = str(jsmin(contents))
        print(f"    loaded js: {name}")

# TODO separate modules from scripts.

INLINE_PREFIX = "<!--inline start"
INLINE_SUFFIX = "inline end-->"

AUTOGEN_PREFIX = "<!--autogen start-->"
AUTOGEN_SUFFIX = "<!--autogen end-->"


def process_inline_block(inline_block: str) -> tuple[list[str], list[str]]:
    lines = inline_block.split("\n")
    scripts: list[str] = []
    stylesheets: list[str] = []

    for line in lines:
        if not line.strip():
            continue
        line = line.strip().split(":")
        inline_type = line[0].strip()
        required = line[1].strip()

        if inline_type == "js":
            if required not in js:
                print(f"warning: couldn't find script {required} - skipping!")
            scripts.append(required)
        elif inline_type == "css":
            if required not in css:
                print(f"warning: couldn't find script {required} - skipping!")
            stylesheets.append(required)

    return stylesheets, scripts


def autogen_block(stylesheets: list[str], scripts: list[str]):
    ret = ""

    for stylesheet in stylesheets:
        if stylesheet not in css:
            print(f"could not find stylesheet {stylesheet} - skipping")
            continue
        ret += f"""
        <style>
{css[stylesheet]}
        </style>
"""

    for script in scripts:
        if script not in js:
            print(f"could not find script {script} - skipping")
            continue
        ret += f"""
        <script>
{js[script]}
        </script>
"""

    return ret


def process_file(path: str):
    with open(path, "r") as file:
        contents = file.read()

    try:
        inline_block = contents.split(INLINE_PREFIX)[1]
        inline_block = inline_block.split(INLINE_SUFFIX)[0]
    except IndexError:
        print(f"    {path} skipped!")
        return

    stylesheets, scripts = process_inline_block(inline_block)
    autogen = autogen_block(stylesheets, scripts)

    before = contents.split(AUTOGEN_PREFIX)[0]
    after = contents.split(AUTOGEN_SUFFIX)[1]

    new_file = f"""{before}{AUTOGEN_PREFIX}
{autogen.strip("\n")}
        {AUTOGEN_SUFFIX}{after}"""

    with open(path, "w") as file:
        _ = file.write(new_file)

    print(f"    {path}")


def inline():
    print("processing inline blocks")
    for root, _, files in os.walk(".", topdown=True):
        for file in files:
            if not file.endswith(".html"):
                continue
            process_file(os.path.join(root, file))
