import { VideoData } from './types/home';

export interface HomeService {
  getVideoData(): Promise<VideoData[]>;
}
