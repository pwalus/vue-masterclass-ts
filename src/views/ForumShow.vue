<script setup lang="ts">
import ThreadList from "@/components/ThreadList.vue";
import { computed, defineEmits, onMounted } from "vue";
import type { Thread } from "@/types/Thread";
import type { Forum } from "@/types/Forum";
import { useRoute } from "vue-router";
import { useForumStore } from "@/stores/ForumStore";
import { useThreadStore } from "@/stores/ThreadStore";
import { useUserStore } from "@/stores/UserStore";
import useReady from "@/composables/useReady";

const route = useRoute();
const forumId = route.params.id as string;

const forumStore = useForumStore();
const threadStore = useThreadStore();
const userStore = useUserStore();

const { isReady, fetched } = useReady();
const readyEmit = defineEmits<{ (e: "@ready"): void }>();

const forum = computed<Forum>(
  () => forumStore.forums.find((f) => f.id === forumId) as Forum
);
const threads = computed<Thread[]>(() => {
  if (!forum.value) return [];
  return threadStore.threads.filter((t) => t.forumId === forumId) as Thread[];
});

onMounted(async () => {
  const forum = await forumStore.fetchForum(forumId);
  const threads = await threadStore.fetchThreads(forum.threads);
  await userStore.fetchUsers(threads.map((t) => t.userId));
  fetched(readyEmit);
});
</script>

<template>
  <div v-if="isReady()" class="container">
    <div class="col-full push-top" v-if="forum">
      <div class="forum-header">
        <div class="forum-details">
          <h1>{{ forum.name }}</h1>
          <p class="text-lead">{{ forum.description }}</p>
        </div>
        <RouterLink
          :to="{ name: 'ThreadCreate', params: { forumId: forum.id } }"
          class="btn-green btn-small"
        >
          Start a thread
        </RouterLink>
      </div>
    </div>

    <div class="col-full push-top">
      <ThreadList :threads="threads" />
    </div>
  </div>
</template>

<style scoped></style>
