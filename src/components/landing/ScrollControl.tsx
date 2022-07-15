import styled from 'styled-components';
import { useEffect } from 'react';
interface ScrollContainerProps {
  slideNumber: number;
  setSlideNumber: (slideNumber: number) => void;
}

function ScrollContainer(props: ScrollContainerProps) {
  const { slideNumber, setSlideNumber } = props;

  useEffect(() => {
    console.log(slideNumber);
  }, [slideNumber]);

  return (
    <StScrollContainer>
      <li className={slideNumber === 1 ? 'isActive' : 'unActive'} onClick={() => setSlideNumber(1)}></li>
      <li className={slideNumber === 2 ? 'isActive' : 'unActive'} onClick={() => setSlideNumber(2)}></li>
      <li className={slideNumber === 3 ? 'isActive' : 'unActive'} onClick={() => setSlideNumber(3)}></li>
      <li className={slideNumber === 4 ? 'isActive' : 'unActive'} onClick={() => setSlideNumber(4)}></li>
      <li className={slideNumber === 5 ? 'isActive' : 'unActive'} onClick={() => setSlideNumber(5)}></li>
      <li className={slideNumber === 6 ? 'isActive' : 'unActive'} onClick={() => setSlideNumber(6)}></li>
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
