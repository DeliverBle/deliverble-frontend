import { LearnDetailService } from '../api/learn-detail';
import { Script, Tag } from '../api/types/learn-detail';
import { publicAPI } from './base';

export function learnDetailDataRemote(): LearnDetailService {
  const getVideoData = async (id: number) => {
    const response = await publicAPI.get({ url: `/news/detail/${id}` });
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
        tags: response.data.tags.map((tag: Tag) => ({
          id: tag.id,
          name: tag.name,
        })),
        scripts: response.data.scripts.map((script: Script) => ({
          id: script.id,
          text: script.text,
          startTime: script.startTime,
          endTime: script.endTime,
        })),
      };
    } else throw '서버 통신 실패';
  };

  return { getVideoData };
}
