import Head from 'next/head';
import Lottie from 'lottie-react';
import { lottie } from 'public/assets/lottie';
import styled from 'styled-components';
import LoginModal from 'src/components/common/LoginModal';

function Landing() {
  return (
    <div>
      <Head>
        <title>DeliverBle</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>Home</div>
      <LoginModal />
      <div>Landing</div>
      <StLottieWrapper>
        <Lottie animationData={lottie} autoPlay loop />
      </StLottieWrapper>
    </div>
  );
}

export default Landing;

const StLottieWrapper = styled.div`
  width: 50rem;
  height: 50rem;
`;
