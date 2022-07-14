import { VideoData } from './types/learn-detail';

export interface LearnDetailService {
  getVideoInfo(videoId: number): Promise<VideoData>;
}
