import styled from 'styled-components';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';

export const StGuideModal = styled.div`
  .x-button {
    position: relative;
    width: 4.8rem;
    height: 4.8rem;
    cursor: pointer;
  }

  .icon {
    position: relative;
    width: 2.4rem;
    height: 2.4rem;
    margin-top: 0.2rem;
  }
`;

export const StGuideModalBackground = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.78);
  z-index: 1;
`;

export const StGuideModalContent = styled.div`
  width: 66.3rem;
  height: 34.5rem;
  padding: 1.6rem 1.6rem 4rem 2.8rem;
  border-radius: 1.6rem;
  background-color: ${COLOR.WHITE};
  box-shadow: 0.4rem 0.4rem 2rem rgba(22, 15, 53, 0.15);

  position: fixed;
  top: 54.7rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;

  & > div:first-child {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 3.2rem;
  }

  & > div:not(:first-child) {
    display: flex;
    gap: 1.2rem;
  }

  & > div:last-child {
    margin-top: 3.6rem;
  }
`;

export const StModalTitle = styled.div`
  color: ${COLOR.BLACK};
  ${FONT_STYLES.SB_24_HEADLINE};
`;

export const StModalSubtitle = styled.div`
  margin-bottom: 0.8rem;
  color: ${COLOR.MAIN_BLUE};
  ${FONT_STYLES.SB_20_BODY};
`;

export const StDescription = styled.div`
  p {
    color: ${COLOR.GRAY_80};
    ${FONT_STYLES.R_18_CAPTION};
  }
`;
