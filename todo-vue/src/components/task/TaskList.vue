<template>
  <div v-if="tasks.length > 0">
    <h3>My Tasks</h3>
    <transition-group name="task-list">
      <task
          v-for="task in tasks"
          :task="task"
          :key="task.id"
          :categoryName="getCategoryName(task)"
          :priorityName="getPriorityName(task)"
          @remove="$emit('remove', task)"
          @edit="$emit('edit', task)"
          @update-status="$emit('update-status', task);"

      />
    </transition-group>

  </div>
  <h2 v-else style="color: red">
    The list of tasks is empty
  </h2>
</template>

<script lang="ts">

import {defineComponent} from "vue";

import {ITask} from "@/types/ITask";
import task from "@/components/task/Task.vue";
import Task from "@/components/task/Task.vue";
import {IPriority} from "@/types/IPriority";
import {ICategory} from "@/types/ICategory";
import Priority from "@/components/priority/Priority.vue";

export default defineComponent({
  computed: {
    task() {
      return task
    }
  },
  props: {
    tasks: {
      type: Array as ()=> ITask[],
      required: true
    },
    priorities: {
      type: Array as ()=> IPriority[],
      required: true
    },
    categories: {
      type: Array as ()=> ICategory[],
      required: true
    }
  },

  methods:{
    getCategoryName(task: ITask){
      return  this.categories.filter(category=> (category.id === task.todoCategoryId))[0].categoryName

    },

    getPriorityName(task: ITask){
      return this.priorities.filter(priority=> (priority.id === task.todoPriorityId))[0].priorityName
    }
  },

  components: {Priority, Task},


})
</script>

<style scoped>

.task-list-move, /* apply transition to moving elements */
.task-list-enter-active,
.task-list-leave-active {
  transition: all 0.5s ease;
}

.task-list-enter-from,
.task-list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.task-list-leave-active {
  position: absolute;
}

</style>