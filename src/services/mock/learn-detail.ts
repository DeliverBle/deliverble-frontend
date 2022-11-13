import { LearnDetailService } from '../api/learn-detail';
import { LEARN_DETAIL_DATA } from './learn-detail.data';

export function learnDetailDataMock(): LearnDetailService {
  const getPrivateVideoData = async () => {
    await wait(500);
    return LEARN_DETAIL_DATA.VIDEO_DATA;
  };

  const getPublicVideoData = async () => {
    await wait(500);
    return LEARN_DETAIL_DATA.VIDEO_DATA;
  };

  const getHighlightData = async () => {
    await wait(500);
    return LEARN_DETAIL_DATA.HIGHLIGHT_DATA;
  };

  const postSentenceData = async () => {
    await wait(500);
    return LEARN_DETAIL_DATA.VIDEO_DATA;
  };

  return { getPrivateVideoData, getPublicVideoData, getHighlightData, postSentenceData };
}

const wait = (milliSeconds: number) => new Promise((resolve) => setTimeout(resolve, milliSeconds));
