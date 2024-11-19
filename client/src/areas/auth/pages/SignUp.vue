<script setup lang="ts">
import SignUpRequest from '../classes/SignUpRequest'
import { useAuth } from '../composables/useAuth'

const form = new SignUpRequest()
const { signUp } = useAuth(form)
</script>

<template>
  <div class="sign-in">
    <Card size="lg" title="Sign Up">
      <div class="my-3">
        <TextField
          v-model="form.model.name"
          label="Name"
          name="name"
          placeholder="Name"
          :error="form.errors.name"
        />
      </div>
      <div class="my-3">
        <TextField
          v-model="form.model.last_name"
          label="Last Name"
          name="last_name"
          placeholder="Last Name"
          :error="form.errors.last_name"
        />
      </div>
      <div class="my-3">
        <TextField
          v-model="form.model.email"
          label="Email"
          name="email"
          type="email"
          placeholder="Email"
          :error="form.errors.email"
        />
      </div>
      <div class="my-3">
        <TextField
          v-model="form.model.password"
          label="Password"
          name="password"
          type="password"
          placeholder="Password"
          :error="form.errors.password"
        />
      </div>
      <div>
        <Button
          @click="signUp"
          emphasis="primary"
          size="md"
          :disabled="!form.isValid"
          data-testid="signup-button"
          >Sign Up</Button
        >
      </div>
      <div class="mt-4">
        <p>
          Already have an account?
          <router-link to="/auth/sign-in" data-testid="signin-link">Sign In</router-link>
        </p>
      </div>
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
