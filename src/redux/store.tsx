import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tasks from "./slices/tasksSlice";
import modal from "./slices/modalSlice";
const rootReducer = combineReducers({
  tasks,
  modal,
});
export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;