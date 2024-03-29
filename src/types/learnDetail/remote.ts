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
  scriptId: number;
  tagsForView: Tag[];
  sentences: Script[];
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
  highlightId: string;
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

export type GetRecordData = {
  name: string;
  link: string;
  endTime: number;
  isDeleted: boolean;
  date: string;
  scriptId: number;
};

export type DeleteRecordData = {
  scriptId: number;
  link: string;
};

export type DeleteRecordResponse = {
  link: string;
  deleted: boolean;
  scriptId: string;
};

export type ChangeRecordNameData = {
  scriptId: number;
  link: string;
  newName: string;
};

export type UpdateSentenceRequest = {
  sentenceData: SentenceData;
  scriptId: number;
  clickedTitleIndex: number;
};

export type CreateMemoRequest = {
  memo: MemoData;
  scriptId: number;
  clickedTitleIndex: number;
};

export type UpdateMemoRequest = {
  memoId: number;
  content: string;
  clickedTitleIndex: number;
};

export type DeleteMemoRequest = {
  memoId: number;
  clickedTitleIndex: number;
};

export type CreateScriptRequest = {
  videoId: number;
  clickedTitleIndex: number;
};

export type UpdateScriptNameRequest = {
  id: number;
  name: string;
  clickedTitleIndex: number;
};

export type DeleteScriptRequest = {
  scriptId: number;
  clickedTitleIndex: number;
};
