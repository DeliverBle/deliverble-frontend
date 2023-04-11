import { PostSearchConditionRequestBody, PostSearchConditionResponse } from '@src/types/learn';

export interface LearnService {
  postSearchCondition(body: PostSearchConditionRequestBody): Promise<PostSearchConditionResponse>;
}
