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
      _num = Math.floor(Math.random() * 6) + 3
    } else {
      _num = Math.floor(Math.random() * 8) + 1
    }
    const bgname = 'background-' + _string + '-' + _num.toString()
    panel.classList.add(bgname)
  }
})

const age = document.querySelector('#age')
const user_age = new Date().getFullYear() - 2008
age.innerHTML = user_age

const typeIns = document.querySelectorAll('.typeIn')
typeIns.forEach((typeIn) => {
  typeIn.style.animationDelay = Math.random() * 2 + 's'
  typeIn.style.animationDuration = Math.random() * 2 + 3 + 's'
})

lenis.on('scroll', (e) => {
  const scrollCenter = e.animatedScroll + window.innerHeight / 2
  for (const panel of panels) {
    panel.style.backgroundPositionY = e.animatedScroll / 2 + 'px'
    const panelTop = panel.getBoundingClientRect().top
    const panelBottom = panel.getBoundingClientRect().bottom
    const panelCenter = (panelTop + panelBottom) / 2 + e.animatedScroll
    let blurFactor = Math.abs(scrollCenter - panelCenter) / 100
    if (blurFactor > 32) blurFactor = 32
    const backdrop = panel.querySelector('.backdrop-blur')
    if (backdrop == null) continue
    backdrop.style.backdropFilter = 'blur(' + blurFactor + 'px)'
  }
})
function raf (time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)
