import _ from './util'
import patch, { TEXT, PROPS, REPLACE, REORDER } from './patch'
import listDiff from './list-diff-m'

// diff 函数，对比两棵树
function diff(oldTree, newTree) {
    var index = 0 // 当前节点的标志
    var patches = {} // 用来记录每个节点差异的对象
    dfsWalk(oldTree, newTree, index, patches)
    return patches
}
function dfsWalk(oldNode, newNode, index, patches) {
    var currentPatch = []

    // Node is removed.
    if (newNode === null) {
        //老的dom没了
        // Real DOM node will be removed when perform reordering, so has no needs to do anthings in here
        // TextNode content replacing
    } else if (_.isString(oldNode) && _.isString(newNode)) {
        //都是字符串，但是变了
        if (newNode !== oldNode) {
            currentPatch.push({ type: TEXT, content: newNode })
        }
        // Nodes are the same, diff old node's props and children
    } else if (
        //完全相同
        oldNode.tagName === newNode.tagName &&
        oldNode.key === newNode.key
    ) {
        //props 变化
        // Diff props
        var propsPatches = diffProps(oldNode, newNode)
        if (propsPatches) {
            currentPatch.push({ type: PROPS, props: propsPatches })
        }
        // Diff children. If the node has a `ignore` property, do not diff children
        if (!isIgnoreChildren(newNode)) {
            diffChildren(
                oldNode.children,
                newNode.children,
                index,
                patches,
                currentPatch
            )
        }
        // Nodes are not the same, replace the old node with new node
    } else {
        //重新渲染了
        currentPatch.push({ type: REPLACE, node: newNode })
    }

    if (currentPatch.length) {
        patches[index] = currentPatch
    }
}

// 遍历子节点
function diffChildren(oldChildren, newChildren, index, patches, currentPatch) {
    var diffs = listDiff(oldChildren, newChildren, 'key')
    newChildren = diffs.children

    if (diffs.moves.length) {
        var reorderPatch = { type: REORDER, moves: diffs.moves }
        currentPatch.push(reorderPatch)
    }

    var leftNode = null
    var currentNodeIndex = index
    _.each(oldChildren, function (child, i) {
        var newChild = newChildren[i]
        currentNodeIndex = (leftNode && leftNode.count)
            ? currentNodeIndex + leftNode.count + 1
            : currentNodeIndex + 1
        dfsWalk(child, newChild, currentNodeIndex, patches)
        leftNode = child
    })
}

function diffProps(oldNode, newNode) {
    var count = 0
    var oldProps = oldNode.props
    var newProps = newNode.props

    var key, value
    var propsPatches = {}

    // Find out different properties
    for (key in oldProps) {
        value = oldProps[key]
        if (newProps[key] !== value) {
            count++
            propsPatches[key] = newProps[key]
        }
    }

    // Find out new property
    for (key in newProps) {
        value = newProps[key]
        if (!oldProps.hasOwnProperty(key)) {
            count++
            propsPatches[key] = newProps[key]
        }
    }

    // If properties all are identical
    if (count === 0) {
        return null
    }

    return propsPatches
}
function isIgnoreChildren(node) {
    return (node.props && node.props.hasOwnProperty('ignore'))
}