<script setup lang="ts">
import type { User } from "@/types/User";
import { ref } from "vue";
import { useUserStore } from "@/stores/UserStore";
import { useRouter } from "vue-router";

const router = useRouter();

const userStore = useUserStore();

const user = ref<User>({ ...userStore.authUser });

const updateUser = (): void => {
  userStore.setUser({ ...user.value }, userStore.authId);
  router.push({ name: "ProfileShow" });
};

const cancel = (): void => {
  router.push({ name: "ProfileShow" });
};
</script>

<template>
  <div class="profile-card">
    <form>
      <p class="text-center">
        <img
          :src="user.avatar"
          :alt="user.name"
          class="avatar-xlarge img-update"
        />
      </p>

      <div class="form-group">
        <input
          type="text"
          v-model="user.username"
          placeholder="Username"
          class="form-input text-lead text-bold"
        />
      </div>

      <div class="form-group">
        <input
          type="text"
          v-model="user.name"
          placeholder="Full Name"
          class="form-input text-lead"
        />
      </div>

      <div class="form-group">
        <label for="user_bio">Bio</label>
        <textarea
          class="form-input"
          id="user_bio"
          placeholder="Write a few words about yourself."
          v-model="user.bio"
        ></textarea>
      </div>

      <div class="stats">
        <span>{{ userStore.authUserPosts.length }} posts</span>
        <span>{{ userStore.authUserThreads.length }} threads</span>
      </div>

      <hr />

      <div class="form-group">
        <label class="form-label" for="user_website">Website</label>
        <input
          autocomplete="off"
          class="form-input"
          id="user_website"
          v-model="user.website"
        />
      </div>

      <div class="form-group">
        <label class="form-label" for="user_email">Email</label>
        <input
          autocomplete="off"
          class="form-input"
          id="user_email"
          v-model="user.email"
        />
      </div>

      <div class="form-group">
        <label class="form-label" for="user_location">Location</label>
        <input
          autocomplete="off"
          class="form-input"
          id="user_location"
          v-model="user.location"
        />
      </div>

      <div class="btn-group space-between">
        <button class="btn-ghost" @click.prevent="cancel">Cancel</button>
        <button type="submit" class="btn-blue" @click.prevent="updateUser">
          Save
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
