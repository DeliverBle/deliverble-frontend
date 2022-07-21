import { ReviewService } from '../api/review';
import { REVIEW_DATA } from './review.data';

export function reviewDataMock(): ReviewService {
  const getFavoriteVideoList = async () => {
    await wait(500);
    return REVIEW_DATA;
  };

  return { getFavoriteVideoList };
}

const wait = (milliSeconds: number) => new Promise((resolve) => setTimeout(resolve, milliSeconds));
