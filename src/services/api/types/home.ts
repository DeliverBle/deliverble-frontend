export type VideoData = {
  id: number;
  title: string;
  category: string;
  channel: string;
  thumbnail: string;
  reportDate: string;
};

export type VideoListData = {
  videoList: VideoData[];
};
