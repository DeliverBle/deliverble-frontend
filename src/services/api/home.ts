import { getRecommendVideoResponse } from './types/home';

export interface HomeService {
  getVideoData(): Promise<getRecommendVideoResponse>;
}
