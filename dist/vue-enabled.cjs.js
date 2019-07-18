'use strict';

class VueEnbaled {
  constructor(Vue, { mode, config = {} }) {
    this._vm = null;
    this._initVM(Vue, {
        mode,
        config
    });
  }

  get mode () { return this._vm.mode }
  set mode (mode) {
    this._vm.$set(this._vm, 'mode', mode);
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
    const silent = Vue.config.silent;
    Vue.config.silent = true;
    this._vm = new Vue({ data });
    Vue.config.silent = silent;
  }

  destroyVM() {
    this._vm.$destroy();
  }
}

const install = function (Vue, options = {}) {  

  if(!options.mode) {
    throw new Error('VueEnabled : Please provide a default mode as an option.')
  }

  if(!options.config) {
    throw new Error('VueEnabled : Please provide a config as an option.')
  }

  if(Object.values(options.config).some(val => !Array.isArray(val))) {
    throw new Error('VueEnabled : All the values of config must be arrays')
  }

  let enabled = new VueEnbaled(Vue, options);

  Vue.prototype.$e = function (key) {
    return enabled._e(key)
  }; 
  Vue.prototype.$enabled = enabled;
};


var index = { install };

module.exports = index;
