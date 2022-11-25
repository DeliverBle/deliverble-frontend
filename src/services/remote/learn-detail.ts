import { LearnDetailService } from '../api/learn-detail';
import { Script, SentenceData, Tag } from '../api/types/learn-detail';
import { LEARN_DETAIL_DATA } from '../mock/learn-detail.data';
import { privateAPI, publicAPI } from './base';

export function learnDetailDataRemote(): LearnDetailService {
  const getPrivateVideoData = async (id: number) => {
    const response = await privateAPI.get({ url: `/news/detail/${id}` });
    if (response.status === 200) {
      return {
        id: response.data.id,
        title: response.data.title,
        category: response.data.category,
        channel: response.data.channel,
        link: response.data.link,
        reportDate: response.data.reportDate,
        isFavorite: response.data.isFavorite,
        startTime: response.data.startTime,
        endTime: response.data.endTime,
        scriptsId: response.data2[0].id,
        tags: response.data.tagsForView.map((tag: Tag) => ({
          id: tag.id,
          name: tag.name,
        })),
        scripts: response.data2[0].sentences.map((sentence: Script) => ({
          id: sentence.id,
          text: sentence.text,
          startTime: sentence.startTime,
          endTime: sentence.endTime,
        })),
      };
    } else throw '서버 통신 실패';
  };

  const getPublicVideoData = async (id: number) => {
    const response = await publicAPI.get({ url: `/news/detail/not-authentication/${id}` });
    if (response.status === 200) {
      return {
        id: response.data.id,
        title: response.data.title,
        category: response.data.category,
        channel: response.data.channel,
        link: response.data.link,
        reportDate: response.data.reportDate,
        isFavorite: response.data.isFavorite,
        startTime: response.data.startTime,
        endTime: response.data.endTime,
        scriptsId: response.data2[0].id,
        tags: response.data.tagsForView.map((tag: Tag) => ({
          id: tag.id,
          name: tag.name,
        })),
        scripts: response.data2[0].sentences.map((sentence: Script) => ({
          id: sentence.id,
          text: sentence.text,
          startTime: sentence.startTime,
          endTime: sentence.endTime,
        })),
      };
    } else throw '서버 통신 실패';
  };

  const getHighlightData = async () => {
    return LEARN_DETAIL_DATA.HIGHLIGHT_DATA;
  };

  const postSentenceData = async (SentenceData: SentenceData, scriptsId: number) => {
    const response = await privateAPI.post({
      url: `/script/sentence/update/${scriptsId}`,
      data: SentenceData,
    });
    if (response.status === 200) {
      return {
        id: response.data.id,
        title: response.data.title,
        category: response.data.category,
        channel: response.data.channel,
        link: response.data.link,
        reportDate: response.data.reportDate,
        isFavorite: response.data.isFavorite,
        startTime: response.data.startTime,
        endTime: response.data.endTime,
        scriptsId: response.data2[0]?.id,
        tags: response.data.tagsForView.map((tag: Tag) => ({
          id: tag.id,
          name: tag.name,
        })),
        scripts: response.data2[0]?.sentences.map((sentence: Script) => ({
          id: sentence.id,
          text: sentence.text,
          startTime: sentence.startTime,
          endTime: sentence.endTime,
        })),
      };
    } else throw '서버 통신 실패';
  };

  return { getPrivateVideoData, getPublicVideoData, getHighlightData, postSentenceData };
}
