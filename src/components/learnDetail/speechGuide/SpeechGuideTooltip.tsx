import { FONT_STYLES } from '@src/styles/fontStyle';
import { SPEECH_GUIDE_TOOLTIP_TEXT } from '@src/utils/constant';
import styled from 'styled-components';

function SpeechGuideTooltip() {
  return (
    <StGuideTooltip id="guide-tooltip" role="tooltip">
      <p>{SPEECH_GUIDE_TOOLTIP_TEXT.title}</p>
      <p>{SPEECH_GUIDE_TOOLTIP_TEXT.description}</p>
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
