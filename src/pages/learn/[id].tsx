import { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import ImageDiv from '../../components/common/ImageDiv';
import GuideModal from '@src/components/learnDetail/GuideModal';
import { icXButton, icGuide } from 'public/assets/icons';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { GetServerSidePropsContext } from 'next';
import { api } from '@src/services/api';
import { VideoData } from '@src/services/api/types/learn-detail';
import HighlightModal from '@src/components/learnDetail/HighlightModal';

function LearnDetail({ videoData }: { videoData: VideoData }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  //같은 부분 하이라이트 했을 경우로 로직 변경해야 함.
  const [highlightAlert, setHighlightAlert] = useState(true);
  const { title, category, channel, reportDate, tags } = videoData;

  return (
    <StLearnDetail>
      <ImageDiv onClick={() => router.back()} src={icXButton} className="close" layout="fill" alt="x" />
      <StLearnSection>
        <StVideoDetail>
          <div>
            {channel} | {category} | {reportDate}
          </div>
          <h1>{title}</h1>
          <StTagContainer>
            {tags.map(({ id, name }) => (
              <span key={id}>{name}</span>
            ))}
          </StTagContainer>
        </StVideoDetail>
        <ImageDiv onClick={() => setIsModalOpen(true)} src={icGuide} className="guide" layout="fill" alt="?" />
      </StLearnSection>
      {isModalOpen && <GuideModal closeModal={() => setIsModalOpen(false)} />}
      {highlightAlert && <HighlightModal closeModal={() => setHighlightAlert(false)} />}
    </StLearnDetail>
  );
}

export default LearnDetail;

export async function getServerSideProps({ params }: GetServerSidePropsContext) {
  const id = +(params?.id ?? -1);
  const response = await api.learnDetailService.getVideoData(id);
  if (response.id !== id) {
    return {
      notFound: true,
    };
  }
  return { props: { videoData: response } };
}

const StLearnDetail = styled.div`
  padding: 16rem 10rem;
  min-height: 100vh;
  background: rgba(229, 238, 255, 0.85);
  backdrop-filter: blur(2.8rem);

  .close {
    position: fixed;
    top: 2.4rem;
    right: 10rem;
    width: 4.8rem;
    height: 4.8rem;
    cursor: pointer;
  }

  .guide {
    position: relative;
    width: 3.4rem;
    height: 3.4rem;
    cursor: pointer;
  }
`;

const StLearnSection = styled.section`
  padding: 8rem;
  height: 111.9rem;
  border-radius: 3rem;
  background-color: ${COLOR.WHITE};
`;

const StVideoDetail = styled.div`
  & > div {
    display: flex;
    color: ${COLOR.GRAY_30};
    ${FONT_STYLES.M_21_BODY};
  }

  & > h1 {
    margin-top: 1.2rem;
    margin-bottom: 2rem;
    color: ${COLOR.BLACK};
    ${FONT_STYLES.SB_32_HEADLINE};
  }
`;

const StTagContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-bottom: 4.8rem;

  & > span {
    padding: 1rem 1.6rem;
    border-radius: 2.4rem;
    color: ${COLOR.WHITE};
    background-color: ${COLOR.MAIN_BLUE};
    ${FONT_STYLES.SB_18_CAPTION};
  }
`;
