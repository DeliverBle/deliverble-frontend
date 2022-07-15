type TagData = {
  id: number;
  name: string;
};

export type VideoData = {
  id: number;
  title: string;
  category: string;
  channel: string;
  link: string;
  reportDate: string;
  startTime: number;
  endTime: number;
  tags: TagData[];
};
