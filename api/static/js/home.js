const lenis = new Lenis()
gsap.registerPlugin(ScrollTrigger)

const codeicons = document.getElementsByClassName("icon")
for (let i = 0; i < codeicons.length; i++) {
	let codeicon = codeicons[i]
	codeicon.style.opacity = 0
	gsap.to(codeicon, {
		scrollTrigger: {
			trigger: codeicon,
			start: "top 80%",
			end: "bottom 20%",
			toggleActions: "play none none reverse",
			scrub: true
		},
		opacity: 1,
		duration: 0.12
	})
}

lenis.on('scroll', (e) => {
    document.body.style.filter = "blur(" + Math.abs(e.velocity / 32) + "px)"

    // PANEL 0
    document.getElementById("avatar").style.opacity = 1 - e.animatedScroll / window.innerHeight
    document.getElementById("username").style.opacity = 1.1 - e.animatedScroll / window.innerHeight
    document.getElementById("userdesc").style.opacity = 1.2 - e.animatedScroll / window.innerHeight
    document.getElementById("sdi").style.opacity = 1.3 - e.animatedScroll / window.innerHeight

    // PANEL 1
    document.getElementById("panel1").style.backgroundPositionY = -e.animatedScroll / window.innerHeight * 80 + "px"
    document.getElementById("p1-head").style.opacity = e.animatedScroll / window.innerHeight
    document.getElementById("p1-txt").style.opacity = e.animatedScroll / window.innerHeight - 0.1

    // PANEL 2
    document.getElementById("p2-head").style.opacity = e.animatedScroll / window.innerHeight - 1
    document.getElementById("p2-txt").style.opacity = e.animatedScroll / window.innerHeight - 1.1
	document.getElementById("p2-txt1").style.opacity = e.animatedScroll / window.innerHeight - 1.32
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)