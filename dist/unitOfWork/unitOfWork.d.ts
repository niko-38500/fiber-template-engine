export declare class UnitOfWork {
    nextUnitOfWork: undefined | FiberType;
    workInProgressFiber: FiberType | undefined;
    constructor();
    private commitRoot;
    private commitWork;
    private performUnitOfWork;
    private workLoop;
}
