import { icLikeClicked, icLikeHover, icLikeDefault } from 'public/assets/icons';
import ImageDiv from './ImageDiv';
import styled, { css } from 'styled-components';

interface LikeProps {
  isFromList: boolean;
  isFavorite?: boolean;
  toggleLike?: () => void;
}

function Like(props: LikeProps) {
  const { isFromList, isFavorite, toggleLike } = props;

  return (
    <StLike
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        toggleLike && toggleLike();
      }}>
      <StLikeImage isFromList={isFromList}>
        {isFavorite ? (
          <ImageDiv className="like" src={icLikeClicked} alt="좋아요" layout="fill" />
        ) : (
          <>
            <ImageDiv className="like" src={icLikeHover} alt="좋아요" layout="fill" />
            <ImageDiv className="like default" src={icLikeDefault} alt="좋아요" layout="fill" />
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
