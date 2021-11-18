import { createSlice } from '@reduxjs/toolkit'
import axios from '@utilities/api/httpService';
import {BASE_URL} from '../../../routers/AppRoute';

export const initialState = {
  loading: false,
  hasErrors: false,
  statesList: [],
}

const getStateListSlice = createSlice({
  name: 'statesList',
  initialState,
  reducers: {
    getStateList: state => {
      state.loading = true
    },
    getStateListSuccess: (state, { payload }) => {
      state.statesList = payload
      state.loading = false
      state.hasErrors = false
    },
    getStateListFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
  },
})

// Three actions generated from the slice
export const { getStateList, getStateListSuccess, getStateListFailure } = getStateListSlice.actions

// A selector
export const getStateListSelector = (state: { statesList: any; }) => state.statesList

// The reducer
export default getStateListSlice.reducer

// Asynchronous thunk action
export function GetStateList(countryCode : string) {
  return async (dispatch:any) => {
    try {
      const URL =
        BASE_URL +
        `/GetStateList?countryCode=${countryCode}`;
      const states : any = await axios.get(URL);
      console.log("GetStateList--"+ JSON.stringify(states?.data))
      dispatch(getStateListSuccess(states?.data));
    } catch (error) {
      console.log(error)
      dispatch(getStateListFailure());
    }
  }
}
