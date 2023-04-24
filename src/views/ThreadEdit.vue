<script setup lang="ts">
import {computed, defineEmits, onMounted, reactive} from "vue";
import { useThreadStore } from "@/stores/ThreadStore";
import { useRoute, useRouter } from "vue-router";
import ThreadEditor from "@/components/ThreadEditor.vue";
import type { ThreadDto } from "@/types/dto/ThreadDto";
import type { Thread } from "@/types/Thread";
import useReady from "@/composables/useReady";

const router = useRouter();
const route = useRoute();
const threadId = route.params.threadId as string;

const threadStore = useThreadStore();

const { isReady, fetched } = useReady();
const readyEmit = defineEmits<{ (e: "@ready"): void }>();

const thread = computed<Thread>(
  () =>
    threadStore.threads.find((t) => t.id === route.params.threadId) as Thread
);
const threadDto = reactive<ThreadDto>({
  title: thread.value?.title,
  content: "",
  userId: thread.value?.userId,
  forumId: thread.value?.forumId,
});

const editThread = async () => {
  await threadStore.updateThread(thread.value.id, threadDto);
  await router.push({ name: "ThreadShow", params: { id: thread.value.id } });
};

const cancel = (): void => {
  router.push({ name: "ThreadShow", params: { id: thread.value.id } });
};

onMounted(() => {
  threadStore.fetchThread(threadId);
  fetched(readyEmit);
});
</script>

<template>
  <div v-if="isReady()" class="container">
    <div class="col-full push-top" v-if="thread">
      <h1>
        Editing <i>{{ thread.title }}</i>
      </h1>

      <ThreadEditor
        :thread="threadDto"
        @@thread-save="editThread"
        @@thread-cancel="cancel"
      />
    </div>
  </div>
</template>

<style scoped></style>
