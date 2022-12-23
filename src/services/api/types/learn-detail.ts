export type Tag = {
  id: number;
  name: string;
};

export type Script = {
  id: number;
  order: number;
  text: string;
  startTime: number;
  endTime: number;
};

export type Name = {
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
  isFavorite: boolean;
  haveGuide: boolean;
  startTime: number;
  endTime: number;
  scriptsId: number;
  tags: Tag[];
  scripts: Script[];
  memos?: MemoData[];
  names?: Name[];
  name?: string;
};

export type MemoData = {
  id?: number;
  order: number;
  startIndex: number;
  keyword: string;
  content: string;
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

export type SentenceData = {
  order: number;
  text: string;
};

export type UploadRecordData = FormData;

export type UploadRecordResponse = {
  link: string;
  name: string;
  scriptId: string;
  date: string;
};
