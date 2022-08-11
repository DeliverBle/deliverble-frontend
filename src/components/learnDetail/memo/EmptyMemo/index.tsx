import { imgMemoEmpty } from 'public/assets/images';
import ImageDiv from '../../../common/ImageDiv';
import { StEmptyMemo } from './style';

function EmptyMemo() {
  return (
    <StEmptyMemo>
      <ImageDiv src={imgMemoEmpty} className="memo-empty" layout="fill" />
      <p>저장된 메모가 없습니다.</p>
      <p>메모를 추가해보세요!</p>
    </StEmptyMemo>
  );
}

export default EmptyMemo;
