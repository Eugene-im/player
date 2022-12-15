import { FC } from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background: none;
  border: none;
  outline: none;
  font-size: 24px;
  line-height: 24px;
  color: #fff;
  margin: 0 12px;
`;
type ButtonPropType = {
  isDisabled: boolean;
  text: string;
  handleClick: () => void;
};
export const Button: FC<ButtonPropType> = ({
  isDisabled,
  text,
  handleClick,
}) => {
  return (
    <StyledButton disabled={isDisabled} onClick={handleClick}>
      {text}
    </StyledButton>
  );
};
