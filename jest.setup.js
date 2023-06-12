import '@testing-library/jest-dom/extend-expect';
import 'jest-canvas-mock';
import { server } from '@src/mocks/server';

jest.mock('swiper/css', jest.fn());

const portalRoot = document.createElement('div');
portalRoot.setAttribute('id', 'portal');
document.body.appendChild(portalRoot);

window.scrollTo = jest.fn();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
