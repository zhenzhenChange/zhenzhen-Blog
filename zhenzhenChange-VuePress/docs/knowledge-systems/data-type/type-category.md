---
title: 类型种类
date: 2020-10-25
tags:
  - JavaScript
  - ECMAScript
---

:::tip 友情链接
ECMAScript 262 [2021] 规范定义的语言类型：<https://tc39.es/ecma262/#sec-ecmascript-language-types>
:::

在 JavaScript 中，共有 8 种数据类型，其中又分原始值与引用值。

## 原始值 - Primitive Value

- Null
- BigInt
- String
- Symbol
- Number
- Boolean
- Undefined

## 引用值 - Reference Value

- Object
  - Set
  - Map
  - Date
  - Array
  - RegExp
  - Function
  - ......

:::tip 提示

除 Object 类型本身外，其他引用类型皆为 Object 的派生子类。

其中有许多数据结构（Array / Set / Map / ......）都是由原生 JavaScript 实现（后续研究）。

:::

> 大道至简，就这么简单。
