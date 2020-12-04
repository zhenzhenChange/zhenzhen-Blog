---
title: 关于 if 语句中将【匿名函数表达式求值】与【函数声明提升】作为判断条件的区别
date: 2020-12-03
tags:
  - 前端
  - JavaScript
categories:
  - JavaScript
---

## 表达式求值 Vs 变量声明提升

Halo，一个美梦，被一个温柔闹钟铃声所打破，我很不情愿地掀开暖暖的狗窝，拿起手机，开启日常的第一阶段：信息浏览。

正当我准备浏览结束，要去洗漱 -> 吃早餐 -> 上课时，在某某某交流群看到一位群友发起问题讨论时，我朦胧的双眼瞬间两眼放光，整个人就精神了起来，并加入其激烈的讨论当中。

话题复原：

一位群友在一个[网站](http://perfectionkills.com/javascript-quiz/)（不知道需不需要梯子）上做了十几道题，这些题都比较稀奇古怪，也很迷人眼（稍不注意就会看错），其他群友也纷纷参与做题。

我也尝试做了一哈，做错了很多：

<center>

![做错的题](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/468d98249a0a4e1e83485f9867ed0321~tplv-k3u1fbpfcp-watermark.image)

</center>

最后开始了对错题的讨论，其中最为激烈的是下面这题（对应网站中的第 9 题）：

<center>

![加入](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d43b734634a5404e81bad5cdc5c3029c~tplv-k3u1fbpfcp-watermark.image)

</center>

```js
var x = 1

if (function f() {}) {
  x += typeof f
}

console.log(x)
```

问 x 的结果是（有以下答案，正确答案是第三个`"1undefined"`）：

- 1
- "1function"
- "1undefined"
- NaN

## 激烈的讨论

群友 A：函数声明不是会提前吗？答案应该是`"1function"`才对

---

群友 B：`if`里的`condition`判断条件`function f() {}`会被转换为布尔值，所以转换为`true`从而进入`if`代码块，但`typeof f`为什么是`undefined`？

---

群友 C：（在浏览器测试了一下，发了个图，结果是`"1function"`）

---

我的见解：对于 if 块的函数声明，会被当做表达式，然后提升到当前作用域顶部（在这里就是全局作用域），也就是说：

- `function f() {}` 被声明提前了，变成了如下结果：

```js
var x = 1

var f

if ((f = function() {})) {
  x += typeof f
}

console.log(x)
```

- 由于变量`f`被赋值为一个匿名函数，函数转换成布尔值为`true`
- 于是进入了`if`代码块，此时`typeof f`的结果就是`function`
- 所以`x += typeof f`后，`x`的结果应该就是`"1function"`
- 所以我也认为最后的答案应该是`"1function"`

---

就在我们一致认为是网站作者弄错了答案之后（群友们纷纷拔起了剑，看看谁拔的剑快，谁就先能干掉作者 ......）

---

群友 D：（他也在浏览器测试了一下，发了个图，结果是`"1undefined"`，然后默默的转身离开 ......）

---

？？？这是神马情况，这难道跟浏览器的实现有关嘛？

于是大伙纷纷用各大浏览器测试了结果（可能大伙都在忙，只是根据自己的理解说出自己的想法，一开始并没有人去进行测试，我当时也还躺在床上，用手机打字哈哈哈），咦，居然发现都是`"1undefined"`

大家也开始对`群友 C`提出质疑：你是不是之前就声明过`f`函数，导致当前作用域内本来就有一个`f`函数

`群友 C`说：好像是

破案了，于是群友们的剑纷纷指向了`群友 B`（快逃~）

---

之后的大家也进行了很多测试，进行了很多的讨论，交流各自的想法，但无非也还是围绕上面几个群友们的看法来讨论：

- 变量声明提前
- 匿名函数表达式
- ......

---

直到有位群友（也就是分享做题网站的那位）发了一个截图：

<center>

![表达式求值](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ae916794160c4a01ade5ba95a3c30a6b~tplv-k3u1fbpfcp-watermark.image)

</center>

此时我爬起了床，打开电脑测试的同时也发表着见解：

- 因为这里是一个表达式
- 表达式最终产生一个值
- 但是却没有变量接收这个值
- 在执行完当前表达式后，这个值也随之销毁
- 所以在后续的读取操作中会发现因为未定义而报错

---

到这里，这个问题也就迎刃而解，原来我们一直在绕圈圈，虽然大家说的都有道理，但总感觉哪里说不同，说服力不够，主要是被函数声明提前给限制死了，没有散发思维，没有思考这个问题的本质：也就是`if`的条件判断`condition`他其实是一个表达式。

---

## 表达式求值而不是变量提升

```js
var x = 1

if (function f() {}) {
  x += typeof f
  console.log('If 里的 x：', x) // If 里的 x： 1undefined
  // console.log("If 里的 f：", f); // Uncaught ReferenceError: f is not defined
}

console.log('If 外的 x：', x) // If 外的 x： 1undefined
// console.log("If 外的 f：", f); // Uncaught ReferenceError: f is not defined
```

在这块代码中，也就是原题目，只不过我添加了几行`console`，来辅助说明：

- 在这里，判断条件`function f() {}`是一个表达式，求值后就是一个函数
- 然而这是一个匿名函数表达式，只是将这个匿名函数的`name`属性设置成了`f`

<center>

![name](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f27f2fd96a824fc4b2f8cfbdf89eba6d~tplv-k3u1fbpfcp-watermark.image)

</center>

- 由于这个表达式的结果是一个函数，在转换成布尔值时，转换后的结果是`true`，所以能进入`if`代码块（符合`群友 B`的看法）
- 但由于没有变量去接收这个值（或者说引用/使用它），在执行完这个条件后，这个值也就被销毁（应该是被当做垃圾回收或者游离在内存等待被回收了吧）了
- 所以在`if`代码块内，`typeof f`的结果是字符串`"undefined"`，因为在当前作用域链上根本就没有变量`f`的存在
- `x`与之拼接后，自然而然的也就是`1undefined`了
- 最终的`console`也打印出了预期的结果，由于`f`是未定义，所以有关`f`的访问就注释了，感兴趣的朋友可以复制代码去跑一下

假若我们用一个变量去接收，那么最终`x`的值就是一开始所说的`1function`

```js
var x = 1
var f

if ((f = function f() {})) {
  x += typeof f
}

console.log(x) // 1function
```

---

还没完，我们继续挖坑 ......

---

## 变量提升而不是匿名函数表达式

```js
var x = 1

if (f) {
  function f() {}

  x += typeof f

  // 不打印，因为 f 是 undefined，if 进不来
  console.log('If 里的 x：', x)
  console.log('If 里的 f：', f)
}

console.log('If 外的 x：', x) // 1
console.log('If 外的 f：', f) // undefined
```

在这里，判断条件`condition`本质上还是一个表达式，我们需要的还是这个表达式的求值结果。
但它不是前面所说的匿名函数表达式求值，而是一个普通的变量求值：

- 在`JavaScript`代码被编译成`AST`阶段，会进行一系列的初始化，其中就包括`变量提升`（相关内容都能讲一篇文章，感兴趣的朋友可以查阅资料）
- `if`代码块中的`f`与`d`函数声明会被编译器捕获，并提升到作用域顶部
- 但是，`if`代码块中的函数声明，虽然会提升变量，但其本身会被当做函数表达式来处理

```js
if (f) {
  function f() {}
}
```

相当于（但也因各大浏览器的实现有关 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/function)）：

```js
var f
if (f) {
  f = function f() {}
}
```

- 此时`f`虽然已经定义，但是其值是`undefined`，所以进不去`if`代码块，自然而然里面的代码也就不会执行了。

---

## 广泛使用的 IIFE

到这里，大家不知是否想到了常用的`立即执行函数`呢？他其实也就是一个匿名函数表达式，只不过在后面再加上一对圆括号`()`马上执行了而已。

在执行完之后，他就会被`GC`回收了，但我们可以利用它，做一些好玩的事情 ......

---

## 总结

这次激烈的讨论，我从中学习到很多，也能结合以往学到的知识来证明问题，我觉得值得记录。

关于这个问题，就涉及很多基础知识：

- 变量提升
- 作用域链
- 表达式是用来求值的
- 类型判断与类型转换
- 函数表达式与函数声明的区别
- ......

另外要说的就是：

- `变量提升`发生在`编译`期间
- `表达式求值`发生在`运行`期间
- 所以`if`的`condition`判断条件（在上文中的匿名函数表达式`function f() {}`）在`编译`期间不会被`提升`，而是在`运行`期间执行`求值`（只不过没有变量去接收这个值而已）
- 关于第三点我觉得可以通过平常书写的匿名函数表达式来求证：

```js
var fn = function Foo() {}

console.log(fn.name) // Foo
console.log(Foo) // Uncaught ReferenceError: Foo is not defined
```

参与话题讨论的群友们都很积极，并没有像网上的某些评论：<font color=red>这个问题没有意义</font>、<font color=red>这种问题就是浪费时间</font>、<font color=red>谁会写这种代码？</font>

相反我觉得这很有意义，很有趣很好玩，不仅能追溯本源去揭开那块神秘的面纱，还能扩展你的知识广度，同时还能融合你了解的知识。

你要是有时间可以发表自己的相关看法，没必要泼一头冷水给别人是不是~

不过确实，这种代码玩玩也罢，还是不要用在生产项目上，以免造成不必要的困扰~

:::warning PS
以上内容结合群友们的讨论以及个人的理解，纯属个人见解，如若有误，敬请指出~
:::

---

::: tip Note
实践才是检验真理的唯一标准！
:::

（完了逃课好像被老师抓到了 ......

![聊天记录](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ca4748e9dfbd4ccfae26e511814db2ca~tplv-k3u1fbpfcp-watermark.image)
