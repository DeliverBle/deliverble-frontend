import { FavoriteVideoResponse } from './types/review';

export interface ReviewService {
  getFavoriteVideoList: Promise<FavoriteVideoResponse>;
}
