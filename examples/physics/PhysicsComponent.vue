<template>
    <group>
        <!-- lighting -->
        <ambientLight color="#505050" />
        <spotLight
            color="peachpuff"
            :shadow-mapSize-width="2048"
            :shadow-mapSize-height="2048"
            :intensity="0.5"
            :castShadow="true"
            :position-y="5"
        />

        <group>
            <!-- ball -->
            <mesh
                ref="sphere"
                :position-y="posY"
                :castShadow="true"
                @pointer-down="jump"
                @pointer-enter="ballColor = 'tomato'"
                @pointer-leave="ballColor = 'white'"
            >
                <icosahedronGeometry :args="[radius, 6]" />
                <meshPhongMaterial :color="ballColor" />
            </mesh>

            <!-- ground -->
            <mesh :rotation-x="Math.PI * -0.5" :receiveShadow="true">
                <planeBufferGeometry :args="[2, 2]" />
                <meshPhongMaterial />
            </mesh>
        </group>
    </group>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { addBeforeRender, removeBeforeRender } from '../../src/renderer'
import * as CANNON from 'cannon-es'
import { Vector3 } from 'three'

let world: CANNON.World
let sphereBody: CANNON.Body

export default defineComponent({
    mounted() {
        this.setupPhysics()
        addBeforeRender(this.update)
    },
    beforeUnmount() {
        removeBeforeRender(this.update)
    },
    setup() {
        const radius = 0.3
        const posY = 0
        const restitution = 0.7

        return {
            radius,
            posY,
            restitution,
            lastTime: ref(Date.now()),
            ballColor: ref('white'),
        }
    },
    methods: {
        setupPhysics() {
            // create world
            world = new CANNON.World({ gravity: new CANNON.Vec3(0, -9.82, 0) })

            // add sphere
            sphereBody = new CANNON.Body({
                mass: 1,
                shape: new CANNON.Sphere(this.radius),
                material: new CANNON.Material({
                    restitution: this.restitution,
                }),
            })
            world.addBody(sphereBody)

            // add ground
            const groundBody = new CANNON.Body({
                type: CANNON.Body.STATIC,
                shape: new CANNON.Plane(),
                material: new CANNON.Material({
                    restitution: this.restitution,
                }),
            })
            groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0) // make it face up
            world.addBody(groundBody)
        },
        update() {
            const delta = Date.now() * 0.001 - this.lastTime
            this.lastTime = Date.now() * 0.001
            world.step(1 / 60, delta)

            const sphere = this.$refs.sphere as any
            if (!sphere) return
            const instance = sphere.instance as THREE.Mesh
            instance.position.copy(sphereBody.position as any)
            instance.quaternion.copy(sphereBody.quaternion as any)
        },
        jump() {
            if (!sphereBody) return

            if (sphereBody.velocity.y < 0) {
                sphereBody.velocity.set(0, 0, 0)
            }
            sphereBody.applyImpulse(new CANNON.Vec3(0, 4, 0))
        },
    },
})
</script>
