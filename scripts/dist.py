import os
import shutil

from .preprocess_dev import dev_remove
from .preprocess_inline import inline
from .preprocess_minify import minifier

if os.path.exists("./dist/"):
    shutil.rmtree("./dist/")

_ = shutil.copytree("./src", "./dist")

dev_remove()
inline()
minifier()

