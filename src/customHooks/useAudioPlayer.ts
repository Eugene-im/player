import { useState, useEffect } from "react";

function useAudioPlayer() {
  const [duration, setDuration] = useState<number>(0);
  const [curTime, setCurTime] = useState<number>(0);
  const [playing, setPlaying] = useState(false);
  const [clickedTime, setClickedTime] = useState<null | number>();
  const [audioElement, setAudio] = useState<HTMLAudioElement>();
  useEffect(() => {
    const audio = document.getElementById("audio") as HTMLAudioElement;

    // state setters wrappers
    const setAudioData = () => {
      setDuration(audio?.duration);
      setCurTime(audio?.currentTime);
    };

    const setAudioTime = () => setCurTime(audio.currentTime);

    setAudio(audio);

    // DOM listeners: update React state on DOM events
    audio.addEventListener("loadeddata", setAudioData);

    audio.addEventListener("timeupdate", setAudioTime);

    // React state listeners: update DOM on React state changes
    playing ? audio.play() : audio.pause();

    if (clickedTime && clickedTime !== curTime) {
      audio.currentTime = clickedTime;
      setClickedTime(null);
    }

    // effect cleanup
    return () => {
      audio.removeEventListener("loadeddata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
    };
  });

  return {
    curTime,
    duration,
    playing,
    setPlaying,
    setClickedTime,
    loadNew: () => audioElement?.load(),
  };
}

export default useAudioPlayer;
