<template>
  <div v-if="isLoggedIn" class="navbar">
    <div><h2>Todo</h2></div>
    <div class="navbar__btns">

      <my-button style="margin-right: 30px" @click="router.push('/tasks')">Tasks</my-button>
      <my-button style="margin-right: 30px" @click="router.push('/categories')">Categories</my-button>
      <my-button style="margin-right: 10px" @click="router.push('/priorities')">Priorities</my-button>
      <my-button class="logout" style="margin-left: 90px" @click="logOut">LogOut</my-button>
    </div>
  </div>
</template>

<script lang="ts">
import { useAuthStore } from "@/store/auth";
import { useRouter } from "vue-router";
import MyButton from "@/components/UI/MyButton.vue";
import { ref, watch } from "vue";

export default {
  components: { MyButton },

  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const isLoggedIn = ref(authStore.isLoggedIn);

    const logOut = () => {
      authStore.logout();
    };

    // Watch the login status and update the isLoggedIn ref accordingly
    watch(() => authStore.isLoggedIn, (value) => {
      isLoggedIn.value = value;
    });

    return {
      router,
      isLoggedIn,
      logOut,
    };
  },
}
</script>


<style scoped>
.navbar {
  display: flex;
  align-items: center;
  padding: 0 15px;
}

.navbar__btns {
  margin-left: auto;
  border-radius: 10px;
}

.logout{
  border-color: red;
}
</style>
