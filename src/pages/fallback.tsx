import { ErrorContent } from '@src/components/common';
import { CustomError } from '@src/types/error';
import { FallbackProps } from 'react-error-boundary';

function Fallback(props: FallbackProps) {
  const { error } = props;
  const customError = error as CustomError;

  return (
    <>
      {customError && (
        <ErrorContent
          statusCode={customError.statusCode}
          errorMessage={error.message + '\n' + '에러를 제보해 주시면 더 나은 딜리버블과 함께할 수 있어요!'}
        />
      )}
    </>
  );
}

export default Fallback;
