import styled from 'styled-components';

interface ScrollContainerProps {
  slideNumber: number;
  setSlideNumber: (slideNumber: number) => void;
  setStopObserve: (stopObserve: boolean) => void;
}

function ScrollContainer(props: ScrollContainerProps) {
  const { slideNumber, setSlideNumber, setStopObserve } = props;
  const slideNumberList = [1, 2, 3, 4, 5, 6];

  return (
    <StScrollContainer>
      {slideNumberList.map((number) => {
        return (
          <StListItem
            key={number}
            isActive={slideNumber === number}
            onClick={() => {
              setSlideNumber(number);
              setStopObserve(true);
            }}
          />
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
  margin-bottom: 2rem;
  border-radius: 50%;
  cursor: pointer;
  background-color: #160f35;
  opacity: ${({ isActive }) => (isActive ? 0.35 : 0.05)};
`;
