const lenis = new Lenis()
gsap.registerPlugin(ScrollTrigger)

lenis.on('scroll', (e) => {})

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)