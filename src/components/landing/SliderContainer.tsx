import styled from 'styled-components';
import Link from 'next/link';
import { MutableRefObject, useEffect } from 'react';
import Lottie from 'lottie-light-react';
import { step1Lottie, step2Lottie, step3Lottie } from 'public/assets/lottie';
import {
  imgLandingBgFirst,
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
        <StCardContainer>
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
        </StCardContainer>
      </StSecondSlider>

      <StThirdSlider ref={thirdSlideRef}>
        <h2>
          딜리버블이 제안하는
          <br />
          효과적인 말하기 학습 솔루션
        </h2>
        <div>
          <StLottieWrapper className="step1">
            <Lottie animationData={step1Lottie} autoPlay loop />
          </StLottieWrapper>
          <StTextWrapper>
            <h3>Step 1.</h3>
            <h4>
              아나운서의 정확한 뉴스리딩,
              <br />한 문장씩 듣고 따라하기
            </h4>
            <p>
              아나운서의 좋은 발성과 발음을 따라하며
              <br />
              전달력 있는 말하기를 연습해보세요.
            </p>
          </StTextWrapper>
        </div>
      </StThirdSlider>

      <StFourthSlider ref={fourthSlideRef}>
        <StLottieWrapper className="step2">
          <Lottie animationData={step2Lottie} autoPlay loop />
        </StLottieWrapper>
        <StTextWrapper>
          <h3>Step 2.</h3>
          <h4>
            끊어 읽기, 하이라이트, 메모 기능으로
            <br />더 똑똑하게 공부하기
          </h4>
          <p>
            클릭 한 번으로 쉽게 끊어 읽기 표시를 남기고,
            <br />
            메모를 추가하여 나만의 피드백도 기록해봐요.
          </p>
        </StTextWrapper>
      </StFourthSlider>

      <StFifthSlider ref={fifthSlideRef}>
        <StLottieWrapper className="step3">
          <Lottie animationData={step3Lottie} autoPlay loop />
        </StLottieWrapper>
        <StTextWrapper>
          <h3>Step 3.</h3>
          <h4>
            즐겨찾는 영상과
            <br />
            내가 학습한 영상 모두 모아보기
          </h4>
          <p>
            다시 따라하고 싶은 영상을 즐겨찾기에 저장해
            <br />
            꾸준히 복습하고, 스피치 자신감을 키워보세요.
          </p>
        </StTextWrapper>
      </StFifthSlider>

      <StSixthSlider ref={sixthSlideRef}>
        <div>
          <h2>
            아나운서 준비생들에게 이미 검증된 스피치 학습법,
            <br />
            아나운서 쉐도잉으로 스피치 자신감을 키워보세요!
          </h2>
          <Link href="/home" passHref>
            <StStartButton>딜리버블 시작하기</StStartButton>
          </Link>
        </div>
        <StContact>
          <p>Contact Us</p>
          <p>deliverble.team@gmail.com</p>
        </StContact>
      </StSixthSlider>
    </StSliderContainer>
  );
}

export default SliderContainer;

const StTextWrapper = styled.section`
  margin: auto 0;

  h3 {
    color: ${COLOR.MAIN_BLUE};
    ${FONT_STYLES.B_64_CAPTION};
    font-family: 'Dongle';
  }

  h4 {
    color: ${COLOR.BLACK};
    ${FONT_STYLES.SB_28_HEADLINE};
  }

  p {
    margin-top: 3.2rem;
    color: ${COLOR.GRAY_45};
    ${FONT_STYLES.M_24_HEADLINE};
  }
`;

const StSliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StFirstSlider = styled.section`
  min-height: 108rem;
  padding-left: 16rem;

  background-image: url(${imgLandingBubble.src}), url(${imgLandingBgFirst.src});
  background-position: -60px 96px, 0px 0px;
  background-repeat: no-repeat;
  background-size: 1906.64px 655px, cover;

  h1 {
    padding: 41.5rem 0 4.8rem 0;
    color: ${COLOR.BLACK};
    ${FONT_STYLES.SB_44_HEADLINE};
  }
`;

const StStartButton = styled.a`
  width: fit-content;
  padding: 2rem 4rem;
  background-color: ${COLOR.MAIN_BLUE};
  color: ${COLOR.WHITE};
  ${FONT_STYLES.SB_24_HEADLINE};
  border-radius: 1.4rem;
  cursor: pointer;
`;

const StSecondSlider = styled.section`
  background-color: ${COLOR.SUB_BLUE_8};

  h2 {
    padding: 8.8rem 0 4.3rem 0;
    background-color: ${COLOR.WHITE};
    color: ${COLOR.BLACK};
    ${FONT_STYLES.SB_36_HEADLINE};
    text-align: center;
  }
`;

const StCardContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 7rem;
  margin: 15rem auto;
`;

const StCard = styled.section`
  width: 38.8rem;
  height: 49rem;
  text-align: center;
  background: ${COLOR.WHITE};
  box-shadow: 2rem 2rem 5rem rgba(78, 138, 255, 0.15);
  border-radius: 4rem;

  h3 {
    color: ${COLOR.BLACK};
    ${FONT_STYLES.M_24_HEADLINE};
  }

  p {
    color: ${COLOR.GRAY_30};
    ${FONT_STYLES.SB_18_CAPTION};
    margin: 8.8rem 0 2.8rem 0;
  }

  .ear,
  .fist,
  .mic {
    position: relative;
    width: 21.7rem;
    height: 21.7rem;
    margin: 6.4rem auto 1rem auto;
  }
`;

const StThirdSlider = styled.section`
  padding: 22rem 0;

  h2 {
    margin-bottom: 23.6rem;
    ${FONT_STYLES.SB_44_HEADLINE};
    text-align: center;
  }

  div {
    display: flex;
  }
`;

const StFourthSlider = styled.section`
  display: flex;
  padding: 35rem 0 33rem 0;
`;

const StFifthSlider = styled.section`
  display: flex;
  padding: 34.2rem 0 34.1rem 0;
`;

const StSixthSlider = styled.section`
  background: url(${imgLandingBgLast.src}) center/cover no-repeat;

  div:first-child {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 42.9rem;
  }

  h2 {
    color: ${COLOR.BLACK};
    ${FONT_STYLES.SB_32_HEADLINE};
    margin-bottom: 5.6rem;
  }
`;

const StContact = styled.div`
  float: right;
  margin: 22.9rem 6.4rem 6.4rem 0;
  color: ${COLOR.MAIN_BLUE};

  p:first-child {
    ${FONT_STYLES.SB_24_HEADLINE};
  }

  p:last-child {
    ${FONT_STYLES.M_20_BODY};
  }
`;

const StLottieWrapper = styled.div`
  &.step1 {
    width: 57.7rem;
    height: 30.5rem;
    margin: 0 25.6rem 0 25.5rem;
  }

  &.step2 {
    width: 64rem;
    height: 40rem;
    margin: 0 18.4rem 0 26.4rem;
  }

  &.step3 {
    width: 57.7rem;
    height: 39.7rem;
    margin: 0 19.3rem 0 31.8rem;
  }
`;
