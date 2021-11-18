import { createSlice } from '@reduxjs/toolkit'
import axios from '@utilities/api/httpService';
import {BASE_URL} from '../../../routers/AppRoute';

export const initialState = {
  loading: false,
  hasErrors: false,
  validCustomer: {},
}

const validateCustomerNewAccountSlice = createSlice({
  name: 'validCustomer',
  initialState,
  reducers: {
    validateCustomerNewAccount: state => {
      state.loading = true
    },
    validateCustomerNewAccountSuccess: (state, { payload }) => {
      state.validCustomer = payload
      state.loading = false
      state.hasErrors = false
    },
    validateCustomerNewAccountFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
  },
})

// Three actions generated from the slice
export const { validateCustomerNewAccount, validateCustomerNewAccountSuccess, validateCustomerNewAccountFailure } = validateCustomerNewAccountSlice.actions

// A selector
export const validateCustomerNewAccountSelector = (state: { validCustomer: any; }) => state.validCustomer

// The reducer
export default validateCustomerNewAccountSlice.reducer

// Asynchronous thunk action
export function ValidateCustomerNewAccount(customerCode : string) {
  return async (dispatch:any) => {
    try {
      const URL =
        BASE_URL +
        `/ValidateCustomerNewAccount?CustomerCode=${customerCode}`;
      const customer : any = await axios.get(URL);
      // console.log(customer)
      dispatch(validateCustomerNewAccountSuccess(customer.data));
    } catch (error) {
      dispatch(validateCustomerNewAccountFailure());
    }
  }
}
