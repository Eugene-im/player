import { RootState } from "app/store";

export const selectData = (state: RootState) => state.audio.data;
export const selectActive = (state: RootState) => state.audio.data.find(el=>el.active);