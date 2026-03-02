import os
import shutil

from .metadata import process_metadata
from .dev import dev_remove
from .inline import inline, load_css, load_js
from .minify import minifier

if os.path.exists("./dist/"):
    shutil.rmtree("./dist/")

_ = shutil.copytree("./src", "./dist")
os.chdir("dist")

# preload
load_css("css")
load_js("js")

# build
process_metadata()
dev_remove()
inline()
minifier()

os.chdir(os.path.dirname(os.path.dirname(__file__)))

