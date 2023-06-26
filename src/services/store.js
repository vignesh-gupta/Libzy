import { configureStore } from '@reduxjs/toolkit'
import { libServices } from './libServices'

export default configureStore({
  reducer: {
    [libServices.reducerPath]: libServices.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(libServices.middleware),
})
