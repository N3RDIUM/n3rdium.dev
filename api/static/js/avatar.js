document.addEventListener("mousemove", function(e) {
    let x = e.clientX - window.innerWidth / 2;
    let y = e.clientY - window.innerHeight / 2;

    let avatar = document.getElementById("avatar-img");
    avatar.style.transform = `translate(${x / 100}px, ${y / 100}px) rotateX(${y / 60}deg) rotateY(${-x / 60}deg)`

    let displayScan = document.getElementById("display-scan");
    displayScan.style.transform = `translate(${x / 100}px, ${y / 100}px) rotateX(${y / 60}deg) rotateY(${-x / 60}deg)`
});