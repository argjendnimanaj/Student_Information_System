<script setup>
import { useRouter } from 'vue-router'
import ListItem from './assets/components/ListItem.vue'
import { useAuthStore } from './stores/auth'

const auth = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  auth.logout()
  router.push({ name: 'login' })
}

const routes = [
  { name: 'home', label: 'Home' },
  { name: 'students', label: 'Students' },
  { name: 'archive', label: 'Archive' },
  { name: 'help', label: 'Help' },
]
</script>

<template>
  <div class="min-h-screen flex flex-col bg-white px-3">
    <nav v-if="auth.token" class="flex flex-row justify-between items-center py-3">
      <h1 class="font-3xl font-semibold">Student Information System</h1>
      <div class="flex flex-row items-center justify-center">
        <img src="./assets/images/profile-icon.jpg" alt="Profile Icon" width="40px" height="40px" />
        <div class="flex flex-col justify-center items-center">
          <h3>{{ auth.username }}</h3>
          <button @click="handleLogout" class="text-blue-500 underline cursor-pointer">
            Logout
          </button>
        </div>
      </div>
    </nav>
    <hr />

    <ul v-if="auth.token" class="flex items-center justify-start">
      <ListItem
        v-for="route in routes"
        :routeName="route.name"
        :label="route.label"
        :key="route.name"
      />
    </ul>

    <router-view />
  </div>
</template>
