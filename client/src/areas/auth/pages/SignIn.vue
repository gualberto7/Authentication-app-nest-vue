<script setup lang="ts">
import { reactive } from 'vue'
import { useAuth } from '../composables/useAuth'

const form = reactive({
  model: {
    email: '',
    password: ''
  }
})

const { signIn, errorMessage } = useAuth(form)
</script>

<template>
  <div class="sign-in">
    <Card size="lg" title="Sign In">
      <form @submit.prevent="signIn">
        <div class="mt-4">
          <Alert v-if="errorMessage" :message="errorMessage" emphasis="error" />
        </div>

        <div class="my-7">
          <TextField v-model="form.model.email" label="Email" name="email" placeholder="Email" />
        </div>
        <div class="my-7">
          <TextField
            v-model="form.model.password"
            label="Password"
            name="password"
            type="password"
            placeholder="Password"
          />
        </div>
        <div>
          <Button emphasis="primary" size="md" type="submit" data-testid="signin-button"
            >Sign In</Button
          >
        </div>
        <div class="mt-4">
          <p>
            Don't have an account?
            <router-link to="/auth/sign-up" data-testid="signup-link">Sign Up</router-link>
          </p>
        </div>
      </form>
    </Card>
  </div>
</template>

<style scoped>
.sign-in {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
