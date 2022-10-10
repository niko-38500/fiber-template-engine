export default class ElementBuilder {
    static createElement(type: string, props: {
        [key: string]: string;
    }, ...children: ElementType[]): ElementType;
    private static createTextElement;
}
