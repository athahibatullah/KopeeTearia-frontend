import { configureStore } from '@reduxjs/toolkit'
import reduxReducer from './DataSlice'
export default configureStore({
  reducer: {
    redux: reduxReducer
  }
})