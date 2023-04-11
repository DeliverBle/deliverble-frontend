import { ErrorContent, Footer, NavigationBar, SEO } from '@src/components/common';
import { STATUS_CODE } from '@src/utils/constant';
import styled from 'styled-components';

function Custom404() {
  return (
    <StPageWrapper>
      <SEO title="Deilverble" />
      <NavigationBar />
      <ErrorContent
        statusCode={STATUS_CODE.NOT_FOUND}
        errorMessage={
          '찾을 수 없는 페이지입니다.' + '\n' + '입력한 주소가 맞는지 확인하신 후, 딜리버블과 다시 함께 해요!'
        }
      />
      <Footer />
    </StPageWrapper>
  );
}

export default Custom404;

const StPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
