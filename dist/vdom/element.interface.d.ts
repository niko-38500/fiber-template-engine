interface ElementInterface {
    type: string;
    props: {
        [key: string]: string;
    };
    children: this[];
}
