// Imports / Plugins
gsap.registerPlugin(ScrollTrigger);

// DOM stuff setup
const lenis = new Lenis();
var animatedScroll = 0;
lenis.on('scroll', function (scroll) {
    animatedScroll = scroll.animatedScroll;
    gsap.to('.welcome', {
        x: -animatedScroll / 2
    })
});
gsap.registerPlugin(ScrollTrigger);

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
        opacity: 1
    })
}

// Mouse button callback
window.addEventListener('mousedown', onMouseDown, false);
window.addEventListener('mouseup', onMouseUp, false);
function onMouseUp() {
    gsap.to('.cursor', {
        scale: 1,
        duration: 0.32,
        filter: 'hue-rotate(0deg)',
        ease: 'elastic'
    })
}
function onMouseDown() {
    gsap.to('.cursor', {
        scale: 0.84,
        duration: 0.32,
        filter: 'hue-rotate(270deg)',
        ease: 'elastic'
    })
}

// Animations
anime({
    targets: '.username',
    backgroundPosition: `56vw 0`,
    duration: 2000,
    easing: 'linear',
    loop: true
});
anime({
    targets: '.uletter',
    opacity: 1,
    delay: anime.stagger(128),
    duration: 2000,
    easing: 'easeInOutCirc'
});
anime({
    targets: '.avatarContainer',
    opacity: 1,
    duration: 2000,
    easing: 'easeOutQuint'
});
anime({
    targets: '.scrollIndicatorContainer',
    opacity: 1,
    duration: 2000,
    delay: 2000,
    easing: 'easeOutQuad'
});
anime({
    targets: '.welcome',
    opacity: 1,
    duration: 3000,
    delay: 3000,
    easing: 'easeOutQuad'
});


ScrollTrigger.create({
    trigger: "#c1",
    start: "top top",
    end: "+=100%",
    onUpdate: (self) => {
        gsap.to(".username", {
            opacity: 1 - self.progress.toFixed(3),
            filter: `blur(${self.progress.toFixed(3) * 8}px)`,
            scale: 1 - self.progress.toFixed(3) / 2,
            ease: 'elastic'
        });
        gsap.to(".avatar", {
            opacity: 1 - self.progress.toFixed(3),
            filter: `blur(${self.progress.toFixed(3) * 8}px)`,
            scale: 1 - self.progress.toFixed(3) / 1.5,
            ease: 'elastic'
        });
        gsap.to(".scrollIndicatorContainer", {
            opacity: 1 - self.progress.toFixed(3),
            filter: `blur(${self.progress.toFixed(3) * 8}px)`,
            scale: 1 - self.progress.toFixed(3) / 5,
            ease: 'elastic'
        });
        gsap.to(".welcome", {
            opacity: 1 - self.progress.toFixed(3),
            filter: `blur(${self.progress.toFixed(3) * 8}px)`,
            scale: 1 - self.progress.toFixed(3) / 4,
            ease: 'elastic'
        });
    },
});

// Mainloop
var frame = 0;
var starAnimationFrame = 0;
function animate(time) {
    lenis.raf(time);
    requestAnimationFrame(animate);
    frame ++;
    starAnimationFrame ++;
}
animate();