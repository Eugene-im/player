import { Library } from "components/Library";
import chillHop from "components/AudioData";
import { Player } from "components/Player";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "app/services/audio/audioSlice";
import { selectActive } from "app/services/audio/audioSelector";
import styled from "styled-components";

const StyledApp = styled.div`
  display: flex;
  align-items: space-between;
  min-height: 100vh;
  background: linear-gradient(78.83deg, #83c6f9 12.23%, #2196f3 89.93%);
`;

const data = chillHop();

export const App = () => {
  const dispatch = useDispatch();
  const active = useSelector(selectActive);
  useEffect(() => {
    dispatch(setData(data));
  }, []);
  return (
    <StyledApp>
      <Library />
      {active ? <Player /> : "loading"}
    </StyledApp>
  );
};
