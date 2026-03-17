var content = {};

function post_card({ relpath, title, astroimage }) {
    return `<a class="astro-post" href="${relpath}">
    <div class="post responsive-border">
        <img src=${astroimage} alt=${title} loading=lazy>
        <span>${title}</span>
    </div>
</a>`;
}

fetch("/astro/index.json").then(async res => {
    const cards_el = document.getElementById("post_cards")
    content = await res.json().catch(() => alert("/astro/index.json: Bad JSON format!"));
    for(var post of content.posts) {
        cards_el.innerHTML += post_card(post);
    }
});
