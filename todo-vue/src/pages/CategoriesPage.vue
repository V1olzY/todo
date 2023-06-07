<template>
  <div>
    <h1>Categories</h1>

    <div class="app__btns">
      <my-button
          @click="showDialog">
        +
      </my-button>

    </div>
    <div>
      <modal-window v-model:show="dialogVisible">

        <category-form
            v-if="selectedCategory || isCreating"
            :category="selectedCategory || emptyCategory"
            :isCreating="isCreating"
            @createChange="createChange"
        >
          <template v-slot:title>
            {{ isCreating ? 'Create category' : 'Edit category' }}
          </template>
          <template v-slot:buttonName>
            {{ isCreating ? 'Create' : 'Save' }}
          </template>
        </category-form>

      </modal-window>
    </div>


    <category-list
        :categories="categories"
        @remove="removeCategory"
        @edit="editCategory"
    />
  </div>
</template>



<script lang="ts">
import { useCategories } from "@/hooks/useCategories";
import { computed, defineComponent, ref } from "vue";
import MyDialog from "@/components/UI/ModalWindow.vue";
import MyButton from "@/components/UI/MyButton.vue";
import CategoryForm from "@/components/category/CategoryForm.vue";
import CategoryList from "@/components/category/CategoryList.vue";
import { useAuthStore } from "@/store/auth";
import { v4 as uuidv4 } from 'uuid';
import {ICategory} from "@/types/ICategory";

export default defineComponent({
  components: {
    CategoryList,
    MyDialog,
    MyButton,
    CategoryForm
  },

  setup() {
    const dialogVisible = ref(false);
    const selectedCategory = ref<ICategory | null>(null);
    const isCreating = ref(false);
    const emptyCategory = computed<ICategory>(() => ({
      id: '',
      categoryName: '',
      categorySort: 0,
    }));

    const authStore = useAuthStore();
    const token = authStore.token;
    const { categories, deleteCategory, addCategory, updateCategory } =
        useCategories(token);

    const showDialog = () => {
      dialogVisible.value = true;
      selectedCategory.value = null;
      isCreating.value = true;
    };

    const removeCategory = (category: ICategory) => {
      deleteCategory(category.id);
    };

    const createChange = (category: ICategory) => {


      if (isCreating.value) {

        category.id = uuidv4();
        addCategory(category);
      } else {
        updateCategory(category.id, category);
      }
      dialogVisible.value = false;
      selectedCategory.value = null;
    };

    const editCategory = (category: ICategory) => {
      selectedCategory.value = category;
      dialogVisible.value = true;
      isCreating.value = false;
    };

    return {
      categories,
      removeCategory,
      showDialog,
      emptyCategory,
      dialogVisible,
      editCategory,
      isCreating,
      selectedCategory,
      createChange,
    };
  },
});
</script>

<style>


.app__btns {
  display: flex;
  justify-content: space-between;
  margin: 5px
}

form {
  display: flex;
  flex-direction: column;
}
</style>