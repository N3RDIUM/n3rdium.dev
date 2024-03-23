// Imports / Plugins
import * as THREE from 'three';
import openSimplexNoise from 'opensimplex';
gsap.registerPlugin(ScrollTrigger);

// DOM stuff setup
const lenis = new Lenis();
var animatedScroll = 0;
lenis.on('scroll', function (scroll) {
    animatedScroll = scroll.animatedScroll;
    starAnimationFrame += scroll.velocity;
});
const canvas = document.querySelector('canvas');
const bloomCanvas = document.getElementById('bloomCanvas');
gsap.registerPlugin(ScrollTrigger);

// THREE.js stuff setup
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio( window.devicePixelRatio );
var bloomRenderer = new THREE.WebGLRenderer({ canvas: bloomCanvas });
bloomRenderer.setSize(window.innerWidth, window.innerHeight);
bloomRenderer.setPixelRatio( window.devicePixelRatio );
var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 32;

// Window resize callback
window.addEventListener('resize', onWindowResize, false );
function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    bloomRenderer.setSize( window.innerWidth, window.innerHeight );
};

// Mouse move callback
let mouseX = 0;
let mouseY = 0;
window.addEventListener('mousemove', onMouseMove, false);
function onMouseMove(e){
    mouseX = e.clientX;
    mouseY = e.clientY;

    gsap.to('.cursor', {
        x: mouseX - 34,
        y: mouseY - 34
    })
}

// Mouse button callback
window.addEventListener('mousedown', onMouseDown, false);
window.addEventListener('mouseup', onMouseUp, false);
function onMouseUp() {
    gsap.to('.cursor', {
        scale: 1,
        duration: 0.32
    })
}
function onMouseDown() {
    gsap.to('.cursor', {
        scale: 0.84,
        duration: 0.32
    })
}

// Lights
const ambientLight = new THREE.AmbientLight(0x000000, 1);
scene.add(ambientLight);

// Fog
const fog = new THREE.FogExp2(0x000000, 0.001);
scene.fog = fog;

// Other scene objects
const points = new THREE.Points();
const bufferGeometry = new THREE.BufferGeometry();
const starMtl = new THREE.PointsMaterial({
    color: 0xffffaa,
    size: 0.64,
});

points.geometry = bufferGeometry;
points.material = starMtl;
scene.add(points);

const noise = openSimplexNoise.makeNoise4D(Date.now());
function buildPoints() {
    const positions = [];
    for (let i = 0; i < 128; i++) {
        const x = noise(i + 10, i + 609, i + 420, starAnimationFrame / 10000) * 128;
        const z = noise(i + 200, i + 400, i + 790, starAnimationFrame / 10000) * 128;
        const y = noise(i + 100, i + 690, i + 380, starAnimationFrame / 10000) * 128;
        positions.push(x, y, z);
    }
    bufferGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
}

// Animations
anime({
    targets: '.username',
    backgroundPosition: `56vw 0`,
    duration: 4000,
    easing: 'linear',
    loop: true
});
anime({
    targets: '.uletter',
    opacity: 1,
    delay: anime.stagger(128),
    duration: 4000,
    easing: 'easeInOutCirc'
});
anime({
    targets: '.avatarContainer',
    opacity: 1,
    duration: 4000,
    easing: 'easeOutQuint'
});
anime({
    targets: '.scrollIndicatorContainer',
    opacity: 1,
    duration: 4000,
    delay: 4000,
    easing: 'easeOutQuad'
});


ScrollTrigger.create({
    trigger: "#c1",
    start: "top top",
    end: "+=100%",
    onUpdate: (self) => {
        gsap.to(".username", {
            opacity: 1 - self.progress.toFixed(3),
            filter: `blur(${self.progress.toFixed(3) * 8}px)`
        });
        gsap.to(".avatar", {
            opacity: 1 - self.progress.toFixed(3),
            filter: `blur(${self.progress.toFixed(3) * 8}px)`
        });
        gsap.to(".scrollIndicatorContainer", {
            opacity: 1 - self.progress.toFixed(3),
            filter: `blur(${self.progress.toFixed(3) * 8}px)`
        });
    },
});

// Mainloop
var frame = 0;
var starAnimationFrame = 0;
function animate(time) {
    lenis.raf(time);
    requestAnimationFrame(animate);
    frame ++;
    starAnimationFrame ++;
    buildPoints()

    renderer.render(scene, camera);
    bloomRenderer.render(scene, camera);
}
animate();