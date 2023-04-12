import { PostReviewRequestBody, PostReviewResponse, ReviewTab } from '@src/types/review/remote';

export interface ReviewService {
  postReviewVideoList(body: PostReviewRequestBody, reviewTab: ReviewTab): Promise<PostReviewResponse>;
}
