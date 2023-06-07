<template>
  <div>
    <h1>Todo App</h1>
    <form @submit.prevent="login">
      <div>
        <label for="email">Email:</label>
        <my-input type="email" id="email" v-model="email" />
      </div>
      <div>
        <label for="password">Password:</label>
        <my-input type="password" id="password" v-model="password" />
      </div>
      <div>
        <my-button style="margin-top: 20px" type="submit">Login</my-button>

      </div>

      <div>
        <p>Don't have an account?</p>
        <my-button style="margin-right: 10px" @click="router.push('/register')">Register</my-button>
      </div>
    </form>

  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/store/auth';
import MyInput from "@/components/UI/MyInput.vue";
import MyButton from "@/components/UI/MyButton.vue";
import {useRouter} from "vue-router";

export default {
  name: 'LoginPage',
  components: {MyButton, MyInput},

  setup() {
    const email = ref('')
    const password = ref('')
    const router = useRouter()

    const authStore = useAuthStore();

    const login = async () => {
      await authStore.login(email.value, password.value);
    };

    return {
      authStore, email, password, login, router
    }
  },

};
</script>
