import { createSlice } from '@reduxjs/toolkit'
import axios from '@utilities/api/httpService';
import {BASE_URL} from '../../../routers/AppRoute';

export const initialState = {
  loading: false,
  hasErrors: false,
  webUser: [],
}

const getWebUserSlice = createSlice({
  name: 'webUser',
  initialState,
  reducers: {
    getWebUser: state => {
      state.loading = true
    },
    getWebUserSuccess: (state, { payload }) => {
      state.webUser = payload
      state.loading = false
      state.hasErrors = false
    },
    getWebUserFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
  },
})

// Three actions generated from the slice
export const { getWebUser, getWebUserSuccess, getWebUserFailure } = getWebUserSlice.actions

// A selector
export const getWebUserSelector = (state: { webUser: any; }) => state.webUser

// The reducer
export default getWebUserSlice.reducer

// Asynchronous thunk action
export function GetWebUserDetails(sessionId : string) {
  return async (dispatch:any) => {
    try {
      const URL =
        BASE_URL +
        `/GetWebUserDetails`;
       
      const user : any = await axios.get(URL);
      // console.log(localeList?.data)
      dispatch(getWebUserSuccess(user?.data));
    } catch (error) {
      console.log(error)
      dispatch(getWebUserFailure());
    }
  }
}
