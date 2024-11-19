<script setup lang="ts">
import { useUserStore } from '@/core/store/user'
import { useRouter } from 'vue-router'

const { clearUser } = useUserStore()
const router = useRouter()

const logout = () => {
  clearUser()
  router.push('/auth/sign-in')
}
</script>

<template>
  <div class="navbar bg-primary shadow flex align-middle justify-between text-white">
    <div>
      <router-link to="/" class="btn btn-ghost text-xl">CH-4 App</router-link>
    </div>
    <div>
      <ul class="menu menu-horizontal px-1">
        <li><router-link to="/about" class="text-white">Link</router-link></li>
        <li>
          <details>
            <summary>Parent</summary>
            <ul class="bg-base-100 rounded-t-none p-2 text-black">
              <li><a>Link 1</a></li>
              <li><a>Link 2</a></li>
            </ul>
          </details>
        </li>
      </ul>
    </div>
    <div class="gap-2">
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-black"
        >
          <li>
            <a class="justify-between">
              Profile
              <span class="badge">New</span>
            </a>
          </li>
          <li><a>Settings</a></li>
          <li><a @click="logout">Log out</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
