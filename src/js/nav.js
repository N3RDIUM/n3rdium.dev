const NAV_HTML = `
<a class="nav-gohome" href="/">
    N3RDIUM
</a>
<button class="nav-drawer-button" id="nav-drawer-button">
    <img 
        src="/assets/icons/menu.svg"
        alt="Menu"
        width=28
        height=28
    />
</button>
<div class="drawer drawer-closed" id="drawer"></div>
<div class="desktop-nav">
    <div class="desktop-nav-link">
        <a class="desktop-nav-link-text" href="/about/">About</a>
        <div class="desktop-nav-drop">
            <a class="desktop-nav-item" href="/contact/">Contact</a>
            <a class="desktop-nav-item" href="/stack/">Stack</a>
        </div>
    </div>
    <div class="desktop-nav-link">
        <a class="desktop-nav-link-text" href="/work/">Work</a>
        <div class="desktop-nav-drop">
            <a class="desktop-nav-item" href="/projects/">Projects</a>
            <a class="desktop-nav-item" href="/astro/">Astronomy</a>
            <a class="desktop-nav-item" href="/piano/">Piano</a>
        </div>
    </div>
    <div class="desktop-nav-link">
        <a class="desktop-nav-link-text" href="/blog/">Blog</a>
    </div>
    <div class="desktop-nav-link">
        <a class="desktop-nav-link-text" href="/notes/">Notes</a>
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

window.onload = () => {
    let nav_el = document.createElement("nav");
    nav_el.id = "nav";
    nav_el.classList.add("nav-container");
    nav_el.innerHTML = NAV_HTML;
    document.body.appendChild(nav_el);

    let drawer_toggle = document.getElementById("nav-drawer-button");
    drawer_toggle.onclick = toggleDrawer;
}
