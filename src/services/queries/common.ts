import { api } from '@src/services/api';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../pages/_app';

export const usePostLikeData = () => {
  return useMutation(api.commonService.postLikeData, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['getRecommendVideoList']);
      queryClient.invalidateQueries(['getSpeechGuideList']);
      queryClient.invalidateQueries(['getVideoData', data.newsId]);
      queryClient.invalidateQueries(['getSimilarVideoList']);
      queryClient.invalidateQueries(['postReviewList']);
      queryClient.invalidateQueries(['postSearchCondition']);
    },
  });
};
