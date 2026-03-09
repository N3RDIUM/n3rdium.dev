const NAV_HTML = `
<a class="gohome" href="/">
    N3RDIUM
</a>
<button class="drawer-button" id="drawer-button">
    <img 
        src="/assets/icons/menu.svg"
        alt="Menu"
        width=28
        height=28
    />
</button>
<div class="drawer drawer-closed" id="drawer">
    <div class="links">
        <a class="item" href="/about/">About</a>
        <ul>
            <li>
                <a class="item" href="/contact/">Contact</a>
            </li>
            <li>
                <a class="item" href="/stack/">Stack</a>
            </li>
        </ul>
        <a class="item" href="/work/">Work</a>
        <ul>
            <li>
                <a class="item" href="/projects/">Projects</a>
            </li>
            <li>
                <a class="item" href="/astro/">Astronomy</a>
            </li>
            <li>
                <a class="item" href="/piano/">Piano</a>
            </li>
        </ul>
        <a class="item" href="/blog/">Blog</a>
        <br><br>
        <a class="item" href="/notes/">Notes</a>
    </div>
</div>
<div class="desktop">
    <div class="link">
        <a class="link-text" href="/about/">About</a>
        <div class="drop">
            <a class="item" href="/contact/">Contact</a>
            <a class="item" href="/stack/">Stack</a>
        </div>
    </div>
    <div class="link">
        <a class="link-text" href="/work/">Work</a>
        <div class="drop">
            <a class="item" href="/projects/">Projects</a>
            <a class="item" href="/astro/">Astronomy</a>
            <a class="item" href="/piano/">Piano</a>
        </div>
    </div>
    <div class="link">
        <a class="link-text" href="/blog/">Blog</a>
    </div>
    <div class="link">
        <a class="link-text" href="/notes/">Notes</a>
    </div>
</div>`;

function toggleDrawer() {
    let drawer = document.getElementById("drawer");
    let container = document.body;
    if(drawer.classList.contains("drawer-closed")) {
        drawer.classList.remove('drawer-closed')
        container.classList.add('body-disabled')
    } else {
        drawer.classList.add('drawer-closed')
        container.classList.remove('body-disabled')
    }
}

let hintMode = false;
let hints = [];
let typed = "";

const hintChars = "asdfghjklqwertyuiopzxcvbnm";

function getClickableElements() {
    return [...document.querySelectorAll(`
        a[href],
        button,
        input[type="button"],
        input[type="submit"],
        [onclick],
        [role="button"]
    `)].filter(el => {
        const rect = el.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
    });
}

function generateHints(n) {
    const results = [];
    const base = hintChars.length;

    for (let i = 0; i < n; i++) {
        let num = i;
        let str = "";
        do {
            str = hintChars[num % base] + str;
            num = Math.floor(num / base);
        } while (num > 0);
        results.push(str);
    }

    return results;
}

function startHintMode() {
    hintMode = true;
    typed = "";

    const elements = getClickableElements();
    const labels = generateHints(elements.length);

    hints = elements.map((el, i) => {
        const rect = el.getBoundingClientRect();

        const label = document.createElement("div");
        label.textContent = labels[i];

        label.style.position = "fixed";
        label.style.left = rect.left + "px";
        label.style.top = rect.top + "px";
        label.style.background = "var(--lyellow, yellow)";
        label.style.color = "var(--bg_0, black)";
        label.style.fontSize = "13px";
        label.style.padding = "2px 4px";
        label.style.zIndex = 999999;

        document.body.appendChild(label);

        return { el, label, key: labels[i] };
    });
}

function clearHints() {
    hints.forEach(h => h.label.remove());
    hints = [];
    hintMode = false;
    typed = "";
}

document.addEventListener("keydown", e => {
    if (e.key === "Escape" && hintMode) {
        clearHints();
        return;
    }

    if (!hintMode) {
        if (e.key === "f") {
            startHintMode();
            e.preventDefault();
        }
        return;
    }

    typed += e.key.toLowerCase();

    const matches = hints.filter(h => h.key.startsWith(typed));

    if (matches.length === 1 && matches[0].key === typed) {
        matches[0].el.click();
        clearHints();
    } else {
        hints.forEach(h => {
            h.label.style.opacity = h.key.startsWith(typed) ? "1" : "0.2";
        });
    }
});

document.addEventListener("keydown", function (e) {
    const tag = document.activeElement.tagName.toLowerCase();
    if (tag === "input" || tag === "textarea" || document.activeElement.isContentEditable) {
        return;
    }

    switch (e.key.toLowerCase()) {
        case "j":
        window.scrollBy({ top: 100, behavior: "smooth" });
        break;

        case "k":
        window.scrollBy({ top: -100, behavior: "smooth" });
        break;

        case "h":
        window.history.back();
        break;

        case "l":
        window.history.forward();
        break;
    }
});

window.addEventListener("DOMContentLoaded", (event) => {
    let nav_el = document.createElement("nav");
    nav_el.id = "nav";
    nav_el.classList.add("nav-container");
    nav_el.innerHTML = NAV_HTML;
    document.body.appendChild(nav_el);

    let drawer_toggle = document.getElementById("drawer-button");
    drawer_toggle.onclick = toggleDrawer;
})
