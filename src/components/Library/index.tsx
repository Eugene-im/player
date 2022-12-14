import { selectData } from "app/services/audio/audioSelector";
import { LibraryItem } from "components/LibraryItem";
import { useSelector } from "react-redux";
import styled from "styled-components";

const StyledContainer = styled.div`
  padding: 8px;
  width: 300px;
`;

const StyledTitle = styled.div`
  text-align: center;
  margin-bottom: 12px;
  font-weight:500;
`;

export const Library = () => {
  const data = useSelector(selectData);
  return (
    <StyledContainer>
      <StyledTitle>Library</StyledTitle>
      {data.map((el) => (
        <LibraryItem key={el.id} {...el} />
      ))}
    </StyledContainer>
  );
};
