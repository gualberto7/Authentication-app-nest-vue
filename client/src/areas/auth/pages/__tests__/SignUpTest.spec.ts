import { describe, it, expect, beforeEach, beforeAll, afterAll } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import SignUp from '../pages/SignUp.vue'
import TextField from '@/core/form/TextField.vue'
import Button from '@/core/components/Button.vue'
import Alert from '@/core/components/Alert.vue'
import Card from '@/core/components/Card.vue'
import { setActivePinia, createPinia } from 'pinia'
import { mockRouter } from '@/mocks/routes'
import { server } from '@/mocks/httpServer'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterAll(() => {
  server.close()
  localStorage.clear()
})

describe('SignUp Page', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders the sign up page', () => {
    const wrapper = mount(SignUp)
    expect(wrapper.html()).toContain('Sign Up')
  })

  it('name must be required', async () => {
    const wrapper = mount(SignUp, { global: { components: { TextField, Button, Alert, Card } } })
    const textFieldComponent = wrapper.findComponent({ name: 'TextField', props: { name: 'name' } })
    expect(textFieldComponent.exists()).toBe(true)

    const nameInput = textFieldComponent.find('input')
    await nameInput.setValue('User')
    await nameInput.setValue('')
    await nameInput.trigger('blur')
    expect(wrapper.html()).toContain('This field is required')
  })

  it('name field must have at least 3 characters', async () => {
    const wrapper = mount(SignUp, { global: { components: { TextField, Button, Alert, Card } } })
    const textFieldComponent = wrapper.findComponent({ name: 'TextField', props: { name: 'name' } })
    expect(textFieldComponent.exists()).toBe(true)

    const nameInput = textFieldComponent.find('input')
    await nameInput.setValue('Us')
    await nameInput.trigger('blur')
    expect(wrapper.html()).toContain('This field must have at least 3 characters')
  })

  it('last_name can be null', async () => {
    const wrapper = mount(SignUp, { global: { components: { TextField, Button, Alert, Card } } })
    const textFieldComponent = wrapper.findComponent({
      name: 'TextField',
      props: { name: 'last_name' }
    })
    expect(textFieldComponent.exists()).toBe(true)

    const nameInput = textFieldComponent.find('input')
    await nameInput.setValue('User')
    await nameInput.setValue('')
    await nameInput.trigger('blur')
    expect(wrapper.find('#error-message').text()).toBe('This field is required')
  })

  it('email must be a valid email', async () => {
    const wrapper = mount(SignUp, { global: { components: { TextField, Button, Alert, Card } } })
    const textFieldComponent = wrapper.findComponent({
      name: 'TextField',
      props: { name: 'email' }
    })
    expect(textFieldComponent.exists()).toBe(true)

    const nameInput = textFieldComponent.find('input')
    await nameInput.setValue('User-email')
    await nameInput.trigger('blur')
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).not.toContain('This field must be a valid email')
  })

  it('Should redirect to home after success sign up', async () => {
    const wrapper = mount(SignUp, {
      global: { components: { TextField, Button, Alert, Card }, plugins: [mockRouter] }
    })
    const nameTextField = wrapper.findComponent({ name: 'TextField', props: { name: 'name' } })
    const lastNameTextField = wrapper.findComponent({
      name: 'TextField',
      props: { name: 'last_name' }
    })
    const passwordTextField = wrapper.findComponent({
      name: 'TextField',
      props: { name: 'password' }
    })
    const emailTextField = wrapper.findComponent({ name: 'TextField', props: { name: 'email' } })

    nameTextField.find('input').setValue('User')
    lastNameTextField.find('input').setValue('Test')
    emailTextField.find('input').setValue('user@test.com')
    passwordTextField.find('input').setValue('password')
    wrapper.findComponent(Button).trigger('click')

    await flushPromises()
    await mockRouter.isReady()

    expect(mockRouter.currentRoute.value.name).toBe('home')
  })
})
