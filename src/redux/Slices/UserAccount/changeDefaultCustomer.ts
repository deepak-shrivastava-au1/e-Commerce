import { createSlice } from '@reduxjs/toolkit'
import axios from '@utilities/api/httpService';
import {BASE_URL} from '../../../routers/AppRoute';

export const initialState = {
  loading: false,
  hasErrors: false,
  changeCustomer: {},
}

const changeCustomerSlice = createSlice({
  name: 'changeCustomer',
  initialState,
  reducers: {
    changeCustomer: state => {
      state.loading = true
    },
    changeCustomerSuccess: (state, { payload }) => {
      state.changeCustomer = payload
      state.loading = false
      state.hasErrors = false
    },
    changeCustomerFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
  },
})

// Three actions generated from the slice
export const { changeCustomer, changeCustomerSuccess, changeCustomerFailure } = changeCustomerSlice.actions

// A selector
export const changeCustomerSelector = (state: { changeCustomer: any; }) => state.changeCustomer

// The reducer
export default changeCustomerSlice.reducer

// Asynchronous thunk action
export function ChangeDefaultCustomer(customerCode : string, type :string) {
  return async (dispatch:any) => {
    try {
      const params =  `CustomerCode=${customerCode}&Type=${type}`;
      const URL =
        BASE_URL +
        `/ChangeDefaultCustomer?${params}`;
        console.log(URL)
      const response : any = await axios.get(URL);
      console.log(response)
      dispatch(changeCustomerSuccess(response?.data));
    } catch (error) {
      dispatch(changeCustomerFailure());
    }
  }
}
