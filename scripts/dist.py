import os
import shutil

from .process_includes import process_includes
from .postprocess_dev import dev_remove
from .postprocess_inline import inline, load_css, load_js
from .postprocess_minify import minifier

if os.path.exists("./dist/"):
    shutil.rmtree("./dist/")

_ = shutil.copytree("./src", "./dist")

# build
process_includes()

# post-processing
dev_remove()
load_css()
load_js()
inline()
minifier()

