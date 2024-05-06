// Imports / Plugins
gsap.registerPlugin(ScrollTrigger)

// Misc funcs
function clamp (value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function randomChar () {
  return String.fromCharCode(Math.random() * 94 + 33)
}

// DOM stuff setup
const lenis = new Lenis()
let animatedScroll = 0
lenis.on('scroll', function (scroll) {
  animatedScroll = scroll.animatedScroll
})
gsap.registerPlugin(ScrollTrigger)

// Create a uniform field of randomly placed points
const numDots = 512
const dots = []
document.getElementById('dots').children = []
for (let i = 0; i < numDots; i++) {
  const dot = document.createElement('div')
  dot.className = 'dot'
  dot.id = `dot${i}`
  dots.push({
    el: dot,
    position: [
      Math.random(),
      Math.random(),
      Math.random() * 10
    ]
  })

  document.getElementById('dots').appendChild(dot)

  anime({
    targets: dot,
    translateX: window.innerWidth / 2,
    translateY: window.innerHeight / 2,
    duration: 0,
    ease: 'linear'
  })
  anime({
    targets: dot,
    opacity: 1,
    translateX: dots[i].position[0] * window.innerWidth * 2 - window.innerWidth / 2,
    translateY: dots[i].position[1] * window.innerHeight * 2 - window.innerHeight / 2,
    duration: 1000,
    delay: i * 4,
    ease: 'easeInOutElastic'
  })
}

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
  gsap.to('.username', {
    x: -((mouseX / window.innerWidth) * 2 - 1) * 48,
    y: -((mouseY / window.innerHeight) * 2 - 1) * 48,
    duration: 0.8
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

// Startup animations
anime({
  targets: '.uletter',
  opacity: 1,
  delay: anime.stagger(128),
  margin: 2,
  duration: 256,
  easing: 'easeInOutCirc'
})
anime({
  targets: '.link',
  opacity: 1,
  delay: anime.stagger(128),
  duration: 512,
  easing: 'easeInOutCirc'
})
anime({
  targets: '.starfield-bg',
  opacity: 1,
  duration: 1024,
  easing: 'easeInOutSine'
})

// Mainloop
let frame = 0
let hackerIdx = 0
let iter = 0
const max_iterations = 24
const username = ['N', '3', 'R', 'D', 'I', 'U', 'M']
function animate (time) {
  lenis.raf(time)
  requestAnimationFrame(animate)

  // Loop thru all .uletter els
  const uletters = document.querySelectorAll('.uletter')
  for (let i = 0; i < uletters.length; i++) {
    if (frame > 60) {
      if (i >= hackerIdx) {
        const content = randomChar()
        uletters[i].innerHTML = content
        iter++
      }
      if (i == hackerIdx) {
        if (iter > max_iterations) {
          uletters[i].innerHTML = username[i]
          hackerIdx++
          iter = 0
        }
      }
    }

    // Get its center
    const cx = uletters[i].offsetLeft + uletters[i].offsetParent.offsetLeft
    const cy = uletters[i].offsetTop + uletters[i].offsetParent.offsetTop

    // Get its proximity to the mouse
    const dx = cx - mouseX
    const dy = cy - mouseY

    // Calculate distance
    const dist = Math.sqrt((dx * dx) + (dy * dy))

    // Update its size and margin based on distance
    if (!mouseDown) {
      anime({
        targets: uletters[i],
        margin: 2 + clamp(1024 / dist, 0, 12),
        duration: 256,
        ease: 'easeInOutElastic'
      })
    } else {
      anime({
        targets: uletters[i],
        margin: 2 + 2 * clamp(1024 / dist, 0, 16),
        duration: 256,
        ease: 'easeInOutElastic'
      })
    }
  }

  // Loop thru all the dots
  for (let i = 0; i < dots.length; i++) {
    // Get its position
    const cx = dots[i].el.offsetLeft + 1
    const cy = dots[i].el.offsetTop + 1

    // Get its proximity to the mouse
    const dx = cx - (mouseX - window.innerWidth / 2)
    const dy = cy - (mouseY - window.innerHeight / 2) - animatedScroll * 4

    // Make the points move a bit away from the mouse
    if (frame > 60) {
      gsap.to(dots[i].el, {
        x: (dots[i].position[0] * window.innerWidth * 2 - window.innerWidth / 2) + dx / dots[i].position[2] / 4,
        y: (dots[i].position[1] * window.innerHeight * 2 - window.innerHeight / 2) + dy / dots[i].position[2] / 4,
        duration: 0.8
      })
    }
  }

  // Move the links
  gsap.to('#about-link', {
    x: window.innerWidth / 8 * 2 - ((mouseX / window.innerWidth) * 2 - 1) * 64,
    y: window.innerHeight / 8 * 1 - ((mouseY / window.innerHeight) * 2 - 1) * 64,
    duration: 0.8
  })
  gsap.to('#work-link', {
    x: window.innerWidth / 8 * 1 - ((mouseX / window.innerWidth) * 2 - 1) * 48,
    y: window.innerHeight / 8 * 2 - ((mouseY / window.innerHeight) * 2 - 1) * 48,
    duration: 0.8
  })
  gsap.to('#projects-link', {
    x: window.innerWidth / 8 * 6 - ((mouseX / window.innerWidth) * 2 - 1) * 32,
    y: window.innerHeight / 8 * 3 - ((mouseY / window.innerHeight) * 2 - 1) * 32,
    duration: 0.8
  })
  gsap.to('#blog-link', {
    x: window.innerWidth / 8 * 6 - ((mouseX / window.innerWidth) * 2 - 1) * 80,
    y: window.innerHeight / 8 * 7 - ((mouseY / window.innerHeight) * 2 - 1) * 80,
    duration: 0.8
  })
  gsap.to('#contact-link', {
    x: window.innerWidth / 8 * 3 - ((mouseX / window.innerWidth) * 2 - 1) * 128,
    y: window.innerHeight / 8 * 6 - ((mouseY / window.innerHeight) * 2 - 1) * 128,
    duration: 0.8
  })

  frame++
}
animate()
