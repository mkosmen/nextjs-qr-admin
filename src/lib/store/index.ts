import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import userReducer from './reducers/usersReducer';

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
    },
  });
};

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
