import styled from 'styled-components';
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
