<script lang="ts" setup>
import CategoriesList from "@/components/CategoriesList.vue";
import { useCategoryStore } from "@/stores/CategoryStore";
import { defineEmits, onMounted } from "vue";
import { useForumStore } from "@/stores/ForumStore";
import useReady from "@/composables/useReady";

const categoryStore = useCategoryStore();
const forumStore = useForumStore();
const { isReady, fetched } = useReady();
const readyEmit = defineEmits<{ (e: "@ready"): void }>();

onMounted(async () => {
  const categories = await categoryStore.fetchAllCategories();
  const forumIds = categories.map((c) => c.forums).flat();
  await forumStore.fetchForums(forumIds);
  fetched(readyEmit);
});
</script>

<template>
  <div v-if="isReady()" class="container">
    <h1 class="push-top">Welcome to the Forum</h1>
    <CategoriesList :categories="categoryStore.categories" />
  </div>
</template>

<style scoped></style>
