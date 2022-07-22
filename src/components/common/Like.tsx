import { icLikeClicked, icLikeHover, icLikeDefault } from 'public/assets/icons';
import ImageDiv from './ImageDiv';
import styled, { css } from 'styled-components';
import { useEffect, useState } from 'react';

interface LikeProps {
  isFromList: boolean;
  isLiked: boolean;
  toggleLike: () => void;
}

function Like(props: LikeProps) {
  const { isFromList, isLiked, toggleLike } = props;
  const [isLikedTemp, setIsLikedTemp] = useState<boolean>(isLiked);

  useEffect(() => {
    setIsLikedTemp(isLiked);
  }, []);

  return (
    <StLike
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        toggleLike();
        // console.log('isLikedTemp', isLikedTemp);
        setIsLikedTemp((prev) => !prev);
        // console.log('isLikedTemp', isLikedTemp);
      }}>
      <StLikeImage isFromList={isFromList}>
        {isLikedTemp ? (
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
