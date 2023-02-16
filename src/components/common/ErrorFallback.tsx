import { CustomError } from '@src/services/api/types/error';
import { FallbackProps } from 'react-error-boundary';

function ErrorFallback(props: FallbackProps) {
  const { error } = props;
  const customError = error as CustomError;

  return (
    <div>
      <h1>{customError.statusCode}</h1>
      <h2>{error.message}</h2>
      <a target="_blank" href="https://forms.gle/BGQGeGBLXTM6RBCR7" rel="noreferrer noopener">
        에러 제보하기
      </a>
    </div>
  );
}

export default ErrorFallback;
