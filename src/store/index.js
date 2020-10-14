import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducer from "./slices/rootReducer";
import apiActionMiddleware from "./middlewares/apiAction";

// persist
const persistConfig = {
  key: "pizzaApp",
  version: 1,
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

// create store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = [
      apiActionMiddleware,
      ...getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    ];

    return middlewares;
  },
});

export const persistor = persistStore(store);

export default store;
