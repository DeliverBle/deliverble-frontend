import { VideoData } from '@src/services/api/types/home';
import { loginState } from '@src/stores/loginState';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { useRouter } from 'next/router';
import { icSpeechGuideLogo } from 'public/assets/icons';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';
import LoginModal from '../login/LoginModal';
import ImageDiv from './ImageDiv';
import Like from './Like';

interface NewsListProps {
  isGuide?: boolean;
  newsList: VideoData[];
  onClickLike?: (id: number) => void;
}

function NewsList(props: NewsListProps) {
  const { isGuide, newsList, onClickLike } = props;
  const router = useRouter();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const login = useRecoilValue(loginState);

  return (
    <StNewsList isGuide={isGuide}>
      {newsList.map(({ id, title, category, channel, thumbnail, reportDate, isFavorite = false, haveGuide }) => {
        return (
          <StNewsWrapper key={id} onClick={() => router.push(`/learn/${id}`)}>
            {isGuide && (
              <StGuideTitle>
                <ImageDiv className="guide-logo" src={icSpeechGuideLogo} alt="" />
                <p>스피치 가이드</p>
              </StGuideTitle>
            )}
            <StThumbnail isGuide={isGuide}>
              <ImageDiv
                className="thumbnail"
                src={thumbnail}
                blurDataURL={thumbnail}
                placeholder="blur"
                layout="fill"
                alt=""
              />
              <Like
                isFromList={true}
                isFavorite={isFavorite}
                toggleLike={() => {
                  if (!login) {
                    setIsLoginModalOpen(true);
                  } else {
                    onClickLike && onClickLike(id);
                  }
                }}
              />
            </StThumbnail>
            <StInfo>
              <StTitle>{title}</StTitle>
              <StCaption>
                {channel} | {category} | {reportDate.replaceAll('-', '.')}
              </StCaption>
            </StInfo>
            {haveGuide && !isGuide && (
              <StSpeechGuide>
                <ImageDiv className="guide-logo" src={icSpeechGuideLogo} alt="" />
                <p>스피치 가이드</p>
              </StSpeechGuide>
            )}
          </StNewsWrapper>
        );
      })}
      {isLoginModalOpen && <LoginModal closeModal={() => setIsLoginModalOpen(false)} />}
    </StNewsList>
  );
}

export default NewsList;

const StNewsList = styled.section<{ isGuide: boolean | undefined }>`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 8rem;
  grid-column-gap: 2rem;

  ${({ isGuide }) =>
    isGuide &&
    css`
      grid-column-gap: 3rem;
    `}

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

const StNewsWrapper = styled.article`
  display: flex;
  flex-direction: column;
  position: relative;

  width: 100%;
  height: 100%;

  @media (max-width: 500px) {
    flex-direction: row;
  }
`;

const StThumbnail = styled.div<{ isGuide: boolean | undefined }>`
  position: relative;
  border-radius: 1rem;
  cursor: pointer;

  ${({ isGuide }) =>
    isGuide &&
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

    & img {
      border-radius: 1rem;
      object-fit: cover;
    }
  }

  @media (max-width: 500px) {
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
  margin-top: 1.6rem;
`;

const StTitle = styled.p`
  height: 5.8rem;
  ${FONT_STYLES.SB_21_BODY};
  color: ${COLOR.BLACK};
  cursor: pointer;

  @media (max-width: 500px) {
    ${FONT_STYLES.SB_18_CAPTION};
  }
`;

const StCaption = styled.div`
  margin-top: 1.6rem;
  ${FONT_STYLES.M_18_CAPTION};
  color: ${COLOR.GRAY_30};

  @media (max-width: 500px) {
    ${FONT_STYLES.M_15_CAPTION};
  }
`;

const StSpeechGuide = styled.div`
  display: flex;
  margin-top: 1.2rem;
  padding: 0.5rem 0.8rem 0.6rem 0.4rem;
  width: 12.2rem;
  height: 3.3rem;
  border-radius: 0.6rem;

  background-color: ${COLOR.MAIN_BLUE};
  color: ${COLOR.WHITE};
  ${FONT_STYLES.SB_16_CAPTION}

  & > .guide-logo {
    display: flex;
    align-items: center;
  }
`;
