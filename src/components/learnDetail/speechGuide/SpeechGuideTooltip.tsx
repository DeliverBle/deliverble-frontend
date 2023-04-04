import { FONT_STYLES } from '@src/styles/fontStyle';
import styled from 'styled-components';

function SpeechGuideTooltip() {
  return (
    <StGuideTooltip id="guide-tooltip" role="tooltip">
      <p>현재 화면은 스피치 가이드입니다!</p>
      <p>
        스피치 연습이 처음인 유저를 위해 가이드라인을 준비했어요. <br />
        어디를 강조해야 하는지, 무엇을 유의하며 읽어야 하는지 파악해보세요.
      </p>
    </StGuideTooltip>
  );
}

export default SpeechGuideTooltip;

const StGuideTooltip = styled.div`
  position: absolute;
  left: 17.8rem;
  top: 1.6rem;

  padding: 1.6rem;
  width: 46.3rem;
  height: 10.9rem;
  border-radius: 0.6rem;

  background: rgba(22, 15, 53, 0.7);
  color: white;
  white-space: pre-line;

  & > p:first-child {
    ${FONT_STYLES.B_20_BODY}
  }

  & > p:last-child {
    ${FONT_STYLES.M_16_CAPTION}
  }

  &::after {
    content: '';
    position: absolute;
    left: 2.6rem;
    bottom: 100%;

    border: solid transparent;
    border-width: 0.8rem;
    border-bottom-color: rgba(22, 15, 53, 0.7);
    pointer-events: none;
  }
`;
