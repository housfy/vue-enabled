export default class VueEnbaled {
  constructor(Vue, { mode, config = {} }) {
    this._vm = null
    this._initVM(Vue, {
        mode,
        config
    })
  }

  get mode () { return this._vm.mode }
  set mode (mode) {
    this._vm.$set(this._vm, 'mode', mode)
  }

  get vm (){ return this._vm }

  e(key) {
    return this._e(key)
  }

  _e(key) {
    return this._isIncluded(key, this._vm.mode)
  }

  _isIncluded(key, mode) {
    if (!this._vm.config.hasOwnProperty(key)) {
      return false
    }

    return this._vm.config[key].includes(mode)
  }

  _initVM (Vue, data) {
    const silent = Vue.config.silent
    Vue.config.silent = true
    this._vm = new Vue({ data })
    Vue.config.silent = silent
  }

  destroyVM() {
    this._vm.$destroy()
  }
}