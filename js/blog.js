let content = []
let current = 0;

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

function render({ url, title, description, written, tags }) {
    return `<a
        href="${url}"
        class="post"
    >
        <h2 class="post-title fira-code">
            ${title}
        </h2>
        <div class="post-preview">
            <p class="fira-code preview">
                ${description}
            </p>
            <div class="fira-code metadata">
                ${written} ${taggify(tags)}
            </div>
        </div>
    </a>`
}

function loadMore() {
    const el = document.getElementById("list-view");
    
    for(i=0; i<10; i++) {
        if(content[current] == undefined) break;

        el.innerHTML += render(content[current]);
        current += 1;

        if(current >= content.length) {
            allDone();
            break
        }
    }
}

function allDone() {
    const button = document.getElementById("loadmore");

    button.setAttribute("disabled", "");
    button.innerHTML = "Stay tuned for more!";
}

fetch("/blog/posts/index.json").then(async res => {
    content = await res.json();
    loadMore();
}).catch(() => alert("Couldn't load blog posts!"));

