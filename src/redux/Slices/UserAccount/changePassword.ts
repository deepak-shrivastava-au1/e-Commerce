import { createSlice } from '@reduxjs/toolkit';
import axios from '@utilities/api/httpService';
import qs from 'qs';
import {BASE_URL} from '../../../routers/AppRoute'


export const initialState = {
  loading: true,
  hasErrors: false,
  changePassword: {},
};

// A slice for products with our three reducers
const changeUserPassword = createSlice({
  name: 'changePassword',
  initialState,
  reducers: {
    changePasswordSuccess: (state, { payload }) => {
      state.changePassword = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    changePasswordFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

// Three actions generated from the slice
export const { changePasswordSuccess, changePasswordFailure } = changeUserPassword.actions;

// A selector
export const changePasswordSelector = (state: {changePassword :any}) => state?.changePassword;

// The reducer
export default changeUserPassword.reducer;

// Asynchronous thunk action
export function ChangeUserPassword(oldPass: string , newPass: string ,confirmPass: string, userId? :string) {
  return async (dispatch: any) => {
    try {
      const url = BASE_URL+'/ChangeUserPassword';
     await axios({
        method: 'POST',
        url: url,
        data: qs.stringify({
          ChangePasswordData: `[{"oldPassword":"${oldPass}",
                               "newPassword" : "${newPass}", "confirmPassword" : "${confirmPass}", "userID" : "${userId}"}]`,
        })        
      }).then((result) => {
            dispatch(changePasswordSuccess(result?.data));
          })
          .catch((err) => {
            // Do somthing
            dispatch(changePasswordFailure());
            console.log(err)
          });
      
    } catch (error) {
      dispatch(changePasswordFailure());
    }
  };
}

