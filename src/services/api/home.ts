import { VideoListData } from './types/home';

export interface HomeService {
  getPrivateVideoData(): Promise<VideoListData>;
  getPublicVideoData(): Promise<VideoListData>;
  getPrivateSpeechGuideData(): Promise<VideoListData>;
  getPublicSpeechGuideData(): Promise<VideoListData>;
}
