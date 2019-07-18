import plugin from '../../src/index.js'
import Standard from '../../demo/Standard.vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import { wrap } from 'module';

const localVueFactory = options => {
	const localVue = createLocalVue()
	localVue.use(plugin, options)
	return localVue
}

describe('index.js', () => {
	test('should register $enabled property', () => {
		const wrapper = shallowMount(
			{
				render(h) {
					return h('div')
				}
			},
			{ localVue: localVueFactory({ mode: 'test', config: {} }) }
		)
		expect('$enabled' in wrapper.vm).toBe(true)
		expect('$e' in wrapper.vm).toBe(true)
	})

	test('should throw an error if no mode is passed', () => {
		try {
			shallowMount(
				{
					render(h) {
						return h('div')
					}
				},
				{ localVue: localVueFactory({ config: {} }) }
			)
			expect(true).toBe(false)
		} catch (err) {
			expect(err.message).toBe(
				'VueEnabled : Please provide a default mode as an option.'
			)
		}
	})

	test('should throw an error if no mode is passed', () => {
		try {
			shallowMount(
				{
					render(h) {
						return h('div')
					}
				},
				{ localVue: localVueFactory({ mode: 'test' }) }
			)
			expect(true).toBe(false)
		} catch (err) {
			expect(err.message).toBe(
				'VueEnabled : Please provide a config as an option.'
			)
		}
	})

	test('$e should retrieve correctly the status', () => {
		const wrapper = shallowMount(
			{
				render(h) {
					return h('div')
				}
			},
			{
				localVue: localVueFactory({
					mode: 'admin',
					config: {
						featureA: ['admin', 'superadmin'],
						featureB: ['default']
					}
				})
			}
		)

		expect(wrapper.vm.$e('featureA')).toBe(true)
		expect(wrapper.vm.$e('featureB')).toBe(false)
	})

	test('should change the mode when called', () => {
		const wrapper = shallowMount(
			{
				render(h) {
					return h('div')
				}
			},
			{
				localVue: localVueFactory({
					mode: 'admin',
					config: {
						featureA: ['admin', 'superadmin'],
						featureB: ['default']
					}
				})
			}
		)

		expect(wrapper.vm.$e('featureA')).toBe(true)

		wrapper.vm.$enabled.mode = 'default'

		expect(wrapper.vm.$e('featureA')).toBe(false)
	})

	test('should refresh the ui after mode change', () => {
		const wrapper = shallowMount(
			Standard,
			{
				localVue: localVueFactory({
					mode: 'admin',
					config: { featureA: ['admin'] }
				})
			}
		)

    expect(wrapper.html()).toContain('Enabled')
    wrapper.vm.$enabled.mode = 'default'
    expect(wrapper.html()).toContain('Disabled')
	})
})
