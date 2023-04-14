import { VideoData as SimpleVideoData } from '@src/types/home/remote';
import {
  ChangeRecordNameData,
  CreateMemoRequest,
  DeleteRecordData,
  DeleteRecordResponse,
  GetRecordData,
  Name,
  UpdateMemoRequest,
  UpdateSentenceRequest,
  UploadRecordData,
  UploadRecordResponse,
  VideoData,
} from '@src/types/learnDetail/remote';

export interface LearnDetailService {
  getPrivateVideoData(videoId: number, index: number): Promise<VideoData>;
  getPublicVideoData(videoId: number): Promise<VideoData>;
  postSentenceData(data: UpdateSentenceRequest): Promise<VideoData>;
  postMemoData(data: CreateMemoRequest): Promise<VideoData>;
  updateMemoData(data: UpdateMemoRequest): Promise<VideoData>;
  deleteMemoData(memoId: number): Promise<VideoData>;
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
