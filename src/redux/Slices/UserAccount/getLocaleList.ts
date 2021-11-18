import { createSlice } from '@reduxjs/toolkit'
import axios from '@utilities/api/httpService';
import {BASE_URL} from '../../../routers/AppRoute';

export const initialState = {
  loading: false,
  hasErrors: false,
  localeList: [],
}

const getLocaleListSlice = createSlice({
  name: 'localeList',
  initialState,
  reducers: {
    getLocaleList: state => {
      state.loading = true
    },
    getLocaleListSuccess: (state, { payload }) => {
      state.localeList = payload
      state.loading = false
      state.hasErrors = false
    },
    getLocaleListFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
  },
})

// Three actions generated from the slice
export const { getLocaleList, getLocaleListSuccess, getLocaleListFailure } = getLocaleListSlice.actions

// A selector
export const getLocaleListSelector = (state: { localeList: any; }) => state.localeList

// The reducer
export default getLocaleListSlice.reducer

// Asynchronous thunk action
export function GetLocaleList() {
  return async (dispatch:any) => {
    try {
      const URL =
        BASE_URL +
        `/GetLocaleList`;
      const localeList : any = await axios.get(URL);
      // console.log(localeList?.data)
      dispatch(getLocaleListSuccess(localeList?.data));
    } catch (error) {
      console.log(error)
      dispatch(getLocaleListFailure());
    }
  }
}
