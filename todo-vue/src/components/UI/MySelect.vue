<template>
  <select :value="modelValue" @change="changeOption" class="my-select">
    <option disabled value="">Choose from list</option>
    <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
    >
      {{ option.name }}
    </option>
  </select>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import {IOption} from "@/types/IOption";

export default defineComponent({
  name: 'MySelect',
  props: {
    modelValue: {
      type: String,
    },
    options: {
      type: Array as PropType<IOption[]>,
      default: () => [],
    },
  },
  methods: {
    changeOption(event: Event) {
      const selectedValue = (event.target as HTMLSelectElement).value;
      this.$emit('update:modelValue', selectedValue);
    },
  },
});
</script>

<style scoped>
.my-select {
  width: 300px;
  border: 1px solid teal;
  border-radius: 5px;
  padding: 5px 10px;
margin-top: 10px;
}
</style>
