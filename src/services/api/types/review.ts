export type VideoData = {
  id: number;
  title: string;
  category: string;
  channel: string;
  thumbnail: string;
  reportDate: string;
  isFavorite: boolean;
  haveGuide: boolean;
};

export type Paging = {
  lastPage: number;
  totalCount: number;
};

export type PostReviewRequestBody = {
  currentPage: number;
  listSize: number;
};

export type PostFavoriteResponse = {
  favoriteList: VideoData[];
  favoritePaging: Paging;
};

export type PostHistoryResponse = {
  historyList: VideoData[];
  historyPaging: Paging;
};
