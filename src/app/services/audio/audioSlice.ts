import { createSlice } from "@reduxjs/toolkit";
import { LibraryDataItemType } from "app/interfaces/interfaces";

export interface AudioSlice {
  data: LibraryDataItemType[];
}

const defaultAudioData = {
  name: "",
  cover: "",
  artist: "",
  audio: "",
  color: [""],
  id: "",
  active: false,
};

const initialState: AudioSlice = {
  data: [{ ...defaultAudioData }],
};

export const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    next: (state, data) => {
      const index = state.data.findIndex((el) => el.id === data.payload);
      state.data[index].active = false;
      state.data[index + 1].active = true;
    },
    back: (state, data) => {
      const index = state.data.findIndex((el) => el.id === data.payload);
      state.data[index].active = false;
      state.data[index - 1].active = true;
    },
    setData: (state, data) => {
      state.data = [...data.payload];
      if (!state.data.find((el) => el.active)) {
        state.data[0].active = true;
      }
    },
    setActive: (state, data) => {
      const index = state.data.findIndex((el) => el.id === data.payload);
      state.data.forEach((el) => (el.active = false));
      state.data[index].active = true;
    },
  },
  extraReducers: (builder) => {},
});

export const { next, back, setData, setActive } = audioSlice.actions;

export default audioSlice.reducer;
