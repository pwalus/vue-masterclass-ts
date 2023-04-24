<script lang="ts" setup>
import { defineEmits, onMounted } from "vue";
import useReady from "@/composables/useReady";

const { fetched } = useReady();
const readyEmit = defineEmits<{ (e: "@ready"): void }>();

onMounted(async () => {
  fetched(readyEmit);
});
</script>

<template>
  <div class="col-full text-center">
    <h1>Not Found</h1>
    <RouterLink :to="{ name: 'HomeShow' }">Back to home</RouterLink>
  </div>
</template>
