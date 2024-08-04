const lenis = new Lenis()

let mouseX = 0
let mouseY = 0
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX
  mouseY = e.clientY
})

window.onload = () => {
}

let animatedScroll = 0
lenis.on('scroll', (e) => {
  animatedScroll = e.animatedScroll
})

function lerp (t, a, b) {
  return a * t + b * (t - 1)
}

const t = 1.248
let frame = 0
const start = Date.now()
function raf (time) {
  lenis.raf(time)

  frame += 1
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)
