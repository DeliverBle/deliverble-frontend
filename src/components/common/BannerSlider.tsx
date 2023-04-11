import { ImageDiv } from '@src/components/common';
import { icLeftArrowWhite, icRightArrowWhite } from 'public/assets/icons';
import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { Swiper, SwiperSlide, SwiperProps, SwiperRef } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { BANNER_TEXT_LIST } from '@src/utils/constant';
import 'swiper/css';

function BannerSlider() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperRef>(null);
  const [swiperSetting, setSwiperSetting] = useState<SwiperProps | null>(null);

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
        loop: true,
        pagination: {
          el: pageRef.current,
          type: 'fraction' as 'bullets' | 'fraction',
        },
        touchRatio: 0,
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
    <StBannerSlider>
      {swiperSetting && (
        <Swiper {...swiperSetting} ref={swiperRef}>
          {BANNER_TEXT_LIST.map(({ mainText, subText }, i) => (
            <SwiperSlide key={mainText}>
              <StBanner
                ver={i + 1}
                onMouseEnter={() => swiperRef.current?.swiper.autoplay.stop()}
                onMouseLeave={() => swiperRef.current?.swiper.autoplay.start()}>
                <StBannerText ver={i + 1}>
                  <h1>{mainText}</h1>
                  <p>{subText}</p>
                </StBannerText>
                {!i && (
                  <ImageDiv
                    className="banner_ver1_deco"
                    src="/assets/images/img_banner_ver1_deco1.webp"
                    alt=""
                    layout="fill"
                  />
                )}
              </StBanner>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <StSlideButton swiperSet={swiperSetting}>
        <button ref={prevRef}>
          <ImageDiv className="arrow" src={icLeftArrowWhite} alt="이전" layout="fill" />
        </button>
        <div ref={pageRef} />
        <button ref={nextRef}>
          <ImageDiv className="arrow" src={icRightArrowWhite} alt="다음" layout="fill" />
        </button>
      </StSlideButton>
    </StBannerSlider>
  );
}

export default BannerSlider;

const StBannerSlider = styled.div`
  height: 88rem;
`;

const defaultBefore = css`
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: opacity 0.2s ease-in;
`;

const StBanner = styled.div<{ ver: number }>`
  display: flex;
  justify-content: space-between;
  align-items: end;
  position: relative;

  margin: 13.6rem 0 14.4rem 0;
  width: 100%;
  height: 60rem;

  ${({ ver }) =>
    ver === 1 &&
    css`
      background: url('/assets/images/img_banner_ver1_background.webp') no-repeat left/cover;

      .banner_ver1_deco {
        position: absolute;
        right: 0rem;
        width: 109.5rem;
        height: 68.8rem;
      }

      @media (max-width: 960px) {
        .banner_ver1_deco {
          opacity: 0;
        }

        &::before {
          ${defaultBefore}
          background: url('/assets/images/img_banner_ver1_deco2.webp') no-repeat center / 96rem;
        }
      }

      @media (min-width: 501px) {
        .banner_ver1_deco {
          transition: opacity 0.2s ease-in;
        }
      }

      @media (max-width: 500px) {
        &::before {
          opacity: 0;
        }
      }
    `}

  ${({ ver }) =>
    ver !== 1 &&
    css`
      & {
        background-color: ${ver === 2 ? COLOR.BACKGROUND_PURPLE : COLOR.BACKGROUND_BLUE};
      }

      &::before {
        ${defaultBefore}
        background: url('/assets/images/img_banner_ver${ver}_deco.webp') no-repeat right / auto;
      }

      @media (max-width: 960px) {
        &::before {
          opacity: ${ver === 2 ? 0.2 : 0.15};
        }
      }
    `}
`;

const StBannerText = styled.div<{ ver: number }>`
  display: flex;
  flex-direction: column;

  padding: 16rem 0 10rem 16rem;
  min-width: 50.4rem;
  height: 60rem;

  color: ${({ ver }) => (ver !== 3 ? COLOR.WHITE : COLOR.BLACK)};
  text-align: left;
  white-space: pre-line;
  z-index: 10;

  h1 {
    ${FONT_STYLES.SB_44_HEADLINE}
  }

  p {
    padding-top: 3.2rem;
    ${FONT_STYLES.L_24_HEADLINE}
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

    h1 {
      ${FONT_STYLES.SB_28_HEADLINE}
    }

    p {
      display: none;
    }
  }
`;

const StSlideButton = styled.div<{ swiperSet: SwiperProps | null }>`
  display: ${({ swiperSet }) => (swiperSet ? 'flex' : 'none')};
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 68.4rem;
  left: 16rem;
  z-index: 1;

  width: 12.9rem;
  height: 4rem;

  background: rgba(22, 15, 53, 0.2);
  border-radius: 2rem;
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
