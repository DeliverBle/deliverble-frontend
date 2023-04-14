import { VideoData as SimpleVideoData } from '@src/types/home/remote';
import {
  SentenceData,
  VideoData,
  MemoData,
  Name,
  UploadRecordData,
  UploadRecordResponse,
  GetRecordData,
  DeleteRecordData,
  DeleteRecordResponse,
  ChangeRecordNameData,
} from '@src/types/learnDetail/remote';

export interface LearnDetailService {
  getPrivateVideoData(videoId: number, index: number): Promise<VideoData>;
  getPublicVideoData(videoId: number): Promise<VideoData>;
  postSentenceData({ sentenceData, scriptId }: { sentenceData: SentenceData; scriptId: number }): Promise<VideoData>;
  postMemoData(memo: MemoData, scriptId: number): Promise<MemoData[]>;
  updateMemoData(memoId: number, content: string): Promise<MemoData[]>;
  deleteMemoData(memoId: number): Promise<MemoData[]>;
  postNewScriptData(videoId: number): Promise<VideoData>;
  deleteScriptData(scriptId: number): Promise<VideoData>;
  updateScriptNameData(data: Name): Promise<VideoData>;
  getSpeechGuideData(videoId: number): Promise<VideoData>;
  uploadRecordData(body: UploadRecordData): Promise<UploadRecordResponse>;
  getRecordData(scriptId: number): Promise<GetRecordData[]>;
  deleteRecordData(body: DeleteRecordData): Promise<DeleteRecordResponse>;
  changeRecordNameData(body: ChangeRecordNameData): Promise<ChangeRecordNameData>;
  getSimilarVideoData(videoId: number): Promise<SimpleVideoData[]>;
}
