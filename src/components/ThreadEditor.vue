<script setup lang="ts">
import { reactive } from "vue";
import type { ThreadDto } from "@/types/dto/ThreadDto";

const props = defineProps<{ thread?: ThreadDto }>();
let thread = reactive<ThreadDto>({ title: "", content: "" });

if (props.thread !== undefined) {
  thread = reactive<ThreadDto>(props.thread as ThreadDto);
}

const emit = defineEmits<{
  (e: "@thread-save", thread: ThreadDto): void;
  (e: "@thread-cancel"): void;
}>();
const save = () => emit("@thread-save", thread);
const cancel = () => emit("@thread-cancel");
</script>

<template>
  <form @submit.prevent="save">
    <div class="form-group">
      <label for="thread_title">Title:</label>
      <input
        type="text"
        id="thread_title"
        class="form-input"
        name="title"
        v-model="thread.title"
      />
    </div>

    <div class="form-group">
      <label for="thread_content">Content:</label>
      <textarea
        id="thread_content"
        class="form-input"
        name="content"
        rows="8"
        cols="140"
        v-model="thread.content"
      ></textarea>
    </div>

    <div class="btn-group">
      <button class="btn btn-ghost" @click.prevent="cancel">Cancel</button>
      <button class="btn btn-blue" type="submit" name="Publish">Publish</button>
    </div>
  </form>
</template>

<style scoped></style>
