import { api } from '@src/services/api';
import { PostSearchConditionRequestBody } from '@src/types/learn/remote';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../../pages/_app';

export const useGetSearchCondition = (data: PostSearchConditionRequestBody) => {
  return useQuery(['postSearchCondition', data], () => api.learnService.postSearchCondition(data));
};

export const usePostSearchCondition = () => {
  return useMutation(api.learnService.postSearchCondition, {
    onSuccess: () => queryClient.invalidateQueries(['postSearchCondition']),
  });
};
