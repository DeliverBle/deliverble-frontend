import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import styled from 'styled-components';

export const StEmptyMemo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .memo-empty {
    position: relative;

    margin-top: 4.4rem;
    width: 10rem;
    height: 10rem;
  }

  & > p:nth-of-type(1) {
    padding-top: 2.4rem;

    color: ${COLOR.GRAY_45};
    ${FONT_STYLES.B_20_BODY};
  }

  & > p:nth-of-type(2) {
    padding-top: 0.8rem;

    color: ${COLOR.GRAY_30};
    ${FONT_STYLES.M_16_CAPTION};
  }
`;
