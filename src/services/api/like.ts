import { LikeListData, PostLikeRequestBody } from './types/like';

export interface LikeService {
  getLikeData(): Promise<LikeListData>;
  postLikeData(body: PostLikeRequestBody): Promise<LikeListData>;
  deleteLikeData(body: PostLikeRequestBody): Promise<LikeListData>;
}
