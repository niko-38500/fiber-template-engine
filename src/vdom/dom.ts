export const createDom = (element: FiberType): HTMLElement|Text => {
    const dom = 'text' === element.type
        ? document.createTextNode(element.props.nodeValue)
        : document.createElement(element.type)
    ;

    Object.keys(element.props).forEach((props: string) => {
        dom instanceof HTMLElement && dom.setAttribute(props, element.props[props])
    })

    return dom;
}