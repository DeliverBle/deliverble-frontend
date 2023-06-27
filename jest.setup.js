import '@testing-library/jest-dom/extend-expect';
import 'jest-canvas-mock';
import { server } from '@src/mocks/server';
import { QueryCache } from '@tanstack/react-query';

jest.mock('swiper/css', jest.fn());

const portalRoot = document.createElement('div');
portalRoot.setAttribute('id', 'portal');
document.body.appendChild(portalRoot);

window.scrollTo = jest.fn();

const queryCache = new QueryCache();

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  queryCache.clear();
});
afterAll(() => server.close());
