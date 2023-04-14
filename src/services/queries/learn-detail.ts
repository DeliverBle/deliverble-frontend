import { api } from '@src/services/api';
import { loginState } from '@src/stores/loginState';
import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

export const useGetVideoData = (videoId: number, index?: number) => {
  const isLoggedIn = useRecoilValue(loginState);

  return useQuery(
    ['getVideoData', videoId, index],
    isLoggedIn && index
      ? () => api.learnDetailService.getPrivateVideoData(videoId, index)
      : () => api.learnDetailService.getPublicVideoData(videoId),
    {
      onError: (error: { message: string }) => console.log(error.message),
    },
  );
};
