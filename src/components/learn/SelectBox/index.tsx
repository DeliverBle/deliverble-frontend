import { useEffect, useRef, useState } from 'react';
import ImageDiv from '@src/components/common/ImageDiv';
import { icArrow, icCheckedBox, icEmptyBox } from 'public/assets/icons';
import { StCategoryButton, StSelectBox } from './style';

interface SelectBoxProps {
  optionName: string;
  optionList: string[];
  setConditionList: (condition: string[]) => void;
}

function SelectBox(props: SelectBoxProps) {
  const { optionName, optionList, setConditionList } = props;
  const [isClicked, setIsClicked] = useState(false);
  const [checkedList, setCheckedList] = useState(['전체']);
  const guideModalRef = useRef<HTMLDivElement>(null);

  const handleCheck = (checkedItem: string) => {
    checkedList.includes(checkedItem)
      ? setCheckedList(checkedList.filter((item) => item !== checkedItem))
      : setCheckedList([...checkedList, checkedItem]);

    if (checkedItem === '전체') setCheckedList(['전체']);
  };

  if (!checkedList.length) setCheckedList(['전체']);

  if (checkedList.includes('전체')) {
    if (checkedList.length >= 2 && checkedList.length < optionList.length) {
      setCheckedList(checkedList.filter((item) => item !== '전체'));
    } else if (checkedList.includes('전체') && checkedList.length >= optionList.length) {
      setCheckedList(['전체']);
    }
  }

  useEffect(() => {
    setConditionList(checkedList.includes('전체') || checkedList.length === optionList.length - 1 ? [] : checkedList);
  }, [checkedList, optionList, setConditionList]);

  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      const eventTarget = e.target as HTMLElement;
      if (isClicked && !guideModalRef?.current?.contains(eventTarget)) {
        setIsClicked(false);
      }
    };

    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isClicked]);

  return (
    <StSelectBox ref={guideModalRef} isClicked={isClicked}>
      <span>{optionName}</span>
      <StCategoryButton onClick={() => setIsClicked((prev) => !prev)}>
        <div>{checkedList.join(', ')}</div>
        <ImageDiv src={icArrow} className="arrow" layout="fill" alt="" />
      </StCategoryButton>
      {isClicked && (
        <ul>
          {optionList.map((checkedItem) => {
            return (
              <li key={checkedItem} onClick={() => handleCheck(checkedItem)}>
                <ImageDiv className="checkbox" src={checkedList.includes(checkedItem) ? icCheckedBox : icEmptyBox} />
                {checkedItem}
              </li>
            );
          })}
        </ul>
      )}
    </StSelectBox>
  );
}

export default SelectBox;
