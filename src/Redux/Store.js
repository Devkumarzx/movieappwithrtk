import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { MovieApi } from './MovieSlice'

export const store = configureStore({
  reducer: {
    [MovieApi.reducerPath]: MovieApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(MovieApi.middleware),
})

setupListeners(store.dispatch)