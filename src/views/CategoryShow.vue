<script setup lang="ts">
import { computed, defineEmits, onMounted } from "vue";
import { useRoute } from "vue-router";
import type { Category } from "@/types/Category";
import type { Forum } from "@/types/Forum";
import ForumList from "@/components/ForumList.vue";
import { useCategoryStore } from "@/stores/CategoryStore";
import { useForumStore } from "@/stores/ForumStore";
import useReady from "@/composables/useReady";

const categoryStore = useCategoryStore();
const forumStore = useForumStore();

const { isReady, fetched } = useReady();
const readyEmit = defineEmits<{ (e: "@ready"): void }>();

const route = useRoute();
const categoryId = route.params.id as string;

const category = computed<Category>(
  () => categoryStore.categories.find((c) => c.id === categoryId) as Category
);

const forumsByCategory = (category: Category): Forum[] =>
  forumStore.forums.filter((forum) => forum.categoryId === category.id);

onMounted(async () => {
  const category = await categoryStore.fetchCategory(categoryId);
  await forumStore.fetchForums(category.forums);
  fetched(readyEmit);
});
</script>

<template>
  <div v-if="isReady()" class="container">
    <div class="col-full" v-if="category">
      <div class="forum-list">
        <h2 class="list-title">{{ category.name }}</h2>
        <ForumList :forums="forumsByCategory(category)" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
