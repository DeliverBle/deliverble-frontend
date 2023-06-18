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

const setup = () => {
  const { getByText, getAllByText, getByRole, queryByText, findByText, findByRole } = render(<LearnDetail />, {
    wrapper: createWrapper(),
  });

  return { getByText, getAllByText, getByRole, queryByText, findByText, findByRole };
};

const SIMILAR_NEWS_TITLE = "우크라이나 재건회의 '루가노 선언' 채택";
const NEWS_TITLE = '북, 최근 임진강 상류 황강댐 수문 개방';

describe('학습 상세 페이지 목 API 호출 테스트', () => {
  it('비슷한 영상 추천 API', async () => {
    const { queryByText, findByText } = setup();

    expect(queryByText(SIMILAR_NEWS_TITLE)).toBeNull();
    expect(await findByText(SIMILAR_NEWS_TITLE)).toBeInTheDocument();
  });

  it('뉴스 상세 정보 API (인증)', async () => {
    const { queryByText, findByText } = setup();

    expect(queryByText(NEWS_TITLE)).toBeNull();
    expect(await findByText(NEWS_TITLE)).toBeInTheDocument();
  });
});

const MEMO_FORM = '메모 입력창';
const SUBMIT = '완료';
const CANCEL = '취소';

describe('메모 추가 통합 테스트', () => {
  const ADD_MEMO_BUTTON = '메모 추가';
  const MEMO_KEYWORD = '군남댐';
  const MEMO_CONTENT = '발음 주의';

  it('메모 추가 테스트', async () => {
    const { getByText, getByRole, queryByText, findByText, findByRole } = setup();

    expect(await findByText(NEWS_TITLE)).toBeInTheDocument();

    const highlight = getByText(MEMO_KEYWORD);
    await userEvent.pointer([{ target: highlight }, { keys: '[MouseRight]', target: highlight }]);
    expect(await findByText(ADD_MEMO_BUTTON)).toBeInTheDocument();

    const addMemoButton = getByText(ADD_MEMO_BUTTON);
    await userEvent.click(addMemoButton);
    expect(await findByRole('heading', { name: MEMO_KEYWORD })).toBeInTheDocument();

    const memoTextarea = getByRole('textbox', { name: MEMO_FORM });
    const submitButton = getByRole('button', { name: SUBMIT });

    expect(submitButton).toBeDisabled();
    await userEvent.type(memoTextarea, MEMO_CONTENT);
    expect(submitButton).toBeEnabled();

    await userEvent.click(submitButton);
    expect(queryByText(MEMO_CONTENT)).toBeInTheDocument();
  });
});

describe('메모 수정 통합 테스트', () => {
  const EDIT_MEMO_BUTTON = '메모 수정';
  const MEMO_KEYWORD = '호우로';
  const OLD_MEMO_CONTENT = '숨을 크게 들이마시고';
  const NEW_MEMO_CONTENT = '숨을 작게 들이마시고';

  it('메모 수정 테스트', async () => {
    const { getByText, getAllByText, getByRole, queryByText, findByText, findByRole } = setup();

    expect(await findByText(NEWS_TITLE)).toBeInTheDocument();
    expect(getByText(OLD_MEMO_CONTENT)).toBeInTheDocument();

    const highlight = getAllByText(MEMO_KEYWORD)[0];
    await userEvent.pointer([{ target: highlight }, { keys: '[MouseRight]', target: highlight }]);
    expect(await findByText(EDIT_MEMO_BUTTON)).toBeInTheDocument();

    const addMemoButton = getByText(EDIT_MEMO_BUTTON);
    await userEvent.click(addMemoButton);
    expect(await findByRole('heading', { name: MEMO_KEYWORD })).toBeInTheDocument();

    const memoTextarea = getByRole('textbox', { name: MEMO_FORM });
    const submitButton = getByRole('button', { name: SUBMIT });

    await userEvent.type(memoTextarea, NEW_MEMO_CONTENT);

    await userEvent.click(submitButton);
    expect(queryByText(NEW_MEMO_CONTENT)).toBeInTheDocument();
  });
});
