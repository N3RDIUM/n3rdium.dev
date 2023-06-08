const lenis = new Lenis()
gsap.registerPlugin(ScrollTrigger)

const codeicons = document.getElementsByClassName("icon")
for (let i = 0; i < codeicons.length; i++) {
    const codeicon = codeicons[i]
    // Create random green "connectors" like in a circuit board
    if(Math.random() > 0.9) {
		let el = document.createElement("div")
		el.className = "circuit-connector-y"
		codeicon.appendChild(el)
    }
	if(Math.random() > 0.9) {
		let el = document.createElement("div")
		el.className = "circuit-connector-x"
		codeicon.appendChild(el)
	}
	if(Math.random() > 0.94) {
		let el = document.createElement("div")
		el.className = "circuit-connector-diag1"
		codeicon.appendChild(el)
	}
	if(Math.random() > 0.94) {
		let el = document.createElement("div")
		el.className = "circuit-connector-diag1"
		codeicon.appendChild(el)
	}

	gsap.to(codeicon, {
		scrollTrigger: {
			trigger: codeicon,
			start: "top 80%",
			end: "bottom 20%",
			toggleActions: "play none none reverse",
			markers: false,
			onEnter: () => {
				codeicon.style.opacity = 1
			}
		},
		opacity: 0,
		duration: 0.5
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
	for (let i = 0; i < codeicons.length; i++) {
		codeicons[i].style.opacity = e.animatedScroll / window.innerHeight - 1
		for(child of codeicons[i].children) {
			child.style.opacity = e.animatedScroll / window.innerHeight - 1.2
		}
	}
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)