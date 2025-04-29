import os
import json

root = "./astro/history/"
for file in os.listdir(root):
    if not file.endswith(".html"):
        continue

    print(file)
    path = root + file

    with open(path) as f:
        img = f.read().split("img")[2].split("src=\"")[1].split("\"")[0]

    with open(path) as f:
        metadata = f.read().split("N3RDIUM META START")[1].split("N3RDIUM META END")[0].strip()

    metadata = json.loads(metadata)
    metadata["image"] = img
    metadata = f"""N3RDIUM META START
{json.dumps(metadata, indent=4)}
N3RDIUM META END"""
    print(metadata)
    
    with open(path) as f:
        content = f.read()
    content = content.split("N3RDIUM META START")[0] + "N3RDIUM META START" + content.split("N3RDIUM META END")[1]
    content = content.replace("N3RDIUM META START", metadata)

    with open(path, "w") as f:
        f.write(content)

