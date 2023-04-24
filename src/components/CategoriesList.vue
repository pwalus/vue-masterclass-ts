<script setup lang="ts">
import type { Forum } from "@/types/Forum";
import type { Category } from "@/types/Category";
import ForumList from "@/components/ForumList.vue";
import { useForumStore } from "@/stores/ForumStore";

const forumStore = useForumStore();
const props = defineProps<{ categories: Category[] }>();

const forumsByCategory = (category: Category): Forum[] =>
  forumStore.forums.filter((forum) => forum.categoryId === category.id);
</script>

<template>
  <div class="col-full">
    <div
      class="forum-list"
      v-for="category in props.categories"
      :key="category.id"
    >
      <h2 class="list-title">
        <RouterLink :to="{ name: 'CategoryShow', params: { id: category.id } }">
          {{ category.name }}
        </RouterLink>
      </h2>

      <ForumList :forums="forumsByCategory(category)" />
    </div>
  </div>
</template>

<style scoped></style>
