<template>
  <div class="flex flex-col">
    <label :for="name" v-if="label" class="text-center text-xl font-bold uppercase">
      {{ label }}
    </label>
    <input
      :name="name"
      v-model="value"
      :type="type"
      class="input input-bordered"
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
  type: {
    type: String,
    default: 'text'
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const { value, errorMessage } = useField(() => props.name);
</script>
