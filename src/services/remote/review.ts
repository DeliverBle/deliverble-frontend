import { ReviewService } from '../api/review';
import { PostReviewRequestBody, ReviewTab } from '@src/types/review/remote';
import { API } from './base';

export function reviewDataRemote(): ReviewService {
  const postReviewVideoList = async (body: PostReviewRequestBody, reviewTab: ReviewTab) => {
    const response = await API.post({ url: `/news/${reviewTab}`, data: body });
    return {
      videoList: response.data ? response.data.exploreNewsDtoCollection : [],
      paging: response.data2.paginationInfo,
    };
  };

  return { postReviewVideoList };
}
