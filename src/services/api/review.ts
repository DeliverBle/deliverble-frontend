import { FavoriteVideoList } from './types/review';

export interface ReviewService {
  getFavoriteVideoList(): Promise<FavoriteVideoList>;
}
