import { LIST_SIZE } from '@src/constants/common';
import { api } from '@src/services/api';
import { loginState } from '@src/stores/loginState';
import { ReviewTab } from '@src/types/review/remote';
import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

export const usePostReviewVideoList = (currentPage: number, tab: ReviewTab) => {
  const isLoggedIn = useRecoilValue(loginState);
  return useQuery(
    ['postReviewList', currentPage, tab],
    () => api.reviewService.postReviewVideoList({ currentPage, listSize: LIST_SIZE }, tab),
    {
      enabled: isLoggedIn,
    },
  );
};
