import { VideoListData } from '@src/types/home/remote';

export interface HomeService {
  getVideoData(): Promise<VideoListData>;
  getSpeechGuideData(): Promise<VideoListData>;
}
