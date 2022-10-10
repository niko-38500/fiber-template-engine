import {HTMLElement as NodeHTMLElement, parse, TextNode as ParserTextNode} from 'node-html-parser';
import ElementBuilder from './element.builder';

export class HtmlParser {
    parse(element: string): ElementType
    {
        const parsedHtml = parse(element, {
            lowerCaseTagName: false,
            comment: false,
            blockTextElements: {
                script: true,
                noscript: true,
                style: true,
                pre: true
            }
        });

        const
            children = this.getNodesWithoutWhiteSpace(parsedHtml),
            childElements: ElementType[] = []
        ;

        for (let child of children) {
            childElements.push(this.processNode(child))
        }

        return ElementBuilder.createElement('root', {}, ...childElements);
    }

    private getNodesWithoutWhiteSpace(node: NodeHTMLElement): NodeHTMLElement[]
    {
        const children = node.childNodes as NodeHTMLElement[];

        return children.filter((child: NodeHTMLElement|ParserTextNode) => {
            return !(child instanceof ParserTextNode && child.isWhitespace)
        })
    }

    private processNode(node: NodeHTMLElement): ElementType
    {
        const type = node.tagName ?? 'text'

        if (0 < node.childNodes.length) {
            return ElementBuilder.createElement(
                type,
                'text' === type ? {nodeValue: node.text} : node.attrs,
                ...this.processChildNode(this.getNodesWithoutWhiteSpace(node))
            );
        }

        return ElementBuilder.createElement(type, 'text' === type ? {nodeValue: node.text} : node.attrs);
    }

    private processChildNode(child: NodeHTMLElement[]): ElementType[]
    {
        const elements: ElementType[] = [];
        child.forEach((node: NodeHTMLElement) => {
            const type = node.tagName ?? 'text';
            const element = ElementBuilder.createElement(
                type,
                'text' === type ? {nodeValue: node.text} : node.attrs,
                ...this.processChildNode(this.getNodesWithoutWhiteSpace(node))
            );
            elements.push(element)
        })

        return elements
    }
}