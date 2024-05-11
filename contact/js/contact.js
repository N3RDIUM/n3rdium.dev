// Imports / plugins
const lenis = new Lenis()
// gsap.registerPlugin(ScrollTrigger) // Unneeded for now

// Lenis stuff
let animatedScroll = 0
lenis.on('scroll', (e) => {
  animatedScroll = e.animatedScroll
})

// Event handlers
let mouseX = 0
let mouseY = 0
window.addEventListener('mousemove', onMouseMove, false)
function onMouseMove (e) {
  mouseX = e.clientX
  mouseY = e.clientY

  gsap.to('.cursor', {
    x: mouseX - 34,
    y: mouseY - 34,
    opacity: 1,
    duration: 1,
    ease: 'expo'
  })
  gsap.to('.contact-label', {
    x: -((mouseX / window.innerWidth) * 2 - 1) * 16,
    y: -((mouseY / window.innerHeight) * 2 - 1) * 16,
    duration: 1.2
  })
}

// Mouse button callback
let mouseDown = false
window.addEventListener('mousedown', onMouseDown, false)
window.addEventListener('mouseup', onMouseUp, false)
function onMouseUp () {
  mouseDown = false
  gsap.to('.cursor', {
    scale: 1,
    duration: 0.32,
    filter: 'hue-rotate(0deg)',
    ease: 'elastic'
  })
}
function onMouseDown () {
  mouseDown = true
  gsap.to('.cursor', {
    scale: 0.84,
    duration: 0.32,
    filter: 'hue-rotate(270deg)',
    ease: 'elastic'
  })
}

// Mainloop
function raf (time) {
  lenis.raf(time)

  // Move the links
  gsap.to('#github', {
    x: window.innerWidth / 8 * 1 - ((mouseX / window.innerWidth) * 2 - 1) * 20,
    y: window.innerHeight / 8 * 1 - ((mouseY / window.innerHeight) * 2 - 1) * 20,
    duration: 0.8
  })
  gsap.to('#devpost', {
    x: window.innerWidth / 8 * 3 - ((mouseX / window.innerWidth) * 2 - 1) * 35,
    y: window.innerHeight / 8 * 5 - ((mouseY / window.innerHeight) * 2 - 1) * 35,
    duration: 0.8
  })
  gsap.to('#discord', {
    x: window.innerWidth / 8 * 5 - ((mouseX / window.innerWidth) * 2 - 1) * 48,
    y: window.innerHeight / 8 * 1.2 - ((mouseY / window.innerHeight) * 2 - 1) * 48,
    duration: 0.8
  })
  gsap.to('#email', {
    x: window.innerWidth / 8 * 2 - ((mouseX / window.innerWidth) * 2 - 1) * 28,
    y: window.innerHeight / 8 * 7 - ((mouseY / window.innerHeight) * 2 - 1) * 28,
    duration: 0.8
  })

  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)
