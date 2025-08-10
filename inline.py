import os
from rjsmin import jsmin
from rcssmin import cssmin

css = {}
js = {}

for style in os.listdir("./css"):
    if not style.endswith(".css"):
        continue

    with open(os.path.join("./css/", style), "r") as file:
        contents = file.read()
    name = style.removesuffix(".css")

    css[name] = cssmin(contents)
    print(f"loaded stylesheet: {name}")

for script in os.listdir("./js"):
    if not script.endswith(".js"):
        continue

    with open(os.path.join("./js/", script), "r") as file:
        contents = file.read()
    name = script.removesuffix(".js")

    js[name] = jsmin(contents)
    print(f"loaded script: {name}")

INLINE_PREFIX = "<!--INLINE START"
INLINE_SUFFIX = "INLINE END-->"

AUTOGEN_PREFIX = "<!--AUTOGEN START-->"
AUTOGEN_SUFFIX = "<!--AUTOGEN END-->"

def process_inline_block(inline_block: str):
    lines = inline_block.split("\n")
    scripts = []
    stylesheets = []

    for line in lines:
        if not line.strip():
            continue
        line = line.strip().split(":")
        inline_type = line[0].strip()
        required = line[1].strip()

        if inline_type == "js":
            if not required in js:
                print(f"warning: couldn't find script {required} - skipping!")
            scripts.append(required)
        elif inline_type == "css":
            if not required in css:
                print(f"warning: couldn't find script {required} - skipping!")
            stylesheets.append(required)

    return stylesheets, scripts

def autogen_block(stylesheets, scripts):
    ret = ""

    for stylesheet in stylesheets:
        ret += f"""
<style>
{css[stylesheet]}
</style>
"""

    for script in scripts:
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
        print(f"could not locate inline block for {path}")
        return

    stylesheets, scripts = process_inline_block(inline_block)
    autogen = autogen_block(stylesheets, scripts)

    before = contents.split(AUTOGEN_PREFIX)[0]
    after = contents.split(AUTOGEN_SUFFIX)[1]

    new_file = f"""{before}{AUTOGEN_PREFIX}
{autogen}
{AUTOGEN_SUFFIX}{after}"""

    with open(path, "w") as file:
        file.write(new_file)

    print(f"processed file: {path}")

BLACKLIST = [
    "template.html",
]

for (root, dirs, files) in os.walk(".", topdown=True):
    for file in files:
        if not file.endswith(".html"):
            continue
        if file in BLACKLIST:
            continue
        process_file(os.path.join(root, file))

