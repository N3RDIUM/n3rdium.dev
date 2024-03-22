import * as THREE from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js'
import { FXAAShader } from 'three/addons/shaders/FXAAShader.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'

export default function enableBloom (scene, camera, renderer) {
  const BLOOM_SCENE = 1
  const bloomLayer = new THREE.Layers()
  bloomLayer.set(BLOOM_SCENE)

  const darkMaterial = new THREE.MeshBasicMaterial({ color: 'black' })
  const materials = {}

  const params = {
    threshold: 0,
    strength: 0.32,
    radius: 0.1,
    exposure: 0.01
  }

  const renderScene = new RenderPass(scene, camera)

  const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85)
  bloomPass.threshold = params.threshold
  bloomPass.strength = params.strength
  bloomPass.radius = params.radius

  const bloomComposer = new EffectComposer(renderer)
  bloomComposer.renderToScreen = false
  bloomComposer.addPass(renderScene)
  bloomComposer.addPass(bloomPass)

  const mixPass = new ShaderPass(
    new THREE.ShaderMaterial({
      uniforms: {
        baseTexture: { value: null },
        bloomTexture: { value: bloomComposer.renderTarget2.texture }
      },
      vertexShader: document.getElementById('vertexshader').textContent,
      fragmentShader: document.getElementById('fragmentshader').textContent,
      defines: {}
    }), 'baseTexture'
  )
  mixPass.needsSwap = true

  const outputPass = new OutputPass()
  const fxaaPass = new ShaderPass(FXAAShader)

  const finalComposer = new EffectComposer(renderer)
  finalComposer.addPass(renderScene)
  finalComposer.addPass(fxaaPass)
  finalComposer.addPass(mixPass)
  finalComposer.addPass(outputPass)

  function render () {
    scene.traverse(darkenNonBloomed)
    bloomComposer.render()
    scene.traverse(restoreMaterial)
    // render the entire scene, then render bloom scene on top
    finalComposer.render()
  }

  function darkenNonBloomed (obj) {
    if (obj.isMesh && bloomLayer.test(obj.layers) === false) {
      materials[obj.uuid] = obj.material
      obj.material = darkMaterial
    }
  }

  function restoreMaterial (obj) {
    if (materials[obj.uuid]) {
      obj.material = materials[obj.uuid]
      delete materials[obj.uuid]
    }
  }

  return {
    render,
    materials,
    BLOOM_SCENE,
    bloomComposer,
    finalComposer
  }
}
