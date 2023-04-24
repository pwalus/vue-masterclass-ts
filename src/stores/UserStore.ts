import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import type { User } from "@/types/User";
import type { Post } from "@/types/Post";
import { usePostStore } from "@/stores/PostStore";
import { useThreadStore } from "@/stores/ThreadStore";
import type { Thread } from "@/types/Thread";
import firebase from "firebase/compat";
import { fetch, fetchMultiple } from "@/helper";
import type { UserDto } from "@/types/dto/UserDto";
import type { UserLoginDto } from "@/types/dto/UserLoginDto";

export const useUserStore = defineStore("user", () => {
  const postStore = usePostStore();
  const threadStore = useThreadStore();

  const users = reactive<User[]>([]);
  const authId = ref<string>("");

  const authUser = computed<User>(() => {
    return users.find((u) => u.id === authId.value) as User;
  });
  const authUserPosts = computed<Post[]>(() =>
    postStore.posts.filter((p) => p.userId === authUser.value.id)
  );
  const authUserThreads = computed<Thread[]>(() =>
    threadStore.threads.filter((t) => t.userId === authUser.value.id)
  );

  const setUser = (user: User, id: string): void => {
    const index = users.findIndex((u) => u.id === id);
    users[index] = user;
  };

  async function registerUserWithEmailAndPassword(
    userDto: UserDto
  ): Promise<User> {
    const result = await firebase
      .auth()
      .createUserWithEmailAndPassword(userDto.email, userDto.password);

    return register(result.user?.uid, userDto);
  }

  async function register(
    id: string | undefined,
    userDto: UserDto
  ): Promise<User> {
    const userRef = firebase.firestore().collection("users").doc(id);
    await userRef.set(userDto);

    return fetchUser(userRef.id);
  }
  async function signInUserWithEmailAndPassword(
    userLogin: UserLoginDto
  ): Promise<any> {
    return firebase
      .auth()
      .signInWithEmailAndPassword(userLogin.email, userLogin.password);
  }

  async function signInWithGoogle(): Promise<any> {
    const provider = new firebase.auth.GoogleAuthProvider();
    const response = await firebase.auth().signInWithPopup(provider);
    const googleUser = response.user;
    console.log(googleUser);
    const user = await fetchUser(googleUser?.uid ?? "");
    if (!user.email) {
      return register(googleUser?.uid, {
        name: googleUser?.displayName ?? "",
        email: googleUser?.email ?? "",
        username: googleUser?.email ?? "",
        avatar: googleUser?.photoURL ?? "",
        password: "",
      });
    }
  }

  async function signOut(): Promise<any> {
    authId.value = "";
    return firebase.auth().signOut();
  }

  async function fetchUser(id: string): Promise<User> {
    return fetch<User>(id, "users", users);
  }

  async function fetchAuthUser(): Promise<User> {
    const userId = firebase.auth().currentUser?.uid;
    if (userId) {
      const authUser = await fetch<User>(userId, "users", users);
      authId.value = authUser.id;
      return authUser;
    }
    return new Promise<User>(() => {});
  }

  async function fetchUsers(ids: string[]): Promise<User[]> {
    return fetchMultiple<User>(ids, "users", users);
  }

  return {
    users,
    authId,
    authUser,
    authUserPosts,
    authUserThreads,
    setUser,
    fetchUser,
    fetchAuthUser,
    fetchUsers,
    registerUserWithEmailAndPassword,
    signInUserWithEmailAndPassword,
    signInWithGoogle,
    signOut,
  };
});
