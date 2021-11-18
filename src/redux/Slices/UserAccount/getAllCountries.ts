import { createSlice } from '@reduxjs/toolkit'
import axios from '@utilities/api/httpService';
import {BASE_URL} from '../../../routers/AppRoute';

export const initialState = {
  loading: false,
  hasErrors: false,
  countriesList: [],
}

const getAllCountriesSlice = createSlice({
  name: 'countriesList',
  initialState,
  reducers: {
    getAllCountriesList: state => {
      state.loading = true
    },
    getAllCountriesSuccess: (state, { payload }) => {
      state.countriesList = payload
      state.loading = false
      state.hasErrors = false
    },
    getAllCountriesFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
  },
})

// Three actions generated from the slice
export const { getAllCountriesList, getAllCountriesSuccess, getAllCountriesFailure } = getAllCountriesSlice.actions

// A selector
export const getAllCountriesSelector = (state: { countriesList: any; }) => state.countriesList

// The reducer
export default getAllCountriesSlice.reducer

// Asynchronous thunk action
export function GetAllCountries() {
  console.log("GetAllCountries")
  return async (dispatch:any) => {
    try {
      const URL =
        BASE_URL +
        `/GetAllCountries`;
      const countries : any = await axios.get(URL);
      // console.log(countries?.data)
      dispatch(getAllCountriesSuccess(countries?.data));
    } catch (error) {
      console.log(error)
      dispatch(getAllCountriesFailure());
    }
  }
}
