import { similarVideoData, videoData } from '@src/mocks/api/data/learnDetailData';
import { rest } from 'msw';

const handlers = [
  rest.get('https://deliverble.online/news/similar/1', (_, res, ctx) => {
    console.log('비슷한 뉴스 추천 mock API 호출');
    return res(ctx.status(200), ctx.json(similarVideoData));
  }),

  rest.get('https://deliverble.online/news/detail/not-authentication/1', (_, res, ctx) => {
    console.log('뉴스 상세 정보 mock API 호출 (비인증)');
    return res(ctx.status(200), ctx.json(videoData));
  }),
];

export default handlers;
