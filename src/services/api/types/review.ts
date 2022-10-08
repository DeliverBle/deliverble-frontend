export type VideoData = {
  id: number;
  title: string;
  category: string;
  channel: string;
  thumbnail: string;
  reportDate: string;
  isFavorite: boolean;
};

export type Paging = {
  lastPage: number;
  totalCount: number;
};

export type PostFavoriteRequestBody = {
  currentPage: number;
  listSize: number;
};

export type PostFavoriteResponse = {
  favoriteList: VideoData[];
  paging: Paging;
};
