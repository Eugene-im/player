import { FC } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import styled from "styled-components";

dayjs.extend(duration);

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

type TrackPropTypes = {
  duration: number;
  curTime: number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Track: FC<TrackPropTypes> = ({
  duration,
  curTime,
  handleChange,
}) => {
  return (
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
  );
};
