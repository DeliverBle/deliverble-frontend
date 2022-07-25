import { useRouter } from 'next/router';
import styled from 'styled-components';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { VideoData } from '@src/services/api/types/home';
import ImageDiv from './ImageDiv';
import Like from './Like';
import { useEffect, useState } from 'react';
import { api } from '@src/services/api';

interface NewsListProps {
  newsList: VideoData[];
}

function NewsList(props: NewsListProps) {
  const { newsList } = props;
  const router = useRouter();
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    (async () => {
      const getAccessToken = () => localStorage.getItem('token') ?? '';
      const getUserId = () => localStorage.getItem('userId') ?? '';
      if (getAccessToken()) {
        setToken(getAccessToken());
      }
      if (getUserId()) {
        setUserId(getUserId());
      }
    })();
  }, []);

  const handleClick = async (id: number, isLiked?: boolean) => {
    if (!isLiked) {
      await api.likeService.postLikeData({
        news_id: id,
        access_token: token,
        user_id: userId,
      });
    } else {
      await api.likeService.deleteLikeData({
        news_id: id,
        access_token: token,
        user_id: userId,
      });
    }
  };

  return (
    <StNewsList>
      {newsList.map(({ id, title, category, channel, thumbnail, reportDate, isLiked }) => {
        console.log('map 안에서 isLiked : ', isLiked);
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
              <Like isFromList={true} isLiked={isLiked} toggleLike={() => handleClick(id, isLiked)} />
            </StThumbnail>
            <StTitle>{title}</StTitle>
            <StInfo>
              {channel} | {category} | {reportDate.replaceAll('-', '.')}
            </StInfo>
          </StNewsWrapper>
        );
      })}
    </StNewsList>
  );
}

export default NewsList;

const StNewsList = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 11.2rem;
  grid-column-gap: 2rem;
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
    /* background: linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 100%); */
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

  ${FONT_STYLES.M_21_BODY};
  color: ${COLOR.BLACK};
  cursor: pointer;
`;

const StInfo = styled.div`
  width: fit-content;

  ${FONT_STYLES.M_18_CAPTION};
  color: ${COLOR.GRAY_30};
`;
