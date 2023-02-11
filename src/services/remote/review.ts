import { ReviewService } from '../api/review';
import { PostReviewRequestBody, ReviewTab, VideoData } from '../api/types/review';
import { API } from './base';

export function reviewDataRemote(): ReviewService {
  const postReviewVideoList = async (body: PostReviewRequestBody, reviewTab: ReviewTab) => {
    const response = await API.post({ url: `/news/${reviewTab}`, data: body });
    if (response.statusCode === 200) {
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
    } else throw '서버 통신 실패';
  };

  return { postReviewVideoList };
}
