export interface UserData {
  nickname: string;
  email?: string;
}

export type LikeData = {
  id: number;
  isFavorite: boolean;
};
