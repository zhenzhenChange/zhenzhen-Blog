---
title: Array.prototype.forEach
date: 2020-10-26
tags:
  - Array
  - JavaScript
  - ECMAScript
---

:::tip 规范链接
<https://tc39.es/ecma262/#sec-array.prototype.foreach>

```js
Array.prototype.forEach(callbackfn [ , thisArg])
```

:::

## 规范说明

- `callbackfn`应该是一个接受`3`个参数的函数
- `forEach`对数组中的每个元素按升序调用一次`callbackfn`
- `callbackfn`只对数组中实际存在的元素调用，对数组中缺少的元素不调用
- 如果提供了`thisArg`参数，那么每次调用`callbackfn`时，它将作为`this`值。如果没有提供这个参数，则使用`undefined`代替。
- `callbackfn`调用时有`3`个参数：当前元素的值，当前元素的索引，和被遍历的对象。
- `forEach`不会直接改变被调用的对象，但对象可能会因为调用`callbackfn`而发生改变。
- `forEach`处理的元素范围是在第一次调用`callbackfn`之前设置的。在调用`forEach`开始后追加到数组中的元素将不会被`callbackfn`访问。如果数组中现有的元素发生了变化，那么传递给`callbackfn`的值将是`forEach`访问它们时的值；在调用`forEach`开始后和被访问前被删除的元素将不会被访问。

## 规范定义

- 将`this`值转化为`Object`类型，并赋值给变量`O`
- 获取对象`O`的`length`属性值，并赋值给变量`len`
- 如果`callbackfn`不是一个函数，则抛出一个`TypeError`错误
- 定义一个变量`k`，并初始化值为`0`
- 当`k < len`时，重复`while`循环
  - 将数值`k`转化为`String`类型，并赋值给`Pk`
  - 检测`O`对象上是否属性`Pk`（使用`HasProperty`检测），并赋值给`kPresent`
  - 如果`kPresent`是`true`
    - 获取属性`Pk`的值，并赋值给`kValue`
    - 调用`callbackfn.call(this, kValue, k, O)`
  - 设置`k`的值为`k + 1`
- 返回`undefined`

## 备注

`forEach`函数是有意通用的，它不要求它的`this`值是一个`Array`对象。因此它可以转移到其他类型的对象上作为方法使用。

## 规范实现

```js
const toString = Object.prototype.toString

function MyEach(callbackfn, thisArg) {
  // 1. 将 this 值转换为 Object 类型
  const O = Object(this)
  // 2. 获取对象 O 的 length 属性值
  const len = O.length
  // 3. 回调函数校验
  if (toString.call(callbackfn) !== '[object Function]') throw new TypeError(`${callbackfn} is not a function`)
  // 4. 初始化变量
  let k = 0
  // 5. while 循环
  while (k < len) {
    // 5.1 将数值 k 转化为 String 类型
    const Pk = String(k)
    // 5.2 检测 O 对象上是否有属性 Pk
    const kPresent = Pk in O
    // 5.3 如果有
    if (kPresent) {
      // 5.3.1 获取属性 Pk 的值
      const kValue = O[Pk]
      // 5.3.2 调用回调函数 callbackfn 且传入 3 个参数
      callbackfn.call(thisArg, kValue, k, O)
    }
    // 5.4 设置 k 的值为 k + 1
    k = k + 1
  }
  // 6. 返回 undefined
  return void 0
}

Array.prototype.MyEach = MyEach
```

## ES6 +

```js
/**
 * 精简版
 *
 * 1.不需要转型：因为如果不是数组对象，原型上就没有 forEach 函数，当场抛错
 * 2.不需要返回值：默认就是返回 undefined
 */
const toString = Object.prototype.toString

function MyForEach(cbFn, thisContext) {
  if (toString.call(cbFn) !== '[object Function]') throw new TypeError(`${cbFn} is not a function`)

  for (let i = 0; i < this.length; i++) {
    const key = String(i)
    if (key in this) cbFn.call(thisContext, this[key], i, this)
  }
}

Array.prototype.MyForEach = MyForEach
```

:::danger 注意事项

不能简单的使用`typeof cbFn == "function"`校验函数

因为对于`Generator`函数和`Async`函数来说`typeof`的结果也是`function`

---

使用`Object.prototype.toString.call`方法校验`Generator`函数和`Async`函数后有以下不同之处：

- 对于`Async`函数，`toSting`的结果是`[object AsyncFunction]`，但作为`forEach`方法的回调参数传递，`Async`函数<font color=red>会</font>执行
- 对于`Generator`函数，`toSting`的结果是`[object GeneratorFunction]`，但作为`forEach`方法的回调参数传递，`Generator`函数<font color=red>却不会</font>执行

---

对于这种差异，规范并没有相关说明（可能我还没看到），在模拟实现上暂时不考虑这两种情况。
:::
