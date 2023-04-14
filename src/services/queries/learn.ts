import { api } from '@src/services/api';
import { useMutation } from '@tanstack/react-query';

export const usePostSearchCondition = () => {
  return useMutation(['postSearchCondition'], api.learnService.postSearchCondition, {
    onError: (error: { message: string }) => console.log(error.message),
  });
};
