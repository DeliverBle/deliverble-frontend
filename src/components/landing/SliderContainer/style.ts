import styled from 'styled-components';
import { COLOR } from 'src/styles/color';
import { FONT_STYLES } from 'src/styles/fontStyle';

import { imgLandingBgFirst, imgLandingBgSecond, imgLandingBgLast } from 'public/assets/images/index';
import { imgLandingBubble } from 'public/assets/images/index';

export const StContentContainer = styled.section`
  display: flex;

  &.step1-content {
    margin-top: 23.6rem;
    margin-bottom: 21.9rem;
  }

  &.step2-content {
    margin-top: 36.1rem;
    margin-bottom: 36rem;
  }
  &.step3-content {
    margin-top: 34.2rem;
    margin-bottom: 34.1rem;
  }
`;

export const StH4 = styled.section`
  & > h4 {
    color: ${COLOR.GRAY_60};
    ${FONT_STYLES.M_24_HEADLINE};
  }
  margin-top: 3.2rem;
`;

export const StTextWrapper = styled.section`
  & > h2 {
    color: ${COLOR.MAIN_BLUE};
    ${FONT_STYLES.B_100_CAPTION};
    font-family: 'Dongle';
  }

  & > h3 {
    color: ${COLOR.BLACK};
    ${FONT_STYLES.SB_36_HEADLINE};
  }
`;

export const StSliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  .first-slide {
    width: 100%;
    height: 100vh;
    min-height: 108rem;

    background-image: url(${imgLandingBubble.src}), url(${imgLandingBgFirst.src});
    background-position: -60px 96px, 0px 0px;
    background-repeat: no-repeat;
    background-size: 1906.64px 655px, cover;
  }
`;

export const StFirstSlider = styled.section`
  width: 100%;
  height: 100%;

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    color: ${COLOR.BLACK};
    ${FONT_STYLES.M_44_HEADLINE};

    padding-top: 41.5rem;
    margin-left: 16rem;
  }

  .start-button {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 26rem;
    height: 7rem;

    margin-top: 4.8rem;
    margin-left: 16rem;
    margin-bottom: 41.5rem;

    background-color: ${COLOR.MAIN_BLUE};
    color: ${COLOR.WHITE};
    ${FONT_STYLES.SB_24_HEADLINE};

    border-radius: 1.4rem;
  }
`;

export const StSecondSlider = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  height: 100%;

  background-image: url(${imgLandingBgSecond.src});
  background-position: 0px 18.1rem;
  background-repeat: no-repeat;
  background-size: contain;

  & > h2 {
    margin-top: 8.8rem;
    color: ${COLOR.BLACK};
    font: normal 600 44px/150% 'Pretendard';
    text-align: center;
    letter-spacing: -0.01em;
  }

  .body-card-wrapper {
    display: flex;
    justify-content: center;

    width: 100%;
    height: 79rem;

    margin: 4.3rem 0 12.1rem 0;
    gap: 7rem;
  }
`;

export const StCard = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  width: 38.8rem;
  height: 49rem;

  background: #ffffff;
  box-shadow: 2rem 2rem 5rem rgba(78, 138, 255, 0.15);
  border-radius: 4rem;

  margin-top: 17.9rem;

  .first-card {
    & > h3 {
      margin-bottom: 8.6rem;
    }
  }

  .second-card,
  third-card {
    & > h3 {
      margin-bottom: 6.2rem;
    }
  }

  & > h3 {
    color: ${COLOR.BLACK};
    ${FONT_STYLES.M_24_HEADLINE};
  }

  & > p {
    color: ${COLOR.GRAY_30};
    ${FONT_STYLES.SB_18_CAPTION};

    margin: 8.8rem 0 2.3rem 0;
  }
  .ear,
  .fist,
  .mic {
    position: relative;
    width: 21.7rem;
    height: 21.7rem;

    margin-top: 6.4rem;
  }
`;
export const StThirdSlider = styled.section`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  .headline-wrapper {
    margin-top: 22rem;

    font: normal 600 44px/150% 'Pretendard';

    text-align: center;
    letter-spacing: -0.01em;
  }
`;

export const StFourthSlider = styled.section`
  width: 100%;
  height: 100%;
`;

export const StFifthSlider = styled.section`
  width: 100%;
  height: 100%;
`;

export const StSixthSlider = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100%;

  background-image: url(${imgLandingBgLast.src});
  background-repeat: no-repeat;
  background-size: cover;

  & > div > h2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40.9rem;

    color: ${COLOR.BLACK};
    ${FONT_STYLES.SB_32_HEADLINE};
  }

  .start-button {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 26rem;
    height: 7rem;

    margin-top: 5.6rem;

    background-color: ${COLOR.MAIN_BLUE};
    color: ${COLOR.WHITE};
    ${FONT_STYLES.SB_24_HEADLINE};

    border-radius: 1.4rem;
  }
`;

export const StContact = styled.div`
  position: relative;
  margin: 22.9rem 0 6.4rem 160.9rem;
  color: ${COLOR.MAIN_BLUE};

  .contact {
    ${FONT_STYLES.SB_24_HEADLINE};
  }

  .email {
    ${FONT_STYLES.M_20_BODY};
  }
`;

export const StLottieWrapper = styled.div`
  &.step1 {
    width: 57.7rem;
    height: 30.5rem;

    margin: 0 25.6rem 0 25.6rem;
  }

  &.step2 {
    width: 57.8rem;
    height: 35.9rem;

    margin: 0 16.1rem 0 34.9rem;
  }

  &.step3 {
    width: 57.7rem;
    height: 39.7rem;

    margin: 0 19.3rem 0 31.8rem;
  }
`;
