import { PostReviewRequestBody, PostReviewResponse, ReviewTab } from './types/review';

export interface ReviewService {
  postReviewVideoList(body: PostReviewRequestBody, reviewTab: ReviewTab): Promise<PostReviewResponse>;
}
