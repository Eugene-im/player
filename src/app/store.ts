import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import audioSlice from './services/audio/audioSlice';

export const store = configureStore({
  reducer: {
    audio: audioSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
