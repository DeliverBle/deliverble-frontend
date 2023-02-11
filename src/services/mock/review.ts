import { ReviewService } from '../api/review';
import { REVIEW_DATA } from './review.data';

export function reviewDataMock(): ReviewService {
  const postReviewVideoList = async () => {
    await wait(500);
    return REVIEW_DATA.FAVORITE_LIST_DATA;
  };

  return { postReviewVideoList };
}

const wait = (milliSeconds: number) => new Promise((resolve) => setTimeout(resolve, milliSeconds));
