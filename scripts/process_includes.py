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
            print(f"    > git clone {repo} {path} -q")
            try:
                _ = subprocess.check_output(
                    ["git", "clone", repo, path, "-q"],
                    text=True,
                )
                fresh_clone = True
            except subprocess.CalledProcessError as e:
                print(f"    # failed to clone {repo}: {e}. skipping this include.")
                continue
        else:
            print(f"    # {path} already exists, skipping clone.")

        print(f"    > cd {path}")
        os.chdir(path)

        if not fresh_clone:
            print("    > git pull -q")
            try:
                _ = subprocess.check_output(
                    ["git", "pull", "-q"],
                    text=True
                )
            except subprocess.CalledProcessError as e:
                print(f"    > failed to pull changes: {e}. skipping this include.")
                continue

        print("    > ./dist.sh")
        try:
            _ = subprocess.check_output(
                ["./dist.sh"],
                text=True
            )
        except subprocess.CalledProcessError as e:
            print(f"    > dist.sh failed: {e}. skipping this include.")
            continue

        print(f"    > cd {root}")
        os.chdir(root)

        build_path = os.path.join(path, "dist/")

        css_path = os.path.join(path, "css/*")
        if os.path.exists(css_path):
            dist_css = os.path.join(dist_path, "css/")
            print(f"    > cp -r {css_path} {dist_path}")
            try:
                _ = subprocess.check_output(
                    ["cp", "-r", css_path, dist_css],
                    text=True
                )
            except subprocess.CalledProcessError:
                print("# css copy failed, continuing.")

        js_path = os.path.join(path, "js/*")
        if os.path.exists(js_path):
            dist_js = os.path.join(dist_path, "js/")
            print(f"    > cp -r {css_path} {dist_path}")
            try:
                _ = subprocess.check_output(
                    ["cp", "-r", js_path, dist_js],
                    text=True
                )
            except subprocess.CalledProcessError:
                print("# js copy failed, continuing.")

        print(f"    > cp -r {build_path} {dist_path}")
        _ = shutil.copytree(build_path, dist_path)
