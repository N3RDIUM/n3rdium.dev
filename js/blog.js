let content = [];
fuse = new Fuse(content, {
  keys: ['title', 'description', 'tags']
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

function render({ url, title, description, written, tags, readtime }) {
    let rts = "";
    if(readtime) {
        rts = readtime;
    }
    return `<a
        href="${url}"
        class="post"
    >
        <h2 class="post-title thefont">
            ${title}
        </h2>
        <div class="post-preview">
            <p class="thefont preview">
                ${description}
            </p>
            <div class="thefont metadata" style="width: 100%">
                <span style="float:left">${rts}</span>
                <span style="float:right">${written} ${taggify(tags)}</span>
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

    let thing = "";
    for(const result of results) {
        thing += render(result);
    }

    const el = document.getElementById("list-view");
    el.innerHTML = thing;
}

fetch("/blog/posts/index.json").then(async res => {
    content = await res.json();
    fuse = new Fuse(content, {
      keys: ['title', 'description', 'tags']
    })

    refresh_results();
}).catch(() => alert("Couldn't load blog posts! Please try again."));

