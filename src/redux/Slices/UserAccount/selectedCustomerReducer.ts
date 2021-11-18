import { createSlice } from '@reduxjs/toolkit'

const initialState = { customer: {}}

const selectedCustomerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    SELECTED_CUSTOMER(state, { payload }) {
      state.customer = payload
    },
  },
})

// Three actions generated from the slice
export const {SELECTED_CUSTOMER } = selectedCustomerSlice.actions

// A selector
export const selectedCustomerSelector = (state: any) => state

// The reducer
export default selectedCustomerSlice.reducer