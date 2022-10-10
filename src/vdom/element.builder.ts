export default class ElementBuilder {
    public static createElement(
        type: string,
        props: {[key: string]: string},
        ...children: ElementType[]
    ): ElementType {
        return {
            type,
            props: {
                ...props
            },
            children: children.map((child: ElementType): any => {
                return child.type === 'text' ? ElementBuilder.createTextElement(child.props.nodeValue) : child
            })
        };
    }

    private static createTextElement(text: string): ElementType
    {
        return {
            type: 'text',
            props: {
                nodeValue: text
            },
            children: []
        }
    }
}