const lenis = new Lenis()

const titles = ['00_INTR0', '01_AB0UT', '02_A$TR0', '03_C0DE']

lenis.on('scroll', (e) => {
  const progress =
    e.animatedScroll / (document.body.clientHeight - window.innerHeight)
  const height = progress * window.innerHeight
  const idx = Math.round(e.animatedScroll / window.innerHeight)

  document
    .getElementById('progress')
    .setAttribute('style', `height: ${height}px;`)
  document.getElementById('progress-label').innerHTML = titles[idx]
})

function raf (time) {
  lenis.raf(time)

  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)
