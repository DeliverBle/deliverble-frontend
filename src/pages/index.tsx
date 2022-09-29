import SEO from '@src/components/common/SEO';
import Nav from '@src/components/landing/Nav';
import ScrollControl from '@src/components/landing/ScrollControl';
import SliderContainer from '@src/components/landing/SliderContainer';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

function Landing() {
  const [isFirstScrolled, setIsFirstScrolled] = useState<boolean>(false);
  const [isSecondScrolled, setIsSecondScrolled] = useState<boolean>(false);
  const [slideNumber, setSlideNumber] = useState<number>(1);
  const [stopObserve, setStopObserve] = useState<boolean>(false);

  const scrollListener = () => {
    setIsFirstScrolled(window.scrollY > 423);
    setIsSecondScrolled(window.scrollY > 620);
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, []);

  return (
    <StLanding>
      <SEO title="Deliverble" />
      <ScrollControl slideNumber={slideNumber} setSlideNumber={setSlideNumber} setStopObserve={setStopObserve} />
      <Nav isFirstScrolled={isFirstScrolled} isSecondScrolled={isSecondScrolled} />
      <SliderContainer
        slideNumber={slideNumber}
        setSlideNumber={setSlideNumber}
        stopObserve={stopObserve}
        setStopObserve={setStopObserve}
      />
    </StLanding>
  );
}

export default Landing;

const StLanding = styled.div`
  height: 100%;
  @font-face {
    font-family: 'Dongle';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108_2@1.0/Dongle-Bold.woff') format('woff');
  }
`;
