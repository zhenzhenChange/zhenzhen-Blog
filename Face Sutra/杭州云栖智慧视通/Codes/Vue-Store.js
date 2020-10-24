let Vue

function install(VueConstructor) {
  Vue = VueConstructor

  Vue.mixin({
    beforeCreate() {
      Vue.prototype.Store = this.$options.Store
    },
  })
}

// https://juejin.im/post/6857059183762931720#heading-12
// https://blog.ixk.me/add-simple-store-for-vue3.html
// https://juejin.im/post/6856718746694713352
class Store {
  constructor({ state = {}, getters = {}, modules = {}, actions = {}, mutations = {} }) {
    Object.keys(modules).forEach((module) => {
      state = Object.assign(state, modules[module].state)
      getters = Object.assign(getters, modules[module].getters)
      actions = Object.assign(actions, modules[module].actions)
      mutations = Object.assign(mutations, modules[module].mutations)
    })

    this.state = new Vue({ data: state })
    this.getters = {}
    this.actions = actions
    this.mutations = mutations
  }

  observerGetters(getters) {
    Reflect.keys(getters).forEach((getFn) => {
      Reflect.defineProperty(this.getters, getFn, {
        get: () => getters[key](this.state),
        enumerable: true,
      })
    })
  }

  commit(type, arg) {
    this.mutations[type](this.state, arg)
  }

  dispatch(type, arg) {
    const backend = { state: this.state, commit: this.commit.bind(this) }
    this.actions[type](backend, arg)
  }
}
