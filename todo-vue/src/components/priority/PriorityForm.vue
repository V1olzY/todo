<template>
  <div>
    <form @submit.prevent>
      <h3><strong> <slot name="title"></slot></strong></h3>
      <my-input
          v-model="priorityCopy.priorityName"
          type="text"
          placeholder="Priority name...."
      />
      <div>
        <p>Importance of priority: [0-10]</p>
      <my-input class="margin-right: 5px"
          v-model="priorityCopy.prioritySort"
          type="text"
          placeholder="Priority level...."
      />
      </div>

      <my-button
          class="btn"
          style="align-self: flex-end; margin-top: 15px; margin-bottom: 15px"
          @click="submitForm"
      >
        <slot name="buttonName"></slot>
      </my-button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {IPriority} from "@/types/IPriority";

export default defineComponent({
  props: {
    priority: {
      type: Object as () => IPriority,
      required: true,
    },
  },

  data() {
    return {
      priorityCopy: { ...(this.priority as IPriority) },
    };
  },

  methods: {
    submitForm() {
      this.$emit('createChange', this.priorityCopy);

      this.priorityCopy = {
        id: '',
        priorityName: '',
        prioritySort: 0,
      };
    },
  },
});
</script>

<style scoped>



</style>