import _, {
    REPLACE,
    REORDER,
    PROPS,
    TEXT
} from './util'
import listDiff from './list-diff'

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
        diffChildren(
            oldNode.children,
            newNode.children,
            index,
            patches,
            currentPatch
        )
    } else {
        currentPatch.push({
            type: REPLACE,
            node: newNode
        })
    }
    console.log(index, currentPatch)
    if (currentPatch.length) {
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
    // console.log('oldChildren =>',oldChildren)
    // console.log('newChildren =>',newChildren)
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