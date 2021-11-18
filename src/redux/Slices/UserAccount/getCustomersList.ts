import { createSlice } from '@reduxjs/toolkit'
import axios from '@utilities/api/httpService';
import {BASE_URL} from '../../../routers/AppRoute';

export const initialState = {
  loading: false,
  hasErrors: false,
  customersList: [],
}

// A slice for recipes with our three reducers
const customerListSlice = createSlice({
  name: 'customerList',
  initialState,
  reducers: {
    getCutomersList: state => {
      state.loading = true
    },
    getCutomersListSuccess: (state, { payload }) => {
      state.customersList = payload
      state.loading = false
      state.hasErrors = false
    },
    getCutomersListFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
  },
})

// Three actions generated from the slice
export const { getCutomersList, getCutomersListSuccess, getCutomersListFailure } = customerListSlice.actions

// A selector
export const getcustomerListSelector = (state: { customersList: any; }) => state.customersList

// The reducer
export default customerListSlice.reducer

// Asynchronous thunk action
export function fetchCustomerList(orderby? : string , sorby? : string , searchText? : string) {
  return async (dispatch:any) => {
    dispatch(getCutomersList())
    try {
      var params ='';  
      if(searchText){
        params =`CustomerSearchText=${searchText}&OrderBy=${orderby? orderby: "ASC"}&SortBy=${sorby ? sorby : "CustomerCode"}`;
      }else{
        params =`OrderBy=${orderby? orderby: "ASC"}&SortBy=${sorby ? sorby : "CustomerCode"}`;
      }
      const URL =
        BASE_URL +
        `/GetCustomersList?${params}&PageNo=1`;
      const customers : any = await axios.get(URL);
      // console.log(customers?.data?.customerList)
      dispatch(getCutomersListSuccess(customers?.data?.customerList));
    } catch (error) {
      dispatch(getCutomersListFailure());
    }
  }
}
