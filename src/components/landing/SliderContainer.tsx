import styled from 'styled-components';
import { useEffect } from 'react';
import Lottie from 'lottie-react';
import { step1Lottie } from 'public/assets/lottie';
import { step2Lottie } from 'public/assets/lottie';
import { step3Lottie } from 'public/assets/lottie';
import { imgLandingBgFirst, imgLandingBgSecond, imgLandingBgLast } from 'public/assets/images/index';
import { imgLandingBubble } from 'public/assets/images/index';
import { imgLandingEar, imgLandingMic, imgLandingFist } from 'public/assets/images/index';
import { COLOR } from 'src/styles/color';
import { FONT_STYLES } from 'src/styles/fontStyle';
import ImageDiv from '../common/ImageDiv';

interface SliderContainerProps {
  slideNumber: number;
}
function SliderContainer(props: SliderContainerProps) {
  const { slideNumber } = props;

  useEffect(() => {
    console.log(slideNumber);
  }, []);

  return (
    <StSliderContainer>
      <div className="first-slide">
        <StFirstSlider>
          <div className="headline-wrapper">
            <h1>아나운서 쉐도잉으로 키우는</h1>
            <h1>스피치 자신감, 딜리버블</h1>
          </div>
          <button className="start-button">딜리버블 시작하기</button>
        </StFirstSlider>
      </div>

      <StSecondSlider>
        <h1 className="headline">지금보다 더 잘 말하고 싶었던 적 없나요?</h1>
        <div className="body-card-wrapper">
          <StCard>
            <ImageDiv src={imgLandingEar} className="ear" layout="fill" alt="" />
            <h3>웅얼웅얼 발음 습관을</h3>
            <h3>고치고 싶어요.</h3>
            <p>27세 아나운서 준비생 김버블씨</p>
          </StCard>
          <StCard>
            <ImageDiv src={imgLandingFist} className="fist" layout="fill" alt="" />
            <h3>더 당당하고 자신감 있게</h3>
            <h3>말하고 싶어요.</h3>
            <p>27세 아나운서 준비생 김버블씨</p>
          </StCard>
          <StCard>
            <ImageDiv src={imgLandingMic} className="mic" layout="fill" alt="" />
            <h3>아나운서처럼 시원한 발성을</h3>
            <h3>갖고 싶어요.</h3>
            <p>27세 아나운서 준비생 김버블씨</p>
          </StCard>
        </div>
      </StSecondSlider>

      <StThirdSlider>
        <div className="headline-wrapper">
          <h1>딜리버블이 제안하는</h1>
          <h1>효과적인 말하기 학습 솔루션</h1>
        </div>
        <StContentContainer className="step1-content">
          <StLottieWrapper className="step1">
            <Lottie animationData={step1Lottie} autoPlay loop />
          </StLottieWrapper>
          <StTextWrapper>
            <h2>STEP 1.</h2>
            <h3>무작정 따라하며</h3>
            <h3>아나운서의 좋은 발음과 발성 배우기</h3>
            <Sth4>
              <h4>언제 어디서든 아나운서의 좋은 목소리를 듣고, </h4>
              <h4>소리 내서 따라하며 연습해봐요.</h4>
            </Sth4>
          </StTextWrapper>
        </StContentContainer>
      </StThirdSlider>

      <StFourthSlider>
        <StContentContainer className="step2-content">
          <StLottieWrapper className="step2">
            <Lottie animationData={step2Lottie} autoPlay loop />
          </StLottieWrapper>
          <StTextWrapper>
            <h2>STEP 2.</h2>
            <h3>끊어 읽기, 하이라이트, 메모 기능으로</h3>
            <h3>더 똑똑하게 공부하기</h3>
            <Sth4>
              <h4>클릭 한 번으로 쉽게 끊어 읽기 표시를 남기고,</h4>
              <h4>메모를 추가하여 나만의 피드백도 기록해봐요.</h4>
            </Sth4>
          </StTextWrapper>
        </StContentContainer>
      </StFourthSlider>

      <StFifthSlider>
        <StContentContainer className="step3-content">
          <StLottieWrapper className="step3">
            <Lottie animationData={step3Lottie} autoPlay loop />
          </StLottieWrapper>
          <StTextWrapper>
            <h2>STEP 3.</h2>
            <h3>끊어 읽기, 하이라이트, 메모 기능으로</h3>
            <h3>더 똑똑하게 공부하기</h3>
            <Sth4>
              <h4>클릭 한 번으로 쉽게 끊어 읽기 표시를 남기고,</h4>
              <h4>메모를 추가하여 나만의 피드백도 기록해봐요.</h4>
            </Sth4>
          </StTextWrapper>
        </StContentContainer>
      </StFifthSlider>

      <StSixthSlider>
        <div className="headline-wrapper">
          <h1>아나운서 준비생들에게 이미 검증된 스피치 학습법 </h1>
          <h1>아나운서 쉐도잉으로</h1>
          <h1>스피치 자신감을 키워보세요!</h1>
        </div>
        <button className="start-button">딜리버블 시작하기</button>
      </StSixthSlider>
    </StSliderContainer>
  );
}

export default SliderContainer;

const StContentContainer = styled.section`
  display: flex;

  &.step1-content {
    margin-top: 23.6rem;
  }

  &.step2-content {
    margin-top: 36.1rem;
  }
  &.step3-content {
    margin-top: 34.2rem;
  }
`;

const Sth4 = styled.section`
  & > h4 {
    color: ${COLOR.GRAY_60};
    ${FONT_STYLES.M_24_HEADLINE};
  }
  margin-top: 3.2rem;
`;

const StTextWrapper = styled.section`
  & > h2 {
    color: ${COLOR.MAIN_BLUE};
    ${FONT_STYLES.B_100_LANDING};
    font-family: 'Dongle';
  }

  & > h3 {
    color: ${COLOR.BLACK};
    ${FONT_STYLES.SB_36_HEADLINE};
  }
`;

const StSliderContainer = styled.div`
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

const StFirstSlider = styled.section`
  width: 100%;
  height: 100%;

  .headline-wrapper {
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

const StSecondSlider = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  height: 100%;

  background-image: url(${imgLandingBgSecond.src});
  background-position: 0px 18.1rem;
  background-repeat: no-repeat;
  background-size: contain;

  .headline {
    margin-top: 8.8rem;
    color: ${COLOR.BLACK};
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 44px;
    line-height: 150%;
    text-align: center;
    letter-spacing: -0.01em;
  }

  .body-card-wrapper {
    display: flex;
    justify-content: center;

    width: 192rem;
    height: 79rem;

    margin-top: 4.3rem;
    gap: 7rem;
  }
`;

const StCard = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 38.8rem;
  height: 49rem;

  background: #ffffff;
  box-shadow: 2rem 2rem 5rem rgba(78, 138, 255, 0.15);
  border-radius: 4rem;

  margin-top: 17.9rem;

  & > h3 {
    color: ${COLOR.BLACK};
    ${FONT_STYLES.M_24_HEADLINE};
  }

  & > p {
    color: ${COLOR.GRAY_30};
    ${FONT_STYLES.SB_18_CAPTION};
    margin-top: 8.8rem;
    margin-bottom: 2.3rem;
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
const StThirdSlider = styled.section`
  display: flex;
  flex-direction: column;

  .headline-wrapper {
    margin-top: 16rem;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 44px;
    line-height: 150%;
    text-align: center;
    letter-spacing: -0.01em;
  }
`;

const StFourthSlider = styled.section`
  .fourth-text-wrapper {
    width: 51.3rem;
    height: 34.8rem;

    margin-top: 35rem;
    margin-left: 29.8rem;
    margin-bottom: 38.2rem;

    text-align: right;
  }
`;

const StFifthSlider = styled.section`
  .fifth-text-wrapper {
    margin-top: 36.6rem;
    margin-left: 115.7rem;
    margin-bottom: 36.6rem;
  }
`;

const StSixthSlider = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  background-image: url(${imgLandingBgLast.src});
  background-repeat: no-repeat;
  background-size: cover;

  .headline-wrapper {
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

    margin-top: 4.8rem;
    margin-bottom: 40.9rem;

    background-color: ${COLOR.MAIN_BLUE};
    color: ${COLOR.WHITE};
    ${FONT_STYLES.SB_24_HEADLINE};

    border-radius: 1.4rem;
  }
`;

const StLottieWrapper = styled.div`
  &.step1 {
    width: 57.7rem;
    height: 30.5rem;
    margin-left: 25.5rem;
    margin-right: 25.6rem;
  }

  &.step2 {
    width: 57.8rem;
    height: 35.9rem;
    margin-left: 34.9rem;
    margin-right: 16.1rem;
  }

  &.step3 {
    width: 57.7rem;
    height: 39.7rem;
    margin-left: 31.8rem;
    margin-right: 19.3rem;
  }
`;
