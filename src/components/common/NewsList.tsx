import { useRouter } from 'next/router';
import styled from 'styled-components';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { VideoData } from '@src/services/api/types/home';
import ImageDiv from './ImageDiv';
import Like from './Like';

interface NewsListProps {
  newsList: VideoData[];
}

function NewsList(props: NewsListProps) {
  const { newsList } = props;
  const router = useRouter();

  return (
    <StNewsContainer>
      {newsList.map(({ id, title, category, channel, thumbnail, reportDate }) => (
        <StNewsWrapper key={id} onClick={() => router.push(`/learn/${id}`)}>
          <StThumbnail>
            <ImageDiv className="thumbnail" src={thumbnail} layout="fill" alt="thumbnail" />
            <Like />
          </StThumbnail>
          <StTitle>{title}</StTitle>
          <StInfo>
            {channel} | {category} | {reportDate}
          </StInfo>
        </StNewsWrapper>
      ))}
    </StNewsContainer>
  );
}

export default NewsList;

const StNewsContainer = styled.section`
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
    transition: 0.5s ease-in-out;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 100%);
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
