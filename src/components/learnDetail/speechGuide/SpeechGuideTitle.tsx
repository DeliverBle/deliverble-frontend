import ImageDiv from '@src/components/common/ImageDiv';
import { SpeechGuideTooltip } from '@src/components/learnDetail/speechGuide';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { useRouter } from 'next/router';
import { icSpeechGuideInfo } from 'public/assets/icons';
import { useState } from 'react';
import styled, { css } from 'styled-components';

function SpeechGuideTitle() {
  const router = useRouter();
  const { id, speechGuide } = router.query;
  const [isGuideOver, setIsGuideOver] = useState<boolean>(false);

  const moveToSpeechGuide = () => {
    if (!speechGuide) {
      router.push({
        pathname: `/learn/${id}`,
        query: { speechGuide: true },
      });
    }
  };

  return (
    <StSpeechGuideTitle isGuide={Boolean(speechGuide)} onClick={moveToSpeechGuide}>
      <p>스피치 가이드</p>
      <ImageDiv
        aria-describedby="guide-tooltip"
        className="guide-info"
        src={icSpeechGuideInfo}
        alt="스피치 가이드 설명"
        onMouseOver={() => speechGuide && setIsGuideOver(true)}
        onMouseOut={() => speechGuide && setIsGuideOver(false)}
      />
      {isGuideOver && <SpeechGuideTooltip />}
    </StSpeechGuideTitle>
  );
}

export default SpeechGuideTitle;

const StSpeechGuideTitle = styled.div<{ isGuide: boolean }>`
  display: flex;
  align-items: center;
  position: relative;

  padding: 1rem 0 1rem 2.4rem;
  width: 19.2rem;
  height: 4.8rem;
  border-radius: 1.6rem 1.6rem 0 0;
  background-color: ${COLOR.MAIN_BLUE};

  color: ${COLOR.WHITE};
  ${FONT_STYLES.B_20_BODY};

  ${({ isGuide }) =>
    !isGuide &&
    css`
      opacity: 0.6;
      cursor: pointer;

      &: hover {
        opacity: 0.8;
      }
    `}

  & > .guide-info {
    display: flex;
    align-items: center;
    padding-left: 1.2rem;
  }
`;
