import { api } from '@src/services/api';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../pages/_app';

export const usePostLikeData = () => {
  return useMutation(api.commonService.postLikeData, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['getRecommendVideoList'], { refetchType: 'active' });
      queryClient.invalidateQueries(['getSpeechGuideList'], { refetchType: 'active' });
      queryClient.invalidateQueries(['getVideoData', data.newsId], { refetchType: 'active' });
      queryClient.invalidateQueries(['getSimilarVideoList'], { refetchType: 'active' });
      queryClient.invalidateQueries(['postReviewList'], { refetchType: 'active' });
      queryClient.invalidateQueries(['postSearchCondition'], { refetchType: 'active' });
    },
    onError: (error: { message: string }) => console.log(error.message),
  });
};
