import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface videoType {
  id: number;
  title: string;
  channel: string;
  category: string;
  date: string;
  thumbnail: string;
  isLiked: boolean;
}

function NewsList() {
  const [videoList, setVideoList] = useState<videoType[]>();

  const fetchNewsList = async () => {
    try {
      const { data } = await axios.get('https://5bf61531-1c07-442d-b743-28471f964f44.mock.pstmn.io/recommend_news');

      setVideoList(() => data.data.videoList);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchNewsList();
  }, []);

  if (!videoList) return null;
  return (
    <StNewsList>
      {videoList.map((video) => (
        <StNewsWrapper key={video.id}>
          <StThumbnail />
          <StTitle>{video.title}</StTitle>
          <StInfo>
            {video.channel} | {video.category} | {video.date}
          </StInfo>
        </StNewsWrapper>
      ))}
    </StNewsList>
  );
}

export default NewsList;

const StNewsList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
`;

const StNewsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  width: 38.4rem;
  height: 33.1rem;
`;

const StThumbnail = styled.div`
  width: 38.4rem;
  height: 21.6rem;

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
