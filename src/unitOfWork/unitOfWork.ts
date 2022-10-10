import {createDom} from '../vdom/dom';

export class UnitOfWork {
    nextUnitOfWork: undefined|FiberType = undefined;
    workInProgressFiber: FiberType|undefined;

    constructor() {
        requestIdleCallback(this.workLoop.bind(this));
    }

    private commitRoot(): void
    {
        this.commitWork(this.workInProgressFiber!.firstChild!)
        this.workInProgressFiber = undefined;
    }

    private commitWork(fiber?: FiberType): void
    {
        if (!fiber) {
            return;
        }

        const domParent = fiber.parent!.domElement;
        domParent?.appendChild(fiber.domElement!);
        this.commitWork(fiber.firstChild);
        this.commitWork(fiber.sibling);
    }

    private performUnitOfWork(fiber: FiberType): FiberType|undefined
    {
        if (!fiber.domElement) {
            fiber.domElement = createDom(fiber);
        }

        let previousSibling: FiberType|undefined;

        fiber.children.forEach((children: ElementType, key: number) => {
            const newFiber: FiberType = {
                type: children.type,
                props: children.props,
                children: children.children,
                parent: fiber,
                domElement: undefined
            }

            if (0 === key) {
                fiber.firstChild = newFiber;
            } else if (previousSibling) {
                previousSibling.sibling = newFiber
            }

            previousSibling = newFiber;
        })

        if (fiber.firstChild) {
            return fiber.firstChild;
        }

        let nextFiber: FiberType = fiber;

        while (nextFiber) {
            if (nextFiber.sibling) {
                return nextFiber.sibling;
            }

            nextFiber = nextFiber.parent!;
        }
    }

    private workLoop(deadline: IdleDeadline): void
    {
        let shouldYield = false;

        while(this.nextUnitOfWork && !shouldYield) {
            this.nextUnitOfWork = this.performUnitOfWork(this.nextUnitOfWork!);

            if (!this.nextUnitOfWork && this.workInProgressFiber) {
                this.commitRoot();
            }

            shouldYield = deadline.timeRemaining() < 1;
        }
        requestIdleCallback(this.workLoop.bind(this))
    }
}





// import {createDom} from '../vdom/dom';

/*
let nextUnitOfWork: undefined|FiberType = undefined;
let workInProgressFiber: FiberType|undefined;

export function render(element: ElementType, container: HTMLElement): void
{
    workInProgressFiber = {
        type: 'root',
        domElement: container,
        children: element.children,
        props: {}
    };
    nextUnitOfWork = workInProgressFiber;
}

function commitRoot(): void
{
    commitWork(workInProgressFiber!.firstChild!)
    workInProgressFiber = undefined;
}

function commitWork(fiber?: FiberType): void
{
    if (!fiber) {
        return;
    }

    const domParent = fiber.parent!.domElement;
    domParent?.appendChild(fiber.domElement!);
    commitWork(fiber.firstChild);
    commitWork(fiber.sibling);
}

function performUnitOfWork(fiber: FiberType): FiberType|undefined
{
    if (!fiber.domElement) {
        fiber.domElement = createDom(fiber);
    }

    let previousSibling: FiberType|undefined;

    fiber.children.forEach((children: ElementType, key: number) => {
        const newFiber: FiberType = {
            type: children.type,
            props: children.props,
            children: children.children,
            parent: fiber,
            domElement: undefined
        }

        if (0 === key) {
            fiber.firstChild = newFiber;
        } else if (previousSibling) {
            previousSibling.sibling = newFiber
        }

        previousSibling = newFiber;
    })

    if (fiber.firstChild) {
        return fiber.firstChild;
    }

    let nextFiber: FiberType = fiber;

    while (nextFiber) {
        if (nextFiber.sibling) {
            return nextFiber.sibling;
        }

        nextFiber = nextFiber.parent!;
    }
}

function workLoop(deadline: IdleDeadline): void
{
    let shouldYield = false;

    while(nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork!);

        if (!nextUnitOfWork && workInProgressFiber) {
            commitRoot();
        }

        shouldYield = deadline.timeRemaining() < 1;
    }
    requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop);*/
