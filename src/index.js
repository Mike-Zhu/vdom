import el from './vdom/element'
import diff from './vdom/diff'
// var svd = require('simple-virtual-dom')
// let {el,diff} = svd

var ul = el('ul', { id: 'list' }, [
    el('li', { class: 'item', key: "1" }, ['Item 1']),
    el('li', { class: 'item', key: "2" }, ['Item 2']),
    el('li', { class: 'item', key: "3" }, ['Item 3'])
])

var ul2 = el('ul', { id: 'list' }, [
    el('li', { class: 'item', key: "3" }, ['Item 1']),
    el('li', { class: 'item', key: "1" }, ['Item 2']),
    el('li', { class: 'item', key: "2" }, ['Item 3']),
    el('li', { class: 'item', key: "4" }, ['Item 3'])
])

var div1 = el('div', { id: "wrapper" }, [
    ul,
    el('div', { class: 'test' }, ['testDiv']),
])

var div2 = el('div', { id: "wrapper2" }, [
    ul2,
    el('p', { class: 'test' }, ['testP']),
])
  

var ulRoot = div1.render()
console.log(diff(div1, div2))
var app$ = document.querySelector("#app")
app$.appendChild(ulRoot)