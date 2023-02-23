import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryErrorResetBoundary, useQueryErrorResetBoundary } from 'react-query';
import Fallback from '@src/pages/fallback';

interface CustomErrorBoundaryProps {
  children: ReactNode;
}

function CustomErrorBoundary(props: CustomErrorBoundaryProps) {
  const { children } = props;
  const { reset } = useQueryErrorResetBoundary();
  const router = useRouter();

  return (
    <QueryErrorResetBoundary>
      <ErrorBoundary onReset={reset} fallbackRender={Fallback} key={router.pathname}>
        {children}
      </ErrorBoundary>
    </QueryErrorResetBoundary>
  );
}

export default CustomErrorBoundary;
