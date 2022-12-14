import { setActive } from "app/services/audio/audioSlice";
import { FC } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
type StyledContainerProps = {
  active: boolean;
};
const StyledContainer = styled.div<StyledContainerProps>`
  display: flex;
  margin-bottom: 8px;
  padding: 8px;
  background: ${(props) => (props?.active ? "#F8F8F8" : "none")};
  opacity: ${(props) => (props?.active ? "1" : "0.7")};
  box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  overflow: hidden;
  img {
    width: 62px;
    height: 62px;
    margin-right: 12px;
    border-radius: 4px;
  }
`;

type LibraryItemProps = {
  name: string;
  cover: string;
  artist: string;
  active: boolean;
  id: string;
};
export const LibraryItem: FC<LibraryItemProps> = ({
  name,
  cover,
  artist,
  active,
  id,
}: LibraryItemProps) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setActive(id));
  };
  return (
    <StyledContainer active={active} onClick={handleClick}>
      <img className="cover" src={cover} alt={name} />
      <div>
        <div className="name">{name}</div>
        <div className="artist">{artist}</div>
      </div>
    </StyledContainer>
  );
};
