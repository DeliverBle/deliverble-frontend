import { PostReviewRequestBody, PostFavoriteResponse, PostHistoryResponse } from './types/review';

export interface ReviewService {
  postFavoriteVideoList(body: PostReviewRequestBody): Promise<PostFavoriteResponse>;
  postHistoryVideoList(body: PostReviewRequestBody): Promise<PostHistoryResponse>;
}
