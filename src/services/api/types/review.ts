export type VideoData = {
  id: number;
  title: string;
  category: string;
  channel: string;
  thumbnail: string;
  reportDate: string;
  isFavorite: boolean;
};

export type FavoriteVideoList = {
  favoriteNews: VideoData[];
};
