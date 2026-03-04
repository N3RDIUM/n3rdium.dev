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

window.addEventListener("DOMContentLoaded", (event) => {
    let nav_el = document.createElement("nav");
    nav_el.id = "nav";
    nav_el.classList.add("nav-container");
    nav_el.innerHTML = NAV_HTML;
    document.body.appendChild(nav_el);

    let drawer_toggle = document.getElementById("drawer-button");
    drawer_toggle.onclick = toggleDrawer;
})
