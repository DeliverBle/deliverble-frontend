type TagData = {
  tagId: number;
  tagName: string;
};

export type VideoData = {
  id: number;
  videoId: string;
  startTime: number;
  endTime: number;
  title: string;
  channel: string;
  category: string;
  date: string;
  tagList: TagData[];
};
