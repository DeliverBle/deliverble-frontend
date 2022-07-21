export type VideoData = {
  id: number;
  title: string;
  category: string;
  channel: string;
  thumbnail: string;
  reportDate: string;
};

export type Paging = {
  lastPage: number;
  totalCount: number;
};

export type FavoriteVideoResponse = {
  videoList: VideoData[];
  paging: Paging;
};
