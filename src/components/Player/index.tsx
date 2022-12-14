import { selectActive } from "app/services/audio/audioSelector";
import { back, next } from "app/services/audio/audioSlice";
import useAudioPlayer from "customHooks/useAudioPlayer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import styled from "styled-components";

dayjs.extend(duration);

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

const StyledButton = styled.button`
  background: none;
  border: none;
  outline: none;
  font-size: 24px;
  line-height: 24px;
  color: #fff;
  margin: 0 12px;
`;

const StyledBar = styled.div`
  width: 100%;
  padding: 12px;
  margin: 12px auto;
  input {
    width: 100%;
    max-width: calc(100% - 200px);
    margin: 0 12px;
  }
`;

export const Player = () => {
  const dispatch = useDispatch();

  const active = useSelector(selectActive);
  const { curTime, duration, playing, setPlaying, setClickedTime, loadNew } =
    useAudioPlayer();

  useEffect(() => {
    loadNew();
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
      <div className="name">{`${active?.artist} | ${active?.name}`}</div>
      <div className="player">
        <div className="track">
          <audio id="audio">
            <source src={active?.audio} />
            Your browser does not support the audio element.
          </audio>
        </div>
        <div className="navigation">
          <StyledBar>
            {dayjs.duration(curTime, "seconds").format("mm:ss")}
            <input
              type="range"
              max={duration}
              value={curTime}
              onChange={handleChange}
            />
            {dayjs.duration(duration, "seconds").format("mm:ss")}
          </StyledBar>
          <div>
            <StyledButton
              className="prev"
              disabled={!active?.id}
              onClick={handleBack}
            >
              ⏮
            </StyledButton>
            <StyledButton
              className="stop"
              disabled={!active?.id}
              onClick={handleStop}
            >
              {!playing ? "▶️" : "⏹"}
            </StyledButton>
            <StyledButton
              className="next"
              disabled={!active?.id}
              onClick={handleNext}
            >
              ⏭
            </StyledButton>
          </div>
        </div>
      </div>
    </StyledContainer>
  );
};
