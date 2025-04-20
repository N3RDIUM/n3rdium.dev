const content = [
    `<a
        href="/blog/posts/2.html"
        class="post"
    >
        <h2 class="post-title fira-code">
            Making an Astrophotography Camera For $150
        </h2>
        <div class="post-preview">
            <p class="fira-code preview">
                Astrophotography is as expensive as it is addictive.
                Many people are working to fix the "expensive" bit,
                and I'd like to be one of them. That's why I decided
                to make my own astrophotography camera using a
                Raspberry Pi and the official HQ Camera. 
            </p>
            <div class="fira-code metadata">
                28-12-2024 [Astrophotography]
            </div>
        </div>
    </a>`
];
let current = 0;

function loadMore() {
    const el = document.getElementById("list-view");
    
    for(i=0; i<10; i++) {
        if(content[current] == undefined) break;

        el.innerHTML += content[current];
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

loadMore();
