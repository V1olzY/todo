<template>
  <form @submit.prevent>
    <h3><strong> <slot name="title"></slot></strong></h3>
    <my-input v-model="categoryCopy.categoryName" type="text" placeholder="Category name..." />

    <my-button
        class="btn"
        style="align-self: flex-end; margin-top: 15px; margin-bottom: 15px"
        @click="submitForm"
    >
      <slot name="buttonName"></slot>
    </my-button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {ICategory} from "@/types/ICategory";

export default defineComponent({
  props: {
    category: {
      type: Object as () => ICategory,
      required: true,
    },
  },

  data() {
    return {
      categoryCopy: { ...(this.category as ICategory) },
    };
  },

  methods: {
    submitForm() {
      this.$emit('createChange', this.categoryCopy);

      this.categoryCopy = {
        id: '',
        categoryName: '',
        categorySort: 0,
      };
    },
  },
});
</script>


<style scoped>
</style>
