import '@testing-library/jest-dom/extend-expect';
import 'jest-canvas-mock';

jest.mock('swiper/css', jest.fn());

const portalRoot = document.createElement('div');
portalRoot.setAttribute('id', 'portal');
document.body.appendChild(portalRoot);

window.scrollTo = jest.fn();
