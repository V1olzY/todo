<template>
  <div class="task" >

    <div class="task__items">
      <div class="cursorName " @click="$emit('edit', this.task)">{{ task.taskName }}</div>
      <div class="task__item">Category: {{categoryName}}</div>
      <div class="task__item">Priority: {{priorityName}}</div>
    </div>


    <div class="task__btns">
      <div>
        <input class="check" type="checkbox" v-model="task.isCompleted" @change="$emit('update-status', this.task)" />
        <div :class="{ 'completed': task.isCompleted }"></div>
      </div>

      <my-button @click="$emit('remove', task)">Delete</my-button>
    </div>
  </div>
</template>

<script lang="ts">

import {ITask} from "@/types/ITask";

export default {
  props: {
    task: {
      type: Object as () => ITask,
      required: true
    },
    categoryName: {
      type: String,
      required: true
    },
    priorityName: {
      type: String,
      required: true
    }
  },
};
</script>

<style scoped>
.task {
  padding: 15px;
  border: 1px solid saddlebrown;
  border-radius: 10px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.task__btns {
  display: flex;
}

.task__items{
  display: flex;
  flex-direction: row;

}

.task__item{
  margin-left:60px;
}

.check{
  padding: 10px 15px;
  margin-top: 10px;
  margin-right: 15px;
  width: 25px;
  height: 25px;

}
</style>
