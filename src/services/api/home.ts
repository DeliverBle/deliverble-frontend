import { VideoListData } from '@src/types/home';

export interface HomeService {
  getVideoData(): Promise<VideoListData>;
  getSpeechGuideData(): Promise<VideoListData>;
}
