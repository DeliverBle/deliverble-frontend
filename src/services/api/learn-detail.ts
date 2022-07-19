import { MemoData, VideoData } from './types/learn-detail';

export interface LearnDetailService {
  getVideoData(videoId: number): Promise<VideoData>;
  getMemoData(videoId: number): Promise<MemoData[]>;
}
