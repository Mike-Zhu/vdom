interface element {
    tagName: string,
    props: object,
    children?: object[]
}

function Elements(tagName, props, children): void {
    this.tagName = tagName
    this.props = props
    this.children = children
}

export default function (tagName, props, children) {
    return new Elements(tagName, props, children)
}

Elements.prototype.render = function () {
    var $el = document.createElement(this.tagName)
    var props = this.props
    var children = this.children

    for (var propsName in props) {
        var propsValue = props[propsName]
        $el.setAttribute(propsName, propsValue)
    }
    children.forEach(function (child) {
        var childEl = child instanceof Elements
            ? child.render()
            : document.createTextNode(child)
        $el.appendChild(childEl)
    });
    return $el
}