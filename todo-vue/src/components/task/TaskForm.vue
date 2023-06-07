<template>
  <div>
    <form @submit.prevent>
      <h3><strong> <slot name="title"></slot></strong></h3>
      <my-input
          v-model="taskCopy.taskName"
          type="text"
          placeholder="Name"
      />

      <div>
        <p> Category: </p>
        <my-select
            v-model="taskCopy.todoCategoryId"
            :options="categoryOptions"
        ></my-select>
      </div>

      <div>
        <p> Priority:  </p>
        <my-select
            v-model="taskCopy.todoPriorityId"
            :options="priorityOptions"
        ></my-select>
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
import { ITask } from '@/types/ITask';
import { ICategory } from '@/types/ICategory';
import { IPriority } from '@/types/IPriority';
import MySelect from '@/components/UI/MySelect.vue';
import Priority from "@/components/priority/Priority.vue";
import {IOption} from '@/types/IOption'
import task from "@/components/task/Task.vue";

export default defineComponent({
  components: {Priority, MySelect },
  props: {
    task: {
      type: Object as () => ITask,
      required: true,
    },
    categories: {
      type: Array as () => ICategory[],
      required: true,
    },
    priorities: {
      type: Array as () => IPriority[],
      required: true,
    },
  },

  data() {
    return {
      taskCopy: { ...(this.task as ITask) },
    };
  },

  computed: {
    categoryOptions(): IOption[] {
      return this.categories.map((category: ICategory) => ({
        value: category.id,
        name: category.categoryName,
      }));
    },
    priorityOptions(): IOption[] {
      return this.priorities.map((priority: IPriority) => ({
        value: priority.id,
        name: priority.priorityName,
      }));
    },
  },

  methods: {
    submitForm() {
      const taskPriority = this.priorities.filter((priority) => priority.id === this.taskCopy.todoPriorityId )[0]
      this.taskCopy.taskSort =  taskPriority.prioritySort
      this.$emit('createChange', this.taskCopy);

      this.taskCopy = {
        id: '',
        taskName: '',
        taskSort: 0,
        isCompleted: false,
        isArchived: false,
        todoCategoryId: '',
        todoPriorityId: '',
      };
    },
  },
});

</script>

<style scoped>

</style>
