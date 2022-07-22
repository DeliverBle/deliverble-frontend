import { icLikeClicked, icLikeHover, icLikeDefault } from 'public/assets/icons';
import ImageDiv from './ImageDiv';
import styled, { css } from 'styled-components';
import { useEffect, useState } from 'react';
import { api } from '@src/services/api';

interface LikeProps {
  isFromList: boolean;
  newsId: number;
  isLiked?: boolean;
}

function Like(props: LikeProps) {
  const { isFromList, newsId, isLiked } = props;
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [test, setTest] = useState(isLiked);
  const [updateState, setUpdateState] = useState<number>(0);

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
    setUpdateState(1);
  }, []);

  useEffect(() => {
    setTest(isLiked);
    setUpdateState(0);
  }, [isLiked, test, updateState]);

  const handleClick = async (newsId: number, test?: boolean) => {
    if (test) {
      console.log('데이터 삭제', test);
      await api.likeService.deleteLikeData({
        news_id: newsId,
        access_token: token,
        user_id: userId,
      });
      setTest(false);
    } else {
      console.log('데이터 추가', test);
      await api.likeService.postLikeData({
        news_id: newsId,
        access_token: token,
        user_id: userId,
      });
      setTest(true);
    }
  };

  return (
    <StLike
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        handleClick(newsId, test);
      }}>
      <StLikeImage isFromList={isFromList}>
        {test ? (
          <ImageDiv className="like" src={icLikeClicked} alt="like" layout="fill" />
        ) : (
          <>
            <ImageDiv className="like" src={icLikeHover} alt="like" layout="fill" />
            <ImageDiv className="like default" src={icLikeDefault} alt="like" layout="fill" />
          </>
        )}
      </StLikeImage>
    </StLike>
  );
}

export default Like;

const StLike = styled.button`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;

  padding: 0;
`;

const StLikeImage = styled.div<{ isFromList: boolean }>`
  position: relative;

  ${({ isFromList }) =>
    isFromList
      ? css`
          .like {
            position: absolute;
            top: 0.2rem;
            right: 0.2rem;

            width: 4rem;
            height: 4rem;
            opacity: 0;
          }
        `
      : css`
          .like {
            position: absolute;
            top: 1.2rem;
            right: 1.2rem;

            width: 5rem;
            height: 5rem;
          }
        `}

  &:hover .default img {
    transition: opacity 1s;
    opacity: 0;
  }
`;
