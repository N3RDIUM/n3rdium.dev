screen.lockOrientationUniversal = screen.lockOrientation || screen.mozLockOrientation || screen.msLockOrientation;
screen.lockOrientationUniversal("portrait-primary")
const lenis = new Lenis()
lenis.on('scroll', (e) => {})
function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}
requestAnimationFrame(raf)