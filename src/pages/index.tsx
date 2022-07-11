import Head from 'next/head';
import Lottie from 'lottie-react';
import { lottie } from 'public/assets/lottie';
import styled from 'styled-components';
import SliderContainer from '@src/components/landing/SliderContainer';
import Nav from '@src/components/landing/Nav';

function Landing() {
  return (
    <StLanding>
      <Head>
        <title>DeliverBle</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <SliderContainer />
      <StLottieWrapper>
        <Lottie animationData={lottie} autoPlay loop />
      </StLottieWrapper>
    </StLanding>
  );
}

export default Landing;

const StLanding = styled.div`
  @font-face {
    font-family: 'Dongle';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108_2@1.0/Dongle-Bold.woff') format('woff');
  }
`;

const StLottieWrapper = styled.div`
  width: 50rem;
  height: 50rem;
`;
