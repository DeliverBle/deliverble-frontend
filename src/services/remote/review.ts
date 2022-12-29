import { ReviewService } from '../api/review';
import { PostReviewRequestBody, VideoData } from '../api/types/review';
import { privateAPI } from './base';

export function reviewDataRemote(): ReviewService {
  const postFavoriteVideoList = async (body: PostReviewRequestBody) => {
    const response = await privateAPI.post({ url: `/news/favorite`, data: body });
    if (response.status === 200) {
      return {
        favoriteList: response.data
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
        favoritePaging: {
          lastPage: response.data2.paginationInfo.lastPage,
          totalCount: response.data2.paginationInfo.totalCount,
        },
      };
    } else throw '서버 통신 실패';
  };

  const postHistoryVideoList = async (body: PostReviewRequestBody) => {
    const response = await privateAPI.post({ url: `/news/history`, data: body });
    if (response.status === 200) {
      return {
        historyList: response.data
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
        historyPaging: {
          lastPage: response.data2.paginationInfo.lastPage,
          totalCount: response.data2.paginationInfo.totalCount,
        },
      };
    } else throw '서버 통신 실패';
  };

  return { postFavoriteVideoList, postHistoryVideoList };
}
