import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
import "nprogress/nprogress.css";
import BaseDate from "@/components/base/BaseDate.vue";
import { createPinia } from "pinia";
import firebase from "firebase/compat/app";
import { firebaseConfig } from "@/config/firebase";
import FontAwesome from "@/plugins/FontAwesome";
import BaseSpinner from "@/components/base/BaseSpinner.vue";
import { useUserStore } from "@/stores/UserStore";

firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    useUserStore().fetchAuthUser();
  }
});

const app = createApp(App);
app.component("BaseDate", BaseDate);
app.component("BaseSpinner", BaseSpinner);
app.use(router);
app.use(createPinia());
app.use(FontAwesome);
app.mount("#app");
