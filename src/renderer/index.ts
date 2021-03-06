import { createRenderer, Component } from 'vue'
import { components, extend } from './components/components'
import { Trois } from './types'
import { nodeOps } from './nodeOps'
// import { version } from '../../package.json'

// console.log(`v${version}`)

// export const troisRenderer: RootRenderFunction<Trois.Element> = createRenderer(nodeOps).render

export const createApp = ((root: Component) => {
    const app = createRenderer(nodeOps).createApp(root) as Trois.TroisApp

    // register all components
    Object.keys(components).forEach(key => {
        app.component(key, (components as any)[key])
    })

    // update mount function to match Trois.Node
    const { mount } = app
    app.mount = (root, ...args) => {
        const domElement = (typeof root === 'string' ? document.querySelector(root) : root) as HTMLElement
        const mounted = mount({ domElement } as any, ...args)
        return mounted
    }

    // embed .extend function
    app.extend = (targets: Record<string, any>) => {
        extend({ app, ...targets })
    }

    // done
    return app
})

export { extend } from './components/components'
export { useTrois } from './trois/useThree'
export * from './trois/useThree'
