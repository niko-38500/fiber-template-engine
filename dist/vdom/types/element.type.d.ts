interface ElementType {
    type: string;
    props: {
        [key: string]: string;
    };
    children: ElementType[];
}
