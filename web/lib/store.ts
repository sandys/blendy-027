import { configureStore, Middleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
// import settingsReducer from './features/settings/settingsSlice'; 

// Placeholder middleware
const serverLogger: Middleware = (store) => (next) => (action) => {
  // Fire and forget log to server if needed
  return next(action);
};

export const makeStore = () => {
  const isDev = process.env.NODE_ENV !== 'production';

  return configureStore({
    reducer: {
        // Dummy reducer to satisfy Redux requirement until real slices are added
        _app: (state = {}) => state,
    },
    middleware: (getDefaultMiddleware) => {
      const middleware = getDefaultMiddleware();
      const mw = middleware.concat(serverLogger);

      if (isDev) {
        const logger = createLogger({
          collapsed: true,
          duration: true,
          timestamp: true,
        });
        return mw.concat(logger);
      }
      return mw;
    },
    devTools: true,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
