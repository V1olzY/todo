<template>
  <div>
    <h1>Todo Tasks</h1>

    <div class="app__btns">
      <my-button
          @click="showDialog">
        +
      </my-button>

    </div>
    <p>Sort by: </p>
    <my-select
        v-model="selectedSort"
        :options="sortOptions"
    />


    <div>
      <modal-window v-model:show="dialogVisible">
        <task-form
            v-if="selectedTask || isCreating"
            :categories="categories"
            :priorities="priorities"
            :task="selectedTask || emptyTask"
            @createChange="createChange"
        >
          <template v-slot:title>
            {{ isCreating ? 'Create task' : 'Edit task' }}
          </template>
          <template v-slot:buttonName>
            {{ isCreating ? 'Create' : 'Save' }}
          </template>
        </task-form>
      </modal-window>
    </div>
    <div>
        <task-list
            :tasks="sortedTasks.value"
            :categories="categories"
            :priorities="priorities"
            @remove="removeTask"
            @edit="editTask"
            @update-status="updateStatus"
        />
    </div>
  </div>
</template>



<script lang="ts">

import { computed, defineComponent, ref } from "vue";
import MyDialog from "@/components/UI/ModalWindow.vue";
import MyButton from "@/components/UI/MyButton.vue";
import { useAuthStore } from "@/store/auth";
import { v4 as uuidv4 } from 'uuid';
import TaskForm from "@/components/task/TaskForm.vue";
import {ITask} from "@/types/ITask";
import {useTasks} from "@/hooks/useTasks";
import TaskList from "@/components/task/TaskList.vue";
import {useCategories} from "@/hooks/useCategories";
import {usePriorities} from "@/hooks/usePriorities";
import ModalWindow from "@/components/UI/ModalWindow.vue";

export default defineComponent({
  components: {
    ModalWindow,
    TaskList,
    TaskForm,
    MyDialog,
    MyButton,
  },

  setup() {

    const authStore = useAuthStore();
    const token = authStore.token;
    const createdAt = new Date().toISOString()
    const dueDt = new Date(2024).toISOString()

    const dialogVisible = ref(false);

    const {categories} = useCategories(token);
    const {priorities} = usePriorities(token);

    const selectedTask = ref<ITask | null>(null);
    const isCreating = ref(false);
    const selectedSort = ref('')
    const sortOptions = [
      {
        value: '1',
        name: 'High priority'
      },

      {
        value: '2',
        name: 'Low priority'
      },
      {
        value: '3',
        name: 'Task name [A-Z]'
      },
      {
        value: '4',
        name: 'Task name [Z-A]'
      },
      {
        value: '5',
        name: 'Category'
      },


    ]


    const emptyTask = computed<ITask>(() => ({
      id: "",
      taskName: "",
      taskSort: 0,
      createdDt: createdAt,
      dueDt: dueDt,
      isCompleted: false,
      isArchived: false,
      todoCategoryId: "",
      todoPriorityId: "",
      syncDt: createdAt
    }));

    const { tasks, updateTask, deleteTask, addTask, sortTasks} = useTasks(token, categories);

    // authStore.setAppUserId(appUserId.value)
    const sortedTasks = computed(() => {
      return sortTasks(selectedSort);
    });

    const showDialog = () => {
      dialogVisible.value = true;
      selectedTask.value = null;
      isCreating.value = true;
    };
    //
    const removeTask = (task: ITask) => {
      deleteTask(task.id)
    };

    const createChange = (task: ITask) => {

      if (isCreating.value) {
        task.id = uuidv4();
        console.log(task)
        addTask(task);
      } else {
        updateTask(task.id, task);
      }
      dialogVisible.value = false;
      selectedTask.value = null;
    };

    const updateStatus = (task:ITask) => {
      console.log(task.isCompleted)
      selectedTask.value = task;
      isCreating.value = false
      createChange(task)
    }


    const editTask = (task: ITask) => {
      selectedTask.value = task;
      dialogVisible.value = true;
      isCreating.value = false;
    };

    return {
      tasks,
      editTask,
      removeTask,
      dialogVisible,
      priorities,
      categories,
      selectedTask,
      emptyTask,
      showDialog,
      isCreating,
      createChange,
      updateStatus,
      sortOptions,
      selectedSort,
      sortedTasks,
      sortTasks
    };
  },
});
</script>

<style>

form {
  display: flex;
  flex-direction: column;
}
</style>