import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { launchesAPI } from '../services/launches-api';
import launchesReducer from './reducer/launches-slice';
import { createAPI } from '../services/axios';

const rootReducer = combineReducers({
  launchesReducer,
  [launchesAPI.reducerPath]: launchesAPI.reducer
})

const api = createAPI();

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: { extraArgument: api, }, }).concat(launchesAPI.middleware)
  })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
