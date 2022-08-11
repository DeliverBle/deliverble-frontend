import styled, { css } from 'styled-components';
export const StScrollContainer = styled.ul`
  position: fixed;
  margin-top: 42.4rem;
  right: 6.4rem;

  z-index: 2;
`;

export const StListItem = styled.li<{ isActive: boolean }>`
  width: 2.2rem;
  height: 2.2rem;

  margin: 0 0 1.1111111111111112rem;
  margin-bottom: 2rem;

  border-radius: 50%;
  cursor: pointer;
  opacity: 0.5;

  ${({ isActive }) =>
    isActive
      ? css`
          background-color: #160f35;
          opacity: 0.35;
        `
      : css`
          background-color: #160f35;
          opacity: 0.05;
        `}
`;
