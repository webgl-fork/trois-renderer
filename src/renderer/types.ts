import { RendererNode, VNodeProps } from '@vue/runtime-core'


export type TroisNode = RendererNode & {
    vnodeProps?: (VNodeProps & {
        [key: string]: any;
    } | null | undefined) & {
        $target?: THREE.Object3D | null
    }
}