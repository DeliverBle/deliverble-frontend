import { LearnService } from '../api/learn';
import { privateAPI, publicAPI } from './base';
import { PostSearchConditionRequestBody, VideoData } from '../api/types/learn';

export function learnDataRemote(): LearnService {
  const postSearchConditionWithToken = async (body: PostSearchConditionRequestBody) => {
    const response = await privateAPI.post({
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

  const postSearchConditionWithoutToken = async (body: PostSearchConditionRequestBody) => {
    const response = await publicAPI.post({
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
            haveGuide: video.haveGuide,
          }))
        : [],
      paging: {
        lastPage: response.data2.paginationInfo.lastPage,
        totalCount: response.data2.paginationInfo.totalCount,
      },
    };
  };

  return { postSearchConditionWithToken, postSearchConditionWithoutToken };
}
