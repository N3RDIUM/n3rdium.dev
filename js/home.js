const lenis = new Lenis()

const titles = [
  '00_INTR0',
  '01_AB0UT',
  '02_A$TR0',
  '03_A$TR0',
  '04_C0DE',
  '04_TECH$TACK',
  '05_INTERESTS',
  '06_MUSIC',
  '07_BADMINT0N',
  '08_THE_END?'
]

let mouseX = 0
let mouseY = 0
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX
  mouseY = e.clientY
})

window.onload = () => {
  gsap.to('.blackhole', {
    opacity: 1,
    duration: 4,
    delay: 1
  })
  gsap.to('.blackhole', {
    width: 128,
    x: 100,
    ease: 'strong.inOut',
    duration: 2
  })
  gsap.to('.blackhole', {
    rotate: 3600,
    ease: 'strong.out',
    duration: 0.1
  })
}

let animatedScroll = 0
lenis.on('scroll', (e) => {
  const progress =
    e.animatedScroll / (document.body.clientHeight - window.innerHeight)
  const height = progress * window.innerHeight
  const idx = Math.round(e.animatedScroll / window.innerHeight)

  document
    .getElementById('progress')
    .setAttribute('style', `height: ${height}px;`)
  document.getElementById('progress-label').innerHTML = titles[idx]

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

  gsap.to('.showcase-m42', {
    // TODO: Use lerp() here
    x: -(mouseX / window.innerHeight) * 42 + 21 - 128,
    y:
      ((animatedScroll - window.innerHeight * 2) / window.innerHeight) * 42 -
      (mouseY / window.innerHeight) * 42 +
      168,
    duration: t
  })

  gsap.to('.showcase-moon', {
    x: -(mouseX / window.innerHeight) * 128 + 64 + 300,
    y:
      ((animatedScroll - window.innerHeight * 2) / window.innerHeight) * 128 -
      (mouseY / window.innerHeight) * 128 -
      300,
    duration: t
  })

  gsap.to('.showcase-saturn', {
    x: -(mouseX / window.innerHeight) * 80 + 40 + 200,
    y:
      ((animatedScroll - window.innerHeight * 2) / window.innerHeight) * 80 -
      (mouseY / window.innerHeight) * 128 +
      128,
    duration: t
  })

  gsap.to('.showcase-m57', {
    x: -(mouseX / window.innerHeight) * 64 + 32 - 256,
    y:
      ((animatedScroll - window.innerHeight * 2) / window.innerHeight) * 64 -
      (mouseY / window.innerHeight) * 64 -
      200,
    duration: t
  })

  gsap.to('.showcase-jupiter', {
    x: -(mouseX / window.innerHeight) * 50 + 25 - 320,
    y:
      ((animatedScroll - window.innerHeight * 2) / window.innerHeight) * 50 -
      (mouseY / window.innerHeight) * 50 +
      42,
    duration: t
  })

  gsap.to('.showcase-m13', {
    x: -(mouseX / window.innerHeight) * 42 + 21 - 384,
    y:
      ((animatedScroll - window.innerHeight * 2) / window.innerHeight) * 42 -
      (mouseY / window.innerHeight) * 42 +
      256,
    duration: t
  })

  gsap.to('.showcase-milkyway', {
    x: -(mouseX / window.innerHeight) * 42 + 21 + 550,
    y:
      ((animatedScroll - window.innerHeight * 2) / window.innerHeight) * 52 -
      (mouseY / window.innerHeight) * 42 +
      256,
    duration: t
  })

  gsap.to('.anomaly', {
    x: lerp(
      (animatedScroll - window.innerHeight * 2) / window.innerHeight,
      -window.innerWidth - 138,
      10
    ),
    y: lerp(
      (animatedScroll - window.innerHeight * 2) / window.innerHeight,
      -window.innerWidth - 138,
      10
    ),
    rotation:
      ((animatedScroll - window.innerHeight * 2) / window.innerHeight) * 256 -
      128,
    borderRadius: Math.max(
      ((animatedScroll - window.innerHeight * 1.8) / window.innerHeight) *
      2 *
      256,
      12
    )
  })

  const shuttle_progress =
    (animatedScroll - window.innerHeight * 7) / window.innerHeight
  gsap.to('.shuttle', {
    x: shuttle_progress * window.innerWidth - window.innerWidth + 42,
    y:
      ((shuttle_progress * window.innerHeight - window.innerHeight + 42) / 4) *
      3,
    rotation: shuttle_progress * 256 - 128
  })

  gsap.to('.blackhole', {
    y: -window.innerHeight / 100 * 16 - 24 * Math.sin(frame / 100),
    x: window.innerWidth / 4
  })
  gsap.to('.blackhole', {
    rotate: -frame,
    delay: 0.8
  })

  frame += 1
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)
