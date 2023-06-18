import { similarVideoData, videoData, createMemo, updateMemo } from '@src/mocks/api/data/learnDetailData';
import { rest } from 'msw';

const handlers = [
  rest.get('https://deliverble.online/news/similar/2', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(similarVideoData));
  }),

  rest.get('https://deliverble.online/news/detail/not-authentication/2', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(videoData));
  }),

  rest.get('https://deliverble.online/news/detail/2', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(videoData));
  }),

  rest.post(`https://deliverble.online/script/memo/create/197`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(createMemo));
  }),

  rest.patch(`https://deliverble.online/script/memo/update/3`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(updateMemo));
  }),
];

export default handlers;
