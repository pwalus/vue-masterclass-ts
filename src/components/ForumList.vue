<script setup lang="ts">
import type { Forum } from "@/types/Forum";

const props = defineProps<{ forums: Forum[] }>();
</script>

<template>
  <div class="forum-listing" v-for="forum in props.forums" :key="forum.id">
    <div class="forum-details">
      <RouterLink
        :to="{ name: 'ForumShow', params: { id: forum.id } }"
        class="text-xlarge"
        >{{ forum.name }}
      </RouterLink>
      <p>{{ forum.description }}</p>
    </div>

    <div class="threads-count">
      <p>
        <span class="count">
          {{ forum.threads?.length }}
        </span>
        {{ forum.threads?.length > 1 ? "threads" : "thread " }}
      </p>
    </div>

    <div class="last-thread">
      <img
        class="avatar"
        src="https://pbs.twimg.com/profile_images/719242842598699008/Nu43rQz1_400x400.jpg"
        alt=""
      />
      <div class="last-thread-details">
        <a href="thread.html">Post Reactions</a>
        <p class="text-xsmall">
          By <a href="profile.html">Rolf Haug</a>, a month ago
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
