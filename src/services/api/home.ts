import { VideoData } from '@src/types/home/remote';

export interface HomeService {
  getVideoData(): Promise<VideoData[]>;
  getSpeechGuideData(): Promise<VideoData[]>;
}
