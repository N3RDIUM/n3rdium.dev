gsap.registerPlugin(ScrollTrigger)
console.log('[GSAP] Loaded plugin "ScrollTrigger"')
const lenis = new Lenis()

// Animations
lenis.on('scroll', function (scroll) {
  // Do sth with the scroll!!
})

ScrollTrigger.create({
  trigger: '#c1',
  start: 'top top',
  end: '+=100%',
  // onToggle: (self) => console.log("toggled, isActive:", self.isActive),
  onUpdate: (self) => {
    gsap.to('.username', {
      opacity: 1 - self.progress.toFixed(3),
      filter: `blur(${self.progress.toFixed(3) * 4}px)`
    })
    gsap.to('.user-avatar', {
      opacity: 1 - self.progress.toFixed(3),
      filter: `blur(${self.progress.toFixed(3) * 4}px)`
    })
  }
})

document.addEventListener('mousemove', e => {
  gsap.to('.user-avatar', {
    transform: `rotateY(${(e.clientX - window.innerWidth / 2) / 32}deg) rotateX(${(e.clientY - window.innerHeight) / 32}deg)`
  })
})

gsap.to('.username', {
  'background-position-x': '1000px',
  repeat: -1,
  duration: 8,
  easing: 'linear'
})

// Mainloop
let frame = 0
console.log('[SmoothScroll] Load complete!')
function animate (time) {
  lenis.raf(time)
  requestAnimationFrame(animate)
  frame += 1
}
console.log('[SmoothScroll] Starting mainloop...')
animate()
