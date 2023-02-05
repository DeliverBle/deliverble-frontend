import styled from 'styled-components';
import Lottie from 'lottie-react';
import { step1Lottie, step2Lottie, step3Lottie } from 'public/assets/lottie';
import { COLOR } from 'src/styles/color';
import { FONT_STYLES } from 'src/styles/fontStyle';
import ImageDiv from '@src/components/common/ImageDiv';
import { imgMobileBgFirst, imgMobileBgLast, imgMobileFist, imgMobileEar, imgMobileMic } from 'public/assets/images';

function MobileContainer() {
  return (
    <StMobileContainer>
      <StFirstSlide>
        <p>
          아나운서 쉐도잉으로 키우는
          <br />
          스피치 자신감, 딜리버블
        </p>
        <p>딜리버블은 PC에서 이용해 주세요.</p>
      </StFirstSlide>

      <StSecondSlide>
        <p>
          지금보다 더 잘 말하고
          <br />
          싶었던 적 없나요?
        </p>
        <div>
          <StCard>
            <ImageDiv src={imgMobileEar} className="ear" layout="fill" alt="" />
            <div>
              <p>
                발음을 교정하고 싶은데,
                <br />
                학원 가격이 너무 부담돼요.
              </p>
              <p>26살 취준생 김○○</p>
            </div>
          </StCard>
          <StCard>
            <ImageDiv src={imgMobileFist} className="fist" layout="fill" alt="" />
            <div>
              <p>
                목소리가 떨려서 발표를 망쳤어요.
                <br />
                저도 당당하게 말하고 싶어요!
              </p>
              <p>23살 대학생 류○○</p>
            </div>
          </StCard>
          <StCard>
            <ImageDiv src={imgMobileMic} className="mic" layout="fill" alt="" />
            <div>
              <p>
                아나운서 준비를 시작했는데,
                <br />
                뉴스리딩은 처음이라 막막해요.
              </p>
              <p>24살 아나운서 지망생 백○○</p>
            </div>
          </StCard>
        </div>
      </StSecondSlide>

      <StThirdSlide>
        <p>딜리버블이 제안하는</p>
        <p>효과적인 말하기 학습 솔루션</p>
        <StLottieWrapper className="step1">
          <Lottie animationData={step1Lottie} autoPlay loop />
        </StLottieWrapper>
        <StTextWrapper>
          <p>Step 1.</p>
          <p>
            아나운서의 정확한 뉴스리딩,
            <br />한 문장씩 듣고 따라하기
          </p>
          <p>
            아나운서의 좋은 발성과 발음을 따라하며
            <br />
            전달력 있는 말하기를 연습해보세요.
          </p>
        </StTextWrapper>

        <StLottieWrapper className="step2">
          <Lottie animationData={step2Lottie} autoPlay loop />
        </StLottieWrapper>
        <StTextWrapper>
          <p>Step 2.</p>
          <p>
            끊어 읽기, 하이라이트, 녹음,
            <br />
            메모 기능으로 더 똑똑하게 공부하기
          </p>
          <p>
            끊어 읽기 표시와 메모를 남기고, 녹음으로
            <br />내 말하기를 듣고 점검할 수 있어요.
          </p>
        </StTextWrapper>

        <StLottieWrapper className="step3">
          <Lottie animationData={step3Lottie} autoPlay loop />
        </StLottieWrapper>
        <StTextWrapper>
          <p>Step 3.</p>
          <p>
            즐겨찾는 영상과
            <br />
            내가 학습한 영상 모두 모아보기
          </p>
          <p>
            다시 따라하고 싶은 영상을 즐겨찾기에 저장해
            <br />
            꾸준히 복습하고, 스피치 자신감을 키워보세요.
          </p>
        </StTextWrapper>
      </StThirdSlide>

      <StFourthSlide>
        <p>
          PC에서 딜리버블과 함께
          <br />
          스피치 자신감을 키워보세요!
        </p>
      </StFourthSlide>

      <StFifthSlide>
        <p>Contact Us</p>
        <p>deliverble.team@gmail.com</p>
      </StFifthSlide>
    </StMobileContainer>
  );
}

export default MobileContainer;

const StMobileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StFirstSlide = styled.div`
  text-align: center;
  height: 65rem;
  background: url(${imgMobileBgFirst.src}) center/cover no-repeat;

  p:first-child {
    margin: 28.9rem 0 1rem 0;
    color: ${COLOR.WHITE};
    ${FONT_STYLES.SB_32_HEADLINE};
  }

  p:last-child {
    color: rgba(255, 255, 255, 0.35);
    ${FONT_STYLES.M_18_CAPTION};
  }
`;

const StSecondSlide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: linear-gradient(180deg, #ffffff 51.92%, #f3f3f5 100%);
  padding-bottom: 4rem;

  & > p {
    margin: 8rem 0 4.8rem 0;
    color: ${COLOR.BLACK};
    ${FONT_STYLES.B_22_HEADLINE};
  }
`;

const StCard = styled.section`
  display: flex;
  align-items: center;
  text-align: center;
  margin-bottom: 4rem;

  div:last-child {
    margin: 0 auto;
  }

  p:first-child {
    color: ${COLOR.GRAY_80};
    ${FONT_STYLES.SB_16_CAPTION};
  }

  p:nth-child(2) {
    color: ${COLOR.GRAY_30};
    ${FONT_STYLES.SB_15_CAPTION};
  }

  .ear,
  .fist,
  .mic {
    position: relative;
    width: 8.8rem;
    height: 8.8rem;
    margin-right: 2.4rem;
  }
`;

const StThirdSlide = styled.div`
  text-align: center;
  margin-bottom: 12rem;

  & > p:first-child {
    ${FONT_STYLES.B_22_HEADLINE};
    color: ${COLOR.BLACK};
    margin-top: 8rem;
  }

  & > p:nth-child(2) {
    ${FONT_STYLES.B_22_HEADLINE};
    color: ${COLOR.MAIN_BLUE};
  }
`;

const StLottieWrapper = styled.div`
  &.step1 {
    width: 31rem;
    height: 16.4rem;
    margin: 8rem auto 3.2rem auto;
  }

  &.step2 {
    width: 33.6rem;
    height: 21rem;
    margin: 12rem auto 1.6rem auto;
  }

  &.step3 {
    width: 30rem;
    height: 20.6rem;
    margin: 14.2rem auto 3.2rem auto;
  }
`;

const StTextWrapper = styled.section`
  text-align: center;

  p:first-child {
    color: ${COLOR.MAIN_BLUE};
    ${FONT_STYLES.B_20_BODY};
    margin-bottom: 1.2rem;
  }

  p:nth-child(2) {
    color: ${COLOR.BLACK};
    ${FONT_STYLES.SB_20_BODY};
    margin-bottom: 0.4rem;
  }

  p:last-child {
    color: ${COLOR.GRAY_30};
    ${FONT_STYLES.M_16_CAPTION};
  }
`;

const StFourthSlide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: url(${imgMobileBgLast.src}) center/cover no-repeat;
  height: 34rem;

  p {
    color: ${COLOR.WHITE};
    ${FONT_STYLES.B_20_BODY};
  }
`;

const StFifthSlide = styled.div`
  text-align: center;

  p:first-child {
    color: ${COLOR.GRAY_30};
    ${FONT_STYLES.M_16_CAPTION};
    margin-top: 13.4rem;
  }

  p:last-child {
    color: ${COLOR.GRAY_80};
    ${FONT_STYLES.M_16_CAPTION};
    margin: 0.2rem 0 4rem 0;
  }
`;
