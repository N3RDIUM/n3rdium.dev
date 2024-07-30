const lenis = new Lenis()

const titles = [
  '00_INTR0',
  '01_AB0UT',
  '02_A$TR0',
  '03_A$TR0_$H0WCASE',
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

  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)
