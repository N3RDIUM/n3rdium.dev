const lenis = new Lenis()

lenis.on('scroll', (e) => {
    document.getElementById("avatar").style.opacity = 1 - e.animatedScroll / window.innerHeight
    document.getElementById("username").style.opacity = 1.1 - e.animatedScroll / window.innerHeight
    document.getElementById("userdesc").style.opacity = 1.2 - e.animatedScroll / window.innerHeight
    document.getElementById("sdi").style.opacity = 1.3 - e.animatedScroll / window.innerHeight

    document.body.style.filter = "blur(" + Math.abs(e.velocity / 32) + "px)"
    document.getElementById("panel1").style.backgroundPositionY = -e.animatedScroll / window.innerHeight * 80 + "px"
    
    document.getElementById("p1-head").style.opacity = e.animatedScroll / window.innerHeight
    document.getElementById("p1-txt").style.opacity = e.animatedScroll / window.innerHeight - 0.1

    document.getElementById("p2-head").style.opacity = e.animatedScroll / window.innerHeight - 1
    document.getElementById("p2-txt").style.opacity = e.animatedScroll / window.innerHeight - 1.1
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)