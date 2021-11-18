import { createSlice } from '@reduxjs/toolkit'
import axios from '@utilities/api/httpService';
import {BASE_URL} from '../../routers/AppRoute'


export const initialState = {
  loading: false,
  hasErrors: false,
  getAllMenuData: [],
}

// A slice for recipes with our three reducers
const getAllMenuDataSlice = createSlice({
  name: 'getAllMenuData',
  initialState,
  reducers: {
    getAllMenuData: state => {
      state.loading = true
    },
    getAllMenuDataSuccess: (state, { payload }) => {
      state.getAllMenuData = payload
      state.loading = false
      state.hasErrors = false
    },
    getAllMenuDataFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
  },
})

// Three actions generated from the slice
export const { getAllMenuData, getAllMenuDataSuccess, getAllMenuDataFailure } = getAllMenuDataSlice.actions

// A selector
export const getAllMenuDataSelector = (state: { getAllMenuData: any; }) => state.getAllMenuData

// The reducer
export default getAllMenuDataSlice.reducer

// Asynchronous thunk action
export function fetchgetAllMenuData() {
  return async (dispatch:any) => {
    dispatch(getAllMenuData())
    try {
      const URL =
        BASE_URL +
        `/GetAllMenu`;
      const response : any = await axios.get(URL);
      var jsonData = JSON.parse(response.data);
      console.log(jsonData)
      dispatch(getAllMenuDataSuccess(jsonData[0].subMenu));
    } catch (error) {
      dispatch(getAllMenuDataFailure());
    }
  }
}