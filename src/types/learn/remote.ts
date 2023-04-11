export type VideoData = {
  id: number;
  title: string;
  category: string;
  channel: string;
  thumbnail: string;
  reportDate: string;
  isFavorite?: boolean;
  haveGuide: boolean;
};

export type Paging = {
  lastPage: number;
  totalCount: number;
};

export type PostSearchConditionRequestBody = {
  channel?: string[];
  category?: string[];
  announcerGender?: string[];
  currentPage: number;
  listSize: number;
};

export type PostSearchConditionResponse = {
  videoList: VideoData[];
  paging: Paging;
};
