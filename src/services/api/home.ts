import { VideoListData } from './types/home';

export interface HomeService {
  getVideoData(): Promise<VideoListData>;
  getSpeechGuideData(): Promise<VideoListData>;
}
