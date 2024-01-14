<template>
  <div class="text-red-300">Hello world!</div>
  <button @click="getMessageFromApi">Get message</button>
  <p>{{ message }}</p>
</template>

<script>
import { ref } from 'vue';
import { getRoot } from '@/services/testService';

export default {
  setup() {
    const message = ref('');

    const getMessageFromApi = async () => {
      const response = await getRoot();
      message.value = response.data.msg;
    };

    return {
      message,
      getMessageFromApi
    };
  }
};
</script>
