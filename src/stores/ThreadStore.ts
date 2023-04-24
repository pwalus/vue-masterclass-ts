import { defineStore } from "pinia";
import { reactive } from "vue";
import type { Thread } from "@/types/Thread";
import { useForumStore } from "@/stores/ForumStore";
import type { ThreadDto } from "@/types/dto/ThreadDto";
import { fetch, fetchMultiple } from "@/helper";
import firebase from "firebase/compat";

export const useThreadStore = defineStore("thread", () => {
  const threads = reactive<Thread[]>([]);

  async function addThread(threadDto: ThreadDto): Promise<Thread> {
    const thread: Thread = {
      id: "",
      contributors: [],
      firstPostId: "",
      forumId: threadDto.forumId,
      lastPostAt: 0,
      lastPostId: "",
      posts: [],
      publishedAt: Math.floor(Date.now() / 1000),
      slug: "",
      title: threadDto.title,
      userId: threadDto.userId,
    };

    const batch = firebase.firestore().batch();
    const threadRef = firebase.firestore().collection("threads").doc();
    const forumRef = firebase
      .firestore()
      .collection("forums")
      .doc(thread.forumId);
    const userRef = firebase.firestore().collection("users").doc(thread.userId);

    batch.set(threadRef, thread);
    batch.update(forumRef, {
      threads: firebase.firestore.FieldValue.arrayUnion(threadRef.id),
    });
    batch.update(userRef, {
      threads: firebase.firestore.FieldValue.arrayUnion(threadRef.id),
    });
    await batch.commit();

    return fetchThread(threadRef.id);
  }

  async function updateThread(id: string, thread: ThreadDto): Promise<Thread> {
    const batch = firebase.firestore().batch();
    const threadRef = firebase.firestore().collection("threads").doc(id);
    batch.update(threadRef, { title: thread.title });
    await batch.commit();

    return fetchThread(threadRef.id);
  }

  async function fetchThread(id: string): Promise<Thread> {
    return fetch<Thread>(id, "threads", threads);
  }

  async function fetchThreads(ids: string[]): Promise<Thread[]> {
    return fetchMultiple<Thread>(ids, "threads", threads);
  }

  return {
    threads,
    addThread,
    updateThread,
    fetchThread,
    fetchThreads,
  };
});
