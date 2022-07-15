import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { VideoData } from '@src/services/api/types/home';
import ImageDiv from './ImageDiv';

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
          <ImageDiv className="thumbnail" src={thumbnail} layout="fill" alt="thumbnail" />
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

  .thumbnail {
    position: relative;
    object-fit: cover;
    width: 38.4rem;
    height: 21.6rem;
    /* padding-top: 58%; */

    & img {
      border-radius: 1rem;
      object-fit: cover;
    }
    background-color: ${COLOR.GRAY_10};
  }
`;

const StTitle = styled.p`
  ${FONT_STYLES.M_21_BODY};
  color: ${COLOR.BLACK};
`;

const StInfo = styled.div`
  ${FONT_STYLES.M_18_CAPTION};
  color: ${COLOR.GRAY_30};
`;
