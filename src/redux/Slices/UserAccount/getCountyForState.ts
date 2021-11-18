import { createSlice } from '@reduxjs/toolkit'
import axios from '@utilities/api/httpService';
import {BASE_URL} from '../../../routers/AppRoute';

export const initialState = {
  loading: false,
  hasErrors: false,
  countyList: [],
}

const getCountySlice = createSlice({
  name: 'countyList',
  initialState,
  reducers: {
    getCountyList: state => {
      state.loading = true
    },
    getCountySuccess: (state, { payload }) => {
      state.countyList = payload
      state.loading = false
      state.hasErrors = false
    },
    getCountyFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
  },
})

// Three actions generated from the slice
export const { getCountyList, getCountySuccess, getCountyFailure } = getCountySlice.actions

// A selector
export const getCountySelector = (state: { countyList: any; }) => state.countyList

// The reducer
export default getCountySlice.reducer

// Asynchronous thunk action
export function GetCountyForSelectedStateAndCountry(countryCode : string, stateCode :string) {
  return async (dispatch:any) => {
    try {
      const URL =
        BASE_URL +
        `/GetCountyForSelectedStateAndCountry?CountryCode=${countryCode}&StateCode=${stateCode}`;
      const counties : any = await axios.get(URL);
      console.log("GetCountyForSelectedStateAndCountry"+counties)
      // console.log(countries?.data)
      dispatch(getCountySuccess(counties?.data));
    } catch (error) {
      console.log(error)
      dispatch(getCountyFailure());
    }
  }
}
