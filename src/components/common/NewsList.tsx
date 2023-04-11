import { useBodyScrollLock } from '@src/hooks/useBodyScrollLock';
import { VideoData } from '@src/services/api/types/home';
import { loginState } from '@src/stores/loginState';
import { COLOR, FONT_STYLES } from '@src/styles';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { icSpeechGuideLogo } from 'public/assets/icons';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';
import ImageDiv from './ImageDiv';
import Like from './Like';

interface NewsListProps {
  type: 'normal' | 'guide';
  newsList: VideoData[];
  onClickLike?: (id: number) => void;
}

function NewsList(props: NewsListProps) {
  const { type, newsList, onClickLike } = props;
  const router = useRouter();
  const [isWebpError, setIsWebpError] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { lockScroll, unlockScroll } = useBodyScrollLock();
  const login = useRecoilValue(loginState);
  const LoginModal = dynamic(() => import('@src/components/login/LoginModal'), { ssr: false });

  return (
    <StNewsList type={type}>
      {newsList.map(({ id, title, category, channel, thumbnail, reportDate, isFavorite, haveGuide }) => {
        const webpThumbnail = thumbnail.replace('/vi/', '/vi_webp/').replace('.jpg', '.webp');
        return (
          <StNewsWrapper
            key={id}
            type={type}
            onClick={() => {
              router.push({
                pathname: `/learn/${id}`,
                query: type === 'guide' ? { speechGuide: true } : undefined,
              });
            }}>
            {type === 'guide' && (
              <StGuideTitle>
                <ImageDiv className="guide-logo" src={icSpeechGuideLogo} alt="" />
                <p>스피치 가이드</p>
              </StGuideTitle>
            )}
            <StThumbnail type={type}>
              <ImageDiv
                className="thumbnail"
                src={isWebpError ? thumbnail : webpThumbnail}
                onError={() => setIsWebpError(true)}
                layout="fill"
                alt=""
              />
              <Like
                isFromList={true}
                isFavorite={isFavorite}
                toggleLike={() => {
                  if (!login) {
                    lockScroll();
                    setIsLoginModalOpen(true);
                  } else {
                    onClickLike && onClickLike(id);
                  }
                }}
              />
            </StThumbnail>
            <StInfo>
              <StTitle haveGuide={haveGuide}>{title}</StTitle>
              <StCaption type={type}>
                {channel} | {category} | {reportDate.replaceAll('-', '.')}
              </StCaption>
              {haveGuide && type === 'normal' && (
                <StSpeechGuide>
                  <ImageDiv className="guide-logo" src={icSpeechGuideLogo} alt="" />
                  <p>스피치 가이드</p>
                </StSpeechGuide>
              )}
            </StInfo>
          </StNewsWrapper>
        );
      })}
      {isLoginModalOpen && (
        <LoginModal
          closeModal={() => {
            unlockScroll();
            setIsLoginModalOpen(false);
          }}
        />
      )}
    </StNewsList>
  );
}

export default NewsList;

const StNewsList = styled.section<{ type: string }>`
  display: grid;
  grid-template-columns: repeat(4, 38.4rem);
  grid-row-gap: 8rem;
  grid-column-gap: 2rem;

  ${({ type }) =>
    type === 'guide' &&
    css`
      grid-column-gap: 3rem;
    `}

  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 1280px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: 5.6rem;
  }

  @media (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
    grid-row-gap: 2.4rem;

    zoom: 150%;
  }
`;

const StNewsWrapper = styled.article<{ type: string }>`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 1.6rem;

  width: 100%;
  height: 100%;

  @media (max-width: 500px) {
    flex-direction: row;
  }
`;

const StThumbnail = styled.div<{ type: string }>`
  position: relative;
  cursor: pointer;
  border-radius: 1rem;

  ${({ type }) =>
    type === 'guide' &&
    css`
      outline: 0.5rem solid ${COLOR.MAIN_BLUE};
    `}

  &::before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 1rem;
    content: '';
    background: linear-gradient(rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 100%);
    transition: opacity 0.2s ease-in-out;
    opacity: 0;
  }

  &:hover {
    &::before {
      opacity: 1;
    }
  }

  &:hover .like {
    opacity: 1;
  }

  & > div {
    position: relative;
    z-index: -1;
    padding-top: 56%;
    background-color: ${COLOR.GRAY_5};
    border-radius: 1rem;

    img {
      border-radius: 1rem;
      object-fit: cover;
    }
  }

  @media (max-width: 500px) {
    margin-bottom: 0;

    & > div {
      min-width: 21.9rem;
      min-height: 12.2rem;
    }
  }
`;

const StGuideTitle = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;

  padding: 0.4rem 1.6rem 1.2rem 0.4rem;
  width: 13rem;
  height: 4rem;
  background-image: url('/assets/icons/ic_speech_guide_corner.svg');

  color: ${COLOR.WHITE};
  ${FONT_STYLES.SB_16_CAPTION}
  z-index: 1;
`;

const StInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 500px) {
    ${FONT_STYLES.M_15_CAPTION};
  }
`;

const StTitle = styled.p<{ haveGuide: boolean }>`
  height: 5.8rem;
  ${FONT_STYLES.SB_24_HEADLINE};
  color: ${COLOR.BLACK};
  cursor: pointer;

  @media (max-width: 500px) {
    width: 21.7rem;
    ${FONT_STYLES.SB_18_CAPTION};
  }

  ${({ haveGuide }) =>
    haveGuide &&
    css`
      @media (max-width: 500px) {
        height: 5.6rem;
        word-wrap: break-word;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    `};
`;

const StCaption = styled.div<{ type: string }>`
  margin-top: 1.6rem;
  ${FONT_STYLES.M_18_CAPTION};
  font-size: 2rem;
  color: ${COLOR.GRAY_30};

  @media (max-width: 500px) {
    margin-top: 0;
    ${FONT_STYLES.M_15_CAPTION};
  }
`;

const StSpeechGuide = styled.div`
  display: flex;
  margin-top: 1.2rem;
  padding: 0.5rem 0.8rem 0.6rem 0.4rem;
  width: 12.8rem;
  height: 3.3rem;
  border-radius: 0.6rem;

  background-color: ${COLOR.MAIN_BLUE};
  color: ${COLOR.WHITE};
  ${FONT_STYLES.SB_16_CAPTION}
  font-size: 1.7rem;

  .guide-logo {
    display: flex;
    align-items: center;
  }

  @media (max-width: 500px) {
    margin-top: 0.8rem;
    width: 9.3rem;
    height: 2.6rem;
    ${FONT_STYLES.SB_12_CAPTION};

    .guide-logo {
      width: 1.6rem;
      height: 1.6rem;
    }
  }
`;
