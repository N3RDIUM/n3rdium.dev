import os
import json
import shutil

with open("includes.json", "r") as f:
    includes: dict[str, str] = json.load(f)

if os.path.exists("includes/"):
    shutil.rmtree("includes")

def process_includes():
    for slug, repo in includes.items():
        path: str = os.path.join("includes/", slug)
        dist_path: str = os.path.join("dist/", slug)
        os.makedirs(path, exist_ok=True)

        # No error handling for this because I intend it to behave as an error 
        # instead of crashing the entire build.
        _ = os.system(f"git clone {repo} {path}")

        # TODO copy JS/CSS from (if exists) from repo to src/

        # TODO if the repos already exist (eg. on a dev machine) just git pull

        print(f"chdir to {path}")
        os.chdir(path)
        _ = os.system("./dist.sh")
        os.chdir(os.path.dirname(os.path.dirname(__file__)))
        print("chdir reset")

        _ = shutil.copytree(os.path.join(path, "dist/"), dist_path)
        print(f"processed include {slug}")
