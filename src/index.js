import VueEnabled from './vue-enabled'

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

  let enabled = new VueEnabled(Vue, options)

  Vue.prototype.$e = function (key) {
    return enabled._e(key)
  } 
  Vue.prototype.$enabled = enabled
}


export default { install }