import styled from 'styled-components';
import { imgLandingBackground } from 'public/assets/images/index';
import { COLOR } from 'src/styles/color';
import { FONT_STYLES } from 'src/styles/fontStyle';

function SliderContainer() {
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
        <div className="body-text-wrapper">
          <p>웅얼웅얼 발음 습관을 고치고 싶어요.</p>
          <p>더 당당하고 자신감 있게 말하고 싶어요.</p>
          <p>아나운서처럼 시원한 발성을 갖고 싶어요.</p>
        </div>
      </StSecondSlider>

      <StThirdSlider>
        <div className="headline-wrapper">
          <h1>딜리버블이 제안하는</h1>
          <h1>효과적인 말하기 학습 솔루션</h1>
        </div>
        <div className="third-text-wrapper">
          <label className="step">STEP 1</label>
          <div className="medium-body-wrapper">
            <p>무작정 따라하며</p>
            <p>아나운서의 좋은 발음과 발성 배우기</p>
          </div>
          <div className="small-body-wrapper">
            <p>언제 어디서든 아나운서의 좋은 목소리를 듣고, </p>
            <p>소리 내서 따라하며 연습해봐요.</p>
          </div>
        </div>
      </StThirdSlider>

      <StFourthSlider>
        <div className="fourth-text-wrapper">
          <label className="step">STEP 2</label>
          <div className="medium-body-wrapper">
            <p>끊어 읽기, 하이라이트, 메모 기능으로</p>
            <p>더 똑똑하게 공부하기</p>
          </div>
          <div className="small-body-wrapper">
            <p>클릭 한 번으로 쉽게 끊어 읽기 표시를 남기고,</p>
            <p>메모를 추가하여 나만의 피드백도 기록해봐요.</p>
          </div>
        </div>
      </StFourthSlider>

      <StFifthSlider>
        <div className="fifth-text-wrapper">
          <label className="step">STEP 3</label>
          <div className="medium-body-wrapper">
            <p>끊어 읽기, 하이라이트, 메모 기능으로</p>
            <p>더 똑똑하게 공부하기</p>
          </div>
          <div className="small-body-wrapper">
            <p>클릭 한 번으로 쉽게 끊어 읽기 표시를 남기고,</p>
            <p>메모를 추가하여 나만의 피드백도 기록해봐요.</p>
          </div>
        </div>
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

const StSliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  .first-slide {
    width: 100%;
    height: 100vh;
    min-height: 108rem;

    background-image: url(${imgLandingBackground.src});
    background-repeat: no-repeat;
    background-size: cover;
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

  .headline {
    margin-top: 18rem;
    color: ${COLOR.BLACK};
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 44px;
    line-height: 150%;
    text-align: center;
    letter-spacing: -0.01em;
  }

  .body-text-wrapper {
    display: flex;
    justify-content: space-around;

    margin-top: 61.5rem;
    margin-bottom: 18rem;

    color: ${COLOR.BLACK};
    ${FONT_STYLES.M_28_HEADLINE}
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

  .third-text-wrapper {
    margin-top: 14.3rem;
    margin-left: 117.1rem;
  }

  .step {
    color: ${COLOR.MAIN_BLUE};
    ${FONT_STYLES.B_100_LANDING};
    font-family: 'Dongle';
  }
  .medium-body-wrapper {
    color: ${COLOR.BLACK};
    ${FONT_STYLES.SB_36_HEADLINE};
  }

  .small-body-wrapper {
    margin-top: 4rem;
    margin-bottom: 29.7rem;
    color: ${COLOR.GRAY_60};
    ${FONT_STYLES.M_24_HEADLINE};
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
  .step {
    color: ${COLOR.MAIN_BLUE};
    ${FONT_STYLES.B_100_LANDING};
    font-family: 'Dongle';
  }
  .medium-body-wrapper {
    color: ${COLOR.BLACK};
    ${FONT_STYLES.SB_36_HEADLINE};
  }

  .small-body-wrapper {
    margin-top: 4rem;
    margin-bottom: 29.7rem;
    color: ${COLOR.GRAY_60};
    ${FONT_STYLES.M_24_HEADLINE};
  }
`;

const StFifthSlider = styled.section`
  .fifth-text-wrapper {
    margin-top: 36.6rem;
    margin-left: 115.7rem;
    margin-bottom: 36.6rem;
  }

  .step {
    color: ${COLOR.MAIN_BLUE};
    ${FONT_STYLES.B_100_LANDING};
    font-family: 'Dongle';
  }
  .medium-body-wrapper {
    color: ${COLOR.BLACK};
    ${FONT_STYLES.SB_36_HEADLINE};
  }

  .small-body-wrapper {
    margin-top: 4rem;
    margin-bottom: 29.7rem;
    color: ${COLOR.GRAY_60};
    ${FONT_STYLES.M_24_HEADLINE};
  }
`;

const StSixthSlider = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

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
