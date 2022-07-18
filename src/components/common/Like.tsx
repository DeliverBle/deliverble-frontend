import { icLikeClicked, icLikeHover, icLikeDefault } from 'public/assets/icons';
import { useState } from 'react';
import ImageDiv from './ImageDiv';
import styled, { css } from 'styled-components';

interface LikeProps {
  fromList: boolean;
}

function Like(props: LikeProps) {
  const { fromList } = props;
  const [isLiked, setIsLiked] = useState(false);

  return (
    <StLikeButton
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        setIsLiked((prev) => !prev);
      }}>
      <StImageContainer fromList={fromList}>
        {isLiked ? (
          <ImageDiv className="like" src={icLikeClicked} alt="like" layout="fill" />
        ) : (
          <>
            <ImageDiv className="like" src={icLikeHover} alt="like" layout="fill" />
            <ImageDiv className="like default" src={icLikeDefault} alt="like" layout="fill" />
          </>
        )}
      </StImageContainer>
    </StLikeButton>
  );
}

export default Like;

const StLikeButton = styled.button`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;

  padding: 0;
`;

const StImageContainer = styled.div<{ fromList: boolean }>`
  position: relative;

  ${({ fromList }) =>
    fromList
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
