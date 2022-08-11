import styled from 'styled-components';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { COLOR } from '@src/styles/color';

export const StHome = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 73rem;
  margin: 4.8rem 0 14.4rem 0;

  background: no-repeat url('/assets/images/img_banner.svg');
  background-size: cover;
  background-position: center;
`;

export const StBannerText = styled.div`
  padding: 28.9rem 0 20.1rem 16rem;

  width: fit-content;
  height: fit-content;

  color: ${COLOR.WHITE};

  & > h1 {
    ${FONT_STYLES.M_44_HEADLINE}
  }

  & > p {
    padding-top: 3.2rem;
    ${FONT_STYLES.M_24_HEADLINE}
  }
`;

export const StNews = styled.div`
  padding: 0 16rem 16rem 16rem;

  & > div {
    margin: 0 auto;
  }

  & > h3 {
    margin-bottom: 7.2rem;

    ${FONT_STYLES.SB_32_HEADLINE}
    color: ${COLOR.BLACK};
  }
`;
