# Promise

## Promise 内部发生错误，有类似 try...catch 的机制捕获到了错误

## 但是会一直传递，传递给 then / catch 链处理

## 若一直没有被处理，则会成为外部未捕获异常

## 即，内部已捕获，但未处理。外部显示未捕获

## Promise 的错误只能通过 then （第二个参数） / catch 方法或者全局 unhandledrejection 钩子处理

## 因为该错误不能冒泡，所以不能被 error 处理

## 它归属于已捕获但未处理异常系列

## 当 Promise 被 reject 且没有 reject 处理器的时候，会触发 unhandledrejection 事件

```js
// 抛出一个错误
const promise = new Promise((resolve, reject) => {
  throw new Error('MyError!')
})

// 第一种处理方式
window.onunhandledrejection = function (e) {
  // 处理 reject reason
  console.log('unHandledRejectionError', e.reason)

  // 禁止显示到控制台
  e.preventDefault()
}

// or
window.addEventListener('unhandledrejection', (e) => {})

// 第二种处理方式
promise.then(
  (value) => console.log(value),
  (reason) => console.log('promiseThenError', reason)
)

// catch(cb) 等价于 then(null, cb)
promise.catch((reason) => console.log('promiseCatchError', reason))

// 这一种处理方式，error 事件不会触发
window.addEventListener('error', (e) => {})

// 这一种也不会触发
// https://blog.csdn.net/xiaoluodecai/article/details/107297404
// 原因是因为：当异步函数抛出异常时，对于宏任务而言，执行函数时已经将该函数推入栈，此时并不在 try-catch 所在的栈，所以 try-catch 并不能捕获到错误。对于微任务而言，比如 promise，promise 的构造函数的异常只能被自带的 reject 也就是.catch 函数捕获到
try {
  new Promise(function (resolve, reject) {
    throw new Error('MyError!')
  })
} catch (error) {
  console.log('tryCatchError', error) // 不会触发
}
```

## Task - onerror

## Jobs - unhandledrejection

<https://mp.weixin.qq.com/s/-1Q6BjHt8F2IDavPo8pD6w>
