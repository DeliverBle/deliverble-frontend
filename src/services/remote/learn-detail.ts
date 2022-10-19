import { LearnDetailService } from '../api/learn-detail';
import { Script, Tag } from '../api/types/learn-detail';
import { LEARN_DETAIL_DATA } from '../mock/learn-detail.data';
import { privateAPI } from './base';

export function learnDetailDataRemote(): LearnDetailService {
  const getVideoData = async (id: number) => {
    const response = await privateAPI.get({ url: `/news/detail/${id}` });
    if (response.status === 200) {
      return {
        id: response.data.id,
        title: response.data.title,
        category: response.data.category,
        channel: response.data.channel,
        link: response.data.link,
        reportDate: response.data.reportDate,
        startTime: response.data.startTime,
        endTime: response.data.endTime,
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

  return { getVideoData, getHighlightData };
}
