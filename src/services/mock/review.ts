import { ReviewService } from '../api/review';
import { REVIEW_DATA } from './review.data';

export function reviewDataMock(): ReviewService {
  const postFavoriteVideoList = async () => {
    await wait(500);
    return REVIEW_DATA.FAVORITE_LIST_DATA;
  };

  return { postFavoriteVideoList };
}

const wait = (milliSeconds: number) => new Promise((resolve) => setTimeout(resolve, milliSeconds));
