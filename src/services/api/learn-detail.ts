import { VideoData as SimpleVideoData } from '@src/types/home/remote';
import {
  ChangeRecordNameData,
  CreateMemoRequest,
  CreateScriptRequest,
  DeleteRecordData,
  DeleteRecordResponse,
  DeleteScriptRequest,
  GetRecordData,
  UpdateMemoRequest,
  UpdateScriptNameRequest,
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
  postNewScriptData(data: CreateScriptRequest): Promise<VideoData>;
  deleteScriptData(data: DeleteScriptRequest): Promise<VideoData>;
  updateScriptNameData(data: UpdateScriptNameRequest): Promise<VideoData>;
  getSpeechGuideData(videoId: number): Promise<VideoData>;
  uploadRecordData(body: UploadRecordData): Promise<UploadRecordResponse>;
  getRecordData(scriptId: number): Promise<GetRecordData[]>;
  deleteRecordData(body: DeleteRecordData): Promise<DeleteRecordResponse>;
  changeRecordNameData(body: ChangeRecordNameData): Promise<ChangeRecordNameData>;
  getSimilarVideoData(videoId: number): Promise<SimpleVideoData[]>;
}
