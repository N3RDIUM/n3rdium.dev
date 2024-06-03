// Imports / plugins
const lenis = new Lenis()

// Lenis stuff
var animatedScroll = 0;
let velocity = 0;
lenis.on('scroll', (e) => {
	animatedScroll = e.animatedScroll;
	velocity = e.velocity;
})
function randomChar() {
    return String.fromCharCode(Math.random() * 94 + 33);
}

// Event handlers
let mouseX = 0;
let mouseY = 0;
window.addEventListener('mousemove', onMouseMove, false);
function onMouseMove(e){
	mouseX = e.clientX;
	mouseY = e.clientY;

	gsap.to('.cursor', {
		x: mouseX - 34,
		y: mouseY - 34,
		opacity: 1,
		duration: 1,
		ease: 'expo'
	})
}

// Stuff
const stuff = [
	"N3RD",
	"ASTRONOMER",
	"DEVELOPER",
	"EXPERIMENTER",
	"COMPOSER",
	"ALIVE"
];
const classnames = [
	"nerd-text",
	"astro-text",
	"dev-text",
	"exp-text",
	"comp-text",
	"alive-text"
]
let backgrounds = [
	"./img/nerd.jpg",
	"./img/astro.jpg",
	"./img/dev.jpg",
	"./img/exp.jpg",
	"./img/comp.jpg",
	"./img/alive.jpg"
]
var avif = new Image();
avif.src = "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=";
avif.onload = function () {
	backgrounds = [
		"./img/nerd.avif",
		"./img/astro.avif",
		"./img/dev.avif",
		"./img/exp.avif",
		"./img/comp.avif",
		"./img/alive.avif"
	]
};
var idx = 0;

function updateBG() {
	gsap.to('#bg', {
		opacity: 0,
		duration: 1,
	})
	setTimeout(() => {
		document.getElementById('bg').setAttribute('style', `background-image: url(${backgrounds[idx]});`)
	}, 1000)
	gsap.to('#bg', {
		opacity: 1,
		duration: 1,
		delay: 1
	})
}
updateBG()

// Mouse button callback
let mouseDown = false;
window.addEventListener('mousedown', onMouseDown, false);
window.addEventListener('mouseup', onMouseUp, false);
function onMouseUp() {
	mouseDown = false;
	gsap.to('.cursor', {
		scale: 1,
		duration: 0.32,
		filter: 'hue-rotate(0deg)',
		ease: 'elastic'
	})
}
function onMouseDown() {
	mouseDown = true;
	gsap.to('.cursor', {
		scale: 0.84,
		duration: 0.32,
		filter: 'hue-rotate(270deg)',
		ease: 'elastic'
	})
}

// Mainloop
var letters = [];
function resetLetters() {
	letters = [];
	for(let i of stuff[idx]) {
		letters.push('')
	}
}
resetLetters()
var hackerIdx = 0;
var iter = 0;
var max_iterations = 4;
var frame = 0;
var last = Date.now();
function raf(time) {
	lenis.raf(time);

	if(Date.now() - last > 4000) {
		last = Date.now();

		idx++;
		if(idx > stuff.length - 1) {
			idx = 0;
		}
		hackerIdx = 0;
		iter = 0;
		resetLetters();
		updateBG();
	}

	for (let i=0; i<letters.length; i++) {
		if(i >= hackerIdx) {
			let content = randomChar();
			letters[i] = content;
			iter++;
		}
		if (i == hackerIdx) {
			if(iter > max_iterations) {
				letters[i] = stuff[idx][i];
				hackerIdx++;
				iter = 0;
			}
		}
		document.getElementById('type-stuff').innerHTML = `<span class="${classnames[idx]}">${letters.join('')}</span>`
	}

	let ry = document.querySelector('#type-stuff').getBoundingClientRect().bottom + animatedScroll;
	gsap.to('#reason', { top: ry })

	if(window.innerWidth > 700) {
		gsap.to('#code', {
			top: window.innerHeight * 1.64 + (animatedScroll - window.innerHeight * 1.5) / 10 * 3.8,
			left: window.innerWidth * 0.05,
			rotate: (animatedScroll / window.innerHeight * 1.5) * 8 - 8 + velocity * 0.2,
			duration: 1,
			ease: 'sine'
		})
		gsap.to('#music', {
			top: window.innerHeight * 1.42 + (animatedScroll - window.innerHeight * 1.5) / 10 * 3,
			left: window.innerWidth * 0.32,
			rotate: -(animatedScroll / window.innerHeight * 1.5) * 16 + 16 + velocity * 0.1,
			duration: 1,
			ease: 'sine'
		})
		gsap.to('#stars', {
			top: window.innerHeight * 1.84 + (animatedScroll - window.innerHeight * 1.5) / 10 * 2,
			left: window.innerWidth * 0.12,
			rotate: -(animatedScroll / window.innerHeight * 1.5) * 12 + 12 - velocity * 0.4,
			duration: 1,
			ease: 'sine'
		})
		gsap.to('#shuttle', {
			top: window.innerHeight * 1.74 + (animatedScroll - window.innerHeight * 1.5) / 10 * 3,
			left: window.innerWidth * 0.24,
			rotate: -(animatedScroll / window.innerHeight * 1.5) * 24 + 24 + velocity * 0.2,
			duration: 1,
			ease: 'sine'
		})
		gsap.to('#testube', {
			top: window.innerHeight * 1.17 + (animatedScroll - window.innerHeight * 1.5) / 10 * 3,
			left: window.innerWidth * 0.28,
			rotate: -(animatedScroll / window.innerHeight * 1.5) * 18 + 18 + velocity,
			duration: 1,
			ease: 'sine'
		})
		gsap.to('#book', {
			top: window.innerHeight * 1.44 + (animatedScroll - window.innerHeight * 1.5) / 100 * 32,
			left: window.innerWidth * 0.04,
			rotate: -(animatedScroll / window.innerHeight * 1.5) * 18 + 18 + velocity * 0.2,
			duration: 1,
			ease: 'sine'
		})
	} else {
		gsap.to('#code', {
			top: window.innerHeight * 1.34 + (animatedScroll - window.innerHeight * 1.5) / 100 * 48,
			left: window.innerWidth * 0.65,
			rotate: (animatedScroll / window.innerHeight * 1.5) * 8 - 8 + velocity * 0.2,
			duration: 1,
			ease: 'sine'
		})
		gsap.to('#music', {
			top: window.innerHeight * 1.52 + (animatedScroll - window.innerHeight * 1.5) / 100 * 40,
			left: window.innerWidth * 0.32,
			rotate: -(animatedScroll / window.innerHeight * 1.5) * 16 + 16 + velocity * 0.1,
			duration: 1,
			ease: 'sine'
		})
		gsap.to('#stars', {
			top: window.innerHeight * 1.42 + (animatedScroll - window.innerHeight * 1.5) / 100 * 40,
			left: window.innerWidth * 0.48,
			rotate: -(animatedScroll / window.innerHeight * 1.5) * 12 + 12 - velocity * 0.4,
			duration: 1,
			ease: 'sine'
		})
		gsap.to('#shuttle', {
			top: window.innerHeight * 1.54 + (animatedScroll - window.innerHeight * 1.5) / 100 * 44,
			left: window.innerWidth * 0.84,
			rotate: -(animatedScroll / window.innerHeight * 1.5) * 24 + 24 + velocity * 0.2,
			duration: 1,
			ease: 'sine'
		})
		gsap.to('#testube', {
			top: window.innerHeight * 1.27 + (animatedScroll - window.innerHeight * 1.5) / 100 * 52,
			left: window.innerWidth * 0.28,
			rotate: -(animatedScroll / window.innerHeight * 1.5) * 18 + 18 + velocity,
			duration: 1,
			ease: 'sine'
		})
		gsap.to('#book', {
			top: window.innerHeight * 1.54 + (animatedScroll - window.innerHeight * 1.5) / 100 * 50,
			left: window.innerWidth * 0.04,
			rotate: -(animatedScroll / window.innerHeight * 1.5) * 18 + 18 + velocity * 0.2,
			duration: 1,
			ease: 'sine'
		})
	}

	requestAnimationFrame(raf);
	frame += 1;
}

requestAnimationFrame(raf)