import ReactSelectorQuery from './src/resq'
import { waitToLoadReact } from './src/waitToLoadReact'

function doQuery(selector, method = 'find', reactElement) {
    if (!global.isReactLoaded) {
        throw new Error('Could not find the root element of your application')
    }

    return new ReactSelectorQuery(selector, (reactElement && findReactComponent(reactElement)) || global.rootReactElement)[method]()
}

function findReactComponent(domNode) {
    const key = Object.keys(domNode).find(key => key.startsWith('__reactInternalInstance'))
    if (key) {
	    return domNode[key]
    } else {
	    throw new Error('No react component for this element')
    }
}

export function resq$(selector, reactElement) {
    return doQuery(selector, 'find', reactElement)
}

export function resq$$(selector, reactElement) {
    return doQuery(selector, 'findAll', reactElement)
}

export { waitToLoadReact }
