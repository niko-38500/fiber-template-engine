interface FiberType {
    type: string;
    domElement?: HTMLElement | Text;
    props: {
        [key: string]: string;
    };
    sibling?: FiberType;
    parent?: FiberType;
    children: FiberType[];
    firstChild?: FiberType;
}
