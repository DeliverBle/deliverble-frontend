import { LearnDetailService } from '../api/learn-detail';
import { LEARN_DETAIL_DATA } from './learn-detail.data';

export function learnDetailDataMock(): LearnDetailService {
  const getVideoInfo = async () => {
    await wait(500);
    return LEARN_DETAIL_DATA.VIDEO_INFO;
  };

  return { getVideoInfo };
}

const wait = (milliSeconds: number) => new Promise((resolve) => setTimeout(resolve, milliSeconds));
