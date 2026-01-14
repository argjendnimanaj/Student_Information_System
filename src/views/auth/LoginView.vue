<script setup>
import { login } from '@/services/authService'
import { useAuthStore } from '@/stores/auth'
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const usernameInput = ref(null)

const router = useRouter()
const auth = useAuthStore()

const errors = ref({
  username: '',
  password: '',
})
const serverError = ref('')

const handleLogin = async () => {
  if (!formValidation()) return

  try {
    const response = await login({
      username: username.value,
      password: password.value,
    })

    auth.login(response.user, response.token)
    router.push({ name: 'students' })
  } catch (err) {
    serverError.value = err.message
  }
}

const formValidation = () => {
  errors.value = { username: '', password: '' }

  if (!username.value) {
    errors.value.username = 'Username is required'
  }

  if (!password.value) {
    errors.value.password = 'Password is required'
  } else if (password.value.length < 6) {
    errors.value.password = 'Password must be at least 6 characters.'
  }

  return !errors.value.username && !errors.value.password
}

watch([username, password], () => {
  errors.value = { username: '', password: '' }
})

onMounted(() => {
  usernameInput.value.focus()
})
</script>

<template>
  <div class="p-4 text-lg font-semibold">
    <img src="../../assets/images/logo-hotelkey.png" alt="Logo" class="h-10 w-50" />
  </div>
  <div class="flex flex-1 items-start justify-center mt-20">
    <div class="w-full max-w-sm text-sm">
      <!-- Title -->
      <div class="flex items-center justify-center gap-2 mb-10">
        <!-- <div class="w-6 h-6 border border-gray-500"></div> -->
        <h2 class="font-bold text-2xl">Student Information System</h2>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleLogin" class="space-y-4">
        <!-- Username -->
        <div class="flex items-center gap-3">
          <label for="username" class="w-24 text-right"> Username </label>
          <input
            id="username"
            type="text"
            class="flex-1 border border-gray-400 px-2 py-1 focus:outline-none focus:border-blue-500"
            ref="usernameInput"
            v-model="username"
          />
        </div>
        <!-- Error Message -->
        <p v-if="errors.username" class="text-red-500 text-xs ml-26 -mt-px">
          {{ errors.username }}
        </p>

        <!-- Password -->
        <div class="flex items-center gap-3">
          <label for="password" class="w-24 text-right"> Password </label>
          <input
            id="password"
            type="password"
            class="flex-1 border border-gray-400 px-2 py-1 focus:outline-none focus:border-blue-500"
            v-model="password"
          />
        </div>
        <!-- Error Message -->
        <p v-if="errors.password" class="text-red-500 text-xs -mt-px ml-26">
          {{ errors.password }}
        </p>
        <p v-if="serverError" class="text-red-500 text-xs -mt-px ml-26">
          {{ serverError }}
        </p>

        <!-- Remember me -->
        <div class="flex items-center gap-2 ml-26">
          <input id="remember" type="checkbox" class="border border-gray-400" />
          <label for="remember"> Remember me </label>
        </div>

        <!-- Button -->
        <div class="ml-26">
          <button
            type="submit"
            class="flex items-center gap-2 border border-gray-400 bg-gray-200 px-4 py-1 hover:bg-gray-300 active:bg-gray-400"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
