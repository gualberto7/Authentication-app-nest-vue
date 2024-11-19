import { describe, it, expect } from 'vitest'
import { shallowMount, mount } from '@vue/test-utils'
import TextField from '../TextField.vue'
import { nextTick } from 'process'

describe('TextField component', () => {
  it('should render a text field with a label', () => {
    const wrapper = shallowMount(TextField, {
      props: { label: 'Name', name: 'name', placeholder: 'Name' }
    })
    expect(wrapper.find('label').text()).toBe('Name')
    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('input').attributes('name')).toBe('name')
    expect(wrapper.find('input').attributes('placeholder')).toBe('Name')
  })

  it('should render a text field with an error message', async () => {
    const wrapper = shallowMount(TextField, {
      props: {
        label: 'Name',
        name: 'name',
        error: 'This field is required'
      }
    })
    const input = wrapper.find('input')
    await input.setValue('S')
    await input.trigger('blur')
    expect(wrapper.find('span').exists()).toBe(true)
    expect(wrapper.find('span').text()).toBe('This field is required')
  })
})
