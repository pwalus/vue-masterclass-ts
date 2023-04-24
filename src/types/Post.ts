export interface Edited {
  at: number;
  by: string;
  moderated: boolean;
}

export interface Post {
  id: string;
  edited?: Edited;
  publishedAt: number;
  text: string;
  threadId: string;
  userId: string;
}
