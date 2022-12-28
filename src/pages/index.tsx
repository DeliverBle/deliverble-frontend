import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SEO from '@src/components/common/SEO';
import Nav from '@src/components/landing/Nav';
import ScrollControl from '@src/components/landing/ScrollControl';
import SliderContainer from '@src/components/landing/SliderContainer';
import { icMobileLogoWhite, icMobileLogo } from 'public/assets/icons';
import MobileContainer from '@src/components/landing/mobileContainer';
import ImageDiv from '@src/components/common/ImageDiv';
import { COLOR } from '@src/styles/color';
import { useIsMobile } from '@src/hooks/useIsMobile';

function Landing() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isFirstScrolled, setIsFirstScrolled] = useState<boolean>(false);
  const [isSecondScrolled, setIsSecondScrolled] = useState<boolean>(false);
  const [slideNumber, setSlideNumber] = useState<number>(1);
  const [stopObserve, setStopObserve] = useState<boolean>(false);
  const [deviceType, setDeviceType] = useState<string>('');
  const isMobile = useIsMobile();

  const scrollListener = () => {
    setIsScrolled(window.scrollY > 0);
    setIsFirstScrolled(window.scrollY > 423);
    setIsSecondScrolled(window.scrollY > 620);
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, []);

  useEffect(() => {
    isMobile && setDeviceType('mobile');
    !isMobile && setDeviceType('desktop');
  }, [isMobile]);

  return (
    <div>
      <SEO title="Deliverble" />
      {deviceType === 'mobile' && (
        <StMoblie>
          <StNav isFirstScrolled={isScrolled}>
            <ImageDiv src={isScrolled ? icMobileLogo : icMobileLogoWhite} className="logo" layout="fill" alt="" />
          </StNav>
          <MobileContainer />
        </StMoblie>
      )}
      {deviceType === 'desktop' && (
        <StLanding>
          <ScrollControl slideNumber={slideNumber} setSlideNumber={setSlideNumber} setStopObserve={setStopObserve} />
          <Nav isFirstScrolled={isFirstScrolled} isSecondScrolled={isSecondScrolled} />
          <SliderContainer
            slideNumber={slideNumber}
            setSlideNumber={setSlideNumber}
            stopObserve={stopObserve}
            setStopObserve={setStopObserve}
          />
        </StLanding>
      )}
    </div>
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

const StMoblie = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StNav = styled.nav<{ isFirstScrolled: boolean }>`
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  top: 0;
  z-index: 2;

  width: 100%;
  height: 5.4rem;

  background: ${({ isFirstScrolled }) => isFirstScrolled && COLOR.WHITE};

  .logo {
    position: relative;
    width: 9.6rem;
    height: 3rem;
  }
`;
