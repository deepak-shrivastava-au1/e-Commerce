
import { createSlice } from '@reduxjs/toolkit'

const initialState = { value: []}

const filterChipsSlice = createSlice({
  name: 'Filter Chips',
  initialState,
  reducers: {
    FILTER_SELECTED(state, { payload }) {
      state.value = payload
    },
    UPDATE_CHIPS(state, { payload }) {
      state.value = payload
    },
  },
})

// Three actions generated from the slice
export const { FILTER_SELECTED, UPDATE_CHIPS } = filterChipsSlice.actions

// A selector
export const filterChipsSelector = (state: any) => state.filterChips.value

// The reducer
export default filterChipsSlice.reducer