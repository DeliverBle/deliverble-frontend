import { useRouter } from 'next/router';
import styled from 'styled-components';
import { videoType } from '@src/pages/home';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';

interface NewsListProps {
  newsList: videoType[];
}

function NewsList(props: NewsListProps) {
  const { newsList } = props;
  const router = useRouter();

  return (
    <StNewsContainer>
      {newsList.map(({ id, title, channel, category, date }) => (
        <StNewsWrapper key={id} onClick={() => router.push(`/learn/${id}`)}>
          <StThumbnail />
          <StTitle>{title}</StTitle>
          <StInfo>
            {channel} | {category} | {date}
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
  width: inherit;

  min-width: 38.4rem;
  min-height: 21.6rem;
  padding-top: 58%;

  border-radius: 1rem;
  background-color: ${COLOR.GRAY_10};
`;

const StTitle = styled.p`
  ${FONT_STYLES.M_21_BODY};
  color: ${COLOR.BLACK};
`;

const StInfo = styled.div`
  ${FONT_STYLES.M_18_CAPTION};
  color: ${COLOR.GRAY_30};
`;
