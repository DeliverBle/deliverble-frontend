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

  const postSentenceData = async () => {
    await wait(500);
    return LEARN_DETAIL_DATA.VIDEO_DATA;
  };

  const postMemoData = async () => {
    await wait(500);
    return LEARN_DETAIL_DATA.MEMO_LIST_DATA;
  };

  const updateMemoData = async () => {
    await wait(500);
    return LEARN_DETAIL_DATA.MEMO_LIST_DATA;
  };

  const deleteMemoData = async () => {
    await wait(500);
    return LEARN_DETAIL_DATA.MEMO_LIST_DATA;
  };

  const postNewScriptData = async () => {
    await wait(500);
    return { isSuccess: true };
  };

  const deleteScriptData = async () => {
    await wait(500);
    return { isSuccess: true };
  };

  const updateScriptNameData = async () => {
    await wait(500);
    return LEARN_DETAIL_DATA.NAME_DATA;
  };

  const getPrivateSpeechGuideData = async () => {
    await wait(500);
    return LEARN_DETAIL_DATA.VIDEO_DATA;
  };

  const getPublicSpeechGuideData = async () => {
    await wait(500);
    return LEARN_DETAIL_DATA.VIDEO_DATA;
  };

  return {
    getPrivateVideoData,
    getPublicVideoData,
    postSentenceData,
    postMemoData,
    updateMemoData,
    deleteMemoData,
    postNewScriptData,
    deleteScriptData,
    updateScriptNameData,
    getPrivateSpeechGuideData,
    getPublicSpeechGuideData,
  };
}

const wait = (milliSeconds: number) => new Promise((resolve) => setTimeout(resolve, milliSeconds));
