export interface User {
  id: string;
  avatar: string;
  email: string;
  lastVisitAt: number;
  bio?: string;
  website?: string;
  location?: string;
  name: string;
  isModerator: boolean;
  registeredAt: number;
  username: string;
  postsCount: number;
}
