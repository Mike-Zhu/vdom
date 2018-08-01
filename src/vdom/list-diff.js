const ADD = 1
const DELETE = 0
const REORDER = 2

export default function diff(oldList, newList, key) {
    const oldMap = makeKeyIndexAndFree(oldList, key),
        newMap = makeKeyIndexAndFree(newList, key),
        children = [],
        newKeyList = newMap.keyIndex,
        oldKeyList = oldMap.keyIndex,
        diffList = []

    let freeIndex = 0,
        newFreeList = newMap.free

    oldList.forEach(item => {
        let itemKey = getItemKey(item, key)
        if (itemKey) {
            var newIndex = newKeyList.indexOf(itemKey)
            children.push(
                newIndex >= 0
                    ? newList[newIndex]
                    : null
            )
        } else {
            children.push(newFreeList[freeIndex++] || null)
        }
    })
    //不变
    const oldSortList = oldKeyList.map(res => newKeyList.indexOf(res) >= 0 ? newKeyList.indexOf(res) : null)
    let i = 0,
        j = 0
    while (i < oldSortList.length) {
        if (oldSortList[i] === null) {
            diffList.push({
                index: i - j,
                type: DELETE//删除
            })
            j++
        }
        i++
    }
    let filterList = oldSortList.filter(res => res !== null)
    let k = 0
    while (k < filterList.length) {
        let oldIndex = filterList.indexOf(k)
        if (k !== oldIndex) {
            let insert = filterList.splice(oldIndex, 1)[0]
            filterList.splice(k, 0, insert)
            diffList.push({
                index: k,
                itemIndex: oldIndex,
                type: REORDER //换位置
            })
        }
        k++
    }
    let l = 0,
        newLength = newKeyList.length
    while (filterList.length < newLength) {
        if (filterList.indexOf(l) < 0) {
            filterList.push(l)
            diffList.push({
                index: k,
                item: newList[l],
                type: ADD //新增
            })
        }
        l++
    }
    return {
        children: children,
        moves: diffList
    }
}

function makeKeyIndexAndFree(list, key) {
    let keyIndex = [],
        free = []
    if (!Array.isArray(list)) {
        return {
            keyIndex,
            free
        }
    }
    list.forEach((item) => {
        let itemKey = getItemKey(item, key)
        if (itemKey) {
            keyIndex.push(itemKey)
        } else {
            free.push(item)
        }
    })
    return {
        keyIndex,
        free
    }
}

function getKey(list, key) {
    const pureList = Array.isArray(list) ? list.map(value => value.props || {}) : []
    return isFunction(key) ? pureList.map(key) : pureList.map(item => item[key || 'key'])
}

function getItemKey(item, key) {
    let props = item.props || {}
    return isFunction(key) ? key(props) : props[key || 'key']
}

function isFunction(data) {
    return toString.call(data) === "[object Function]"
}