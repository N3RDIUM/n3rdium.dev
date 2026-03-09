var content = {};

function blog_post_card({ relpath, title, description, tags, readtime, published }) {
    let tags_html = "";
    if(tags != null) {
        for(var tag of tags) {
            tags_html += `<div class="tag">${tag}</div>`;
        }
    }

    return `<a class="blog-post" href="${relpath}">
    <div class="post responsive-border">
        <h2 class="heading">${title}</h2>
        <div class="description">${description}</div>
        <div class="metadata">
            <div class="tags">${tags_html}</div>
            <div class="times">
                ${readtime} 🟅 ${published}
            </div>
        </div>
    </div>
</a>`;
}

fetch("/blog/index.json").then(async res => {
    const cards_el = document.getElementById("blog_post_cards")
    content = await res.json().catch(() => alert("/blog/index.json: Bad JSON format!"));
    for(var post of content.posts) {
        cards_el.innerHTML += blog_post_card(post);
    }
});
