import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  createMigrate,
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
// import { combineReducers } from "redux";
console.log(storage);
import userDataReducer from "./slices/userDataSlice";
import { thunk } from "redux-thunk";

const reducers = combineReducers({
  userData: userDataReducer,
});
console.log(reducers);
const migrations = {
  0: (state) => {
    // migration clear out device state
    return {
      ...state,
      device: undefined,
    };
  },
  1: (state) => {
    // migration to keep only device state
    return {
      device: state.device,
    };
  },
};

const persistConfig = {
  key: "root",
  storage,
  // blacklist: ["userData"],
  migrate: createMigrate(migrations, { debug: false }),
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
// export const store = configureStore({
//   reducer: {
//     userData: userDataReducer,
//   },
// });
