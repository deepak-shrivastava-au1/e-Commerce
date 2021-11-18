import { createSlice } from '@reduxjs/toolkit'
import axios from '@utilities/api/httpService';
import {BASE_URL} from '../../../routers/AppRoute';

export const initialState = {
  loading: false,
  hasErrors: false,
  editUser: {},
}

const editUserDetailsSlice = createSlice({
  name: 'editUser',
  initialState,
  reducers: {
   editUser: state => {
      state.loading = true
    },
   editUserSuccess: (state, { payload }) => {
      state.editUser = payload
      state.loading = false
      state.hasErrors = false
    },
   editUserFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
  },
})

// Three actions generated from the slice
export const {editUser,editUserSuccess,editUserFailure } =editUserDetailsSlice.actions

// A selector
export const editUserSelector = (state: { editUser: any; }) => state.editUser

// The reducer
export default editUserDetailsSlice.reducer

// Asynchronous thunk action
export function EditUserDetails(userName : string,email:string, locale :string) {
  return async (dispatch:any) => {
    try {
      const URL =
        BASE_URL +
        `/EditUserDetails?UserName=${userName}&Emailid${email}&Locale=${locale}`;
      const response : any = await axios.get(URL);
      dispatch(editUserSuccess(response?.data));
    } catch (error) {
      dispatch(editUserFailure());
    }
  }
}
