export declare class Fiber {
    private nextUnitOfWork;
    private workInProgressFiber;
    constructor();
    render(element: ElementType, container: HTMLElement): void;
    private commitRoot;
    private commitWork;
    private performUnitOfWork;
    private workLoop;
}
