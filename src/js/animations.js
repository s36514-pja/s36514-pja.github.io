import * as THREE from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'

let scene, camera, renderer, geometry, wireframe
let clock = new THREE.Timer()
let composer

function getCSSVariable(name) {
  return getComputedStyle(document.documentElement)
  .getPropertyValue(name)
  .trim()
}

export function initBackground() {
  const canvas = document.getElementById('bg-canvas')

  renderer = new THREE.WebGLRenderer({
    canvas,
    alpha:true,
    antialias: false,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(0.5)
    //, Math.min(window.devicePixelRatio, 2))

  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.set(0, 6, 40)
  camera.lookAt(0, 5, -40)

  geometry = new THREE.PlaneGeometry(
    200, 200,
    40, 40,
  )
  const accent = new THREE.Color(getCSSVariable('--accent'))
  const wireframeGeo = new THREE.WireframeGeometry(geometry)
  const material = new THREE.LineBasicMaterial({
    color: accent,
    transparent: true,
    opacity: 0.4
  })
  material.blending = THREE.NormalBlending
  material.depthWrite = false
  material.depthTest = true

  wireframe = new THREE.LineSegments(wireframeGeo, material)
  wireframe.rotation.x = -Math.PI / 2
  scene.add(wireframe)

  const renderPass = new RenderPass(scene, camera)

  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.4,
    1,
    0.1,
  )

  composer = new EffectComposer(renderer)
  composer.addPass(renderPass)
  composer.addPass(bloomPass)

  window.addEventListener('resize', onResize)
  animate()
}

function updateWave(time) {
  const positions = geometry.attributes.position
  for (let i = 0; i < positions.count; i++ ) {
    const x = positions.getX(i)
    const y = positions.getY(i)
    
    positions.setZ(i, Math.sin(x * 0.5 + time) * Math.cos(y * 0.5 + time))
  }
  positions.needsUpdate = true

  wireframe.geometry.dispose()
  wireframe.geometry = new THREE.WireframeGeometry(geometry)
}

function animate() {
  requestAnimationFrame(animate)
  clock.update()
  const time = clock.getElapsed()
  updateWave(time)
  composer.render()
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  composer.setSize(window.innerWidth, window.innerHeight)
}

export function updateWaveColor() {
  material.color.set(new THREE.Color(getCSSVariable('--accent')))
}

export function playWrongAnswer() {
  const keyLock = document.getElementById('key-lock')
  keyLock.classList.add('shake')
  keyLock.addEventListener('animationend', () => {
    keyLock.classList.remove('shake')
  }, { once: true })
}

export function rotationLock(answer) {
  const container = document.getElementById('lock-mechanism')
  container.innerHTML = ''

  Array.from(answer).forEach((letter, index) => {
    const block = document.createElement('div')
    block.classList.add('lock-block')
    block.textContent = letter.toUpperCase()
    block.style.animationDelay = `${index * 0.1}s`
    block.classList.add('active')
    container.appendChild(block)
  })
}

export function playTransition(answer, onComplete) {
  console.log(answer)
  rotationLock(answer)
  const blocks = document.querySelectorAll('.lock-block')
  const lastBlock = blocks[blocks.length - 1]
  const keyLock = document.getElementById('key-lock')
  const shackle = document.getElementById('lock-shackle')

  lastBlock.addEventListener('animationend', () => {
    if (shackle) {
      shackle.classList.add('open')
      shackle.addEventListener('transitionend', () => {
        keyLock.classList.add('fall')
          keyLock.addEventListener('animationend', () => {
            onComplete()
        }, { once: true })
      }, { once:true })
    } else {
      onComplete()
    }
  }, { once: true })
}
