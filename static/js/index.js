gsap.registerPlugin(ScrollTrigger);
console.log('[GSAP] Loaded plugin "ScrollTrigger"');
const lenis = new Lenis();

lenis.on('scroll', function (scroll) {
    // Do sth with the scroll!!
});

ScrollTrigger.create({
    trigger: "#c1",
    start: "top top",
    end: "+=100%",
    // onToggle: (self) => console.log("toggled, isActive:", self.isActive),
    onUpdate: (self) => {
        gsap.to(".username", {
            opacity: 1 - self.progress.toFixed(3),
            filter: `blur(${self.progress.toFixed(3) * 4}px)`
        })
        gsap.to(".user-avatar", {
            opacity: 1 - self.progress.toFixed(3),
            filter: `blur(${self.progress.toFixed(3) * 4}px)`
        })
    },
});

ScrollTrigger.create({
    trigger: "#c1",
    start: "bottom 25%",
    end: "top +=12.5%",
    onUpdate: (self) => {
        gsap.to("#bracket1", {
            x: (window.innerWidth / 2 - 160) - ((window.innerWidth / 2 - 160) * self.progress.toFixed(3)) + self.progress.toFixed(3) * 80,
            y: (window.innerHeight / 2) - ((window.innerHeight / 2 - 160) * self.progress.toFixed(3)) + 16 * self.progress.toFixed(3),
            rotate: -45 * self.progress.toFixed(3)
        })
        gsap.to("#bracket2", {
            x: (window.innerWidth / 2 - 160) - ((window.innerWidth / 2 - 160) * self.progress.toFixed(3)) + self.progress.toFixed(3) * 80 + 32 - 16 * self.progress.toFixed(3),
            y: (window.innerHeight / 2) - ((window.innerHeight / 2 - 160) * self.progress.toFixed(3)),
            rotate: -45 * self.progress.toFixed(3)
        })
    },
});

  
document.addEventListener('mousemove', e => {
    gsap.to(".user-avatar", {
        transform: `rotateY(${(e.clientX - window.innerWidth / 2) / 32}deg) rotateX(${(e.clientY - window.innerHeight) / 32}deg)`
    })
})

// Mainloop
var frame = 0;
console.log('[SmoothScroll] Load complete!');
function animate(time) {
    lenis.raf(time);
    requestAnimationFrame(animate);
    frame += 1;
}
console.log('[SmoothScroll] Starting mainloop...');
animate();