---
title: Function.prototype.call
date: 2020-10-25
tags:
  - JavaScript
  - ECMAScript
---

## ES6 +

```js
/* => 1.指定上下文（如果没有传参或者传 undefined，则默认为 window） */
function MyCall(ctx = window, ...args) {
  /* => 2.给上下文添加一个 fn 函数，赋值为调用者 */
  ctx.fn = this

  /* => 3.执行 fn 函数（有参数则传入参数），有返回值则返回 */
  const result = ctx.fn(...args)

  /* => 4.删除该函数 */
  Reflect.deleteProperty(ctx, 'fn')

  return result
}

/* => 5.绑定至函数的原型 */
Function.prototype.MyCall = MyCall

const obj = { name: 'zhenzhenChange' }

function Person(args) {
  console.log(this.name)
  console.log(args)
}

Person.MyCall(obj, 21)

/* logs: */
// zhenzhenChange
// 21
```

## ES6 -
