import os
import minify_html

def minify(source: str) -> str:
    return minify_html.minify(
        source, 
        minify_js=True, 
        remove_processing_instructions=True
    )

def minify_file(path: str) -> None:
    with open(path, "r") as file:
        contents = file.read()
        minified = minify(contents)

    with open(path, "w") as file:
        _ = file.write(minified)
        print(f"minified: {path}")

def minifier():
    for root, _, files in os.walk(".", topdown=True):
        for file in files:
            if not file.endswith(".html"):
                continue
            minify_file(os.path.join(root, file))

