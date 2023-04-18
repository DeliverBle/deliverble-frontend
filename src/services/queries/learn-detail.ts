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
      enabled: !!videoId,
      cacheTime: speechGuide || !isLoggedIn ? Infinity : 300000,
      staleTime: speechGuide || !isLoggedIn ? Infinity : 0,
    },
  );
};

export const usePostNewScriptData = () => {
  return useMutation(api.learnDetailService.postNewScriptData, {
    onSuccess: (data) => queryClient.invalidateQueries(['getVideoData', data.id]),
  });
};

export const useDeleteScriptData = () => {
  return useMutation(api.learnDetailService.deleteScriptData, {
    onSuccess: (data) => queryClient.invalidateQueries(['getVideoData', data.id]),
  });
};

export const useUpdateScriptNameData = () => {
  return useMutation(api.learnDetailService.updateScriptNameData, {
    onSuccess: (data) => queryClient.invalidateQueries(['getVideoData', data.id]),
  });
};

export const useGetSimilarVideoData = (videoId: number) => {
  return useQuery(['getSimilarVideoList', videoId], () => api.learnDetailService.getSimilarVideoData(videoId), {
    enabled: !!videoId,
    cacheTime: Infinity,
    staleTime: Infinity,
  });
};

export const usePostSentenceData = () => {
  return useMutation(api.learnDetailService.postSentenceData, {
    onSuccess: (data) => queryClient.invalidateQueries(['getVideoData', data.id]),
  });
};

export const usePostMemoData = () => {
  return useMutation(api.learnDetailService.postMemoData, {
    onSuccess: (data) => queryClient.invalidateQueries(['getVideoData', data.id]),
  });
};

export const useUpdateMemoData = () => {
  return useMutation(api.learnDetailService.updateMemoData, {
    onSuccess: (data) => queryClient.invalidateQueries(['getVideoData', data.id]),
  });
};

export const useDeleteMemoData = () => {
  return useMutation(api.learnDetailService.deleteMemoData, {
    onSuccess: (data) => queryClient.invalidateQueries(['getVideoData', data.id]),
  });
};
