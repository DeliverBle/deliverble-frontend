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

export type HighlightData = {
  scriptId: number;
  highlightId: number;
  startingIndex: number;
  endingIndex: number;
  memo: {
    id?: number;
    keyword?: string;
    content?: string;
  };
};

export type GroupedObjectKey = {
  scriptId: string;
};

export type hlGroupedObjectList = {
  endingIndex: number;
  highlightId: number;
  scriptId: number;
  startingIndex: number;
};

export type spacingGroupedObjectList = {
  spacingId: number;
  scriptId: number;
  index: number;
};

export type hlGroupedObject = {
  objectIndex: GroupedObjectKey;
  objectList: hlGroupedObjectList;
};

export type spacingGroupedObject = {
  objectIndex: GroupedObjectKey;
  objectList: spacingGroupedObjectList;
};
