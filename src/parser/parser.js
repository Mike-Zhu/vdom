import el from '../vdom/element'

export default function transformFromTemplateToEl(template) {
    const divDom = document.createElement('div')
    divDom.innerHTML = template
    const liDom = divDom.childNodes[1]
    var liTree = getDomtree(liDom)
    let elDom = getElDom(liTree)
    return elDom
}

function getDomtree(node) {
    var tagName = node.tagName,
        attrs = node.attributes,
        childNodes = node.childNodes,
        value = node.value || node.innerHTML || ''
    tagName = tagName ? tagName.toLowerCase() : 'text'
    var props = {}
    for (var index in attrs) {
        if (attrs.hasOwnProperty(index)) {
            var propKey = attrs[index].name,
                value = attrs[index].value
            if (propKey === 'style') {
                props[propKey] = value
            } else {
                props[propKey] = value
            }
        }
    }
    var element = {
        tagName: tagName,
        props: props,
        children: []
    }
    node.cache = node.cache || {}
    node.cache.$el = element
    if (childNodes) {
        for (let i = 0; i < childNodes.length; i++) {
            if (childNodes[i].nodeType !== 3) {
                element.children.push(getDomtree(childNodes[i]))
            } else {
                childNodes[i].data.trim() && element.children.push(childNodes[i].data)
            }
        }
    } else {
        element.children.push('')
    }
    return element
}

function getElDom(liDom) {
    var { tagName, props, children } = liDom
    if (typeof liDom === 'string' || typeof liDom === 'number') {
        return liDom
    }
    return el(tagName, props, children ? children.map(getElDom) : [''])
}