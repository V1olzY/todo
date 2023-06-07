<template>
  <div v-if="priorities.length > 0">
    <h3>My Priorities</h3>
    <transition-group name="priority-list">
      <priority
          v-for="priority in priorities"
          :priority="priority"
          :key="priority.id"
          @remove="$emit('remove', priority)"
          @edit="$emit('edit', priority)"
          category=""/>
    </transition-group>

  </div>
  <h2 v-else style="color: red">
    The list of priorities is empty
  </h2>
</template>

<script lang="ts">

import {defineComponent} from "vue";

import {IPriority} from "@/types/IPriority";
import Priority from "@/components/priority/Priority.vue";

export default defineComponent({
  props: {
    priorities: {
      type: Array as ()=> IPriority[],
      required: true
    }
  },

  components: {Priority},


})
</script>

<style scoped>

.priority-list-move, /* apply transition to moving elements */
.priority-list-enter-active,
.priority-list-leave-active {
  transition: all 0.5s ease;
}

.priority-list-enter-from,
.priority-list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.priority-list-leave-active {
  position: absolute;
}

</style>