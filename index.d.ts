type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

declare module 'resq' {
    interface ReactSelectorQueryTreeNode {
        name: string | undefined
        children: Array<ReactSelectorQueryTreeNode>
        props: any
        state: any
        node: HTMLElement
    }

    class ReactSelectorQueryNodes extends Array {
        constructor(nodes: Array<ReactSelectorQueryTreeNode>)
        public byProps<P extends Object>(props: P): ReactSelectorQueryNodes
        public byState<S extends Object>(props: S): ReactSelectorQueryNodes
    }

    class ReactSelectorQueryNode extends Object {
        constructor(item: ReactSelectorQueryTreeNode, nodes: Array<ReactSelectorQueryTreeNode>)
        public byProps<P extends Object>(props: P): ReactSelectorQueryNode
        public byState<S extends Object>(props: S): ReactSelectorQueryNode
    }

    class ReactSelectorQuery {
        private selectors: Array<string>
        private rootComponent: HTMLElement
        private tree: ReactSelectorQueryTreeNode
        private nodes?: Array<ReactSelectorQueryTreeNode>

        constructor(selector: string, root: HTMLElement)
        public find: () => ReactSelectorQueryNode
        public findAll: () => ReactSelectorQueryNodes
    }

    function resq$(selector: string): Promise<ReactSelectorQuery>
    function resq$$(selector: string): Promise<ReactSelectorQuery>
    function getElementType(element: ReactSelectorQueryTreeNode): string;
    function verifyIfArgs<A1 extends Array<any>, A2 extends Array<any>>(arr1: A1, arr2: A2): boolean;
    function match<M extends Object, V extends Object>(matcher: M, verify: V): boolean;
    function removeChildrenFromProps<P extends { children: any }>(props: P): string | Omit<P, 'children'>;
    function getElementState<S>(elementState: S): {} | S;
    function buildNodeTree(element: Object): ReactSelectorQueryTreeNode;
}
