import { PostSearchConditionRequestBody, PostSearchConditionResponse } from './types/learn';

export interface LearnService {
  postSearchConditionWithToken(body: PostSearchConditionRequestBody): Promise<PostSearchConditionResponse>;
  postSearchConditionWithoutToken(body: PostSearchConditionRequestBody): Promise<PostSearchConditionResponse>;
}
