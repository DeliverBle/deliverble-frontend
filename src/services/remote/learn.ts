import { LearnService } from '../api/learn';
import { API } from './base';
import { PostSearchConditionRequestBody, VideoData } from '../api/types/learn';

export function learnDataRemote(): LearnService {
  const postSearchCondition = async (body: PostSearchConditionRequestBody) => {
    const response = await API.post({
      url: `/news/search`,
      data: body,
    });
    return {
      videoList: response.data
        ? response.data.exploreNewsDtoCollection.map((video: VideoData) => ({
            id: video.id,
            title: video.title,
            category: video.category,
            channel: video.channel,
            thumbnail: video.thumbnail,
            reportDate: video.reportDate,
            isFavorite: video.isFavorite,
            haveGuide: video.haveGuide,
          }))
        : [],
      paging: {
        lastPage: response.data2.paginationInfo.lastPage,
        totalCount: response.data2.paginationInfo.totalCount,
      },
    };
  };

  return { postSearchCondition };
}
