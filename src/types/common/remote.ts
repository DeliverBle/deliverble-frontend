export interface UserData {
  nickname: string;
  email?: string;
}

export type LikeData = {
  newsId: number;
  isFavorite: boolean;
};
