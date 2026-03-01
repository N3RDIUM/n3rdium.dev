import os
import json
import shutil
import subprocess

with open("includes.json", "r") as f:
    includes: dict[str, str] = json.load(f)

root = os.path.dirname(os.path.dirname(__file__))

def copyfiles(src: str, dst: str):
    """Copy all files in directory src to directory dst."""

    for file in os.listdir(src):
        src_file = os.path.join(src, file)
        dst_file = os.path.join(dst, file)
        if os.path.exists(dst_file):
            print(f"    # file {dst_file} already exists, skipping.")
        print(f"    > cp {src_file} {dst_file}")
        _ = shutil.copy(src_file, dst_file)

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
                print(f"    # failed to pull changes: {e}. skipping this include.")
                continue

        print("    > ./scripts/site_dist.sh")
        try:
            _ = subprocess.check_output(
                ["./scripts/site_dist.sh"],
                text=True
            )
        except subprocess.CalledProcessError as e:
            print(f"    # dist.sh failed: {e}. skipping this include.")
            continue

        print(f"    > cd {root}")
        os.chdir(root)

        build_path = os.path.join(path, "dist/")

        css_path = os.path.join(path, "css/")
        if os.path.isdir(css_path):
            dist_css = "dist/css"
            copyfiles(css_path, dist_css)

        js_path = os.path.join(path, "js/")
        if os.path.isdir(js_path):
            dist_js = "dist/js"
            copyfiles(js_path, dist_js)

        print(f"    > cp -r {build_path} {dist_path}")
        try:
            _ = shutil.copytree(build_path, dist_path)
        except Exception as e:
            print(f"    # copy `dist` failed: {e}. skipping this include.")
            continue
