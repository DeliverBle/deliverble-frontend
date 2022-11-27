import styled from 'styled-components';
import Link from 'next/link';
import { MutableRefObject, useEffect } from 'react';
import Lottie from 'lottie-react';
import { step1Lottie, step2Lottie, step3Lottie } from 'public/assets/lottie';
import {
  imgLandingBgFirst,
  imgLandingBgSecond,
  imgLandingBgLast,
  imgLandingEar,
  imgLandingMic,
  imgLandingFist,
  imgLandingBubble,
} from 'public/assets/images/index';
import { COLOR } from 'src/styles/color';
import { FONT_STYLES } from 'src/styles/fontStyle';
import ImageDiv from '../common/ImageDiv';
import { useSlideObserver } from '@src/hooks/useSlideObserver';

interface SliderContainerProps {
  slideNumber: number;
  setSlideNumber: (slideNumber: number) => void;
  stopObserve: boolean;
  setStopObserve: (stopObserve: boolean) => void;
}

function SliderContainer(props: SliderContainerProps) {
  const { slideNumber, setSlideNumber, stopObserve, setStopObserve } = props;

  const firstSlideRef = useSlideObserver(setSlideNumber, 1, stopObserve);
  const secondSlideRef = useSlideObserver(setSlideNumber, 2, stopObserve);
  const thirdSlideRef = useSlideObserver(setSlideNumber, 3, stopObserve);
  const fourthSlideRef = useSlideObserver(setSlideNumber, 4, stopObserve);
  const fifthSlideRef = useSlideObserver(setSlideNumber, 5, stopObserve);
  const sixthSlideRef = useSlideObserver(setSlideNumber, 6, stopObserve);

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
    setTimeout(() => {
      setStopObserve(false);
    }, 700);
  }, [
    fifthSlideRef,
    firstSlideRef,
    fourthSlideRef,
    secondSlideRef,
    setStopObserve,
    sixthSlideRef,
    slideNumber,
    thirdSlideRef,
  ]);

  return (
    <StSliderContainer>
      <StFirstSlider ref={firstSlideRef}>
        <div>
          <h1>
            아나운서 쉐도잉으로 키우는
            <br />
            스피치 자신감, 딜리버블
          </h1>
        </div>
        <Link href="/home" passHref>
          <StStartButton>딜리버블 시작하기</StStartButton>
        </Link>
      </StFirstSlider>

      <StSecondSlider ref={secondSlideRef}>
        <h2>지금보다 더 잘 말하고 싶었던 적 없나요?</h2>
        <StBodyCardWrapper>
          <StCard>
            <ImageDiv src={imgLandingEar} className="ear" layout="fill" alt="" />
            <h3>
              “발음을 교정하고 싶은데,
              <br />
              학원 가격이 너무 부담돼요”
            </h3>
            <p>26살 취준생 김○○</p>
          </StCard>
          <StCard>
            <ImageDiv src={imgLandingFist} className="fist" layout="fill" alt="" />
            <h3>
              “목소리가 떨려서 발표를 망쳤어요.
              <br />
              저도 당당하게 말하고 싶어요!”
            </h3>
            <p>23살 대학생 류○○</p>
          </StCard>
          <StCard>
            <ImageDiv src={imgLandingMic} className="mic" layout="fill" alt="" />
            <h3>
              “아나운서 준비를 시작했는데,
              <br />
              뉴스 리딩은 처음이라 막막해요”
            </h3>
            <p>24살 아나운서 지망생 백○○</p>
          </StCard>
        </StBodyCardWrapper>
      </StSecondSlider>

      <StThirdSlider ref={thirdSlideRef}>
        <div>
          <h1>
            딜리버블이 제안하는
            <br />
            효과적인 말하기 학습 솔루션
          </h1>
        </div>
        <section>
          <StLottieWrapper className="step1">
            <Lottie animationData={step1Lottie} autoPlay loop />
          </StLottieWrapper>
          <StTextWrapper>
            <h2>Step 1.</h2>
            <h3>
              아나운서의 정확한 뉴스리딩,
              <br />한 문장씩 듣고 따라하기
            </h3>
            <StH4>
              <h4>
                아나운서의 좋은 발성과 발음을 따라하며
                <br />
                전달력 있는 말하기를 연습해보세요.
              </h4>
            </StH4>
          </StTextWrapper>
        </section>
      </StThirdSlider>

      <StFourthSlider ref={fourthSlideRef}>
        <section>
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
        </section>
      </StFourthSlider>

      <StFifthSlider ref={fifthSlideRef}>
        <section>
          <StLottieWrapper className="step3">
            <Lottie animationData={step3Lottie} autoPlay loop />
          </StLottieWrapper>
          <StTextWrapper>
            <h2>Step 3.</h2>
            <h3>
              즐겨찾는 영상과
              <br />
              내가 학습한 영상 모두 모아보기
            </h3>
            <StH4>
              <h4>
                다시 따라하고 싶은 영상을 즐겨찾기에 저장해
                <br />
                꾸준히 복습하고, 스피치 자신감을 키워보세요.
              </h4>
            </StH4>
          </StTextWrapper>
        </section>
      </StFifthSlider>

      <StSixthSlider ref={sixthSlideRef}>
        <div>
          <h2>
            아나운서 준비생들에게 이미 검증된 스피치 학습법
            <br />
            아나운서 쉐도잉으로 스피치 자신감을 키워보세요!
          </h2>
        </div>
        <Link href="/home" passHref>
          <StStartButton>딜리버블 시작하기</StStartButton>
        </Link>
        <StContact>
          <p>Contact Us</p>
          <p>deliverble.team@gmail.com</p>
        </StContact>
      </StSixthSlider>
    </StSliderContainer>
  );
}

export default SliderContainer;

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
`;

const StFirstSlider = styled.section`
  width: 100%;
  height: 100%;

  width: 100%;
  height: 100vh;
  min-height: 108rem;

  background-image: url(${imgLandingBubble.src}), url(${imgLandingBgFirst.src});
  background-position: -60px 96px, 0px 0px;
  background-repeat: no-repeat;
  background-size: 1906.64px 655px, cover;

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    color: ${COLOR.BLACK};
    ${FONT_STYLES.SB_44_HEADLINE};

    padding-top: 41.5rem;
    margin-left: 16rem;
  }

  & > a {
    margin: 4.8rem 0 41.5rem 16rem;
  }
`;
const StStartButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 26rem;
  height: 7rem;

  background-color: ${COLOR.MAIN_BLUE};
  color: ${COLOR.WHITE};
  ${FONT_STYLES.SB_24_HEADLINE};

  border-radius: 1.4rem;
  cursor: pointer;
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
    ${FONT_STYLES.SB_36_HEADLINE};
    text-align: center;
    letter-spacing: -0.01em;
  }
`;

const StBodyCardWrapper = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
  height: 79rem;

  margin: 4.3rem 0 12.1rem 0;
  gap: 7rem;
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

  & > div:first-child {
    margin: 22rem 0 23.6rem 0;

    ${FONT_STYLES.SB_44_HEADLINE};

    text-align: center;
    letter-spacing: -0.01em;
  }
  & > section {
    display: flex;
  }
`;

const StFourthSlider = styled.section`
  width: 100%;
  height: 100%;

  & > section:first-child {
    display: flex;
    margin: 36.1rem 0 36rem 0;
  }
`;

const StFifthSlider = styled.section`
  width: 100%;
  height: 100%;

  & > section:first-child {
    display: flex;
    margin: 34.2rem 0 34.1rem 0;
  }
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

  & > a {
    margin-top: 5.6rem;
  }
`;

const StContact = styled.div`
  position: relative;
  margin: 22.9rem 0 6.4rem 160.9rem;
  color: ${COLOR.MAIN_BLUE};

  & > p:first-child {
    ${FONT_STYLES.SB_24_HEADLINE};
  }
  & > p:nth-child(2) {
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
