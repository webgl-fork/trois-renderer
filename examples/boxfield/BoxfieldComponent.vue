<template>
    <points ref="points" :args="['$attached.geometry', '$attached.material']">
        <bufferGeometry @ready="geoReady" />

        <pointsMaterial
            :args="[
                {
                    color: 0xffffff,
                    size,
                    blending: AdditiveBlending,
                    transparent: true,
                    opacity,
                },
            ]"
        />
    </points>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Trois } from '../../src/renderer/types'
import { AdditiveBlending, Float32BufferAttribute, MathUtils } from 'three'
import OrbitControlsWrapper from '../../src/examples/OrbitControlsWrapper.vue'

export default defineComponent({
    components: { OrbitControlsWrapper },
    props: {
        count: { type: Number, default: 10000 },
        opacity: { type: Number, default: 0.35 },
        size: { type: Number, default: 0.2 },
    },
    data() {
        return {
            AdditiveBlending,
        }
    },
    methods: {
        geoReady({ instance }: { instance: Trois.Instance }) {
            const count = this.count
            const spread = 3
            const verts: Array<number> = []
            const colors: Array<number> = []
            for (let i = 0; i < count; i++) {
                verts.push(
                    MathUtils.randFloatSpread(spread),
                    MathUtils.randFloatSpread(spread),
                    MathUtils.randFloatSpread(spread)
                )
                colors.push(1, 1, 1)
            }
            instance.setAttribute(
                'position',
                new Float32BufferAttribute(verts, 3)
            )
            instance.setAttribute(
                'color',
                new Float32BufferAttribute(colors, 3)
            )
            this.update()
        },
        update() {
            requestAnimationFrame(this.update)
            const points = (this.$refs.points as any)?.$el.instance
            if (!points) return

            points.rotation.y -= 0.005
            const h = (Math.sin(Date.now() * 0.0005) + 1) / 2
            points.material.color.setHSL(h, 0.7, 0.1)
        },
    },
})
</script>