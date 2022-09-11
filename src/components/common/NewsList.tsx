import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';
import LoginModal from '../login/LoginModal';
import ImageDiv from './ImageDiv';
import Like from './Like';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { VideoData } from '@src/services/api/types/home';

interface NewsListProps {
  newsList: VideoData[];
  onClickLike?: (id: number, isLiked: boolean) => void;
}

function NewsList(props: NewsListProps) {
  const { newsList, onClickLike } = props;
  const router = useRouter();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const getLoginStatus = () => localStorage.getItem('token') ?? '';

  return (
    <StNewsList>
      {newsList.map(({ id, title, category, channel, thumbnail, reportDate, isLiked = false }) => {
        return (
          <StNewsWrapper key={id} onClick={() => router.push(`/learn/${id}`)}>
            <StThumbnail>
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
                isLiked={isLiked}
                toggleLike={() => {
                  if (getLoginStatus() === '') {
                    setIsLoginModalOpen(true);
                  } else {
                    onClickLike && onClickLike(id, isLiked);
                  }
                }}
              />
            </StThumbnail>
            <StTitle>{title}</StTitle>
            <StInfo>
              {channel} | {category} | {reportDate.replaceAll('-', '.')}
            </StInfo>
          </StNewsWrapper>
        );
      })}
      {isLoginModalOpen && <LoginModal closeModal={() => setIsLoginModalOpen(false)} />}
    </StNewsList>
  );
}

export default NewsList;

const StNewsList = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 11.2rem;
  grid-column-gap: 2rem;

  @media (max-width: 1280px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StNewsWrapper = styled.article`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  width: 100%;
  height: 100%;
`;

const StThumbnail = styled.div`
  position: relative;
  border-radius: 1rem;
  cursor: pointer;

  &:hover {
    transition: background-color 0.2s ease-in-out;
    background-color: rgba(0, 0, 0, 0.15);
  }

  &:hover .like {
    opacity: 1;
  }

  & > div {
    position: relative;
    z-index: -1;

    min-width: 38.4rem;
    min-height: 21.6rem;
    padding-top: 56%;

    & img {
      border-radius: 1rem;
      object-fit: cover;
    }
  }
`;

const StTitle = styled.p`
  width: fit-content;
  height: 5.8rem;
  ${FONT_STYLES.M_21_BODY};
  color: ${COLOR.BLACK};
  cursor: pointer;
`;

const StInfo = styled.div`
  width: fit-content;

  ${FONT_STYLES.M_18_CAPTION};
  color: ${COLOR.GRAY_30};
`;
