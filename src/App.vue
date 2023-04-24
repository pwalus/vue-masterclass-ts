<script setup lang="ts">
import TheNavBar from "@/components/TheNavBar.vue";
import { onMounted, ref } from "vue";
import { useUserStore } from "@/stores/UserStore";
import { useRouter } from "vue-router";
import NProgress from "nprogress";
const userStore = useUserStore();
const showPage = ref<boolean>(false);

const router = useRouter();
NProgress.configure({ speed: 200, showSpinner: false });

router.beforeEach(() => {
  showPage.value = false;
  NProgress.start();
});

const onPageReady = () => {
  showPage.value = true;
  NProgress.done();
};

onMounted(() => {
  userStore.fetchAuthUser();
});
</script>

<template>
  <TheNavBar />
  <div class="container">
    <RouterView v-show="showPage" @@ready="onPageReady" />
    <BaseSpinner v-show="!showPage" class="push-top" />
  </div>
</template>
