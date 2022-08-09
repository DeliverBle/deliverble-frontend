import styled from 'styled-components';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';

export const StHighlightModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const StHighlightModalContent = styled.div`
  position: fixed;
  transform: translate(-50%, -50%);
  width: 37rem;
  height: 19.2rem;
  border-radius: 1.6rem;
  border: solid 0.2rem ${COLOR.GRAY_10};
  background-color: ${COLOR.WHITE};
  box-shadow: 0.2rem 0.4rem 4rem 0 rgba(22, 15, 53, 0.15);
  ${FONT_STYLES.SB_20_BODY};

  p {
    text-align: center;
    margin-top: 1.2rem;
  }

  .alert {
    position: relative;
    width: 3.2rem;
    height: 3.2rem;
    margin: 3.2rem auto 0 auto;
  }

  .checkbox {
    position: relative;
    width: 2.4rem;
    height: 2.4rem;
  }
`;

export const StTimeClosedSet = styled.div`
  position: absolute;
  left: 2.4rem;
  bottom: 2.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 14.9rem;
  height: 2.5rem;
  cursor: pointer;

  span {
    ${FONT_STYLES.M_16_CAPTION};
    color: ${COLOR.GRAY_45};
    margin-left: 0.8rem;
  }
`;

export const StOkayButton = styled.button`
  position: absolute;
  bottom: 2.2rem;
  right: 3.2rem;
  ${FONT_STYLES.SB_20_BODY};
  color: ${COLOR.MAIN_BLUE};
`;
