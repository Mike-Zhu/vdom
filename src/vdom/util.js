export default {
    type(obj) {
        return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, '')
    },

    isArray(list) {
        return _.type(list) === 'Array'
    },

    slice(arrayLike, index) {
        return Array.prototype.slice.call(arrayLike, index)
    },

    truthy(value) {
        return !!value
    },

    isString(list) {
        return this.type(list) === 'String'
    },

    each(array, fn) {
        for (var i = 0, len = array.length; i < len; i++) {
            fn(array[i], i)
        }
    },

    toArray(listLike) {
        if (!listLike) {
            return []
        }

        var list = []

        for (var i = 0, len = listLike.length; i < len; i++) {
            list.push(listLike[i])
        }

        return list
    },

    setAttr(node, key, value) {
        switch (key) {
            case 'style':
                node.style.cssText = value
                break
            case 'value':
                var tagName = node.tagName || ''
                tagName = tagName.toLowerCase()
                if (
                    tagName === 'input' || tagName === 'textarea'
                ) {
                    node.value = value
                } else {
                    // if it is not a input or textarea, use `setAttribute` to set
                    node.setAttribute(key, value)
                }
                break
            default:
                node.setAttribute(key, value)
                break
        }
    }
}