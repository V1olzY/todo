<template>
  <div>
    <h1>Priorities</h1>

    <div class="app__btns">
      <my-button
          @click="showDialog">
        +
      </my-button>

    </div>
    <div>
      <modal-window v-model:show="dialogVisible">

        <priority-form
            v-if="selectedPriority || isCreating"
            :priority="selectedPriority || emptyPriority"
            :isCreating="isCreating"
            @createChange="createChange"
        >
          <template v-slot:title>
            {{ isCreating ? 'Create priority' : 'Edit priority' }}
          </template>
          <template v-slot:buttonName>
            {{ isCreating ? 'Create' : 'Save' }}
          </template>
        </priority-form>
      </modal-window>
    </div>


    <priority-list
        :priorities="priorities"
        @remove="removePriority"
        @edit="editPriority"
    />
  </div>
</template>



<script lang="ts">

import { computed, defineComponent, ref } from "vue";
import MyDialog from "@/components/UI/ModalWindow.vue";
import MyButton from "@/components/UI/MyButton.vue";
import { useAuthStore } from "@/store/auth";
import { v4 as uuidv4 } from 'uuid';

import Priority from "@/components/priority/Priority.vue";
import {IPriority} from "@/types/IPriority";
import {usePriorities} from "@/hooks/usePriorities";
import PriorityList from "@/components/priority/PriorityList.vue";
import PriorityForm from "@/components/priority/PriorityForm.vue";
import ModalWindow from "@/components/UI/ModalWindow.vue";

export default defineComponent({
  components: {
    ModalWindow,
    PriorityForm,
    PriorityList,
    Priority,
    MyDialog,
    MyButton,

  },

  setup() {
    const dialogVisible = ref(false);
    const selectedPriority = ref<IPriority | null>(null);
    const isCreating = ref(false);
    const emptyPriority = computed<IPriority>(() => ({
      id: '',
      priorityName: '',
      prioritySort: 0,
    }));

    const authStore = useAuthStore();
    const token = authStore.token;
    const {appUserId, priorities, deletePriority, addPriority, updatePriority } =
        usePriorities(token);

    authStore.setAppUserId(appUserId.value)

    const showDialog = () => {
      dialogVisible.value = true;
      selectedPriority.value = null;
      isCreating.value = true;
    };

    const removePriority = (priority: IPriority) => {
      deletePriority(priority.id);
    };

    const createChange = (priority: IPriority) => {

      if (isCreating.value) {
        priority.id = uuidv4();
        addPriority(priority);
      } else {
        updatePriority(priority.id, priority);
      }
      dialogVisible.value = false;
      selectedPriority.value = null;
    };

    const editPriority = (priority: IPriority) => {
      selectedPriority.value = priority;
      dialogVisible.value = true;
      isCreating.value = false;
    };

    return {
      priorities,
      removePriority,
      showDialog,
      emptyPriority,
      dialogVisible,
      editPriority,
      isCreating,
      selectedPriority,
      createChange,
    };
  },
});
</script>

<style>

</style>