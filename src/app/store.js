import { configureStore } from '@reduxjs/toolkit';
import bookReducer from '../features/books/bookSlice.js';
import memberReducer from '../features/members/memberSlice.js';

export const store = configureStore({
  reducer: {
    book: bookReducer,
    member: memberReducer,
  }
});
