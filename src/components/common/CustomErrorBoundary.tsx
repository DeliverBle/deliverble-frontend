import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryErrorResetBoundary, useQueryErrorResetBoundary } from 'react-query';
import ErrorFallback from '../../pages/ErrorFallback';

interface CustomErrorBoundaryProps {
  children: ReactNode;
}

function CustomErrorBoundary(props: CustomErrorBoundaryProps) {
  const { children } = props;
  const { reset } = useQueryErrorResetBoundary();
  const router = useRouter();

  return (
    <QueryErrorResetBoundary>
      <ErrorBoundary onReset={reset} fallbackRender={ErrorFallback} key={router.pathname}>
        {children}
      </ErrorBoundary>
    </QueryErrorResetBoundary>
  );
}

export default CustomErrorBoundary;
