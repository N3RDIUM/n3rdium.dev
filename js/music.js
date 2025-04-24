const content = [ 
    `<a
        href="https://youtube.com/@N3RDITE"
        target="_blank"
        class="post"
    >
        <h2 class="post-title fira-code">
            Unnamed
        </h2>
                        
        <div class="post-preview">
            <p class="fira-code preview">
                Releasing soon!
            </p>
            <div class="fira-code metadata">
                23-03-2025 [Original - WIP]
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

