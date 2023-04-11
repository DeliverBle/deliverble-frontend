import { ReviewService } from '../api/review';
import { PostReviewRequestBody, ReviewTab } from '@src/types/review';
import { API } from './base';

export function reviewDataRemote(): ReviewService {
  const postReviewVideoList = async (body: PostReviewRequestBody, reviewTab: ReviewTab) => {
    const response = await API.post({ url: `/news/${reviewTab}`, data: body });
    if (response.statusCode === 200) {
      return {
        videoList: response.data ? response.data.exploreNewsDtoCollection : [],
        paging: response.data2.paginationInfo,
      };
    } else throw '서버 통신 실패';
  };

  return { postReviewVideoList };
}
