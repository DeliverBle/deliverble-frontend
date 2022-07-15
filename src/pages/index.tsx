import Head from 'next/head';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import SliderContainer from '@src/components/landing/SliderContainer';
import Nav from '@src/components/landing/Nav';
import ScrollControl from '@src/components/landing/ScrollControl';

function Landing() {
  const [isFirstScrolled, setIsFirstScrolled] = useState<boolean>(false);
  const [isSecondScrolled, setIsSecondScrolled] = useState<boolean>(false);
  const [slideNumber, setSlideNumber] = useState<number>(1);

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
      <ScrollControl slideNumber={slideNumber} setSlideNumber={setSlideNumber} />
      <Nav isFirstScrolled={isFirstScrolled} isSecondScrolled={isSecondScrolled} />
      <SliderContainer slideNumber={slideNumber} setSlideNumber={setSlideNumber} />
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
