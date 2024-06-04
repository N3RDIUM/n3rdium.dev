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

    let randomX = elements[i].getAttribute('data-x')
    let randomY = elements[i].getAttribute('data-y')

    if (window.innerWidth > 700) {
      randomX = randomX / 1200 * window.innerWidth
    }
    if (window.innerWidth > 900) {
      randomY = randomY / 700 * window.innerHeight
    }

    anime({
      targets: `#${elements[i].id}`,
      opacity: 1,
      translateX: randomX,
      translateY: randomY,
      rotate: elements[i].getAttribute('data-rot'),
      duration: Math.random() * 500 + 1000,
      easing: 'easeOutElastic',
      delay: 1000
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
let done = false
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

  const interval = done ? 500 : 2500
  if (Date.now() - lastBgUpdate > interval) {
    done = true

    const elements = document.getElementsByClassName(backgrounds[idx])
    for (let i = 0; i < elements.length; i++) {
      const el = elements[i]
      let randomX = elements[i].getAttribute('data-x')
      let randomY = elements[i].getAttribute('data-y')

      if (window.innerWidth > 700) {
        randomX = randomX / 1200 * window.innerWidth
      }
      if (window.innerWidth > 900) {
        randomY = randomY / 700 * window.innerHeight
      }

      gsap.to(`#${el.id}`, {
        x: randomX,
        y: randomY,
        rotate: elements[i].getAttribute('data-rot')
      })
    }

    // lastBgUpdate = Date.now();
  }

  const ry = document.querySelector('#type-stuff').getBoundingClientRect().bottom + animatedScroll
  gsap.to('#reason', { top: ry })

  requestAnimationFrame(raf)
  frame += 1
}

requestAnimationFrame(raf)
