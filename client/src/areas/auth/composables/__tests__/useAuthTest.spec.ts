import { describe, expect, it, beforeAll, afterAll, beforeEach } from 'vitest'
import SignUpRequest from '@/auth/classes/SignUpRequest'
import { flushPromises, mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '@/core/store/user'
import { defineComponent } from 'vue'
import { useAuth } from '../useAuth'

import { server } from '@/mocks/httpServer'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterAll(() => {
  server.close()
  localStorage.clear()
})

describe('useAuth composable', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('On sign up should store the user object in the store', async () => {
    const form = new SignUpRequest()
    const authStore = useUserStore()
    const testComponent = defineComponent({
      setup() {
        const { signUp } = useAuth(form)
        return { signUp }
      }
    })
    const wrapper = mount(testComponent)
    await wrapper.vm.signUp()
    await flushPromises()

    expect(authStore.user).not.toBeNull()
    expect(authStore.user?.name).toBe('Gualberto')
    expect(authStore.user?.email).toBe('gualberto@test.com')
  })

  it('On sign in should store the user object in the store', async () => {
    const form = { email: 'gualberto@test.com', password: 'password' }
    const authStore = useUserStore()
    const testComponent = defineComponent({
      setup() {
        const { signIn } = useAuth(form)
        return { signIn }
      }
    })
    const wrapper = mount(testComponent)
    await wrapper.vm.signIn()
    await flushPromises()

    expect(authStore.user).not.toBeNull()
    expect(authStore.user?.name).toBe('Gualberto')
    expect(authStore.user?.email).toBe('gualberto@test.com')
  })
})
