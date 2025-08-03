let content = []
let current = 0;

function render({ url, image, big }) {
    return `<div class="tile ${big == 1 ? 'big-tile': 'smol-tile'}">
    <a href="${url}">
        <img
            src="${image}"
            class="tile-image ${big == 1 ? 'big-image' : 'smol-image'}"
        />
    </a>
</div>
`
}

function loadMore() {
    const el = document.getElementById("gallery");
    
    for(i=0; i<100; i++) {
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

fetch("/astro/history/index.json").then(async res => {
    content = await res.json();
    loadMore();
}).catch(() => alert("Couldn't load blog posts! Please try again."));

