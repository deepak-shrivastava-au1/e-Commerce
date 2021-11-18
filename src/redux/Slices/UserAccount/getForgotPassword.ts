import { createSlice } from '@reduxjs/toolkit'
import axios from '@utilities/api/httpService';
import {BASE_URL} from '../../../routers/AppRoute';

export const initialState = {
  loading: false,
  hasErrors: false,
  forgotPassword: {},
}

const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {
    forgotPassword: state => {
      state.loading = true
    },
    forgotPasswordSuccess: (state, { payload }) => {
      state.forgotPassword = payload
      state.loading = false
      state.hasErrors = false
    },
    forgotPasswordFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
  },
})

// Three actions generated from the slice
export const { forgotPassword, forgotPasswordSuccess, forgotPasswordFailure } = forgotPasswordSlice.actions

// A selector
export const forgotPasswordSelector = (state: { forgotPassword: any; }) => state.forgotPassword

// The reducer
export default forgotPasswordSlice.reducer

// Asynchronous thunk action
export function GetForgotPassword(userId : string, emailId :string) {
  return async (dispatch:any) => {
    try {
      const params = userId ? `UserID=${userId}` : `Email=${emailId}`;
      const URL =
        BASE_URL +
        `/GetForgotPassword?${params}`;
        console.log(URL)
      const response : any = await axios.get(URL);
      console.log(response)
      dispatch(forgotPasswordSuccess(response?.data));
    } catch (error) {
      dispatch(forgotPasswordFailure());
    }
  }
}
