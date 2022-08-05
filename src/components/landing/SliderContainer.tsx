import styled from 'styled-components';
import Link from 'next/link';
import { MutableRefObject, useEffect } from 'react';
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
import { useSlideObserver } from 'src/components/landing/useSlideObserver';

interface SliderContainerProps {
  slideNumber: number;
  setSlideNumber: (slideNumber: number) => void;
}

function SliderContainer(props: SliderContainerProps) {
  const { slideNumber, setSlideNumber } = props;

  const firstSlideRef = useSlideObserver(setSlideNumber, 1);
  const secondSlideRef = useSlideObserver(setSlideNumber, 2);
  const thirdSlideRef = useSlideObserver(setSlideNumber, 3);
  const fourthSlideRef = useSlideObserver(setSlideNumber, 4);
  const fifthSlideRef = useSlideObserver(setSlideNumber, 5);
  const sixthSlideRef = useSlideObserver(setSlideNumber, 6);

  useEffect(() => {
    const moveToElement = (slideNumber: number) => {
      const clickedSlideNum = slideNumber;
      let clickedSlideRef: MutableRefObject<HTMLElement | null> | undefined;
      switch (clickedSlideNum) {
        case 1:
          clickedSlideRef = firstSlideRef;
          break;
        case 2:
          clickedSlideRef = secondSlideRef;
          break;
        case 3:
          clickedSlideRef = thirdSlideRef;
          break;
        case 4:
          clickedSlideRef = fourthSlideRef;
          break;
        case 5:
          clickedSlideRef = fifthSlideRef;
          break;
        case 6:
          clickedSlideRef = sixthSlideRef;
          break;
      }
      clickedSlideRef &&
        clickedSlideRef.current?.scrollIntoView({
          block: 'start',
          behavior: 'smooth',
        });
    };
    moveToElement(slideNumber);
  }, [fifthSlideRef, firstSlideRef, fourthSlideRef, secondSlideRef, sixthSlideRef, slideNumber, thirdSlideRef]);

  return (
    <StSliderContainer>
      <div className="first-slide">
        <StFirstSlider ref={firstSlideRef}>
          <div>
            <h1>아나운서 쉐도잉으로 키우는</h1>
            <h1>스피치 자신감, 딜리버블</h1>
          </div>
          <Link href="/home">
            <a className="start-button">딜리버블 시작하기</a>
          </Link>
        </StFirstSlider>
      </div>

      <StSecondSlider ref={secondSlideRef}>
        <h2>지금보다 더 잘 말하고 싶었던 적 없나요?</h2>
        <div className="body-card-wrapper">
          <StCard className="first-card">
            <ImageDiv src={imgLandingEar} className="ear" layout="fill" alt="" />
            <h3>
              “웅얼웅얼 발음을 교정하고 싶은데,
              <br />
              학원을 다니기엔 금액이 부담돼요”
            </h3>
            <p>26살 취준생 김○○</p>
          </StCard>
          <StCard className="second-card">
            <ImageDiv src={imgLandingFist} className="fist" layout="fill" alt="" />
            <h3>
              “떨리고 힘없는 목소리 때문에
              <br />
              발표에 자신이 없어... 더 당당하게
              <br />
              말할 수 있는 방법이 없을까?”
            </h3>
            <p>23살 대학생 류○○</p>
          </StCard>
          <StCard className="third-card">
            <ImageDiv src={imgLandingMic} className="mic" layout="fill" alt="" />
            <h3>
              “아나운서 준비에 관심은 있는데,
              <br />
              혼자 뉴스 리딩을 어떻게
              <br />
              연습해야 할지 막막해요”
            </h3>
            <p>24살 아나운서 지망생 백○○</p>
          </StCard>
        </div>
      </StSecondSlider>

      <StThirdSlider ref={thirdSlideRef}>
        <div className="headline-wrapper">
          <h1>
            딜리버블이 제안하는
            <br />
            효과적인 말하기 학습 솔루션
          </h1>
        </div>
        <StContentContainer className="step1-content">
          <StLottieWrapper className="step1">
            <Lottie animationData={step1Lottie} autoPlay loop />
          </StLottieWrapper>
          <StTextWrapper>
            <h2>Step 1.</h2>
            <h3>
              무작정 따라하며
              <br />
              아나운서의 좋은 발음과 발성 배우기
            </h3>
            <StH4>
              <h4>
                언제 어디서든 아나운서의 좋은 목소리를 듣고,
                <br />
                소리 내서 따라하며 연습해봐요.
              </h4>
            </StH4>
          </StTextWrapper>
        </StContentContainer>
      </StThirdSlider>

      <StFourthSlider ref={fourthSlideRef}>
        <StContentContainer className="step2-content">
          <StLottieWrapper className="step2">
            <Lottie animationData={step2Lottie} autoPlay loop />
          </StLottieWrapper>
          <StTextWrapper>
            <h2>Step 2.</h2>
            <h3>
              끊어 읽기, 하이라이트, 메모 기능으로
              <br />더 똑똑하게 공부하기
            </h3>
            <StH4>
              <h4>
                클릭 한 번으로 쉽게 끊어 읽기 표시를 남기고,
                <br />
                메모를 추가하여 나만의 피드백도 기록해봐요.
              </h4>
            </StH4>
          </StTextWrapper>
        </StContentContainer>
      </StFourthSlider>

      <StFifthSlider ref={fifthSlideRef}>
        <StContentContainer className="step3-content">
          <StLottieWrapper className="step3">
            <Lottie animationData={step3Lottie} autoPlay loop />
          </StLottieWrapper>
          <StTextWrapper>
            <h2>Step 3.</h2>
            <h3>
              꾸준한 복습으로
              <br />
              스피치 자신감 키우기
            </h3>
            <StH4>
              <h4>
                다시 따라하고 싶은 영상을 즐겨찾기에 저장해
                <br />
                꾸준히 복습하고, 더 당당하게 말해봐요.
              </h4>
            </StH4>
          </StTextWrapper>
        </StContentContainer>
      </StFifthSlider>

      <StSixthSlider ref={sixthSlideRef}>
        <div>
          <h2>
            아나운서 준비생들에게 이미 검증된 스피치 학습법
            <br />
            아나운서 쉐도잉으로 스피치 자신감을 키워보세요!
          </h2>
        </div>
        <Link href="/home">
          <a className="start-button">딜리버블 시작하기</a>
        </Link>
        <StContact>
          <p className="contact">Contact Us</p>
          <p className="email">deliverble.team@gmail.com</p>
        </StContact>
      </StSixthSlider>
    </StSliderContainer>
  );
}

export default SliderContainer;

const StContentContainer = styled.section`
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

const StH4 = styled.section`
  & > h4 {
    color: ${COLOR.GRAY_60};
    ${FONT_STYLES.M_24_HEADLINE};
  }
  margin-top: 3.2rem;
`;

const StTextWrapper = styled.section`
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

const StCard = styled.section`
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
const StThirdSlider = styled.section`
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

const StFourthSlider = styled.section`
  width: 100%;
  height: 100%;
`;

const StFifthSlider = styled.section`
  width: 100%;
  height: 100%;
`;

const StSixthSlider = styled.section`
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

const StContact = styled.div`
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

const StLottieWrapper = styled.div`
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
