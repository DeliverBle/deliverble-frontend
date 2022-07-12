import Head from 'next/head';
import Lottie from 'lottie-react';
import { lottie } from 'public/assets/lottie';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import SliderContainer from '@src/components/landing/SliderContainer';
import Nav from '@src/components/landing/Nav';

function Landing() {
  const [isFirstScrolled, setIsFirstScrolled] = useState<boolean>(false);
  const [isSecondScrolled, setIsSecondScrolled] = useState<boolean>(false);

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
      <Head>
        <title>DeliverBle</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav isFirstScrolled={isFirstScrolled} isSecondScrolled={isSecondScrolled} />
      <SliderContainer />
      <StLottieWrapper>
        <Lottie animationData={lottie} autoPlay loop />
      </StLottieWrapper>
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

const StLottieWrapper = styled.div`
  width: 50rem;
  height: 50rem;
`;
