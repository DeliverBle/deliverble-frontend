type VideoData = {
  id: number;
  title: string;
  category: string;
  channel: string;
  thumbnail: string;
  reportDate: string;
};

export type FavoriteVideoList = {
  favoriteVideoList: VideoData[];
};
