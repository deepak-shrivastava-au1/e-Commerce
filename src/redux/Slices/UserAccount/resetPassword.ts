import { createSlice } from '@reduxjs/toolkit'
import axios from '@utilities/api/httpService';
import qs from 'qs';
import {BASE_URL} from '../../../routers/AppRoute';

export const initialState = {
  loading: false,
  hasErrors: false,
  resetpassword: {},
}

const resetPasswordSlice = createSlice({
  name: 'resetpassword',
  initialState,
  reducers: {
    resetPassword: state => {
      state.loading = true
    },
    resetPasswordSuccess: (state, { payload }) => {
      state.resetpassword = payload
      state.loading = false
      state.hasErrors = false
    },
    resetPasswordFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
  },
})

// Three actions generated from the slice
export const { resetPassword, resetPasswordSuccess, resetPasswordFailure } = resetPasswordSlice.actions

// A selector
export const resetPasswordSelector = (state: { resetpassword: any; }) => state.resetpassword

// The reducer
export default resetPasswordSlice.reducer

// Asynchronous thunk action
export function ResetPassword(newPassword : string, confirmPassword :string, tokenId : string) {
  return async (dispatch:any) => {
    try {
      const url = BASE_URL+'/ResetPassword';
     await axios({
        method: 'POST',
        url: url,
        data: qs.stringify({
          resetPasswordData: `[{"newPassword":"${newPassword}","confirmPassword":"${confirmPassword}","tokenId":"${tokenId}"}]`,
        })
        
      }).then((result) => {
            dispatch(resetPasswordSuccess(result?.data));
          })
          .catch((err) => {
            dispatch(resetPasswordFailure());
            console.log(err)
          });
      
    } catch (error) {
      dispatch(resetPasswordFailure());
    }
  }
}
