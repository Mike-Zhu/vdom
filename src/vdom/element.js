import _ from './util'

export default function Element(tagName, props, children) {
    if (!(this instanceof Element)) {
        return new Element(tagName, props, children)
    }
    if (Array.isArray(props)) {
        children = props
        props = {}
    }

    this.tagName = tagName
    this.props = props || {}
    this.children = children || []
    this.key = props
        ? props.key
        : void 666

    var count = 0
    this.children.forEach((child, i) => {
        if (child instanceof Element) {
            count += child.count
        } else {
            children[i] = '' + child
        }
        count++
    })
    this.count = count
}

Element.prototype.render = function () {
    var $el = document.createElement(this.tagName)
    var props = this.props
    var children = this.children

    for (var propsName in props) {
        var propsValue = props[propsName]
        $el.setAttribute(propsName, propsValue)
    }
    children.forEach(function (child) {
        var childEl = child instanceof Element
            ? child.render()
            : document.createTextNode(child)
        $el.appendChild(childEl)
    });
    return $el
}