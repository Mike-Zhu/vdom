import el from './vdom/element'
import diff from './vdom/diff'
import patch from './vdom/patch'
import _ from 'lodash'
import chilrenList from './list'
import template1 from './template'
import transformFromTemplateToEl from './parser/parser'
// el('li', { class: 'item', key: "1" }, ['Item 1']),
// el('li', { class: 'item', key: "2" }, ['Item 2']),
// el('li', { class: 'item', key: "3" }, ['Item 3'])

console.log(chilrenList)

const divDom = document.createElement('ul')
const ulTemplate = _.template(template1)({
    userList: chilrenList.map(res => ({
        ...res,
        nameFormatted: res.Name
    })),
    'isReadUidAuth': true,
    'encodingUid': '12332131',
    'curChatId': '313412', //标记别选中的gid
    'batchQuit': false,
    "encodingUid": res => res
})
let elDom = transformFromTemplateToEl(ulTemplate)
let elDom2 = transformFromTemplateToEl(ulTemplate)
let node = elDom.render()
document.body.appendChild(node)
setTimeout(() => {
    var diffList = diff(elDom, elDom2)
    console.log(diffList)
    patch(node, diffList)

}, 1000)

















// var div1 = el('div', { id: "wrapper", class: "1233" }, [
//     ul,
//     el('fragment', {}, [2]),
//     el('div', { class: 'test' }, ['testDiv']),
//     el('span', { class: 'test' }, ['123']),
//     el('div', { class: 'test' }, [
//         el('p', [123]),
//         el('p', [1234])
//     ]),
// ])

// var ul2 = el('ul', { id: 'list' }, [
//     el('li', { class: 'item', key: "3" }, ['Item 5']),
//     el('li', { class: 'item', key: "1" }, ['Item 1']),
//     el('li', { class: 'item', key: "2" }, ['Item 2']),
//     el('li', { class: 'item', key: "4" }, ['Item 4'])
// ])


// var div2 = el('div', { id: "wrapper2", lary: "234" }, [
//     ul2,
//     el('fragment', {}, [1]),
//     el('p', { class: 'test' }, ['testP']),
//     el('div', { class: 'test33' }, ['testDiv2']),
//     el('div', { class: 'test4' }, [
//         el('p', [23]),
//         el('p', [234])
//     ]),
// ])


// var app$ = document.querySelector("#app")
// var ulRoot = div1.render()
// app$.appendChild(ulRoot)

// console.log(diff(div1, div2))
// setTimeout(function () {
//     patch(ulRoot, diff(div1, div2))
// }, 2500)

