<template >

  <div class="app">
    <navbar/>
    <router-view/>
  </div>

</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.app {
  border: 1px solid coral;
  margin-right: 25%;
  margin-left: 25%;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 2px 2px 4px gray;
}

.app__btns {
  display: flex;
  justify-content: space-between;
  margin: 5px
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
}

.cursorName{
  cursor: pointer;
}

</style>

<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
</script>