import el from './vdom/element'
import diff from './vdom/diff'
import patch from './vdom/patch'
var svd = require('simple-virtual-dom')


// let { patch } = svd
var ul = el('ul', { id: 'list' }, [
    el('li', { class: 'item', key: "1" }, ['Item 1']),
    el('li', { class: 'item', key: "2" }, ['Item 2']),
    el('li', { class: 'item', key: "3" }, ['Item 3'])
])

var ul2 = el('ul', { id: 'list' }, [
    el('li', { class: 'item', key: "3" }, ['Item 5']),
    el('li', { class: 'item', key: "1" }, ['Item 1']),
    el('li', { class: 'item', key: "2" }, ['Item 2']),
    el('li', { class: 'item', key: "4" }, ['Item 4'])
])

var div1 = el('div', { id: "wrapper" }, [
    ul,
    el('div', { class: 'test' }, ['testDiv']),
    el('span', { class: 'test' }, ['123']),
    el('div', { class: 'test' }, [
        el('p',[123]),
        el('p',[1234])
    ]),
])

var div2 = el('div', { id: "wrapper2" }, [
    ul2,
    el('p', { class: 'test' }, ['testP']),
    el('div', { class: 'test33' }, ['testDiv2']),
    el('div', { class: 'test4' }, [
        el('p',[23]),
        el('p',[234])
    ]),
])


var app$ = document.querySelector("#app")
var ulRoot = div1.render()
app$.appendChild(ulRoot)

console.log(diff(div1, div2))
setTimeout(function () {
    patch(ulRoot, diff(div1, div2))
}, 1500)