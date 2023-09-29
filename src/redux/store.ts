import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import { heroAPI } from "./heroAPI/heroApi"

export const store = configureStore({
  reducer: {
    [heroAPI.reducerPath]: heroAPI.reducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(heroAPI.middleware),
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
