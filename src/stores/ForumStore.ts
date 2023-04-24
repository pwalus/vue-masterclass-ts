import { defineStore } from "pinia";
import { reactive } from "vue";
import type { Forum } from "@/types/Forum";
import type { Thread } from "@/types/Thread";
import { fetch, fetchMultiple } from "@/helper";

export const useForumStore = defineStore("forum", () => {
  const forums = reactive<Forum[]>([]);

  function appendThreadToForum(thread: Thread): void {
    const forum = forums.find((forum) => forum.id === thread.forumId);
    if (forum) {
      forum.threads = forum.threads || [];
      forum.threads.push(thread.id);
    }
  }
  async function fetchForum(id: string): Promise<Forum> {
    return fetch<Forum>(id, "forums", forums);
  }

  async function fetchForums(ids: string[]): Promise<Forum[]> {
    return fetchMultiple<Forum>(ids, "forums", forums);
  }
  return { forums, appendThreadToForum, fetchForum, fetchForums };
});
