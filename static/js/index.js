gsap.registerPlugin(ScrollTrigger);
console.log('[GSAP] Loaded plugin "ScrollTrigger"');
const lenis = new Lenis();

// Animations
let scrollY = 0;
lenis.on('scroll', function (scroll) {
    scrollY = scroll.animatedScroll;
});

ScrollTrigger.create({
    trigger: "#c1",
    start: "top top",
    end: "+=100%",
    onUpdate: (self) => {
        let progress = self.progress.toFixed(3)
        gsap.to(".username", {
            opacity: 1 - progress,
            filter: `blur(${progress * 4}px)`
        })
        gsap.to(".user-avatar", {
            opacity: 1 - progress,
            filter: `blur(${progress * 4}px)`
        })
    },
});

ScrollTrigger.create({
    trigger: "#c2",
    start: "top bottom",
    end: "top top",
    onUpdate: (self) => {
        let progress = self.progress.toFixed(3)

        // Animation for bracket 1
        let bracket1_x = window.innerWidth / 2 - 160;
        let bracket1_newx = 32;
        let bracket1_y = window.innerHeight / 2;
        let bracket1_newy = 64;
        let bracket1_rot = -24;
        let bracket1_newrot = 32 + (1 - Math.sin(progress * 4)) * 10
        gsap.to('#bracket1', {
            x: bracket1_x - (bracket1_x - bracket1_newx) * progress,
            y: bracket1_y - (bracket1_y - bracket1_newy) * progress,
            rotate: bracket1_rot - (bracket1_rot - bracket1_newrot) * progress
        })
    },
});

let mouseX = 0;
let mouseY = 0;
document.addEventListener('mousemove', e => {
    mouseX = e.clientX - window.innerWidth / 2;
    mouseY = e.clientY - window.innerHeight / 2;
})

gsap.to('.username', {
    'background-position-x': '1000px',
    repeat: -1,
    duration: 8
})

// Mainloop
var frame = 0;
let frame_deno = 256;
console.log('[SmoothScroll] Load complete!');
function animate(time) {
    lenis.raf(time);
    requestAnimationFrame(animate);

    // Jiggle stuff around when viewing the first card
    if(scrollY == 0) {
        gsap.to('.username', {
            x: -mouseX / 64,
            y: -mouseY / 64
        })
        gsap.to('.user-avatar', {
            x: -mouseX / 64,
            y: -mouseY / 64
        })

        let bracket1_x = window.innerWidth / 2 - 160 - mouseX / 16;
        let bracket1_y = window.innerHeight / 2 - mouseY / 16;
        let bracket1_rot = -24;
        gsap.to('#bracket1', {
            x: bracket1_x + noise.simplex2(frame / frame_deno, 0) * 8,
            y: bracket1_y + noise.simplex2(frame / frame_deno, 69) * 8,
            rotate: bracket1_rot + noise.simplex2(frame / frame_deno, 420) * 16
        })

        let bracket2_x = window.innerWidth / 2 + 160 - mouseX / 24;
        let bracket2_y = window.innerHeight / 2 - 256 - mouseY / 24;
        let bracket2_rot = -24;
        gsap.to('#bracket2', {
            x: bracket2_x + noise.simplex2(frame / frame_deno, 32) * 8,
            y: bracket2_y + noise.simplex2(frame / frame_deno, 86) * 8,
            rotate: bracket2_rot + noise.simplex2(frame / frame_deno, 91) * 24
        })

        let star1_x = window.innerWidth / 2 - 130 - mouseX / 13;
        let star1_y = window.innerHeight / 2 - 234 - mouseY / 13;
        let star1_rot = 13;
        gsap.to('#star1', {
            x: star1_x + noise.simplex2(frame / frame_deno, 50) * 8,
            y: star1_y + noise.simplex2(frame / frame_deno, 128) * 8,
            rotate: star1_rot + noise.simplex2(frame / frame_deno, 318) * 32
        })

        let star2_x = window.innerWidth / 2 + 172 - mouseX / 26;
        let star2_y = window.innerHeight / 2 + 122 - mouseY / 26;
        let star2_rot = 13;
        gsap.to('#star2', {
            x: star2_x + noise.simplex2(frame / frame_deno, 256) * 8,
            y: star2_y + noise.simplex2(frame / frame_deno, 360) * 8,
            rotate: star2_rot + noise.simplex2(frame / frame_deno, 720) * 32
        })

        let star3_x = window.innerWidth / 2 - 200 - mouseX / 24;
        let star3_y = window.innerHeight / 2 + 100 - mouseY / 24;
        let star3_rot = 13;
        gsap.to('#star3', {
            x: star3_x + noise.simplex2(frame / frame_deno, 50) * 8,
            y: star3_y + noise.simplex2(frame / frame_deno, 128) * 8,
            rotate: star3_rot + noise.simplex2(frame / frame_deno, 318) * 32
        })

        let star4_x = window.innerWidth / 2 + 120 - mouseX / 29;
        let star4_y = window.innerHeight / 2 - 269 - mouseY / 29;
        let star4_rot = 13;
        gsap.to('#star4', {
            x: star4_x + noise.simplex2(frame / frame_deno, 64) * 8,
            y: star4_y + noise.simplex2(frame / frame_deno, 134) * 8,
            rotate: star4_rot + noise.simplex2(frame / frame_deno, 456) * 32
        })
    }

    frame += 1;
}
console.log('[SmoothScroll] Starting mainloop...');
animate();