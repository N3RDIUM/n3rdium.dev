// Imports / plugins
const lenis = new Lenis()

// Lenis stuff
let animatedScroll = 0
lenis.on('scroll', (e) => {
  animatedScroll = e.animatedScroll
})
function randomChar () {
  return String.fromCharCode(Math.random() * 94 + 33)
}

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
}

// Stuff
const stuff = [
  'N3RD',
  'ASTRONOMER',
  'DEVELOPER',
  'EXPERIMENTER',
  'ALIVE'
]
const classnames = [
  'nerd-text',
  'astro-text',
  'dev-text',
  'exp-text',
  'alive-text'
]
let backgrounds = [
  './img/nerd.jpg',
  './img/astro.jpg',
  './img/dev.jpg',
  './img/exp.jpg',
  './img/alive.jpg'
]
const avif = new Image()
avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A='
avif.onload = function () {
  backgrounds = [
    './img/nerd.avif',
    './img/astro.avif',
    './img/dev.avif',
    './img/exp.avif',
    './img/alive.avif'
  ]
}
let idx = 0

function updateBG () {
  gsap.to('#bg', {
    opacity: 0,
    duration: 1
  })
  setTimeout(() => {
    document.getElementById('bg').setAttribute('style', `background-image: url(${backgrounds[idx]});`)
  }, 1000)
  gsap.to('#bg', {
    opacity: 1,
    duration: 1,
    delay: 1
  })
}
updateBG()

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
let letters = []
function resetLetters () {
  letters = []
  for (const i of stuff[idx]) {
    letters.push('')
  }
}
resetLetters()
let hackerIdx = 0
let iter = 0
const max_iterations = 4
let frame = 0
let last = Date.now()
function raf (time) {
  lenis.raf(time)

  if (Date.now() - last > 4000) {
    last = Date.now()

    idx++
    if (idx > stuff.length - 1) {
      idx = 0
    }
    hackerIdx = 0
    iter = 0
    resetLetters()
    updateBG()
  }

  for (let i = 0; i < letters.length; i++) {
    if (i >= hackerIdx) {
      const content = randomChar()
      letters[i] = content
      iter++
    }
    if (i == hackerIdx) {
      if (iter > max_iterations) {
        letters[i] = stuff[idx][i]
        hackerIdx++
        iter = 0
      }
    }
    document.getElementById('type-stuff').innerHTML = `<span class="${classnames[idx]}">${letters.join('')}</span>`
  }

  requestAnimationFrame(raf)
  frame += 1
}

requestAnimationFrame(raf)
