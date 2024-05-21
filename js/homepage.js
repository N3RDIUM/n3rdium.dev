// Misc funcs
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function randomChar() {
    return String.fromCharCode(Math.random() * 94 + 33);
}

// Mouse move callback
let mouseX = 0;
let mouseY = 0;
window.addEventListener('mousemove', onMouseMove, false);
function onMouseMove(e){
    mouseX = e.clientX;
    mouseY = e.clientY;

    gsap.to('.cursor', {
        x: mouseX - 34,
        y: mouseY - 34,
        opacity: 1,
        duration: 1,
        ease: 'expo'
    })
    gsap.to('.username', {
        x: -((mouseX / window.innerWidth) * 2 - 1) * 48,
        y: -((mouseY / window.innerHeight) * 2 - 1) * 48,
        duration: 1.2
    })
    gsap.to('.starfield-bg', {
        x: -((mouseX / window.innerWidth) * 2 - 1) * 16 - window.innerWidth / 10,
        y: -((mouseY / window.innerHeight) * 2 - 1) * 16 - window.innerHeight / 10,
        duration: 1.2
    })
}

// Mouse button callback
let mouseDown = false;
window.addEventListener('mousedown', onMouseDown, false);
window.addEventListener('mouseup', onMouseUp, false);
function onMouseUp() {
    mouseDown = false;
    gsap.to('.cursor', {
        scale: 1,
        duration: 0.32,
        filter: 'hue-rotate(0deg)',
        ease: 'elastic'
    })
}
function onMouseDown() {
    mouseDown = true;
    gsap.to('.cursor', {
        scale: 0.84,
        duration: 0.32,
        filter: 'hue-rotate(270deg)',
        ease: 'elastic'
    })
}

// Startup animations
anime({
    targets: '.link',
    opacity: 1,
    delay: anime.stagger(128),
    duration: 512,
    easing: 'easeInOutCirc'
});
anime({
    targets: '.starfield-bg',
    opacity: 1,
    duration: 2048,
    easing: 'easeInOutSine'
})

// If the browser supports avif
var avif = new Image();
avif.src = "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=";
avif.onload = function () {
	document.getElementById('bg').setAttribute('style', "background-image: url('../img/bg.avif');")
};

// Mainloop
var frame = 0;
var hackerIdx = 0;
var iter = 0;
const max_iterations = 24;
const username = ['N', '3', 'R', 'D', 'I', 'U', 'M'];
const start = Date.now();
var last = 0
function animate(time) {
    requestAnimationFrame(animate);

    // Loop thru all .uletter els
    let uletters = document.querySelectorAll('.uletter');
    for (let i=0; i<uletters.length; i++) {
        if(i >= hackerIdx) {
            let content = randomChar();
            uletters[i].innerHTML = content;
            iter++;
        }
        if (i == hackerIdx) {
            if(iter > max_iterations) {
                uletters[i].innerHTML = username[i];
                hackerIdx++;
                iter = 0;
            }
        }
        // Get its center
        let cx = uletters[i].offsetLeft + uletters[i].offsetParent.offsetLeft;
        let cy = uletters[i].offsetTop + uletters[i].offsetParent.offsetTop;

        // Get its proximity to the mouse
        let dx = cx - mouseX;
        let dy = cy - mouseY;

        // Calculate distance
        let dist = Math.sqrt((dx * dx) + (dy * dy));

        // Update its size and margin based on distance
        if(!mouseDown){
            anime({
                targets: uletters[i],
                margin: 2 + clamp(1024 / dist, 0, 12),
                duration: 256,
                ease: 'easeInOutElastic'
            })
        } else {
            anime({
                targets: uletters[i],
                margin: 2 + 2 * clamp(1024 / dist, 0, 16),
                duration: 256,
                ease: 'easeInOutElastic'
            })
        }
    }

    // Move the links
    gsap.to('#about-link', {
        x: window.innerWidth / 8 * 2 - ((mouseX / window.innerWidth) * 2 - 1) * 64,
        y: window.innerHeight / 8 * 1 - ((mouseY / window.innerHeight) * 2 - 1) * 64,
        duration: 0.8
    })
    gsap.to('#work-link', {
        x: window.innerWidth / 8 * 1 - ((mouseX / window.innerWidth) * 2 - 1) * 48,
        y: window.innerHeight / 8 * 2 - ((mouseY / window.innerHeight) * 2 - 1) * 48,
        duration: 0.8
    })
    gsap.to('#projects-link', {
        x: window.innerWidth / 8 * 6 - ((mouseX / window.innerWidth) * 2 - 1) * 32,
        y: window.innerHeight / 8 * 3 - ((mouseY / window.innerHeight) * 2 - 1) * 32,
        duration: 0.8
    })
    gsap.to('#blog-link', {
        x: window.innerWidth / 8 * 6 - ((mouseX / window.innerWidth) * 2 - 1) * 80,
        y: window.innerHeight / 8 * 7 - ((mouseY / window.innerHeight) * 2 - 1) * 80,
        duration: 0.8
    })
    gsap.to('#contact-link', {
        x: window.innerWidth / 8 * 3 - ((mouseX / window.innerWidth) * 2 - 1) * 100,
        y: window.innerHeight / 8 * 6 - ((mouseY / window.innerHeight) * 2 - 1) * 100,
        duration: 0.8
    })

    frame ++;
}
animate();