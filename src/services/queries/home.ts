import { api } from '@src/services/api';
import { useQuery } from '@tanstack/react-query';

export const useGetRecommendVideoList = () => {
  return useQuery(['getRecommendVideoList'], () => api.homeService.getVideoData(), {
    cacheTime: Infinity,
    staleTime: Infinity,
  });
};

export const useGetSpeechGuideList = () => {
  return useQuery(['getSpeechGuideList'], () => api.homeService.getSpeechGuideData(), {
    cacheTime: Infinity,
    staleTime: Infinity,
  });
};
