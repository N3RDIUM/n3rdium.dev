import os

from .metadata import process_metadata
from .dev import dev_remove
from .inline import inline, load_css, load_js
from .minify import minifier

os.chdir("dist")

# preload
print(os.getcwd())
load_css("css")
load_js("js")

# build
process_metadata()
dev_remove()
inline()
minifier()

os.chdir(os.path.dirname(os.path.dirname(__file__)))

