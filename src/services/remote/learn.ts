import { LearnService } from '../api/learn';
import { publicAPI } from './base';
import { PostSearchConditionRequestBody, VideoData } from '../api/types/learn';

export function LearnDataRemote(): LearnService {
  const postSearchCondition = async (body: PostSearchConditionRequestBody) => {
    const response = await publicAPI.post({
      url: `/news/search`,
      data: {
        channel: body.channel,
        category: body.category,
        speaker: body.speaker,
        currentPage: body.currentPage,
        listSize: body.listSize,
      },
    });
    return {
      videoList: response.data.videoList
        ? response.data.videoList.map((video: VideoData) => ({
            id: video.id,
            category: video.category,
            channel: video.channel,
            thumbnail: video.thumbnail,
            reportDate: video.reportDate,
          }))
        : [],
      paging: {
        lastPage: response.data.paginationInfo.lastPage,
        totalCount: response.data.paginationInfo.totalCount,
      },
    };
  };

  return { postSearchCondition };
}
