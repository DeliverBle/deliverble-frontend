import { BASE_URL } from '@src/constants/common';
import { similarVideoData, videoData, createMemo, updateMemo } from '@src/mocks/api/data/learnDetailData';
import { rest } from 'msw';

const handlers = [
  rest.get(`${BASE_URL}/news/similar/2`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(similarVideoData));
  }),

  rest.get(`${BASE_URL}/news/detail/not-authentication/2`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(videoData));
  }),

  rest.get(`${BASE_URL}news/detail/2`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(videoData));
  }),

  rest.post(`${BASE_URL}/script/memo/create/197`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(createMemo));
  }),

  rest.patch(`${BASE_URL}/script/memo/update/3`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(updateMemo));
  }),
];

export default handlers;
