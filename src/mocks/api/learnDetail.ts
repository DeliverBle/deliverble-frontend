import { similarVideoData, videoData, createMemo } from '@src/mocks/api/data/learnDetailData';
import { rest } from 'msw';

const handlers = [
  rest.get('https://deliverble.online/news/similar/2', (_, res, ctx) => {
    console.log('비슷한 뉴스 추천 mock API 호출');
    return res(ctx.status(200), ctx.json(similarVideoData));
  }),

  rest.get('https://deliverble.online/news/detail/not-authentication/2', (_, res, ctx) => {
    console.log('뉴스 상세 정보 mock API 호출 (비인증)');
    return res(ctx.status(200), ctx.json(videoData));
  }),

  rest.get('https://deliverble.online/news/detail/2', (_, res, ctx) => {
    console.log('뉴스 상세 정보 mock API 호출 (인증)');
    return res(ctx.status(200), ctx.json(videoData));
  }),

  rest.post(`https://deliverble.online/script/memo/create/197`, (_, res, ctx) => {
    console.log('메모 추가 mock API 호출');
    return res(ctx.status(200), ctx.json(createMemo));
  }),
];

export default handlers;
