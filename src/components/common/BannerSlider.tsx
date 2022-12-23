import ImageDiv from '@src/components/common/ImageDiv';
import { icLeftArrowWhite, icRightArrowWhite } from 'public/assets/icons';
import { imgBannerVer1Mic } from 'public/assets/images';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { BANNER_LIST } from '@src/utils/constant';
import 'swiper/css';

function BannerSlider() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const [swiperSetting, setSwiperSetting] = useState<Swiper | null>(null);

  useEffect(() => {
    if (!swiperSetting) {
      const settings = {
        navigation: {
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        },
        onBeforeInit: (swiper: SwiperCore) => {
          if (typeof swiper.params.navigation !== 'boolean') {
            if (swiper.params.navigation) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }
          swiper.navigation.update();
        },
        pagination: {
          el: pageRef.current,
          type: 'fraction',
        },
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        spaceBetween: 30,
        modules: [Autoplay, Navigation, Pagination],
      };
      setSwiperSetting(settings);
    }
  }, [swiperSetting]);

  return (
    <>
      {swiperSetting && (
        <Swiper {...swiperSetting}>
          {BANNER_LIST.map(({ mainText, subText }) => (
            <SwiperSlide key={mainText}>
              <StBanner>
                <StBannerText>
                  <h1>{mainText}</h1>
                  <p>{subText}</p>
                </StBannerText>
                <ImageDiv className="mic" src={imgBannerVer1Mic} alt="" layout="fill" />
              </StBanner>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <StSlideButton>
        <button ref={prevRef}>
          <ImageDiv className="arrow" src={icLeftArrowWhite} alt="left-arrow" layout="fill" />
        </button>
        <div ref={pageRef}></div>
        <button ref={nextRef}>
          <ImageDiv className="arrow" src={icRightArrowWhite} alt="left-arrow" layout="fill" />
        </button>
      </StSlideButton>
    </>
  );
}

export default BannerSlider;

const StBanner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  position: relative;

  margin: 13.6rem 0 14.4rem 0;
  width: 100%;
  height: 60rem;
  background: url('/assets/images/img_banner_ver1_l.png') no-repeat left/cover;

  .mic {
    position: absolute;
    right: 0rem;
    width: 109.5rem;
    height: 68.8rem;
  }

  @media (min-width: 501px) {
    .mic {
      transition: opacity 0.2s ease-in;
    }
  }

  @media (max-width: 960px) {
    .mic {
      opacity: 0;
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('/assets/images/img_banner_ver1_m.png') no-repeat center / 960px;
      transition: opacity 0.2s ease-in;
    }
  }

  @media (max-width: 500px) {
    &::before {
      opacity: 0;
      transition: opacity 0.2s ease-in;
    }
  }
`;

const StBannerText = styled.div`
  display: flex;
  flex-direction: column;

  padding: 16rem 0 10rem 16rem;
  min-width: 50.4rem;
  height: 60rem;

  color: ${COLOR.WHITE};
  text-align: left;
  white-space: pre-line;

  & > h1 {
    ${FONT_STYLES.SB_44_HEADLINE}
  }

  & > p {
    padding-top: 3.2rem;
    ${FONT_STYLES.M_24_HEADLINE}
  }

  @media (max-width: 960px) {
    padding-left: 6.4rem;
    min-width: 36.7rem;
  }

  @media (max-width: 500px) {
    justify-content: center;
    align-items: center;
    padding: 0;
    width: 100%;
    text-align: center;

    & > h1 {
      ${FONT_STYLES.SB_28_HEADLINE}
    }

    & > p {
      display: none;
    }
  }
`;

const StSlideButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 59.6rem;
  left: 16rem;
  z-index: 1;

  width: 12.9rem;
  height: 4rem;

  background: rgba(22, 15, 53, 0.2);
  border-radius: 20px;
  ${FONT_STYLES.SB_16_CAPTION}

  & > div {
    display: flex;
    justify-content: center;

    width: fit-content;
    height: fit-content;

    color: ${COLOR.WHITE};
    letter-spacing: 0.5rem;
    text-indent: 0.5rem;
  }

  .arrow {
    position: relative;
    width: 2.4rem;
    height: 2.4rem;
  }

  @media (max-width: 960px) {
    left: 6.4rem;
  }

  @media (max-width: 500px) {
    display: none;
  }
`;
