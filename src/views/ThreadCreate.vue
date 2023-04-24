<script setup lang="ts">
import { computed, defineEmits, onMounted, reactive } from "vue";
import { useThreadStore } from "@/stores/ThreadStore";
import type { Forum } from "@/types/Forum";
import { useForumStore } from "@/stores/ForumStore";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/UserStore";
import ThreadEditor from "@/components/ThreadEditor.vue";
import type { ThreadDto } from "@/types/dto/ThreadDto";
import useReady from "@/composables/useReady";

const router = useRouter();
const route = useRoute();
const forumId = route.params.forumId as string;

const threadStore = useThreadStore();
const forumStore = useForumStore();
const userStore = useUserStore();

const { isReady, fetched } = useReady();
const readyEmit = defineEmits<{ (e: "@ready"): void }>();

const forum = computed<Forum>(
  () => forumStore.forums.find((f) => f.id === route.params.forumId) as Forum
);
const threadDto = reactive<ThreadDto>({
  title: "",
  content: "",
  userId: userStore.authId,
  forumId: forumId,
});
const addThread = async (threadDto: ThreadDto) => {
  const thread = await threadStore.addThread(threadDto);
  await router.push({ name: "ThreadShow", params: { id: thread.id } });
};

const cancel = (): void => {
  router.push({ name: "ForumShow", params: { id: forumId } });
};

onMounted(() => {
  forumStore.fetchForum(forumId);
  fetched(readyEmit);
});
</script>

<template>
  <div v-if="isReady()" class="container">
    <div class="col-full push-top">
      <h1>
        Create new thread in <i>{{ forum?.name }}</i>
      </h1>

      <ThreadEditor
        :thread="threadDto"
        @@thread-save="addThread"
        @@thread-cancel="cancel"
      />
    </div>
  </div>
</template>

<style scoped></style>
