
import { createSlice } from '@reduxjs/toolkit'
import axios from '@utilities/api/httpService';
import {BASE_URL} from '../../routers/AppRoute'


export const initialState = {
  loading: false,
  hasErrors: false,
  GetFilterDetailsData: [],
}

// A slice for recipes with our three reducers
const GetFilterDetailsSlice = createSlice({
  name: 'GetFilterDetails',
  initialState,
  reducers: {
    GetFilterDetails: state => {
      state.loading = true
    },
    GetFilterDetailsSuccess: (state, { payload }) => {
      state.GetFilterDetailsData = payload
      state.loading = false
      state.hasErrors = false
    },
    GetFilterDetailsFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
  },
})

// Three actions generated from the slice
export const { GetFilterDetails, GetFilterDetailsSuccess, GetFilterDetailsFailure } = GetFilterDetailsSlice.actions

// A selector
export const GetFilterDetailsSelector = (state:any) => state.getFilterDetails.GetFilterDetailsData

// The reducer
export default GetFilterDetailsSlice.reducer

// Asynchronous thunk action
export function fetchFilterDetails(sessionId?:any) {
  
  return async (dispatch:any) => {
    dispatch(GetFilterDetails())
    try {
      const URL =
        BASE_URL +
        `/GetFilterDetails`;
      const response : any = await axios.get(URL);
      console.log("currency2",response)
    //   var jsonData = JSON.parse(response.data)
    //   console.log("curr",jsonData)
      dispatch(GetFilterDetailsSuccess(response.data));
    } catch (error) {
      dispatch(GetFilterDetailsFailure());
    }
  }
}