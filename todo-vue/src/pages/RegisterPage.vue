<template>
  <div>
    <h1>Register Page</h1>
    <form @submit.prevent="register" class="">
      <div>
        <label for="email">Email:</label>
        <my-input type="email" id="email" v-model="email" />
      </div>
      <div>
        <label for="password">Password:</label>
        <my-input type="password" id="password" v-model="password" />
      </div>
      <div>
        <label for="firstName">First name:</label>
        <my-input type="text" id="firstName" v-model="firstName" />
      </div>
      <div>
        <label for="lastName">Last name:</label>
        <my-input type="text" id="lastName" v-model="lastName" />
      </div>
      <div>
        <my-button style="margin-top: 15px" type="submit">Register</my-button>
      </div>
    </form>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useAuthStore } from '@/store/auth';
import MyButton from "@/components/UI/MyButton.vue";
import MyInput from "@/components/UI/MyInput.vue";


export default defineComponent({
  name: 'RegisterPage',
  components: {MyInput, MyButton},
  setup() {
    const email = ref('');
    const password = ref('');
    const firstName = ref('')
    const lastName = ref('')

    const authStore = useAuthStore();

    const register = async () => {


      await authStore.signUp({
        email: email.value,
        password: password.value,
        lastName: lastName.value,
        firstName: firstName.value,
      })
    };

    return {
      email,
      password,
      register,
      firstName,
      lastName
    };
  },
});
</script>

<style>

</style>
