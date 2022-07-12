import styled from 'styled-components';

interface ScrollContainerProps {
  slideNumber: number;
  setSlideNumber: (slideNumber: number) => void;
}

function ScrollContainer(props: ScrollContainerProps) {
  const { slideNumber, setSlideNumber } = props;

  return (
    <StScrollContainer slideNumber={slideNumber}>
      <li className="first-slide" onClick={() => setSlideNumber(1)}></li>
      <li className="second-slide" onClick={() => setSlideNumber(2)}></li>
      <li className="third-slide" onClick={() => setSlideNumber(3)}></li>
      <li className="fourth-slide" onClick={() => setSlideNumber(4)}></li>
      <li className="fifth-slide" onClick={() => setSlideNumber(5)}></li>
      <li className="sixth-slide" onClick={() => setSlideNumber(6)}></li>
    </StScrollContainer>
  );
}

export default ScrollContainer;

const StScrollContainer = styled.ul<{ slideNumber: number }>`
  position: fixed;
  margin-top: 42.4rem;
  right: 6.4rem;

  z-index: 100;

  & > li {
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 50%;
    margin: 0 0 1.1111111111111112rem;
    opacity: 0.5;
    cursor: pointer;
    margin-bottom: 2rem;
  }
  .first-slide {
    background-color: ${({ slideNumber }) => (slideNumber === 1 ? 'blue' : 'lightgray')};
  }

  .second-slide {
    background-color: ${({ slideNumber }) => (slideNumber === 2 ? 'blue' : 'lightgray')};
  }

  .third-slide {
    background-color: ${({ slideNumber }) => (slideNumber === 3 ? 'blue' : 'lightgray')};
  }

  .fourth-slide {
    background-color: ${({ slideNumber }) => (slideNumber === 4 ? 'blue' : 'lightgray')};
  }

  .fifth-slide {
    background-color: ${({ slideNumber }) => (slideNumber === 5 ? 'blue' : 'lightgray')};
  }
  .sixth-slide {
    background-color: ${({ slideNumber }) => (slideNumber === 6 ? 'blue' : 'lightgray')};
  }
`;
