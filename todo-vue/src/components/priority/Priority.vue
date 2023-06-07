<template>
  <div class="priority">
    <div class="priority__items">
      <div
          class="cursorName" @click="$emit('edit', priority)"
      >{{ priority.priorityName }}
      </div>
      <div style="margin-left:200px">Priority weight: {{priority.prioritySort}}</div>
    </div>

    <div class="priority__btns">

      <my-button
          @click="$emit('remove', priority)"
      >
        Delete
      </my-button>
    </div>
  </div>
</template>

<script lang="ts">

import {IPriority} from "@/types/IPriority";


export default {

  props:{
    priority: {
      type: Object as () => IPriority,
      required: true
    }
  }
}
</script>

<style scoped>

.priority{
  padding: 15px;
  border: 1px solid saddlebrown;
  border-radius: 10px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.priority__items{
  display: flex;
  flex-direction: row;
}

.priority__btns {
  display: flex;
}
</style>