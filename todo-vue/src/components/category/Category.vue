<template>
  <div class="category">
    <div>
      <div class="cursorName" @click="$emit('edit', this.category)">{{ category.categoryName }}</div>
    </div>

    <div class="category__btns">


      <my-button @click="$emit('remove', category)">Delete</my-button>
    </div>
  </div>
</template>

<script lang="ts">
import { ICategory } from "@/types/ICategory";

export default {
  props: {
    category: {
      type: Object as () => ICategory,
      required: true
    }
  },
};
</script>

<style scoped>
.category {
  padding: 15px;
  border: 1px solid saddlebrown;
  border-radius: 10px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}


.category__btns {
  display: flex;
}
</style>
