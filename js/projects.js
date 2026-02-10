let content = [];
fuse = new Fuse(content, {
  keys: ['name', 'description', 'tags']
})

function taggify(tags) {
    let ret = "";
    for(i=0; i<tags.length; i++) {
        ret += `[${tags[i]}]`;
        if(i != tags.length - 1) {
            ret += " "
        }
    }
    return ret
}

function render({ url, name, description, image, imagealt, tags }) {
    if(!image) {
        return `<a
            href="${url}"
            class="post"
            target="_blank"
        >
            <h2 class="post-title">
                ${name}
            </h2>
            <div class="post-preview">
                <p class="post-description">
                    ${description}
                </p>
                <div class="metadata">
                    ${taggify(tags)}
                </div>
            </div>
        </a>`
    }

    let alt = "";
    if (!imagealt) {
        alt = "No alt provided.";
    } else {
        alt = imagealt;
    }

    return `<a
        href="${url}"
        class="post"
        target="_blank"
    >
        <h2 class="post-title">
            ${name}
        </h2>
        <div class="post-preview">
            <img
                class="post-banner"
                src="${image}"
                alt="${alt}"
            />
            <p class="post-description">
                ${description}
            </p>
            <div class="metadata">
                ${taggify(tags)}
            </div>
        </div>
    </a>`
}

function refresh_results() {
    const box = document.getElementById("query");
    const query = box.value.trim();
    let results = [];

    if(query == "") { results = content }
    else {
        const fuse_results = fuse.search(query);
        for(const result of fuse_results) {
            results.push(result.item);
        }
    }

    results.sort((a, b) => {
        const aFeatured = a.tags?.includes("featured") ? 1 : 0;
        const bFeatured = b.tags?.includes("featured") ? 1 : 0;
        return bFeatured - aFeatured;
    });

    let thing = "";
    for(const result of results) {
        thing += render(result);
    }

    const el = document.getElementById("list-view");
    el.innerHTML = thing;

    if(thing == "") {
        el.innerHTML = "No results found!";
    }
}

fetch("/projects/index.json").then(async res => {
    content = await res.json();
    fuse = new Fuse(content, {
      keys: ['name', 'description', 'tags']
    })

    refresh_results();
}).catch(() => alert("Couldn't load projects! Please try again."));


