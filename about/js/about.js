// Imports / plugins
const lenis = new Lenis()

// Lenis stuff
let animatedScroll = 0
let velocity = 0
lenis.on('scroll', (e) => {
  animatedScroll = e.animatedScroll
  velocity = e.velocity
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
  'COMPOSER',
  'ALIVE'
]
const classnames = [
  'nerd-text',
  'astro-text',
  'dev-text',
  'exp-text',
  'comp-text',
  'alive-text'
]
const backgrounds = [
  'nerd-svg',
  'astro-svg',
  'dev-svg',
  'exp-svg',
  'comp-svg',
  'alive-svg'
]
let idx = 0
let lastBgUpdate = 0
for (let i = 0; i < backgrounds.length; i++) {
  anime({
    targets: '.' + backgrounds[i],
    opacity: 0,
    translateX: 0,
    translateY: 0,
    rotate: 0,
    duration: 0
  })
};

// https://stackoverflow.com/questions/18295825/determine-if-point-is-within-bounding-box
function doesPointCollide (p, box) {
  return !(p.x < box.left || p.x > box.right || p.y > box.bottom || p.y < box.top)
}

function updateBG () {
  for (let i = 0; i < backgrounds.length; i++) {
    if (i == idx) continue
    anime({
      targets: '.' + backgrounds[i],
      opacity: 0,
      translateX: 0,
      translateY: 0,
      rotate: 0,
      duration: 500,
      easing: 'easeInElastic'
    })
  };

  const elements = document.getElementsByClassName(backgrounds[idx])
  for (let i = 0; i < elements.length; i++) {
    elements[i].id = backgrounds[idx] + i.toString()

    const randomX = elements[i].getAttribute('data-x')
    const randomY = elements[i].getAttribute('data-y')

    anime({
      targets: `#${elements[i].id}`,
      opacity: 1,
      translateX: randomX,
      translateY: randomY,
      rotate: elements[i].getAttribute('data-rot'),
      duration: Math.random() * 1000 + 1000,
      easing: 'easeOutElastic',
      delay: 500
    })
  }

  lastBgUpdate = Date.now()
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

// Interpolate function
function lerp (a, b, t) {
  if (t > 1) return b
  if (t < 0) return a
  return a + (b - a) * t
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

  if (document.hasFocus()) {
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

    const ry = document.querySelector('#type-stuff').getBoundingClientRect().bottom + animatedScroll
    gsap.to('#reason', { top: ry })
  }

  if (window.innerWidth > 1000) {
    gsap.to('#portal1', {
      x: -window.innerWidth / 4 - 128,
      y: -window.innerHeight / 3 + 128,
      duration: 1
    })
    gsap.to('#portal2', {
      x: window.innerWidth / 8 + 128,
      y: window.innerHeight / 5 + 128,
      rotate: -160,
      duration: 1
    })
  } else {
    gsap.to('#portal1', {
      x: -window.innerWidth / 2 + 12,
      y: -window.innerHeight / 3 + 128,
      duration: 1
    })
    gsap.to('#portal2', {
      x: window.innerWidth / 8 + 128,
      y: window.innerHeight / 5 + 128,
      rotate: -160,
      duration: 1
    })
  }
  // Object timeline
  if (window.innerWidth > 1000) {
    const tp12_overlap = 118
    const progress_tp1 = (animatedScroll - tp12_overlap) / window.innerHeight
    gsap.to('#tp1', {
      x: lerp(
        -window.innerWidth / 4 - 128,
        -window.innerWidth / 4 - 128,
        progress_tp1
      ),
      y: lerp(
        -512,
        -window.innerHeight / 3 + 240,
        progress_tp1
      ),
      rotate: lerp(
        0,
        -64,
        progress_tp1
      ),
      scale: lerp(
        4,
        1,
        progress_tp1
      ),
      opacity: lerp(
        0.1,
        1,
        progress_tp1
      ),
      duration: 1
    })

    const progress_tp2 = (animatedScroll - window.innerHeight + tp12_overlap) / window.innerHeight
    gsap.to('#tp2', {
      x: lerp(
        window.innerWidth / 8 + 180,
        0,
        progress_tp2
      ),
      y: lerp(
        window.innerHeight / 5 + 80,
        window.innerHeight,
        progress_tp2
      ),
      rotate: lerp(
        -32,
        -128,
        progress_tp2
      ),
      scale: lerp(
        1.64,
        1,
        progress_tp2
      ),
      opacity: lerp(
        0.8,
        1,
        progress_tp2
      ),
      duration: 1
    })
  } else {}

  requestAnimationFrame(raf)
  frame += 1
}

requestAnimationFrame(raf)
