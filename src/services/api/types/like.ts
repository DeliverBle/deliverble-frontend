export type LikeData = {
  id: number;
};

export type LikeListData = {
  favoriteList: LikeData[];
};

export type PostLikeRequestBody = {
  news_id: number;
  access_token: string;
  user_id: string;
};
