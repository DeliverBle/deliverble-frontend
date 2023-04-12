import { ScriptEditButton } from '@src/components/learnDetail/scriptEdit';
import { COLOR, FONT_STYLES } from '@src/styles';
import { useState } from 'react';
import styled, { css } from 'styled-components';

interface ScriptEditButtonContainerProps {
  handleLoginModalOpen: () => void;
  isHighlight?: boolean;
  isSpacing?: boolean;
  setIsHighlight: (isHighlight: boolean) => void;
  setIsSpacing: (isSpacing: boolean) => void;
}

function ScriptEditButtonContainer(props: ScriptEditButtonContainerProps) {
  const { handleLoginModalOpen, isHighlight, isSpacing, setIsHighlight, setIsSpacing } = props;
  const [hoveredChild, setHoveredChild] = useState<number>(0);

  return (
    <>
      <ScriptEditButton
        handleLoginModalOpen={handleLoginModalOpen}
        isHighlight={isHighlight}
        setIsHighlight={setIsHighlight}
        setIsSpacing={setIsSpacing}
        setHoveredChild={setHoveredChild}
      />
      <ScriptEditButton
        handleLoginModalOpen={handleLoginModalOpen}
        isSpacing={isSpacing}
        setIsHighlight={setIsHighlight}
        setIsSpacing={setIsSpacing}
        setHoveredChild={setHoveredChild}
      />
      <StTooltipContainer hoveredChild={hoveredChild}>
        <p id="script-edit-tooltip" role="tooltip">
          {hoveredChild === 1 ? '드래그해서 하이라이트' : '클릭해서 끊어읽기'}를
          <br />
          표시해보세요.
        </p>
      </StTooltipContainer>
    </>
  );
}

export default ScriptEditButtonContainer;

const StTooltipContainer = styled.div<{ hoveredChild: number }>`
  position: relative;
  z-index: 2;

  & > p {
    display: none;
  }

  ${({ hoveredChild }) =>
    hoveredChild &&
    css`
      & > p {
        display: block;
        position: absolute;
        top: 6.2rem;
        right: ${hoveredChild === 1 ? '5.6rem' : '-8.8rem'};
        width: ${hoveredChild === 1 ? '16.5rem' : '13.9rem'};
        padding: 1rem;
        border-radius: 0.6rem;
        background: rgba(22, 15, 53, 0.7);
        ${FONT_STYLES.SB_15_CAPTION}
        color: ${COLOR.WHITE};
        cursor: default;
      }

      & > p::after {
        position: absolute;
        bottom: 100%;
        right: ${hoveredChild === 1 ? '1.6rem' : '10.7rem'};
        width: 0;
        height: 0;
        border: solid transparent;
        border-width: 0.8rem;
        border-bottom-color: rgba(22, 15, 53, 0.7);
        pointer-events: none;
        content: '';
      }
    `}
`;
