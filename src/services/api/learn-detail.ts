import { VideoListData } from '@src/types/home';
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
} from '@src/types/learn-detail';

export interface LearnDetailService {
  getPrivateVideoData(videoId: number, index: number): Promise<VideoData>;
  getPublicVideoData(videoId: number): Promise<VideoData>;
  postSentenceData(SentenceData: SentenceData, scriptsId: number, scriptIndex: number): Promise<VideoData>;
  postMemoData(memo: MemoData, scriptId: number): Promise<MemoData[]>;
  updateMemoData(memoId: number, content: string): Promise<MemoData[]>;
  deleteMemoData(memoId: number): Promise<MemoData[]>;
  postNewScriptData(videoId: number): Promise<{ isSuccess: boolean }>;
  deleteScriptData(scriptId: number): Promise<{ isSuccess: boolean }>;
  updateScriptNameData(scriptId: number, name: string): Promise<Name>;
  getSpeechGuideData(videoId: number): Promise<VideoData>;
  uploadRecordData(body: UploadRecordData): Promise<UploadRecordResponse>;
  getRecordData(scriptId: number): Promise<GetRecordData[]>;
  deleteRecordData(body: DeleteRecordData): Promise<DeleteRecordResponse>;
  changeRecordNameData(body: ChangeRecordNameData): Promise<ChangeRecordNameData>;
  getSimilarVideoData(videoId: number): Promise<VideoListData>;
}
