import { LikeData } from './types/like';

export interface LikeService {
  postLikeData(newsId: number): Promise<LikeData>;
}
