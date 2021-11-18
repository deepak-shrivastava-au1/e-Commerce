import { createSlice } from '@reduxjs/toolkit';
import axios from '@utilities/api/httpService';
import { BASE_URL } from '../../../routers/AppRoute'

export const initialState = {
  loading: false,
  hasErrors: false,
  messageCode:null,
  data: null,
};

// A slice for products with our three reducers
const salesOrderDetails = createSlice({
  name: 'salesOrderDetails',
  initialState,
  reducers: {
    getSalesOrderDetailsSuccess: (state, { payload }) => {
      
      if (typeof payload?.messageCode==='number') {
        state.messageCode=payload?.messageCode;
        state.loading = false;
        state.hasErrors = true;
        return;
      }
      state.data = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    setSalesOrderDetailsErrors:(state,{ payload })=>{
      state.hasErrors=payload;
    },
    initializeSalesOrderDetailsLoader: (state) => {
      state.loading = true;
    },
    getSalesOrderDetailsFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    }
  },
});

// Three actions generated from the slice
export const { getSalesOrderDetailsFailure, getSalesOrderDetailsSuccess, setSalesOrderDetailsErrors, initializeSalesOrderDetailsLoader } = salesOrderDetails.actions;

// A selector
export const salesOrderDetailsSelector = (state: any) => state?.salesOrderDetails;

// The reducer
export default salesOrderDetails.reducer;


export function fetchGetSalesOrderDetails(sessionId:any,OrderNumber:any){
  return async (dispatch: any) => {

    try {

      const URL = BASE_URL +`/GetSalesOrderDetails`

      const tempData: any = await axios({
        method: "GET",
        url: URL,
        params:{
          OrderNumber
        },
        });

      dispatch(getSalesOrderDetailsSuccess(tempData?.data));
    } catch (error) {
      dispatch(getSalesOrderDetailsFailure());
    }
  };
}