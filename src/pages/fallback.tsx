import Footer from '@src/components/common/Footer';
import NavigationBar from '@src/components/common/NavigationBar';
import { CustomError } from '@src/services/api/types/error';
import { FallbackProps } from 'react-error-boundary';
import ErrorContent from '../components/common/ErrorContent';

function Fallback(props: FallbackProps) {
  const { error } = props;
  const customError = error as CustomError;

  return (
    <>
      <NavigationBar />
      {customError && (
        <ErrorContent
          statusCode={customError.statusCode}
          errorMessage={error.message + '\n' + '에러를 제보해 주시면 더 나은 딜리버블과 함께할 수 있어요!'}
        />
      )}
      <Footer />
    </>
  );
}

export default Fallback;
