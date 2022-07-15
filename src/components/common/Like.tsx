import { icLikeClicked, icLikeHover, icLikeDefault } from 'public/assets/icons';
import { useState } from 'react';
import ImageDiv from './ImageDiv';
import styled from 'styled-components';

function Like() {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <StLikeButton
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        setIsLiked((prev) => !prev);
      }}>
      <StImageContainer>
        {isLiked ? (
          <ImageDiv className="like" src={icLikeClicked} alt="like" />
        ) : (
          <>
            <ImageDiv className="like" src={icLikeHover} alt="like" />
            <ImageDiv className="like default" src={icLikeDefault} alt="like" />
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

  width: 4rem;
  height: 4rem;
  padding: 0;
`;

const StImageContainer = styled.div`
  position: relative;

  .like {
    position: absolute;
    top: -2rem;

    opacity: 0;
  }

  &:hover .default {
    transition: opacity 1s;
    opacity: 0;
  }
`;
