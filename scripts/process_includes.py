import os
import json
import shutil
import subprocess

with open("includes.json", "r") as f:
    includes: dict[str, str] = json.load(f)

root = os.path.dirname(os.path.dirname(__file__))

def process_includes():
    for slug, repo in includes.items():
        print(f"processing include {slug}")
        path: str = os.path.join("includes/", slug)
        dist_path: str = os.path.join("dist/", slug)

        fresh_clone = False
        if not os.path.isdir(path):
            os.makedirs(path)

            # I intend it to behave as a warning instead of crashing the build.
            print(f"> git clone {repo} {path} -q")
            try:
                _ = subprocess.check_output(
                    ["git", "clone", repo, path, "-q"],
                    text=True,
                )
                fresh_clone = True
            except subprocess.CalledProcessError as e:
                print(f"> failed to clone {repo}: {e}. skipping this include.")
                continue
        else:
            print(f"# {path} already exists, skipping clone.")

        # TODO copy JS/CSS from (if exists) from repo to src/

        # TODO if the repos already exist (eg. on a dev machine) just git pull

        print(f"> cd {path}")
        os.chdir(path)

        if not fresh_clone:
            print("> git pull -q")
            try:
                _ = subprocess.check_output(
                    ["git", "pull", "-q"],
                    text=True
                )
            except subprocess.CalledProcessError as e:
                print(f"> failed to pull changes: {e}. skipping this include.")
                continue

        print("> ./dist.sh")
        try:
            _ = subprocess.check_output(
                ["./dist.sh"],
                text=True
            )
        except subprocess.CalledProcessError as e:
            print(f"> dist.sh failed: {e}. skipping this include.")

        print(f"> cd {root}")
        os.chdir(root)

        build_path = os.path.join(path, "dist/")
        print(f"> cp -r {build_path} {dist_path}")
        _ = shutil.copytree(build_path, dist_path)
