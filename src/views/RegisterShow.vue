<script setup lang="ts">
import { defineEmits, onMounted, reactive } from "vue";
import useReady from "@/composables/useReady";
import type { UserDto } from "@/types/dto/UserDto";
import { useUserStore } from "@/stores/UserStore";
import { useRouter } from "vue-router";
import firebase from "firebase/compat/app";

const router = useRouter();

const { fetched } = useReady();
const readyEmit = defineEmits<{ (e: "@ready"): void }>();

onMounted(async () => {
  fetched(readyEmit);
});

const userDto = reactive<UserDto>({
  name: "",
  username: "",
  email: "",
  password: "",
  avatar: "",
});
const register = async () => {
  await useUserStore().registerUserWithEmailAndPassword(userDto);
  await router.push("/");
};

const signInWithGoogle = async () => {
  try {
    await useUserStore().signInWithGoogle();
    await router.push("/");
  } catch (e: any) {
    alert(e.message);
  }
};
</script>

<template>
  <div class="flex-grid justify-center">
    <div class="col-2">
      <form @submit.prevent="register" class="card card-form">
        <h1 class="text-center">Register</h1>

        <div class="form-group">
          <label for="name">Full Name</label>
          <input
            v-model="userDto.name"
            id="name"
            type="text"
            class="form-input"
          />
        </div>

        <div class="form-group">
          <label for="username">Username</label>
          <input
            v-model="userDto.username"
            id="username"
            type="text"
            class="form-input"
          />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            v-model="userDto.email"
            id="email"
            type="email"
            class="form-input"
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            v-model="userDto.password"
            id="password"
            type="password"
            class="form-input"
          />
        </div>

        <div class="form-group">
          <label for="avatar">Avatar</label>
          <input
            v-model="userDto.avatar"
            id="avatar"
            type="text"
            class="form-input"
          />
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-blue btn-block">Register</button>
        </div>
      </form>
      <div class="text-center push-top">
        <button class="btn-red btn-xsmall" @click.prevent="signInWithGoogle">
          <i class="fa fa-google fa-btn"></i>Sign up with Google
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
