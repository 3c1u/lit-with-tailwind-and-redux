import { configureStore } from '@reduxjs/toolkit'
import { createAppSelector } from '~/helpers/redux'
import counterReducer from '~/store/counter'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const selector = createAppSelector(store)
export const dispatch = store.dispatch
