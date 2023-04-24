<script setup lang="ts">
import { useUserStore } from "@/stores/UserStore";
import PostList from "@/components/PostList.vue";
import ProfileCard from "@/components/ProfileCard.vue";
import ProfileCardEdit from "@/components/ProfileCardEdit.vue";
import type { Post } from "@/types/Post";
import { computed, defineEmits, onMounted } from "vue";
import useReady from "@/composables/useReady";
import { onBeforeRouteUpdate } from "vue-router";

const userStore = useUserStore();
const authUser = userStore.authUser;

const { isReady, fetched } = useReady();
const readyEmit = defineEmits<{ (e: "@ready"): void }>();

const props = defineProps<{ edit: Boolean }>();

const latestPosts = computed<Post[]>((): Post[] => {
  const len = userStore.authUserPosts.length;
  return userStore.authUserPosts.slice(len - 3, len).reverse();
});

onMounted(() => {
  fetched(readyEmit);
});

onBeforeRouteUpdate(async (to, from) => {
  console.log(userStore.authId);
  if (!userStore.authId) {
    return { name: "Home" };
  }
});

</script>

<template>
  <div v-if="isReady()" class="container">
    <div class="flex-grid">
      <div class="col-3 push-top">
        <ProfileCard v-if="!props.edit" />
        <ProfileCardEdit v-else :auth-user="authUser" />
      </div>

      <div class="col-7 push-top">
        <div class="profile-header">
          <span class="text-lead">{{
            `${authUser?.name}'s recent activity`
          }}</span>
          <a href="#">See only started threads?</a>
        </div>

        <hr />

        <PostList :posts="latestPosts" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
