import { reactive, toRefs } from "@vue/reactivity"
import { Trois } from './types'
import * as THREE from 'three'
import { isNumber } from 'lodash'

export let scene: THREE.Scene = new THREE.Scene()
export let renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer()

export const initTrois = (sceneOptions: Trois.SceneOptions) => {
    if (troisInternals.initialized) return

    troisInternals.initialized = true

    // build camera
    // TODO: more robust
    const camera = troisInternals.camera = new THREE.PerspectiveCamera(45, 0.5625, 1, 1000)
    const pos = sceneOptions.cameraPosition
    const cameraPos = (Array.isArray(pos) ? pos : [pos.x, pos.y, pos.z]) as [number, number, number]
    troisInternals.camera.position.set.apply(troisInternals.camera.position, cameraPos)

    // build scene
    // TODO: more robust
    scene = troisInternals.scene = new THREE.Scene()
    if (typeof sceneOptions.background === 'string' || isNumber(sceneOptions.background)) {
        troisInternals.scene.background = troisInternals.scene.background ?? new THREE.Color()
            ; (troisInternals.scene.background as THREE.Color).set(sceneOptions.background)
    }

    // build renderer
    // TODO: more robust
    renderer = troisInternals.renderer = new THREE.WebGLRenderer({
        antialias: sceneOptions.antialias
    })
    troisInternals.renderer.setSize(window.innerWidth, window.innerHeight)

    // build update loop
    // TODO: more robust
    const update = () => {
        requestAnimationFrame(update)
        renderer.render(scene, camera)
    }
    update()
}

const troisInternals = reactive<Trois.Internals>({
    initialized: false,
    renderer: null,
    scene: null,
    camera: null,
    size: {
        width: 0,
        height: 0,
    },
    // app: null,
    raycaster: null,
})

export const useTrois = () => {
    return toRefs(troisInternals)
}

