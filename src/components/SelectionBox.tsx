import styled from 'styled-components';

interface SelectionBoxProps {
  categoryName: string;
}

function SelectionBox(props: SelectionBoxProps) {
  const { categoryName } = props;
  return <StSelectionBox>{categoryName}</StSelectionBox>;
}

export default SelectionBox;

const StSelectionBox = styled.div``;
