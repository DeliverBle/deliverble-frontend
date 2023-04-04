import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { useRouter } from 'next/router';
import styled from 'styled-components';

function LearningButton() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <StLearnButton
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        router.push(`/learn/${id}`);
      }}>
      학습하러 가기
    </StLearnButton>
  );
}

export default LearningButton;

const StLearnButton = styled.button`
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 20.9rem;
  height: 8.2rem;
  border-radius: 4.8rem;

  background-color: ${COLOR.MAIN_BLUE};
  box-shadow: 0.4rem 0.4rem 2rem rgba(22, 15, 53, 0.15);
  color: ${COLOR.WHITE};
  ${FONT_STYLES.SB_24_HEADLINE}
`;
