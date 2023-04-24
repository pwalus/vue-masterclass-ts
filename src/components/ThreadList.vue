<script setup lang="ts">
import type { Thread } from "@/types/Thread";
import type { User } from "@/types/User";
import { useUserStore } from "@/stores/UserStore";

const props = defineProps<{ threads: Thread[] }>();
const userStore = useUserStore();

const userById = (userId: string): User =>
  userStore.users.find((u) => u.id === userId) as User;
</script>

<template>
  <div class="col-full">
    <div class="thread-list">
      <h2 class="list-title">Threads</h2>
      <div v-for="thread in props.threads" :key="thread.id" class="thread">
        <div>
          <p>
            <RouterLink
              :to="{ name: 'ThreadShow', params: { id: thread.id } }"
              >{{ thread.title }}</RouterLink
            >
          </p>
          <p class="text-faded text-xsmall">
            By <a href="profile.html">{{ userById(thread.userId)?.name }}</a
            >, <BaseDate :timestamp="thread.publishedAt" />.
          </p>
        </div>

        <div class="activity">
          <p class="replies-count">{{ thread.posts.length }} replies</p>
          <img
            class="avatar-medium"
            :src="userById(thread.userId)?.avatar"
            alt=""
          />

          <div>
            <p class="text-xsmall">
              <a href="profile.html">{{ userById(thread.userId)?.name }}</a>
            </p>
            <p class="text-xsmall text-faded">
              <BaseDate :timestamp="thread.publishedAt" />
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
