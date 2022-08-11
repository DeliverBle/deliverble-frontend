import { StScrollContainer, StListItem } from './style';

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
            }}></StListItem>
        );
      })}
    </StScrollContainer>
  );
}

export default ScrollContainer;
