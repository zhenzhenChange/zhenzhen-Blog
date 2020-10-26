---
title: Function.prototype.apply
date: 2020-10-25
tags:
  - JavaScript
  - ECMAScript
---

## ES6 +

```js
function MyApply(ctx = window, args) {
  ctx.fn = this
  const result = ctx.fn(args)
  Reflect.deleteProperty(ctx, 'fn')
  return result
}

Function.prototype.MyApply = MyApply

Person.MyApply(obj)
```

## ES6 -
