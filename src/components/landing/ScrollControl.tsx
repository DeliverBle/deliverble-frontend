import styled, { css } from 'styled-components';
interface ScrollContainerProps {
  slideNumber: number;
  setSlideNumber: (slideNumber: number) => void;
}

function ScrollContainer(props: ScrollContainerProps) {
  const { slideNumber, setSlideNumber } = props;
  const slideNumberList = [1, 2, 3, 4, 5, 6];

  return (
    <StScrollContainer>
      {slideNumberList.map((number) => {
        return (
          <StListItem
            key={number}
            isActive={slideNumber === number}
            onClick={() => setSlideNumber(number)}></StListItem>
        );
      })}
    </StScrollContainer>
  );
}

export default ScrollContainer;

const StScrollContainer = styled.ul`
  position: fixed;
  margin-top: 42.4rem;
  right: 6.4rem;

  z-index: 2;
`;

const StListItem = styled.li<{ isActive: boolean }>`
  width: 2.2rem;
  height: 2.2rem;

  margin: 0 0 1.1111111111111112rem;
  margin-bottom: 2rem;

  border-radius: 50%;
  cursor: pointer;
  opacity: 0.5;

  ${({ isActive }) =>
    isActive
      ? css`
          background-color: #160f35;
          opacity: 0.35;
        `
      : css`
          background-color: #160f35;
          opacity: 0.05;
        `}
`;
