const lenis = new Lenis()

const panels = document.querySelectorAll('.panel')
const variants = ['blue', 'green', 'purple', 'starfield']
panels.forEach((panel) => {
  const id = panel.id
  const name = id.replace('panel', '')
  const index = parseInt(name)
  if (index % 2 == 0) {
    const _string = variants[Math.floor(Math.random() * variants.length)].toString()
    let _num = 1
    if (_string == 'purple') {
      _num = Math.floor(Math.random() * 7) + 1
    } else if (_string == 'green') {
      _num = Math.floor(Math.random() * 6) + 2
    } else {
      _num = Math.floor(Math.random() * 8) + 1
    }
    const bgname = 'background-' + _string + '-' + _num.toString()
    panel.classList.add(bgname)
  }
})

lenis.on('scroll', (e) => {
  for (const panel of panels) {
    panel.style.backgroundPositionY = e.animatedScroll / 2 + 'px'
  }
})
function raf (time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)
