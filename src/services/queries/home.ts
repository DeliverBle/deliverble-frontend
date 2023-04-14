import { api } from '@src/services/api';
import { useQuery } from '@tanstack/react-query';

export const useGetRecommendVideoList = () => {
  return useQuery(['getRecommendVideoList'], () => api.homeService.getVideoData(), {
    onError: (error: { message: string }) => console.log(error.message),
  });
};

export const useGetSpeechGuideList = () => {
  return useQuery(['getSpeechGuideList'], () => api.homeService.getSpeechGuideData(), {
    onError: (error: { message: string }) => console.log(error.message),
  });
};
