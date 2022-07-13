import { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import ImageDiv from '../../components/common/ImageDiv';
import GuideModal from '@src/components/learnDetail/GuideModal';
import { icCloseButton, icGuide } from 'public/assets/icons';
import { COLOR } from '@src/styles/color';

function LearnDetail() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <StLearnDetail>
      <ImageDiv onClick={() => router.back()} src={icCloseButton} className="close" layout="fill" alt="" />
      <StLearnSection>
        <ImageDiv onClick={() => setIsModalOpen(true)} src={icGuide} className="guide" layout="fill" alt="" />
      </StLearnSection>
      {isModalOpen && <GuideModal closeModal={() => setIsModalOpen(false)} />}
    </StLearnDetail>
  );
}

export default LearnDetail;

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
    width: 3.2rem;
    height: 3.2rem;
    cursor: pointer;
  }
`;

const StLearnSection = styled.section`
  padding: 8rem;
  height: 111.9rem;
  border-radius: 3rem;
  background-color: ${COLOR.WHITE};
`;
