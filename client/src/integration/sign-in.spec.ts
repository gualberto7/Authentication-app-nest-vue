import { describe, expect, it } from 'vitest'
import { defineComponent } from 'vue'
import { mount, flushPromises } from '@vue/test-utils'
import { useAuth } from '@/areas/auth/composables/useAuth'
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '@/core/store/user'

describe('Sign In', () => {
  it('should receive error message when invalid credentials', async () => {
    setActivePinia(createPinia())
    const testComponent = defineComponent({
      setup() {
        const { signIn, errorMessage } = useAuth({
          email: 'gc@test.com',
          password: 'password123'
        })
        return { signIn, errorMessage }
      }
    })
    const wrapper = mount(testComponent)
    await wrapper.vm.signIn()
    await flushPromises()
    expect(wrapper.vm.errorMessage).toBe('Invalid credentials')
  })

  it('should sign in successfully', async () => {
    setActivePinia(createPinia())
    const authStore = useUserStore()
    const testComponent = defineComponent({
      setup() {
        const { signIn, errorMessage } = useAuth({
          email: 'gualberto@test.com',
          password: 'password123'
        })
        return { signIn, errorMessage }
      }
    })
    const wrapper = mount(testComponent)
    await wrapper.vm.signIn()
    await flushPromises()
    expect(authStore.user?.name).toBe('Gualberto')
    expect(wrapper.vm.errorMessage).not.toBe('Invalid credentials')
  })
})
