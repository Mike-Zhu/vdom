import _ from './util'
import listDiff from './list-diff'
//替换掉原来的节点，例如把上面的div换成了section
//移动、删除、新增子节点，例如上面div的子节点，把p和ul顺序互换
//修改了节点的属性
//对于文本节点，文本内容可能会改变。例如修改上面的文本节点2内容为Virtual DOM 2。
var REPLACE = 0
var REORDER = 1
var PROPS = 2
var TEXT = 3


export default function diff(oldTree, newTree) {
    var index = 0//记录点
    var patches = {} //节点差异
    dfsWalk(oldTree, newTree, index, patches)
    return patches
}

function dfsWalk(oldNode, newNode, index, patches) {
    var currentPatch = []
    if (newNode === null) {
        //do nothing
    } else if (_.isString(newNode) && _.isString(oldNode)) {
        if (newNode !== oldNode) {
            currentPatch.push({
                type: TEXT,
                content: newNode
            })
        }
        //do nothing
    } else if (
        oldNode.tagName === newNode.tagName &&
        oldNode.key === newNode.key
    ) {
        var propPatches = diffProps(oldNode, newNode)
        if (propPatches) {
            currentPatch.push({
                type: PROPS,
                propPatches: propPatches
            })
        }
        diffChildren(oldNode.children, newNode.children, index, patches, currentPatch)
    } else {
        currentPatch.push({
            type: REPLACE,
            node: newNode
        })
    }
    if (currentPatch.length > 0) {
        patches[index] = currentPatch
    }
}

function diffChildren(oldChildren, newChildren, index, patches, currentPatch) {
    var diffs = listDiff(oldChildren, newChildren, 'key')
    var currentNodeIndex = index
    var leftNode = null
    newChildren = diffs.children
    if (diffs.moves.length) {
        var reorderPatch = { type: REORDER, moves: diffs.moves }
        currentPatch.push(reorderPatch)
    }

    // console.log(newChildren)
    oldChildren.forEach(function (child, i) {
        var newChild = newChildren[i]
        currentNodeIndex = (leftNode && leftNode.count)
            ? currentNodeIndex + 1 + leftNode.count
            : currentNodeIndex + 1
        dfsWalk(child, newChild, currentNodeIndex, patches) // 深度遍历子节点
        leftNode = child
    })
}

function diffProps(oldNode, newNode) {
    var oldProps = oldNode.props,
        newProps = newNode.props,
        count = 0,
        propsPatch = {}
    for (var key in oldProps) {
        if (oldProps[key] !== newProps[key] && key !== "key") {
            count++
            propsPatch[key] = newProps[key]
        }
    }
    for (var key in newProps) {
        if (!oldProps[key] && key !== "key") {
            count++
            propsPatch[key] = newProps[key]
        }
    }
    return count ? propsPatch : null
}