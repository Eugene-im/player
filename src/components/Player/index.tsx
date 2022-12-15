import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectActive } from "app/services/audio/audioSelector";
import { back, next } from "app/services/audio/audioSlice";
import useAudioPlayer from "customHooks/useAudioPlayer";
import { Button } from "components/Button";
import { Track } from "components/Track";
import styled from "styled-components";

const StyledContainer = styled.div`
  width: 100%;
  max-width: calc(100vw - 400px);
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  div {
    width: 100%;
    text-align: center;
  }
  img {
    width: 420px;
    height: 420px;
    margin-bottom: 12px;
    box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.12);
    border-radius: 8px;
  }
`;

export const Player = () => {
  const dispatch = useDispatch();

  const active = useSelector(selectActive);
  const { curTime, duration, playing, setPlaying, setClickedTime, loadNew } =
    useAudioPlayer();

  useEffect(() => {
    loadNew();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const handleNext = () => {
    dispatch(next(active?.id));
  };
  const handleBack = () => {
    dispatch(back(active?.id));
  };
  const handleStop = () => {
    setPlaying(!playing);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClickedTime(+e.target.value);
  };
  return (
    <StyledContainer>
      <img src={active?.cover} alt={`${active?.artist} | ${active?.name}`} />
      <div>{`${active?.artist} | ${active?.name}`}</div>
      <div>
        <audio id="audio">
          <source src={active?.audio} />
          Your browser does not support the audio element.
        </audio>
        <div>
          <Track
            duration={duration}
            curTime={curTime}
            handleChange={handleChange}
          />
          <div>
            <Button
              isDisabled={!active?.id}
              handleClick={handleBack}
              text={"⏮"}
            />
            <Button
              isDisabled={!active?.id}
              handleClick={handleStop}
              text={!playing ? "▶️" : "⏹"}
            />
            <Button
              isDisabled={!active?.id}
              handleClick={handleNext}
              text={"⏭"}
            />
          </div>
        </div>
      </div>
    </StyledContainer>
  );
};
