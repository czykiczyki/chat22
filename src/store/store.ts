import {
  Action,
  AnyAction,
  combineReducers,
  configureStore,
  Reducer,
  ThunkAction,
} from '@reduxjs/toolkit';
import userReducer from './user/userSlice';

import {
  useSelector as rawUseSelector,
  TypedUseSelectorHook,
} from 'react-redux';

const combinedReducer = combineReducers({
  user: userReducer,
});

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === 'user/logout') {
    state = {} as RootState;
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

export type Store = typeof store;
export type RootState = ReturnType<typeof combinedReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
