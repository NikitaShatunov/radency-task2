import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tasks from "./slices/tasksSlice";
const rootReducer = combineReducers({
  tasks,
});
export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;