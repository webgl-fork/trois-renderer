import { Trois } from '../types'
import { Constants } from './constants'
import { pascalCase } from './lib'

let nodeId = 0

/**
 * Creates a new Trois.Element with the given options.
 * @returns New Trois.Element.
 */
export const createElement = (type: string, props: Trois.VNodeProps = {}) => {
    return {
        attached: {},
        attachedArray: {},
        childCreationQueue: [],
        children: [],
        domElement: null,
        eventListeners: {} as Record<Trois.EventKey, Trois.InteractionCallback[]>,
        eventListenerRemoveFunctions: {} as Record<Trois.EventKey, Function[]>,
        id: nodeId++,
        instance: null,
        instanceUuid: Constants.UNKNOWN.toString(),
        name: pascalCase(type),
        parentNode: null,
        props,
        type,
        vueId: Constants.UNKNOWN,
    } as Trois.Element
}