import { api } from '@src/services/api';
import { loginState } from '@src/stores/loginState';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { queryClient } from '../../pages/_app';

export const useGetVideoData = (speechGuide: boolean, videoId: number, index?: number) => {
  const isLoggedIn = useRecoilValue(loginState);
  return useQuery(
    ['getVideoData', videoId, index, speechGuide],
    speechGuide
      ? () => api.learnDetailService.getSpeechGuideData(videoId)
      : isLoggedIn
      ? () => api.learnDetailService.getPrivateVideoData(videoId, index as number)
      : () => api.learnDetailService.getPublicVideoData(videoId),
    {
      onError: (error: { message: string }) => console.log(error.message),
      enabled: !!videoId,
    },
  );
};

export const usePostNewScriptData = () => {
  return useMutation(api.learnDetailService.postNewScriptData, {
    onSuccess: (data) => queryClient.invalidateQueries(['getVideoData', data.id]),
    onError: (error: { message: string }) => console.log(error.message),
  });
};

export const useDeleteScriptData = () => {
  return useMutation(api.learnDetailService.deleteScriptData, {
    onSuccess: (data) => queryClient.invalidateQueries(['getVideoData', data.id]),
    onError: (error: { message: string }) => console.log(error.message),
  });
};

export const useUpdateScriptNameData = () => {
  return useMutation(api.learnDetailService.updateScriptNameData, {
    onSuccess: (data) => queryClient.invalidateQueries(['getVideoData', data.id], { refetchType: 'all' }),
    onError: (error: { message: string }) => console.log(error.message),
  });
};

export const useGetSimilarVideoData = (videoId: number) => {
  return useQuery(['getSimilarVideoList', videoId], () => api.learnDetailService.getSimilarVideoData(videoId), {
    onError: (error: { message: string }) => console.log(error.message),
    enabled: !!videoId,
  });
};

export const usePostSentenceData = () => {
  return useMutation(api.learnDetailService.postSentenceData, {
    onSuccess: (data) => queryClient.invalidateQueries(['getVideoData', data.id], { refetchType: 'all' }),
    onError: (error: { message: string }) => console.log(error.message),
  });
};
