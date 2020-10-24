# 幕后工作者 - Worker

## 导读

笔者一开始只想了解一下 Web Worker 的相关知识，没想到坑越挖越深，搜寻了与其相关的大量资料，从 Worker 的基本使用，到 Worker 在 WebKit 内核的执行机制，再到它在 Blink 内核的工作流程，然后又了解到了浏览器的渲染进程，最后回到了渲染进程中的 Worker 线程，绕了一圈着实学到很多。。。。所谓你的求知欲有多么强烈，挖的坑就有多么深。以此篇记录我这一次的学习历程。

## Web Worker 的自述

Hello，我叫 Web Worker，简称**达不溜 达不溜**。我是一名后台工作者，帮助开发者在主页面上**并行**运行脚本。同时允许以**消息传递**作为协调机制进行**线程式**操作，能保证长期运行的脚本不被响应点击或其他用户交互的脚本打断，并允许在不放弃保持页面响应的情况下执行长期任务。

借此，我也想表达以下几个问题：

- 我是操作系统级别的线程，拥有与主线程一样的运算能力
- 我不能做一些不安全或与主线程互斥的操作，我只是一个没有感情的计算工具。。。
- 我的爸爸是 Blink 内核，是浏览器的特性，不属于 JavaScript
- 同时我有几个兄弟，dw、sw、sw、wl

## 从 WebKit 看 Worker 的生命周期

## 从 Blink 看 Worker 的生命周期

## 从浏览器的角度看待 Worker

## Worker 的执行机制

## Worker 的创建形式

## Worker 的通信方式

## Worker 的错误处理

## Worker 引起的跨域

## Worker 的使用限制

## Worker 的应用场景

## Worker 的种类

- Web Worker
  - Shared Worker
  - DedicatedWorker
- Service Worker
- Worklet

- Worker 最简单的用法是在不中断用户界面的情况下执行计算量大的任务。

- 而工人可以使用模块脚本来实例化，模块脚本具有通常的好处：能够使用 JavaScript 导入语句导入其他模块；默认为严格模式；顶层声明不会污染工人的全局范围。由于可以使用导入语句，所以 importScripts()方法会在模块 worker 里面自动失效。

- 结构化数据需要克隆，二进制数据可直接传输而不用克隆

- 专用 Worker 案例 - 2000 张二维码解码
- 共享 Worker 案例 - 共享位置信息、本地游戏多人对战
- 服务 Worker 案例 - 缓存静态资源

  - 另外，由于 Service Worker 还需要会为多个页面提供服务，所以还不能把 Service Worker 和单个页面绑定起来。在目前的 Chrome 架构中，Service Worker 是运行在浏览器进程中的，因为浏览器进程生命周期是最长的，所以在浏览器的生命周期内，能够为所有的页面提供服务

- 思考 DOM DIFF 算法于 Worker 中使用
- Web Workers 不是 JavaScript 的一部分，而是可以通过 JavaScript 访问的浏览器特性。 历史上，大多数浏览器都是单线程的(当然，这已经改变了)，大多数 JavaScript 实现都入发生在浏览器中。 Web Workers 不是在 Node.JS 中实现的

## References

[How Blink works](https://docs.google.com/document/d/1aitSOucL0VHZa9Z2vbRJSyAIsAz24kX8LFByQ5xQnUg/edit) - Blink 内核是如何工作的

[Chrome 浏览器架构](https://www.yuque.com/suihangadam/liulanqi/eaf7na)

[浏览器工作原理与实践](https://time.geekbang.org/column/intro/216)
