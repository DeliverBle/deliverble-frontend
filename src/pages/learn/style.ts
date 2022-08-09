import styled, { css } from 'styled-components';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';

export const StLearn = styled.div`
  margin: auto 16rem;
`;

export const StTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-top: 16rem;
  margin-bottom: 4.8rem;

  .search {
    position: relative;
    width: 4.8rem;
    height: 4.8rem;
  }

  & > h1 {
    ${FONT_STYLES.SB_32_HEADLINE};
    color: ${COLOR.BLACK};
  }
`;

export const StSearch = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 8rem;

  & > button {
    background-color: ${COLOR.MAIN_BLUE};
    color: ${COLOR.WHITE};
    ${FONT_STYLES.B_20_BODY};
    padding: 1.4rem 4rem 1.4rem 3.9rem;
    border-radius: 1.4rem;
    margin-left: 4rem;
    min-width: fit-content;
    height: 5.6rem;
  }
`;

export const StSelectBoxContainer = styled.div`
  display: flex;
  gap: 1.6rem;
`;

export const StResult = styled.div`
  & > h2 {
    ${FONT_STYLES.M_20_BODY};
    color: ${COLOR.GRAY_30};
    margin-bottom: 2.3rem;

    span {
      color: ${COLOR.MAIN_BLUE};
      font-weight: 600;
    }
  }

  & > div {
    margin-top: 16rem;
    margin-bottom: 26.4rem;
    text-align: center;
  }
`;

export const StLearnDetail = styled.div`
  padding: 16rem 10rem;
  min-height: 100vh;
  background: rgba(229, 238, 255, 0.85);
  backdrop-filter: blur(2.8rem);

  .close {
    position: fixed;
    top: 2.4rem;
    right: 10rem;
    width: 4.8rem;
    height: 4.8rem;
    cursor: pointer;
  }

  .guide {
    position: relative;
    width: 3.4rem;
    height: 3.4rem;
    cursor: pointer;
  }
`;

export const StGuideButton = styled.button<{ isModalOpen: boolean }>`
  width: 3.2rem;
  height: 3.2rem;
  padding: 0;

  &:hover {
    background-image: url('/assets/icons/ic_guide_hover.svg');
  }

  ${({ isModalOpen }) =>
    isModalOpen
      ? css`
          background-image: url('/assets/icons/ic_guide_clicked.svg');
        `
      : css`
          background-image: url('/assets/icons/ic_guide.svg');
        `}
`;

export const StLearnMain = styled.main`
  display: flex;
  margin: 0 auto;
  gap: 4rem;
  width: 172rem;
  height: 111.9rem;
  padding: 8rem 8rem 0 8rem;
  border-radius: 3rem;
  background-color: ${COLOR.WHITE};
  overflow: hidden;
`;

export const StLearnSection = styled.section`
  display: flex;
  flex-direction: column;
  padding-bottom: 8rem;

  & > div {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    margin-top: 14rem;
    margin-bottom: 2.4rem;

    h2 {
      color: ${COLOR.BLACK};
      ${FONT_STYLES.SB_24_HEADLINE};
    }
  }

  .announce {
    position: relative;
    width: 3.2rem;
    height: 3.2rem;
  }

  article {
    display: flex;
    flex-direction: column;
    width: 84.2rem;
    height: 76rem;
    padding: 1.8rem 1.2rem 1.8rem 2rem;
    border: 0.2rem solid ${COLOR.GRAY_10};
    border-radius: 2.4rem;
    color: ${COLOR.BLACK};
    font-size: 2.6rem;
    line-height: 5.8rem;
    word-break: keep-all;

    div::selection {
      background: ${COLOR.SUB_BLUE_30};
    }

    & > div:first-child {
      position: relative;
      flex: 1;
      padding: 0.6rem 1.2rem;
      height: 62.8rem;
      overflow-y: scroll;

      &::-webkit-scrollbar {
        width: 1rem;
      }

      &::-webkit-scrollbar-thumb {
        background-color: ${COLOR.GRAY_10};
        border-radius: 1.3rem;
      }

      &::-webkit-scrollbar-track-piece {
        height: 13.6rem;
        max-height: 13.6rem;
      }
    }

    & > div:last-child {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 1.8rem;
      margin-top: 2.4rem;
      border-top: 0.2rem solid ${COLOR.GRAY_10};
    }
  }
`;

export const StScriptText = styled.div<{ isActive: boolean }>`
  position: relative;
  font-size: 2.6rem;
  font-weight: ${({ isActive }) => (isActive ? 600 : 400)};
  color: ${({ isActive }) => (isActive ? COLOR.MAIN_BLUE : COLOR.BLACK)};
  cursor: pointer;

  & > span {
    font-size: 3.2rem;
    font-weight: 600;
    color: ${COLOR.MAIN_BLUE};
    margin: 0 0.02rem 0 0.02rem;
  }

  & > mark {
    background: linear-gradient(259.3deg, #d8d9ff 0%, #a7c5ff 100%);
    font-weight: ${({ isActive }) => (isActive ? 600 : 400)};
    color: ${({ isActive }) => (isActive ? COLOR.MAIN_BLUE : COLOR.BLACK)};

    & > span {
      font-size: 3.2rem;
      font-weight: 600;
      color: ${COLOR.MAIN_BLUE};
    }
  }

  & > mark:hover {
    color: ${COLOR.MAIN_BLUE};
    font-weight: 600;
  }
`;

export const StButtonContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  position: relative;
  padding-right: 0.8rem;
`;

export const StButton = styled.button`
  width: 4.8rem;
  height: 4.8rem;

  &:hover .default img {
    transition: opacity 1s;
    opacity: 0;
  }

  .function-button {
    cursor: pointer;
    position: absolute;
    top: 0;
  }
`;

export const StVideoWrapper = styled.div`
  position: relative;
  margin-bottom: 4.8rem;
  width: fit-content;
  height: fit-content;
  border-radius: 2.4rem;
  overflow: hidden;

  .like-button {
    position: absolute;
    width: 4.8rem;
    height: 4.8rem;
    cursor: pointer;
    top: 2.4rem;
    right: 2.4rem;
  }

  video {
    position: relative;
    left: 0;
    top: 0;
    opacity: 1;
  }
`;

export const StMemoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StMemoTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 2.4rem;

  & > h2 {
    color: ${COLOR.BLACK};
    ${FONT_STYLES.SB_24_HEADLINE};
  }

  .memo {
    position: relative;
    width: 3.2rem;
    height: 3.2rem;
  }
`;

export const StMemoWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
