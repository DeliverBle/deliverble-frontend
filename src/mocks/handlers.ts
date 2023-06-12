import { LEARN_DETAIL_DATA } from '@src/services/mock/learn-detail.data';
import { rest } from 'msw';

export const handlers = [
  rest.get('https://deliverble.online/news/similar/1', (_, res, ctx) => {
    console.log('비슷한 뉴스 추천 mock API 호출');
    return res(ctx.status(200), ctx.json(LEARN_DETAIL_DATA.SIMILAR_VIDEO_DATA));
  }),
];
