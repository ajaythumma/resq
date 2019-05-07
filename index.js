import ReactSelectorQuery from './src/resq'
import { waitToLoadReact } from './src/waitToLoadReact'
import { findReactRoot } from './src/utils'

function doQuery(selector, method = 'find') {
    if (!global.isReactLoaded) {
        throw new Error('Could not find the root element of your application')
    }
    const reactRoot = findReactRoot()

    if (reactRoot) {
        global.rootReactElement = reactRoot._reactRootContainer._internalRoot.current
    }

    return new ReactSelectorQuery(selector, global.rootReactElement)[method]()
}

export function resq$(selector) {
    return doQuery(selector)
}

export function resq$$(selector) {
    return doQuery(selector, 'findAll')
}

export { waitToLoadReact }
