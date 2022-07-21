import { ReviewService } from '../api/review';

export function reviewDataMock(): ReviewService {
  const getFavoriteVideoList = async () => {
    await wait(500);
    return REVIEW_DATA.FAVORITE_VIDEO_LIST;
  };

  return { getFavoriteVideoList };
}

const wait = (milliSeconds: number) => new Promise((resolve) => setTimeout(resolve, milliSeconds));
