import {UnitOfWork} from '../unitOfWork/unitOfWork';

export class Fiber {
    private unitOfWork: UnitOfWork;

    constructor() {
        this.unitOfWork = new UnitOfWork();
    }

    render(element: ElementType, container: HTMLElement): void
    {
        this.unitOfWork.workInProgressFiber = {
            type: 'root',
            domElement: container,
            children: element.children,
            props: {}
        };
        this.unitOfWork.nextUnitOfWork = this.unitOfWork.workInProgressFiber;
    }
}