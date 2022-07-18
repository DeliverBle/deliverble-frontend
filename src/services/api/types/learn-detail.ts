export type Tag = {
  id: number;
  name: string;
};

export type Script = {
  id: number;
  text: string;
  startTime: number;
  endTime: number;
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
  tags: Tag[];
  scripts: Script[];
};
