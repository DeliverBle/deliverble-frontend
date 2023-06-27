import { EDIT_MEMO_MODAL_TEXT, NEW_MEMO_MODAL_TEXT } from '@src/constants/learnDetail/modal';
import LearnDetail from '@src/pages/learn/[id]';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
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
  const { getByText, getAllByText, getByRole, queryByText, queryByRole, findByText, findByRole } = render(
    <LearnDetail />,
    {
      wrapper: createWrapper(),
    },
  );

  return { getByText, getAllByText, getByRole, queryByText, queryByRole, findByText, findByRole };
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

  const setup = async () => {
    render(<LearnDetail />, { wrapper: createWrapper() });

    expect(await screen.findByText(NEWS_TITLE)).toBeInTheDocument();

    const highlight = screen.getByText(MEMO_KEYWORD);
    await userEvent.pointer([{ target: highlight }, { keys: '[MouseRight]', target: highlight }]);
    expect(await screen.findByText(ADD_MEMO_BUTTON)).toBeInTheDocument();

    await userEvent.click(screen.getByText(ADD_MEMO_BUTTON));
    expect(await screen.findByRole('heading', { name: MEMO_KEYWORD })).toBeInTheDocument();

    const memoTextarea = screen.getByRole('textbox', { name: MEMO_FORM });
    const submitButton = screen.getByRole('button', { name: SUBMIT });
    const cancelButton = screen.getByRole('button', { name: CANCEL });

    expect(submitButton).toBeDisabled();
    await userEvent.type(memoTextarea, MEMO_CONTENT);
    expect(submitButton).toBeEnabled();

    return { submitButton, cancelButton };
  };

  it('메모 입력 후 완료 버튼 클릭하여 메모 저장', async () => {
    const { submitButton } = await setup();

    await userEvent.click(submitButton);
    expect(screen.queryByRole('textbox', { name: MEMO_FORM })).toBeNull();
    expect(screen.queryByText(MEMO_CONTENT)).toBeInTheDocument();
  });

  it('메모 입력 후 외부 클릭하여 메모 저장', async () => {
    await setup();

    await userEvent.click(document.body);
    expect(screen.queryByRole('textbox', { name: MEMO_FORM })).toBeNull();
    expect(screen.queryByText(MEMO_CONTENT)).toBeInTheDocument();
  });

  it('메모 작성 취소 버튼 클릭하면 뜨는 확인 모달에서 작성 취소 클릭', async () => {
    const { cancelButton } = await setup();

    await userEvent.click(cancelButton);
    expect(await screen.findByText(NEW_MEMO_MODAL_TEXT.mainText)).toBeInTheDocument();

    const cancelCreateButton = screen.getByRole('button', { name: NEW_MEMO_MODAL_TEXT.rightButtonText });
    await userEvent.click(cancelCreateButton);
    expect(screen.queryByRole('textbox', { name: MEMO_FORM })).toBeNull();
    expect(screen.queryByText(MEMO_CONTENT)).toBeNull();
  });
});

describe('메모 수정 통합 테스트', () => {
  const EDIT_MEMO_BUTTON = '메모 수정';
  const MEMO_KEYWORD = '호우로';
  const OLD_MEMO_CONTENT = '숨을 크게 들이마시고';
  const NEW_MEMO_CONTENT = '숨을 작게 들이마시고';

  const setup = async () => {
    render(<LearnDetail />, { wrapper: createWrapper() });

    expect(await screen.findByText(NEWS_TITLE)).toBeInTheDocument();
    expect(screen.getByText(OLD_MEMO_CONTENT)).toBeInTheDocument();

    const highlight = screen.getAllByText(MEMO_KEYWORD)[0];
    await userEvent.pointer([{ target: highlight }, { keys: '[MouseRight]', target: highlight }]);
    expect(await screen.findByText(EDIT_MEMO_BUTTON)).toBeInTheDocument();

    const addMemoButton = screen.getByText(EDIT_MEMO_BUTTON);
    await userEvent.click(addMemoButton);
    expect(await screen.findByRole('heading', { name: MEMO_KEYWORD })).toBeInTheDocument();

    const memoTextarea = screen.getByRole('textbox', { name: MEMO_FORM });
    const submitButton = screen.getByRole('button', { name: SUBMIT });
    const cancelButton = screen.getByRole('button', { name: CANCEL });

    await userEvent.type(memoTextarea, NEW_MEMO_CONTENT);

    return { submitButton, cancelButton };
  };

  it('메모 수정 후 작성 완료 버튼 클릭하여 메모 저장', async () => {
    const { submitButton } = await setup();

    await userEvent.click(submitButton);
    expect(screen.queryByText(NEW_MEMO_CONTENT)).toBeInTheDocument();
  });

  it('메모 수정 후 외부 클릭하여 메모 저장', async () => {
    await setup();

    await userEvent.click(document.body);
    expect(screen.queryByText(NEW_MEMO_CONTENT)).toBeInTheDocument();
  });

  it('메모 수정 후 취소 버튼 클릭하면 열리는 확인 모달에서 수정 취소 클릭', async () => {
    const { cancelButton } = await setup();

    await userEvent.click(cancelButton);
    expect(await screen.findByText(EDIT_MEMO_MODAL_TEXT.mainText)).toBeInTheDocument();

    const cancelEditButton = screen.getByRole('button', { name: EDIT_MEMO_MODAL_TEXT.rightButtonText });
    await userEvent.click(cancelEditButton);
    expect(screen.queryByRole('textbox', { name: MEMO_FORM })).toBeNull();
    expect(screen.queryByText(NEW_MEMO_CONTENT)).toBeNull();
  });
});
