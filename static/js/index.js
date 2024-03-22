// Imports / Plugins
import * as THREE from 'three'
import enableBloom from 'bloom'
import openSimplexNoise from 'opensimplex'
gsap.registerPlugin(ScrollTrigger)

// DOM stuff setup
const lenis = new Lenis()
let animatedScroll = 0
lenis.on('scroll', function (scroll) {
  animatedScroll = scroll.animatedScroll
  starAnimationFrame += Math.abs(scroll.velocity)
})
const canvas = document.querySelector('canvas')

// THREE.js stuff setup
const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 32

// Bloom stuff
const {
  render, materials, BLOOM_SCENE, bloomComposer, finalComposer
} = enableBloom(scene, camera, renderer)

// Window resize callback
window.addEventListener('resize', onWindowResize, false)
function onWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  bloomComposer.setSize(window.innerWidth, window.innerHeight)
  finalComposer.setSize(window.innerWidth, window.innerHeight)
};

// Lights
const ambientLight = new THREE.AmbientLight(0x000000, 1)
scene.add(ambientLight)

// Fog
const fog = new THREE.FogExp2(0x000000, 0)
scene.fog = fog

// Other scene objects
const points = new THREE.Points()
const bufferGeometry = new THREE.BufferGeometry()
const starMtl = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.64
})

points.geometry = bufferGeometry
points.material = starMtl
scene.add(points)
points.layers.enable(BLOOM_SCENE)
materials[points.uuid] = starMtl

const noise = openSimplexNoise.makeNoise4D(Date.now())
function buildPoints () {
  const positions = []
  for (let i = 0; i < 512; i++) {
    const x = noise(i + 10, i + 609, i + 420, starAnimationFrame / 10000) * 512
    const y = noise(i + 100, i + 690, i + 380, starAnimationFrame / 10000) * 512
    const z = noise(i + 200, i + 400, i + 790, starAnimationFrame / 10000) * 512
    positions.push(x, y, z)
  }
  bufferGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
}

// anime.js
anime({
  targets: '.username',
  backgroundPosition: '56vw 0',
  duration: 4000,
  easing: 'linear',
  loop: true
})
anime({
  targets: '.uletter',
  opacity: 1,
  delay: anime.stagger(128),
  duration: 4000,
  translateX: 270,
  easing: 'easeInOutCirc'
})

// Mainloop
let frame = 0
var starAnimationFrame = 0
function animate (time) {
  lenis.raf(time)
  requestAnimationFrame(animate)
  frame++
  starAnimationFrame++
  buildPoints()

  render()
}
animate()
