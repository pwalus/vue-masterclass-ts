<script setup lang="ts">
import { useUserStore } from "@/stores/UserStore";
import { computed, ref } from "vue";
import type { User } from "@/types/User";
import { findById } from "@/helper";

const userStore = useUserStore();

const isOpen = ref<boolean>(false);

const authUser = computed<User | null>(() => {
  if (userStore.authId) {
    return findById(userStore.users, userStore.authId);
  }

  return null;
});
</script>

<template>
  <header class="header" id="header">
    <RouterLink :to="{ name: 'HomeShow' }" class="logo">
      <img src="../assets/vueschool-logo.svg" alt="logo" />
    </RouterLink>

    <div class="btn-hamburger">
      <!-- use .btn-humburger-active to open the menu -->
      <div class="top bar"></div>
      <div class="middle bar"></div>
      <div class="bottom bar"></div>
    </div>

    <!-- use .navbar-open to open nav -->
    <nav class="navbar">
      <ul>
        <li class="navbar-user" v-if="authUser">
          <a @click.prevent="isOpen = !isOpen">
            <img
              v-if="authUser.avatar"
              class="avatar-small"
              :src="authUser.avatar"
              :alt="authUser.name"
            />
            <span>
              {{ authUser.name }}
              <img
                class="icon-profile"
                src="../assets/arrow-profile.svg"
                alt=""
              />
            </span>
          </a>

          <!-- dropdown menu -->
          <!-- add class "active-drop" to show the dropdown -->
          <div id="user-dropdown" :class="{ 'active-drop': isOpen }">
            <div class="triangle-drop"></div>
            <ul class="dropdown-menu">
              <li class="dropdown-menu-item">
                <RouterLink :to="{ name: 'ProfileShow' }">
                  View profile
                </RouterLink>
              </li>
              <li class="dropdown-menu-item">
                <a @click.prevent="userStore.signOut">Sign Out</a>
              </li>
            </ul>
          </div>
        </li>

        <li v-if="!authUser" class="navbar-item">
          <RouterLink :to="{ name: 'SignIn' }">Sign In</RouterLink>
        </li>
        <li v-if="!authUser" class="navbar-item">
          <RouterLink :to="{ name: 'RegisterShow' }">Register</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped></style>
