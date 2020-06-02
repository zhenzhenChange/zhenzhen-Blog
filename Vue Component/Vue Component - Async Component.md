# Vue Component - Async Component

> Vue Version：v2.6.11

## 作用特点

- 异步解析
- 按需加载
- 缓存复用

## 应用场景

- 路由懒加载
- TreeShaking

## 表现形式

```js
Vue.component('async-example', function (resolve, reject) {
  setTimeout(function () {
    resolve({ template: '<div>I am async!</div>' })
  }, 1000)
})
```

```js
Vue.component('async-webpack-example', function (resolve) {
  require(['./my-async-component'], resolve)
})
```

```js
Vue.component('async-webpack-example', () => import('./my-async-component'))
```

```js
new Vue({ components: { 'my-component': () => import('./my-async-component') } })
```

```js
const AsyncComponent = () => ({
  component: import('./MyComponent.vue'),
  loading: LoadingComponent,
  error: ErrorComponent,
  delay: 200,
  timeout: 3000,
})
```

```js
const router = new VueRouter({
  routes: [{ path: '/foo', component: () => import('./Foo.vue') }],
})
```

## 源码探讨

### 有图有真相

### 将核心逻辑抽象成有限状态机

## 万物皆为师

> 官方

- [Vue.js 异步组件](https://cn.vuejs.org/v2/guide/components-dynamic-async.html#%E5%BC%82%E6%AD%A5%E7%BB%84%E4%BB%B6)

- [Vue Router 路由懒加载](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html)

> 第三方

- [Vue.js 源码全方位深入解析](https://coding.imooc.com/class/chapter/228.html#Anchor)

- [Vue 源码浅析之异步组件注册](https://segmentfault.com/a/1190000019485927)

> 有限状态机

- [深入浅出理解有限状态机](https://zhuanlan.zhihu.com/p/46347732)

- [web 开发中无处不在的状态机](https://zhuanlan.zhihu.com/p/26524390)

- [JavaScript 与有限状态机](http://www.ruanyifeng.com/blog/2013/09/finite-state_machine_for_javascript.html)

> 有限状态机与状态模式略有不同：
>
> - 有限状态机是抽象的，是声明式的
> - 状态模式是具体的，是命令式的
