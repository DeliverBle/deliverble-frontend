import { LearnService } from '../api/learn';
import { LEARN_DATA } from './learn.data';

export function learnDataMock(): LearnService {
  const postSearchConditionWithToken = async () => {
    await wait(500);
    return LEARN_DATA.VIDEO_LIST_DATA;
  };

  const postSearchConditionWithoutToken = async () => {
    await wait(500);
    return LEARN_DATA.VIDEO_LIST_DATA;
  };

  return { postSearchConditionWithToken, postSearchConditionWithoutToken };
}

const wait = (milliSeconds: number) => new Promise((resolve) => setTimeout(resolve, milliSeconds));
