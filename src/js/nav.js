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
    let drawer_toggle = document.getElementById("nav-drawer-button");
    drawer_toggle.onclick = toggleDrawer;
}
