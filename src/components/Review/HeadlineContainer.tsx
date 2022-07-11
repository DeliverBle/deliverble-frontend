import styled from 'styled-components';
import { icScript } from 'public/assets/icons/index';
import { COLOR } from 'src/styles/color';
import { FONT_STYLES } from 'src/styles/fontStyle';
import Image from 'next/image';

function HeadlineContainer() {
  return (
    <StHeadlineContainer>
      <Image src={icScript} width={48} height={48} alt="script" />
      <StHeadLineWrapper>
        <p>한번으로 끝내지 마세요!</p>
        <p>복습으로 매력적인 목소리를 만들어요!</p>
      </StHeadLineWrapper>
    </StHeadlineContainer>
  );
}

export default HeadlineContainer;

const StHeadlineContainer = styled.section`
  display: flex;

  margin-top: 16rem;
  margin-left: 16rem;
  margin-bottom: 14.8rem;
`;

const StHeadLineWrapper = styled.section`
  display: flex;
  flex-direction: column;
  color: ${COLOR.BLACK};
  ${FONT_STYLES.SB_32_HEADLINE};
`;

// const StImage = styled.img`
//   margin-right: 1.2rem;
// `;
