<script setup lang="ts">
import type { Post } from "@/types/Post";
import { reactive } from "vue";
import { usePostStore } from "@/stores/PostStore";
import { useUserStore } from "@/stores/UserStore";
import type { PostDto } from "@/types/dto/PostDto";

const postStore = usePostStore();
const userStore = useUserStore();

const props = defineProps<{ post?: Post; threadId: string }>();
let postDto = reactive<PostDto>({
  id: "",
  text: "",
  threadId: props.threadId,
  userId: userStore.authId,
});

if (props.post) {
  postDto = reactive<PostDto>({
    id: props.post.id,
    text: props.post.text,
    threadId: props.threadId,
    userId: userStore.authId,
  });
}

const emit = defineEmits<{ (e: "@post-added", post: Post): void }>();

const addPost = async (): Promise<void> => {
  const post = await postStore.save(postDto);
  emit("@post-added", post);
};
</script>

<template>
  <div class="col-full">
    <form @submit.prevent="addPost">
      <div class="form-group">
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          class="form-input"
          v-model="postDto.text"
        />
      </div>
      <div class="form-actions">
        <button class="btn-blue">
          {{ postDto.id ? "Update Post" : "Submit post" }}
        </button>
      </div>
    </form>
  </div>
</template>
