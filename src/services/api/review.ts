import { PostFavoriteRequestBody, PostFavoriteResponse } from './types/review';

export interface ReviewService {
  postFavoriteVideoList(body: PostFavoriteRequestBody): Promise<PostFavoriteResponse>;
}
