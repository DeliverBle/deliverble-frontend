import LearnDetail from '@src/pages/learn/[id]';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

describe('메모 통합 테스트', () => {
  it('메모 추가 테스트', async () => {
    const { getByText, getByRole, queryByText, queryByRole, findByText, findByRole } = render(<LearnDetail />, {
      wrapper: createWrapper(),
    });

    const NEWS_TITLE = '북, 최근 임진강 상류 황강댐 수문 개방';
    expect(await findByText(NEWS_TITLE)).toBeInTheDocument();

    const highlight = getByText('군남댐');
    await userEvent.pointer([{ target: highlight }, { keys: '[MouseRight]', target: highlight }]);
    expect(await findByText('메모 추가')).toBeInTheDocument();

    const addMemoButton = getByText('메모 추가');
    await userEvent.click(addMemoButton);
    expect(await findByRole('heading', { name: '군남댐' })).toBeInTheDocument();

    const memoTextarea = getByRole('textbox', { name: '메모 입력창' });
    const submitButton = getByRole('button', { name: '완료' });
    expect(submitButton).toBeDisabled();

    await userEvent.type(memoTextarea, '발음 주의');
    expect(submitButton).toBeEnabled();
    await userEvent.click(submitButton);
    expect(queryByRole('textbox', { name: '메모 입력창' })).toBeNull();
    expect(queryByText('발음 주의')).toBeInTheDocument();
  });

  it('메모 수정 테스트', async () => {
    const { getByText, getAllByText, getByRole, queryByText, queryByRole, findByText, findByRole } = render(
      <LearnDetail />,
      {
        wrapper: createWrapper(),
      },
    );

    const NEWS_TITLE = '북, 최근 임진강 상류 황강댐 수문 개방';
    expect(await findByText(NEWS_TITLE)).toBeInTheDocument();
    expect(getByText('숨을 크게 들이마시고')).toBeInTheDocument();

    const highlight = getAllByText('호우로')[0];
    await userEvent.pointer([{ target: highlight }, { keys: '[MouseRight]', target: highlight }]);
    expect(await findByText('메모 수정')).toBeInTheDocument();

    const addMemoButton = getByText('메모 수정');
    await userEvent.click(addMemoButton);
    expect(await findByRole('heading', { name: '호우로' })).toBeInTheDocument();

    const memoTextarea = getByRole('textbox', { name: '메모 입력창' });
    const submitButton = getByRole('button', { name: '완료' });

    await userEvent.type(memoTextarea, '숨을 작게 들이마시고');
    await userEvent.click(submitButton);
    expect(queryByRole('textbox', { name: '메모 입력창' })).toBeNull();
    expect(queryByText('숨을 작게 들이마시고')).toBeInTheDocument();
  });
});
