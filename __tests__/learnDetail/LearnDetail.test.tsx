import LearnDetail from '@src/pages/learn/[id]';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

const createWrapper = () => {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>{children}</RecoilRoot>
    </QueryClientProvider>
  );
};

jest.mock('next/router', () => ({
  useRouter() {
    return { pathname: 'learn/2', query: { id: '2' } };
  },
}));

localStorage.setItem('recoil-persist', '{ "loginState": true }');

describe('학습 상세 페이지 목 API 호출 테스트', () => {
  it('비슷한 영상 추천 API', async () => {
    const { queryByText, findByText } = render(<LearnDetail />, { wrapper: createWrapper() });
    const SIMILAR_NEWS_TITLE = "우크라이나 재건회의 '루가노 선언' 채택";

    expect(queryByText(SIMILAR_NEWS_TITLE)).toBeNull();
    expect(await findByText(SIMILAR_NEWS_TITLE)).toBeInTheDocument();
  });

  it('뉴스 상세 정보 API (인증)', async () => {
    const { queryByText, findByText } = render(<LearnDetail />, { wrapper: createWrapper() });
    const NEWS_TITLE = '북, 최근 임진강 상류 황강댐 수문 개방';

    expect(queryByText(NEWS_TITLE)).toBeNull();
    expect(await findByText(NEWS_TITLE)).toBeInTheDocument();
  });
});
