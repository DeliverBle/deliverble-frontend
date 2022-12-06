import { SentenceData, VideoData, MemoData } from './types/learn-detail';

export interface LearnDetailService {
  getPrivateVideoData(videoId: number, index?: number): Promise<VideoData>;
  getPublicVideoData(videoId: number): Promise<VideoData>;
  postSentenceData(SentenceData: SentenceData, scriptsId: number): Promise<VideoData>;
  postMemoData(memo: MemoData, scriptId: number): Promise<MemoData[]>;
  updateMemoData(memoId: number, content: string): Promise<MemoData[]>;
  deleteMemoData(memoId: number): Promise<MemoData[]>;
  postNewScriptData(videoId: number): Promise<{ isSuccess: boolean }>;
}
