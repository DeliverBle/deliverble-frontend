import { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryErrorResetBoundary, useQueryErrorResetBoundary } from 'react-query';
import ErrorFallback from './ErrorFallback';

interface CustomErrorBoundaryProps {
  children: ReactNode;
}

function CustomErrorBoundary(props: CustomErrorBoundaryProps) {
  const { children } = props;
  const { reset } = useQueryErrorResetBoundary();

  return (
    <QueryErrorResetBoundary>
      <ErrorBoundary onReset={reset} fallbackRender={ErrorFallback}>
        {children}
      </ErrorBoundary>
    </QueryErrorResetBoundary>
  );
}

export default CustomErrorBoundary;
