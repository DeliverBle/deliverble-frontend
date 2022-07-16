import styled from 'styled-components';
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
          <li
            key={number}
            className={slideNumber === number ? 'isActive' : 'unActive'}
            onClick={() => setSlideNumber(number)}></li>
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

  z-index: 100;

  & > .isActive {
    background-color: #160f35;
    opacity: 0.35;
  }

  & > .unActive {
    background-color: #160f35;
    opacity: 0.05;
  }

  & > li {
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 50%;
    margin: 0 0 1.1111111111111112rem;
    cursor: pointer;
    margin-bottom: 2rem;
    opacity: 0.5;
  }
`;
