import { findReactRoot } from './utils'

export function waitToLoadReact(timeout = 5000, rootElSelector) {
    if (global.isReactLoaded) {
        return Promise.resolve('React already loaded')
    }

    return new Promise((resolve, reject) => {
        let timedout = false

        const tryToFindApp = () => {
            const reactRoot = findReactRoot(rootElSelector)

            if (reactRoot) {
                global.isReactLoaded = true
                global.rootReactElement = reactRoot._reactRootContainer._internalRoot.current
                return resolve()
            }
            /* istanbul ignore next */
            if (timedout) {
                return
            }

            setTimeout(tryToFindApp, 200)
        }

        tryToFindApp()

        /* istanbul ignore next */
        setTimeout(() => {
            timedout = true

            reject('Timed out')
        }, timeout)
    })
}
