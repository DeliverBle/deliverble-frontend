import { LearnDetailService } from '../api/learn-detail';
import { LEARN_DETAIL_DATA } from './learn-detail.data';

export function learnDetailDataMock(): LearnDetailService {
  const getVideoData = async () => {
    await wait(500);
    return LEARN_DETAIL_DATA.VIDEO_DATA;
  };

  return { getVideoData };
}

const wait = (milliSeconds: number) => new Promise((resolve) => setTimeout(resolve, milliSeconds));