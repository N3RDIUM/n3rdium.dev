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
	"nerd-svg",
	"astro-svg",
	"dev-svg",
	"exp-svg",
	"comp-svg",
	"alive-svg",
]
var idx = 0;
var lastBgUpdate = 0;
for(let i = 0; i < backgrounds.length; i++) {
	anime({
		targets: '.' + backgrounds[i],
		opacity: 0,
		translateX: 0,
		translateY: 0,
		rotate: 0,
		duration: 0
	})
};

// https://stackoverflow.com/questions/18295825/determine-if-point-is-within-bounding-box
function doesPointCollide(p,box) {
    return !(p.x < box.left || p.x > box.right || p.y > box.bottom || p.y < box.top)
}

function updateBG() {
	for(let i = 0; i < backgrounds.length; i++) {
		if(i == idx) continue
		anime({
			targets: '.' + backgrounds[i],
			opacity: 0,
			translateX: 0,
			translateY: 0,
			rotate: 0,
			duration: 500,
			easing: 'easeInElastic'
		})
	};

	let elements = document.getElementsByClassName(backgrounds[idx]);
	for(let i = 0; i < elements.length; i++) {
		elements[i].id = backgrounds[idx] + i.toString();

		let randomX = elements[i].getAttribute('data-x');
		let randomY = elements[i].getAttribute('data-y');

		anime({
			targets: `#${elements[i].id}`,
			opacity: 1,
			translateX: randomX,
			translateY: randomY,
			rotate: elements[i].getAttribute('data-rot'),
			duration: Math.random() * 1000 + 1000,
			easing: 'easeOutElastic',
			delay: 500,
		})
	}

	lastBgUpdate = Date.now();
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

// Object timeline
var timeline = [];
var timestamps = [];
function rebuildTimeline() {
	timestamps = [
		-1,
		window.innerHeight,
		window.innerHeight + 10,
		window.innerHeight * 2
	]
	if(window.innerWidth > 1000) {
		timeline = [
			{
				x: -window.innerWidth / 4 - 128,
				y: -512,
				rot: 0,
				scale: 0,
				opacity: 0.5
			},
			{
				x: -window.innerWidth / 4 - 128,
				y: -window.innerHeight / 3 + 240,
				rot: -64,
				scale: 1,
				opacity: 1
			},
			{
				x: window.innerWidth / 8 + 128,
				y: window.innerHeight / 5 + 128,
				rot: -64,
				scale: 1,
				opacity: 1
			},
			{
				x: 0,
				y: window.innerHeight,
				rot: -64,
				scale: 1,
				opacity: 1
			}
		]
	} else {
		timeline = [
			{
				x: -window.innerWidth / 4,
				y: -512,
				rot: 0,
				scale: 0,
				opacity: 0.5
			},
			{
				x: -window.innerWidth / 2 + 12,
				y: -window.innerHeight / 3 + 240,
				rot: 64,
				scale: 1,
				opacity: 1
			},
			{
				x: window.innerWidth / 8 + 128,
				y: window.innerHeight / 5 + 128,
				rot: -64,
				scale: 1,
				opacity: 1
			},
			{
				x: 0,
				y: window.innerHeight,
				rot: -64,
				scale: 1,
				opacity: 1
			}
		]
	}
}
rebuildTimeline()

// Interpolate function
function lerp(a, b, t) {
	return a + (b - a) * t
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

	if (document.hasFocus()) {
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
	}

	if(window.innerWidth > 1000) {
		gsap.to('#portal1', {
			x: -window.innerWidth / 4 - 128,
			y: -window.innerHeight / 3 + 128,
			duration: 1
		})
		gsap.to('#portal2', {
			x: window.innerWidth / 8 + 128,
			y: window.innerHeight / 5 + 128,
			rotate: -160,
			duration: 1
		})
	} else {
		gsap.to('#portal1', {
			x: -window.innerWidth / 2 + 12,
			y: -window.innerHeight / 3 + 128,
			duration: 1
		})
		gsap.to('#portal2', {
			x: window.innerWidth / 8 + 128,
			y: window.innerHeight / 5 + 128,
			rotate: -160,
			duration: 1
		})
	}

	rebuildTimeline();
	let progress = animatedScroll % window.innerHeight / window.innerHeight;
	let index = 0;

	// match the timeline
	for(let i of timestamps) {
		if(animatedScroll > i) {
			index = timestamps.indexOf(i);
		}
	}

	// update the object
	if(index < timeline.length - 1) {
		gsap.to('#object', {
			x: lerp(timeline[index].x, timeline[index + 1].x, progress),
			y: lerp(timeline[index].y, timeline[index + 1].y, progress),
			rotate: lerp(timeline[index].rot, timeline[index + 1].rot, progress),
			scale: lerp(timeline[index].scale, timeline[index + 1].scale, progress),
			opacity: lerp(timeline[index].opacity, timeline[index + 1].opacity, progress),
			duration: 0
		})
	}

	requestAnimationFrame(raf);
	frame += 1;
}

requestAnimationFrame(raf)