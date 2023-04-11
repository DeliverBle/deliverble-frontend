import { PostReviewRequestBody, PostReviewResponse, ReviewTab } from '@src/types/review';

export interface ReviewService {
  postReviewVideoList(body: PostReviewRequestBody, reviewTab: ReviewTab): Promise<PostReviewResponse>;
}
