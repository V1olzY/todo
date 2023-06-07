<template>
  <div v-if="categories.length > 0">
    <h3>My Categories</h3>
    <transition-group name="category-list">
      <todo-category
          v-for="category in categories"
          :category="category"
          :key="category.id"
          @remove="$emit('remove', category)"
          @edit="$emit('edit', category)"
       category=""/>
    </transition-group>

  </div>
  <h2 v-else style="color: red">
    The list of categories is empty
  </h2>
</template>

<script lang="ts">
import TodoCategory from "@/components/category/Category.vue";
import {defineComponent} from "vue";
import {ICategory} from "@/types/ICategory";

export default defineComponent({
   props: {
     categories: {
       type: Array as ()=> ICategory[],
       required: true
     }
     },

  components: {TodoCategory},


})
</script>

<style scoped>

.category-list-move, /* apply transition to moving elements */
.category-list-enter-active,
.category-list-leave-active {
  transition: all 0.5s ease;
}

.category-list-enter-from,
.category-list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.category-list-leave-active {
  position: absolute;
}

</style>