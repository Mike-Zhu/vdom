import _ from './util'
function Elements(tagName, props, children) {
    this.tagName = tagName
    this.props = props
    this.children = children
}

export default function (tagName, props, children) {
    if (!(this instanceof Element)) {
        if (!_.isArray(children) && children != null) {
            children = _.slice(arguments, 2).filter(_.truthy)
        }
        return new Elements(tagName, props, children)
    }
    if (_.isArray(props)) {
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

    _.each(this.children, function (child, i) {
        if (child instanceof Element) {
            count += child.count
        } else {
            children[i] = '' + child
        }
        count++
    })

    this.count = count
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