<template>

  <button class="btn">
    <slot></slot>
  </button>

</template>

<script>
export default {
  name: "my-button"
}
</script>

<style scoped>
.btn {
  padding: 10px 15px;
  background: none;
  color: teal;
  border: 2px solid purple;
  border-radius: 15px;
  box-shadow: 2px 2px 4px gray;;
  cursor:pointer;
}
</style>