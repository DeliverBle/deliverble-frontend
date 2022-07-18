export type VideoData = {
  id: number;
  title: string;
  category: string;
  channel: string;
  thumbnail: string;
  reportDate: string;
};

export type Paging = {
  lastPage: number;
  totalCount: number;
};

export type PostSearchConditionRequestBody = {
  channels?: string[];
  categories?: string[];
  announcerGender?: string[];
  currentPage: number;
  listSize: number;
};

export type PostSearchConditionResponse = {
  videoList: VideoData[];
  paging: Paging;
};
