import plugin from '../../src/index.js'
import Vue from 'vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'


const localVueFactory = (options) => {
  const localVue = createLocalVue()
  localVue.use(plugin, options)
  return localVue
}

describe('index.js', () => {

  test('should register $enabled property', () => {
    const wrapper = shallowMount({ render(h) { return h('div') } }, { localVue: localVueFactory({mode: 'test', config: {}}) })
    expect('$enabled' in wrapper.vm).toBe(true)
    expect('$e' in wrapper.vm).toBe(true)
  })

  test('should throw an error if no mode is passed', () => {
    try {
      shallowMount({ render(h) { return h('div') } }, { localVue: localVueFactory({config: {}}) })
      expect(true).toBe(false)
    } catch (err) {
      expect(err.message).toBe('VueEnabled : Please provide a default mode as an option.')
    }
  })

  test('should throw an error if no mode is passed', () => {
    try {
      shallowMount({ render(h) { return h('div') } }, { localVue: localVueFactory({mode: 'test'}) })
      expect(true).toBe(false)
    } catch (err) {
      expect(err.message).toBe('VueEnabled : Please provide a config as an option.')
    }
  })

  test('$e should retrieve correctly the status', () => {
    const wrapper = shallowMount({ render(h) { return h('div') } }, { localVue: localVueFactory({mode: 'admin', config: { superImportantThing: ['admin', 'superadmin'], otherThing: ['default'] }}) })

    expect(wrapper.vm.$e('superImportantThing')).toBe(true)
    expect(wrapper.vm.$e('otherThing')).toBe(false)
  })

  test('should change the mode when called', () => {
    const wrapper = shallowMount({ render(h) { return h('div') } }, { localVue: localVueFactory({mode: 'admin', config: { superImportantThing: ['admin', 'superadmin'], otherThing: ['default'] }}) })

    expect(wrapper.vm.$e('superImportantThing')).toBe(true)

    wrapper.vm.$enabled.mode = 'default'

    expect(wrapper.vm.$e('superImportantThing')).toBe(false)
  })



})