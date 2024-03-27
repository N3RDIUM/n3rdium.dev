// Imports / Plugins
import openSimplexNoise from 'opensimplex'
function interpolate (initial, final, progress) { return initial - (initial - final) * progress }

gsap.registerPlugin(ScrollTrigger)

// DOM stuff setup
const lenis = new Lenis()
let animatedScroll = 0
lenis.on('scroll', function (scroll) {
  animatedScroll = scroll.animatedScroll
  gsap.to('.welcome', {
    x: -animatedScroll / 2
  })
})
gsap.registerPlugin(ScrollTrigger)

// Mouse move callback
let mouseX = 0
let mouseY = 0
window.addEventListener('mousemove', onMouseMove, false)
function onMouseMove (e) {
  mouseX = e.clientX
  mouseY = e.clientY

  gsap.to('.cursor', {
    x: mouseX - 34,
    y: mouseY - 34,
    opacity: 1
  })
}

// Mouse button callback
window.addEventListener('mousedown', onMouseDown, false)
window.addEventListener('mouseup', onMouseUp, false)
function onMouseUp () {
  gsap.to('.cursor', {
    scale: 1,
    duration: 0.32,
    filter: 'hue-rotate(0deg)',
    ease: 'elastic'
  })
}
function onMouseDown () {
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
  backgroundPosition: '56vw 0',
  duration: 2000,
  easing: 'linear',
  loop: true
})
anime({
  targets: '.uletter',
  opacity: 1,
  delay: anime.stagger(128),
  duration: 2000,
  easing: 'easeInOutCirc'
})
anime({
  targets: '.avatarContainer',
  opacity: 1,
  duration: 2000,
  easing: 'easeOutQuint'
})
anime({
  targets: '.scrollIndicatorContainer',
  opacity: 1,
  duration: 2000,
  delay: 5000,
  easing: 'easeInOutQuad'
})
anime({
  targets: '.storyteller',
  delay: anime.stagger(256, { start: 2000 }),
  opacity: 1,
  duration: 3000,
  easing: 'easeInOutCirc'
})

function upPosition () {
  let x = 0
  let y = 0

  if (animatedScroll >= 0 && animatedScroll <= window.innerHeight) {
    x = interpolate(
      window.innerWidth / 2 - 32,
      window.innerWidth / 7 - 32,
      animatedScroll / window.innerHeight
    )
    y = interpolate(
      window.innerHeight / 2 - 350 - 24,
      window.innerHeight / 7 - 32,
      animatedScroll / window.innerHeight
    )
  }

  return [x, y]
}

function questionPosition () {
  let x = 0
  let y = 0

  if (animatedScroll >= 0 && animatedScroll <= window.innerHeight) {
    x = interpolate(
      window.innerWidth / 2 + 140,
      window.innerWidth / 7 * 2 - 32,
      animatedScroll / window.innerHeight
    )
    y = interpolate(
      window.innerHeight / 2 - 215 - 64,
      window.innerHeight / 7 * 2 - 32,
      animatedScroll / window.innerHeight
    )
  }

  return [x, y]
}

function shuttlePosition () {
  let x = 0
  let y = 0

  if (animatedScroll >= 0 && animatedScroll <= window.innerHeight) {
    x = interpolate(
      window.innerWidth / 2 + 120,
      window.innerWidth / 7 * 3 - 32,
      animatedScroll / window.innerHeight
    )
    y = interpolate(
      window.innerHeight / 2 - 28 - 64,
      window.innerHeight / 7 * 3 - 32,
      animatedScroll / window.innerHeight
    )
  }

  return [x, y]
}

function pianoPosition () {
  let x = 0
  let y = 0

  if (animatedScroll >= 0 && animatedScroll <= window.innerHeight) {
    x = interpolate(
      window.innerWidth / 2 - 32,
      window.innerWidth / 7 * 4 - 32,
      animatedScroll / window.innerHeight
    )
    y = interpolate(
      window.innerHeight / 2 + 8,
      window.innerHeight / 7 * 4 - 32,
      animatedScroll / window.innerHeight
    )
  }

  return [x, y]
}

function bracketsPosition () {
  let x = 0
  let y = 0

  if (animatedScroll >= 0 && animatedScroll <= window.innerHeight) {
    x = interpolate(
      window.innerWidth / 2 - 190,
      window.innerWidth / 7 * 5 - 32,
      animatedScroll / window.innerHeight
    )
    y = interpolate(
      window.innerHeight / 2 - 32 - 64,
      window.innerHeight / 7 * 5 - 32,
      animatedScroll / window.innerHeight
    )
  }

  return [x, y]
}

function starPosition () {
  let x = 0
  let y = 0

  if (animatedScroll >= 0 && animatedScroll <= window.innerHeight) {
    x = interpolate(
      window.innerWidth / 2 - 190,
      window.innerWidth / 7 * 6 - 32,
      animatedScroll / window.innerHeight
    )
    y = interpolate(
      window.innerHeight / 2 - 225 - 64,
      window.innerHeight / 7 * 6 - 32,
      animatedScroll / window.innerHeight
    )
  }

  return [x, y]
}

ScrollTrigger.create({
  trigger: '#c1',
  start: 'top top',
  end: '+=100%',
  onUpdate: (self) => {
    gsap.to('.username', {
      opacity: 1 - self.progress.toFixed(3),
      filter: `blur(${self.progress.toFixed(3) * 8}px)`,
      scale: 1 - self.progress.toFixed(3) / 2,
      ease: 'elastic'
    })
    gsap.to('.avatar', {
      opacity: 1 - self.progress.toFixed(3),
      filter: `blur(${self.progress.toFixed(3) * 8}px)`,
      scale: 1 - self.progress.toFixed(3) / 1.5,
      ease: 'elastic'
    })
    gsap.to('.scrollIndicatorContainer', {
      opacity: 1 - self.progress.toFixed(3),
      filter: `blur(${self.progress.toFixed(3) * 8}px)`,
      scale: 1 - self.progress.toFixed(3) / 5,
      ease: 'elastic'
    })
  }
})

const noise = openSimplexNoise.makeNoise4D(Date.now())

// Mainloop
let frame = 0
function animate (time) {
  lenis.raf(time)
  requestAnimationFrame(animate)

  gsap.to('#up', {
    x: upPosition()[0],
    y: upPosition()[1]
  })
  gsap.to('#question', {
    x: questionPosition()[0],
    y: questionPosition()[1]
  })
  gsap.to('#shuttle', {
    x: shuttlePosition()[0],
    y: shuttlePosition()[1]
  })
  gsap.to('#piano', {
    x: pianoPosition()[0],
    y: pianoPosition()[1]
  })
  gsap.to('#brackets', {
    x: bracketsPosition()[0],
    y: bracketsPosition()[1]
  })
  gsap.to('#star', {
    x: starPosition()[0],
    y: starPosition()[1]
  })

  frame++
}
animate()
