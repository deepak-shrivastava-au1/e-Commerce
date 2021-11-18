import { createSlice } from "@reduxjs/toolkit";
import axios from '@utilities/api/httpService';
import {BASE_URL} from '../../../../routers/AppRoute'

export const initialState = {
  loading: true,
  hasErrors: false,
  orders: [],
  searchFilterslist: [],
  searchFilterSettings :[],
  searchFilters: {},
  isFilterApply: false
};

const orderhistorySlice = createSlice({
  name: "orderhistory",
  initialState,
  reducers: {
    getorderhistorySuccess: (state, { payload }) => {
      state.orders = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getorderhistoryFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
    getorderFilterSuccess: (state, { payload }) => {
      state.searchFilterslist = payload.filterJsonData;
      state.searchFilterSettings = payload.filterSettingJsonData;
      state.loading = false;
      state.hasErrors = false;
    },
    updateSearchFilter:(state, { payload }) => {
     const { customerSearch, handlerSearch, statusSearch, salesPersonSearch,orderInputSearch } =
      payload;
      state.searchFilters = {
        Customer: customerSearch,
        Handler: handlerSearch,
        Status: statusSearch,
        Salesperson: salesPersonSearch,
        OrderTextSearch:orderInputSearch
      };
      state.isFilterApply = true;
    },
    clearSearchFilter:(state) => {
        state.searchFilters = {};
        state.isFilterApply = false;
     },
     intitalizeLoader: (state) => {
      state.loading = true;
    },
  },
});

// Three actions generated from the slice
export const orderhistoryactions = orderhistorySlice.actions;

// A selector
export const orderSelector = (state: any) => state;

// The reducer
export default orderhistorySlice.reducer;

// Asynchronous thunk action
export function fetchorderhistory(
  sessionId: any,
  orderBy: any,
  sortColumn: any,
  pageNumber? : number,
  isSearch: boolean = false,
  Customer?: any,
  Status?: any,
  Handler?: any,
  Salesperson?: any,
  OrderTextSearch? : any
 
) {
 return async (dispatch: any) => {
    try {
      
      let URL =  BASE_URL + `/GetSalesOrderHistory?OrderBy=${orderBy}&sortColumn=${sortColumn}&PageNo=${pageNumber}&sessionId=` +
      `${sessionId}`;
      if(isSearch && Customer != ''){
        URL = BASE_URL +
        `/GetSalesOrderHistory?Customer=${Customer}&Status=${Status}&Handler=${Handler}&Salesperson=${Salesperson}&OrderSearchText=${OrderTextSearch}&OrderBy=${orderBy}&sortColumn=${sortColumn}&PageNo=${pageNumber}&sessionId=` +
        `${sessionId}`
      }else if (isSearch && Customer == ''){
        URL =  BASE_URL +`/GetSalesOrderHistory?Status=${Status}&Handler=${Handler}&Salesperson=${Salesperson}&OrderSearchText=${OrderTextSearch}&OrderBy=${orderBy}&sortColumn=${sortColumn}&PageNo=${pageNumber}&sessionId=` +
        `${sessionId}`
      }

      

      const historyData: any = await axios.get(URL);
      dispatch(orderhistoryactions.getorderhistorySuccess(historyData?.data));
    } catch (error) {
      dispatch(orderhistoryactions.getorderhistoryFailure());
    }
  };
}

export function orderFilterDetails(sessionId: any) {
  return async (dispatch: any) => {
     try {
       
       const URLsettings = BASE_URL + `/GetSalesOrderFilters`;
       const URL = BASE_URL + `/GetFilterDetails`;
       const response: any = await axios.get(URL);
       if (response.status == "200") {
         var filterJsonData = response?.data;
         const settingresponse: any = await axios.get(URLsettings);
         var filterSettingJsonData = settingresponse.data;
         dispatch(orderhistoryactions.getorderFilterSuccess({filterJsonData,filterSettingJsonData}));
       }
       
     } catch (error) {
       // dispatch(orderhistoryactions.getorderhistoryFailure());
     }
   };
 }

