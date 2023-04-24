<script setup lang="ts">
import { computed, defineEmits, onMounted } from "vue";
import { useRoute } from "vue-router";
import type { Thread } from "@/types/Thread";
import type { Post } from "@/types/Post";
import PostList from "@/components/PostList.vue";
import PostEditor from "@/components/PostEditor.vue";
import { useThreadStore } from "@/stores/ThreadStore";
import { usePostStore } from "@/stores/PostStore";
import { findById } from "@/helper";
import { useUserStore } from "@/stores/UserStore";
import useReady from "@/composables/useReady";

const route = useRoute();
const threadId = route.params.id as string;

const threadStore = useThreadStore();
const userStore = useUserStore();
const postStore = usePostStore();

const { isReady, fetched } = useReady();
const readyEmit = defineEmits<{ (e: "@ready"): void }>();

const thread = computed<Thread>(() => findById(threadStore.threads, threadId));

const threadPosts = computed<Post[]>(
  () => postStore.posts.filter((p) => p.threadId === threadId) as Post[]
);

onMounted(async () => {
  await threadStore.fetchThread(threadId);
  console.log(1);
  await userStore.fetchUser(thread.value.userId);
  console.log(2);
  const posts = await postStore.fetchPosts(thread.value.posts.map((p) => p));
  console.log(posts);
  await userStore.fetchUsers(posts.map((p) => p.userId));
  console.log(4);
  fetched(readyEmit);
  console.log(5);
});
</script>

<template>
  <div v-if="isReady()" class="container">
    <div class="col-large push-top" v-if="thread">
      <h1>{{ thread.title }}</h1>
      <RouterLink :to="{ name: 'ThreadEdit', params: { threadId: thread.id } }">
        Edit thread
      </RouterLink>

      <PostList :posts="threadPosts" />
      <PostEditor :thread-id="thread.id" />
    </div>
  </div>
</template>
