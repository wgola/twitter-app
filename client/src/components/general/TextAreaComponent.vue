<template>
  <div class="flex flex-col">
    <label :for="name" v-if="label" class="text-xl font-bold">
      {{ label }}
    </label>
    <textarea
      :name="name"
      v-model="value"
      class="textarea textarea-bordered h-52"
      :disabled="disabled"
    />
    <p class="h-8 text-error italic text-center m-1">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { useField } from 'vee-validate';

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  label: {
    type: String
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const { value, errorMessage } = useField(() => props.name);
</script>
