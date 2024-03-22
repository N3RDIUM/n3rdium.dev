// Imports / Plugins
import * as THREE from 'three'
import enableBloom from 'bloom'
import openSimplexNoise from 'opensimplex'
gsap.registerPlugin(ScrollTrigger)

// DOM stuff setup
const lenis = new Lenis()
let animatedScroll = 0
lenis.on('scroll', function (scroll) { animatedScroll = scroll.animatedScroll })
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

// GSAP Timeline(s)
const trigger1 = ScrollTrigger.create({
  trigger: '#c2',
  start: 'top bottom',
  endTrigger: '#c2',
  end: 'top middle',
  scrub: true,
  onUpdate: (self) => {
    const progress = self.progress.toFixed(3)
    try {
      gsap.to(
        camera.rotation,
        {
          x: Math.PI / 4 - (Math.PI / 4 * progress),
          y: Math.PI / 2 - (Math.PI / 2 * progress),
          z: Math.PI / 3 - (Math.PI / 3 * progress)
        }
      )
      gsap.to(
        camera.position,
        {
          x: -32 + 32 * progress,
          y: 32 - 32 * progress,
          z: 32 - 24 * progress
        }
      )
      gsap.to(
        scene.fog,
        {
          density: 0.008 * progress
        }
      )
      gsap.to(
        bloomPass,
        {
          strength: 0.64 - 0.32 * progress,
          radius: 0.1 + 0.7 * progress
        }
      )
    } catch (e) {}
  }
})

// Lights
const ambientLight = new THREE.AmbientLight(0x000000, 1)
scene.add(ambientLight)

// Stars
const points = new THREE.Points()
const bufferGeometry = new THREE.BufferGeometry()
const starMtl = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.64
})
const positions = []
const colors = []
for (let i = 0; i < 16384; i++) {
  const x = Math.random() * 1000 - 500
  const y = Math.random() * 1000 - 500
  const z = Math.random() * 1000 - 500
  positions.push(x, y, z)
  colors.push(
    Math.abs(Math.random() - 0.5),
    Math.abs(Math.random() - 0.5),
    Math.abs(Math.random() - 0.5)
  )
}
bufferGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
bufferGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
points.geometry = bufferGeometry
points.material = starMtl
scene.add(points)

points.layers.enable(BLOOM_SCENE)
materials[points.uuid] = starMtl

// Fog
const fog = new THREE.FogExp2(0x000000, 0)
scene.fog = fog

// sphere thing
const geometry = new THREE.SphereGeometry(1, 64, 32)
const material = new THREE.MeshNormalMaterial()
const sphere = new THREE.Mesh(geometry, material)
sphere.position.set(0, 0, 0)
scene.add(sphere)
sphere.layers.enable(BLOOM_SCENE)
materials[sphere.uuid] = material

// Noise
const noise = openSimplexNoise.makeNoise4D(Date.now())
const sphereGeometry = sphere.geometry
sphereGeometry.positionData = []
const v3 = new THREE.Vector3()
for (let i = 0; i < sphereGeometry.attributes.position.count; i++) {
  v3.fromBufferAttribute(sphereGeometry.attributes.position, i)
  sphereGeometry.positionData.push(v3.clone())
}

// Camera rotation
document.addEventListener('mousemove', (e) => {
  if (animatedScroll > window.innerHeight / 2 && animatedScroll < window.innerHeight * 1.5) {
    gsap.to(
      camera.rotation,
      {
        x: (e.clientY - window.innerHeight / 2) / window.innerHeight * Math.PI / 16,
        y: (e.clientX - window.innerWidth / 2) / window.innerWidth * Math.PI / 16
      }
    )
    gsap.to(
      camera.position,
      {
        y: -(e.clientY - window.innerHeight / 2) / window.innerHeight * 2,
        x: (e.clientX - window.innerWidth / 2) / window.innerWidth * 2
      }
    )
  }
})

// Mainloop
let frame = 0
function animate (time) {
  lenis.raf(time)
  requestAnimationFrame(animate)
  frame += 1

  // Move points of the sphere with perlin noise
  sphereGeometry.positionData.forEach((p, idx) => {
    const setNoise = noise(p.x, p.y, p.z, frame / 100) / 4
    v3.copy(p).addScaledVector(p, setNoise)
    sphereGeometry.attributes.position.setXYZ(idx, v3.x, v3.y, v3.z)
  })
  sphereGeometry.computeVertexNormals()
  sphereGeometry.attributes.position.needsUpdate = true
  sphere.rotation.y += 0.001
  sphere.rotation.z += 0.001
  sphere.rotation.x += 0.001

  render()
}
animate()
