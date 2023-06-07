const lenis = new Lenis()

lenis.on('scroll', (e) => {
    document.body.style.filter = "blur(" + Math.abs(e.velocity / 10) + "px)"
    document.getElementById("panel1").style.backgroundPositionY = e.animatedScroll / window.innerHeight * 64 + "px"
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)