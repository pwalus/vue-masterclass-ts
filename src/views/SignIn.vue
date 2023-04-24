<script setup lang="ts">
import { defineEmits, onMounted, reactive } from "vue";
import useReady from "@/composables/useReady";
import { useUserStore } from "@/stores/UserStore";
import { useRouter } from "vue-router";
import type { UserLoginDto } from "@/types/dto/UserLoginDto";

const router = useRouter();

const { fetched } = useReady();
const readyEmit = defineEmits<{ (e: "@ready"): void }>();

onMounted(async () => {
  fetched(readyEmit);
});

const userLogin = reactive<UserLoginDto>({
  email: "",
  password: "",
});
const signIn = async () => {
  try {
    await useUserStore().signInUserWithEmailAndPassword(userLogin);
    await router.push("/");
  } catch (e: any) {
    alert(e.message);
  }
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
      <form @submit.prevent="signIn" class="card card-form">
        <h1 class="text-center">Login</h1>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            v-model="userLogin.email"
            id="email"
            type="text"
            class="form-input"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            v-model="userLogin.password"
            id="password"
            type="password"
            class="form-input"
          />
        </div>

        <div class="push-top">
          <button type="submit" class="btn-blue btn-block">Log in</button>
        </div>

        <div class="form-actions text-right">
          <RouterLink :to="{ name: 'RegisterShow' }">
            Create an account?
          </RouterLink>
        </div>
      </form>

      <div class="push-top text-center">
        <button class="btn-red btn-xsmall" @click.prevent="signInWithGoogle">
          <i class="fa fa-google fa-btn"></i>Sign in with Google
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
