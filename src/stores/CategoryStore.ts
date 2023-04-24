import { defineStore } from "pinia";
import { reactive } from "vue";
import type { Category } from "@/types/Category";
import { fetch, fetchAll } from "@/helper";

export const useCategoryStore = defineStore("category", () => {
  const categories = reactive<Category[]>([]);

  async function fetchCategory(id: string): Promise<Category> {
    return fetch<Category>(id, "categories", categories);
  }
  async function fetchAllCategories(): Promise<Category[]> {
    return fetchAll<Category>("categories", categories);
  }

  return { categories, fetchAllCategories, fetchCategory };
});
