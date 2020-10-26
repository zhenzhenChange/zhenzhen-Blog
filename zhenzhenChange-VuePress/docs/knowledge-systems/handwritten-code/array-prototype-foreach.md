---
title: Array.prototype.forEach
date: 2020-10-25
tags:
  - JavaScript
  - ECMAScript
---

## ES6 +

```js
function MyEach(callback) {
  if (Array.isArray(this)) {
    for (let i = 0; i < this.length; i++) {
      callback(this[i], i, this)
    }
  }
}

Array.prototype.MyEach = MyEach

const arr = [2, 3, 455, 6233]
arr.MyEach((item, index, currentArr) => {
  console.log(item, index, currentArr)
})
```

## ES6 -
