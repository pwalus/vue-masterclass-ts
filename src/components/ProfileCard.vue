<script setup lang="ts">
import { useUserStore } from "@/stores/UserStore";
import { computed } from "vue";

const userStore = useUserStore();
const authUser = userStore.authUser;

const userPostsCount = computed<number>(() => userStore.authUserPosts.length);
const userThreadsCount = computed<number>(
  () => userStore.authUserThreads.length
);
</script>

<template>
  <div v-if="authUser">
    <div class="profile-card">
      <p class="text-center">
        <img
          :src="authUser.avatar"
          :alt="authUser.name"
          class="avatar-xlarge"
        />
      </p>

      <h1 class="title">{{ authUser.username }}</h1>
      <p class="text-lead">{{ authUser.name }}</p>
      <p class="text-justify">No bio specified.</p>
      <span class="online">joker is online</span>

      <div class="stats">
        <span>{{ userPostsCount }} posts</span>
        <span>{{ userThreadsCount }} threads</span>
      </div>

      <hr />

      <p class="text-large text-center">
        <i class="fa fa-globe"></i> <a href="#">batman.com</a>
      </p>
    </div>
    <p class="text-xsmall text-faded text-center">
      Member since june 2003, last visited 4 hours ago
    </p>

    <div class="text-center">
      <hr />
      <RouterLink :to="{ name: 'ProfileEdit' }" class="btn-green btn-small">
        Edit Profile
      </RouterLink>
    </div>
  </div>
</template>

<style scoped></style>
