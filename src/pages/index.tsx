import { ImageDiv, SEO } from '@src/components/common';
import Header from '@src/components/landing/Header';
import MobileContainer from '@src/components/landing/MobileContainer';
import ScrollControl from '@src/components/landing/ScrollControl';
import SliderContainer from '@src/components/landing/SliderContainer';
import { useIsMobile } from '@src/hooks/useIsMobile';
import { COLOR } from '@src/styles/color';
import { icMobileLogo, icMobileLogoWhite } from 'public/assets/icons';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

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
        <StMobile>
          <StHeader isFirstScrolled={isScrolled}>
            <ImageDiv src={isScrolled ? icMobileLogo : icMobileLogoWhite} className="logo" layout="fill" alt="" />
          </StHeader>
          <MobileContainer />
        </StMobile>
      )}
      {deviceType === 'desktop' && (
        <div>
          <ScrollControl slideNumber={slideNumber} setSlideNumber={setSlideNumber} setStopObserve={setStopObserve} />
          <Header isFirstScrolled={isFirstScrolled} isSecondScrolled={isSecondScrolled} />
          <SliderContainer
            slideNumber={slideNumber}
            setSlideNumber={setSlideNumber}
            stopObserve={stopObserve}
            setStopObserve={setStopObserve}
          />
        </div>
      )}
    </div>
  );
}

export default Landing;

const StMobile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    zoom: 150%;
  }
`;

const StHeader = styled.header<{ isFirstScrolled: boolean }>`
  position: fixed;
  top: 0;
  z-index: 2;
  width: 100%;
  background: ${({ isFirstScrolled }) => isFirstScrolled && COLOR.WHITE};

  .logo {
    position: relative;
    width: 9.6rem;
    height: 3rem;
    margin: 1.2rem auto;
  }
`;
