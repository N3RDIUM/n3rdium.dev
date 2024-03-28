// Imports / Plugins
import openSimplexNoise from 'opensimplex'
function interpolate (initial, final, progress) { return initial - (initial - final) * progress }

gsap.registerPlugin(ScrollTrigger)

// DOM stuff setup
const lenis = new Lenis()
let animatedScroll = 0
lenis.on('scroll', function (scroll) {
  animatedScroll = scroll.animatedScroll
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
  targets: '.anomaly',
  opacity: 1,
  duration: 2000,
  delay: 2000,
  easing: 'easeInOutQuad'
})
anime({
  targets: '.storyteller',
  delay: anime.stagger(256, { start: 2000 }),
  opacity: 1,
  duration: 2000,
  easing: 'easeInOutCirc'
})

const noise = openSimplexNoise.makeNoise4D(Date.now())
const STEP = 69420
function noiseForIdx (idx) {
  const _idx = idx * 3
  return noise(STEP * _idx, STEP * (_idx + 1), STEP * (_idx + 2), frame / 100)
}

// Storyteller timelines
function upPosition () {
  let x = 0
  let y = 0

  const timeline = [
    [window.innerWidth / 2 - 32, window.innerHeight / 2 - 350 - 24],
    [window.innerWidth / 7 * 6 - 32, window.innerHeight / 7 - 32],
    [0, 0]
  ]

  const idx = Math.round(animatedScroll / window.innerHeight - 0.5)
  const progress = (animatedScroll % window.innerHeight) / window.innerHeight
  x = interpolate(
    timeline[idx][0],
    timeline[idx + 1][0],
    progress
  )
  y = interpolate(
    timeline[idx][1],
    timeline[idx + 1][1],
    progress
  )

  return [x + noiseForIdx(1) * Math.sqrt(window.innerWidth * window.innerHeight) / 64, y + noiseForIdx(2) * Math.sqrt(window.innerWidth * window.innerHeight) / 64, 1, 0]
}

function questionPosition () {
  let x = 0
  let y = 0

  const timeline = [
    [window.innerWidth / 2 + 140, window.innerHeight / 2 - 215 - 64],
    [window.innerWidth / 7 * 5 - 32, window.innerHeight / 7 * 2 - 32],
    [0, 0]
  ]

  const idx = Math.round(animatedScroll / window.innerHeight - 0.5)
  const progress = (animatedScroll % window.innerHeight) / window.innerHeight
  x = interpolate(
    timeline[idx][0],
    timeline[idx + 1][0],
    progress
  )
  y = interpolate(
    timeline[idx][1],
    timeline[idx + 1][1],
    progress
  )

  return [x + noiseForIdx(3) * Math.sqrt(window.innerWidth * window.innerHeight) / 64, y + noiseForIdx(4) * Math.sqrt(window.innerWidth * window.innerHeight) / 64, 1, 0]
}

function shuttlePosition () {
  let x = 0
  let y = 0

  const timeline = [
    [window.innerWidth / 2 + 120, window.innerHeight / 2 - 28 - 64],
    [window.innerWidth / 7 * 4 - 3, window.innerHeight / 7 * 3 - 32],
    [0, 0]
  ]

  const idx = Math.round(animatedScroll / window.innerHeight - 0.5)
  const progress = (animatedScroll % window.innerHeight) / window.innerHeight
  x = interpolate(
    timeline[idx][0],
    timeline[idx + 1][0],
    progress
  )
  y = interpolate(
    timeline[idx][1],
    timeline[idx + 1][1],
    progress
  )

  return [x + noiseForIdx(5) * Math.sqrt(window.innerWidth * window.innerHeight) / 64, y + noiseForIdx(6) * Math.sqrt(window.innerWidth * window.innerHeight) / 64, 1, 0]
}

function pianoPosition () {
  let x = 0
  let y = 0

  const timeline = [
    [window.innerWidth / 2 - 32, window.innerHeight / 2 + 8],
    [window.innerWidth / 7 * 3 - 32, window.innerHeight / 7 * 4 - 32],
    [0, 0]
  ]

  const idx = Math.round(animatedScroll / window.innerHeight - 0.5)
  const progress = (animatedScroll % window.innerHeight) / window.innerHeight
  x = interpolate(
    timeline[idx][0],
    timeline[idx + 1][0],
    progress
  )
  y = interpolate(
    timeline[idx][1],
    timeline[idx + 1][1],
    progress
  )

  return [x + noiseForIdx(7) * Math.sqrt(window.innerWidth * window.innerHeight) / 64, y + noiseForIdx(8) * Math.sqrt(window.innerWidth * window.innerHeight) / 64, 1, 0]
}

function bracketsPosition () {
  let x = 0
  let y = 0

  const timeline = [
    [window.innerWidth / 2 - 190, window.innerHeight / 2 - 32 - 64],
    [window.innerWidth / 7 * 2 - 32, window.innerHeight / 7 * 5 - 32],
    [0, 0]
  ]

  const idx = Math.round(animatedScroll / window.innerHeight - 0.5)
  const progress = (animatedScroll % window.innerHeight) / window.innerHeight
  x = interpolate(
    timeline[idx][0],
    timeline[idx + 1][0],
    progress
  )
  y = interpolate(
    timeline[idx][1],
    timeline[idx + 1][1],
    progress
  )

  return [x + noiseForIdx(9) * Math.sqrt(window.innerWidth * window.innerHeight) / 64, y + noiseForIdx(10) * Math.sqrt(window.innerWidth * window.innerHeight) / 64, 1, 0]
}

function starPosition () {
  let x = 0
  let y = 0

  const timeline = [
    [window.innerWidth / 2 - 190, window.innerHeight / 2 - 225 - 64],
    [window.innerWidth / 7 - 32, window.innerHeight / 7 * 6 - 32],
    [0, 0]
  ]

  const idx = Math.round(animatedScroll / window.innerHeight - 0.5)
  const progress = (animatedScroll % window.innerHeight) / window.innerHeight
  x = interpolate(
    timeline[idx][0],
    timeline[idx + 1][0],
    progress
  )
  y = interpolate(
    timeline[idx][1],
    timeline[idx + 1][1],
    progress
  )

  return [x + noiseForIdx(11) * Math.sqrt(window.innerWidth * window.innerHeight) / 64, y + noiseForIdx(12) * Math.sqrt(window.innerWidth * window.innerHeight) / 64, 1, 0]
}

ScrollTrigger.create({
  trigger: '#c1',
  start: 'top top',
  end: '+=100%',
  onUpdate: (self) => {
    gsap.to('.username', {
      opacity: 1 - self.progress.toFixed(3),
      filter: `blur(${self.progress.toFixed(3) * Math.sqrt(window.innerWidth * window.innerHeight) / 64}px)`,
      scale: 1 - self.progress.toFixed(3) / 2,
      ease: 'elastic'
    })
    gsap.to('.avatar', {
      opacity: 1 - self.progress.toFixed(3),
      filter: `blur(${self.progress.toFixed(3) * Math.sqrt(window.innerWidth * window.innerHeight) / 64}px)`,
      scale: 1 - self.progress.toFixed(3) / 1.5,
      ease: 'elastic'
    })
    gsap.to('.scrollIndicatorContainer', {
      opacity: 1 - self.progress.toFixed(3),
      filter: `blur(${self.progress.toFixed(3) * Math.sqrt(window.innerWidth * window.innerHeight) / 64}px)`,
      scale: 1 - self.progress.toFixed(3) / 5,
      ease: 'elastic'
    })
  }
})

// Mainloop
var frame = 0
function animate (time) {
  lenis.raf(time)
  requestAnimationFrame(animate)

  gsap.to('#up', {
    x: upPosition()[0],
    y: upPosition()[1],
    scale: upPosition()[2],
    rotation: upPosition()[3]
  })
  gsap.to('#question', {
    x: questionPosition()[0],
    y: questionPosition()[1],
    scale: questionPosition()[2],
    rotation: questionPosition()[3]
  })
  gsap.to('#shuttle', {
    x: shuttlePosition()[0],
    y: shuttlePosition()[1],
    scale: shuttlePosition()[2],
    rotation: shuttlePosition()[3]
  })
  gsap.to('#piano', {
    x: pianoPosition()[0],
    y: pianoPosition()[1],
    scale: pianoPosition()[2],
    rotation: pianoPosition()[3]
  })
  gsap.to('#brackets', {
    x: bracketsPosition()[0],
    y: bracketsPosition()[1],
    scale: bracketsPosition()[2],
    rotation: bracketsPosition()[3]
  })
  gsap.to('#star', {
    x: starPosition()[0],
    y: starPosition()[1],
    scale: starPosition()[2],
    rotation: starPosition()[3]
  })

  frame++
}
animate()
