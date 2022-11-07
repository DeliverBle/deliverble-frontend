import { SentenceData, HighlightData, VideoData } from './types/learn-detail';

export interface LearnDetailService {
  getPrivateVideoData(videoId: number): Promise<VideoData>;
  getPublicVideoData(videoId: number): Promise<VideoData>;
  getHighlightData(videoId: number): Promise<HighlightData[]>;
  postSentenceData(SentenceData: SentenceData, scriptsId: number): Promise<VideoData>;
}
