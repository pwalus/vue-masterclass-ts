import { createRouter, createWebHistory } from "vue-router";
import HomeShow from "@/views/HomeShow.vue";

function lazyLoad(view: string) {
  return () => import(`@/views/${view}.vue`);
}

interface Scroll {
  top?: number;
  behaviour?: string;
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to) {
    const scroll: Scroll = {};

    if (to.meta.toTop) {
      scroll.top = 0;
    }

    if (to.meta.smoothScroll) {
      scroll.behaviour = "smooth";
    }

    return scroll;
  },
  routes: [
    {
      path: "/",
      name: "HomeShow",
      component: HomeShow,
    },
    {
      path: "/forum/:id",
      name: "ForumShow",
      component: lazyLoad("ForumShow"),
    },
    {
      path: "/category/:id",
      name: "CategoryShow",
      component: lazyLoad("CategoryShow"),
    },
    {
      path: "/profile",
      name: "ProfileShow",
      component: lazyLoad("ProfileShow"),
      props: {
        edit: false,
      },
      meta: {
        toTop: true,
        smoothScroll: true,
      },
    },
    {
      path: "/profile/edit",
      name: "ProfileEdit",
      component: lazyLoad("ProfileShow"),
      props: {
        edit: true,
      },
    },
    {
      path: "/register",
      name: "RegisterShow",
      component: lazyLoad("RegisterShow"),
    },
    {
      path: "/sign-in",
      name: "SignIn",
      component: lazyLoad("SignIn"),
    },
    {
      path: "/thread/:id",
      name: "ThreadShow",
      component: lazyLoad("ThreadShow"),
      // beforeEnter(to, from, next) {
      //   const exists = sourceData.threads.find((t) => t.id === to.params.id);
      //   if (exists) {
      //     return next();
      //   }
      //   return next({
      //     name: "NotFound",
      //     params: {
      //       pathMatch: to.path.substring(1).split("/"),
      //       query: to.query,
      //       hash: to.hash,
      //     },
      //   });
      // },
    },
    {
      path: "/thread/create/:forumId",
      name: "ThreadCreate",
      component: lazyLoad("ThreadCreate"),
    },
    {
      path: "/thread/edit/:threadId",
      name: "ThreadEdit",
      component: lazyLoad("ThreadEdit"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: lazyLoad("NotFound"),
    },
  ],
});

export default router;
