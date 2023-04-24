import { defineStore } from "pinia";
import { reactive } from "vue";
import type { Post } from "@/types/Post";
import { fetch, fetchMultiple } from "@/helper";
import firebase from "firebase/compat/app";
import type { PostDto } from "@/types/dto/PostDto";

export const usePostStore = defineStore("post", () => {
  const posts = reactive<Post[]>([]);

  async function save(postDto: PostDto): Promise<Post> {
    if (!postDto.id) {
      return addPost(postDto);
    }
    return updatePost(postDto);
  }

  async function addPost(postDto: PostDto): Promise<Post> {
    const post: Post = {
      id: "",
      publishedAt: Math.floor(Date.now() / 1000),
      text: postDto.text,
      threadId: postDto.threadId,
      userId: postDto.userId,
    };
    const batch = firebase.firestore().batch();
    const postRef = firebase.firestore().collection("posts").doc();
    const threadRef = firebase
      .firestore()
      .collection("threads")
      .doc(post.threadId);
    const userRef = firebase.firestore().collection("users").doc(post.userId);

    batch.set(postRef, post);
    batch.update(threadRef, {
      posts: firebase.firestore.FieldValue.arrayUnion(postRef.id),
    });
    batch.update(userRef, {
      postsCount: firebase.firestore.FieldValue.increment(1),
    });
    await batch.commit();

    return fetchPost(postRef.id);
  }

  async function updatePost(postDto: PostDto): Promise<Post> {
    const batch = firebase.firestore().batch();
    const postRef = firebase.firestore().collection("posts").doc(postDto.id);
    batch.update(postRef, {
      text: postDto.text,
    });
    await batch.commit();

    return fetchPost(postRef.id);
  }

  async function fetchPost(id: string): Promise<Post> {
    return fetch<Post>(id, "posts", posts);
  }

  async function fetchPosts(ids: string[]): Promise<Post[]> {
    return fetchMultiple<Post>(ids, "posts", posts);
  }

  return { posts, save, fetchPost, fetchPosts };
});
