import {
  PostFavoriteRequestBody,
  PostFavoriteResponse,
  PostHistoryRequestBody,
  PostHistoryResponse,
} from './types/review';

export interface ReviewService {
  postFavoriteVideoList(body: PostFavoriteRequestBody): Promise<PostFavoriteResponse>;
  postHistoryVideoList(body: PostHistoryRequestBody): Promise<PostHistoryResponse>;
}
