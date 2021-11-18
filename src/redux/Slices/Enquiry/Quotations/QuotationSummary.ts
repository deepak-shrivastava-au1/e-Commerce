import { createSlice } from "@reduxjs/toolkit";
import axios from '@utilities/api/httpService';
import {BASE_URL} from '../../../../routers/AppRoute'

export const initialState = {
  loading: true,
  hasErrors: false,
  quotationHistory: [],
  searchFilterslist: [],
  searchFilterSettings :[],
  searchFilters: {},
  isFilterApply: false
};

const quotationSummarySlice = createSlice({
  name: "quotationsummary",
  initialState,
  reducers: {
    getquotationsummarySuccess: (state, { payload }) => {
      state.quotationHistory = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getquotationsummaryFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
    getquotationFilterSuccess: (state, { payload }) => {
      state.searchFilterslist = payload.filterJsonData;
      state.searchFilterSettings = payload.filterSettingJsonData;
      state.loading = false;
      state.hasErrors = false;
    },
    updateSearchFilter:(state, { payload }) => {
      state.searchFilters = {
      ...payload
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
export const quotationsummaryactions = quotationSummarySlice.actions;

// A selector
export const quotationsummarySelector = (state: any) => state;

// The reducer
export default quotationSummarySlice.reducer;

// Asynchronous thunk action
export function fetchquotationsummary(
  sessionId: any,
  orderBy: any,
  sortColumn: any,
  pageNumber? : number,
  isSearch: boolean = false,
  Customer?: any,
  QuotationNumber?: string,
  ItemCode?: string 
) {
 return async (dispatch: any) => {
    try {
      
      let URL =  BASE_URL + `/GetQuotations?OrderBy=${orderBy}&sortColumn=${sortColumn}&PageNo=${pageNumber}&sessionId=` +
      `${sessionId}`;
      if(isSearch){
        if(Customer!== '')
        URL += `&Customer=${Customer}`
        if(QuotationNumber!== '')
        URL += `&QuotationNumber=${QuotationNumber}`
        if(ItemCode!== '')
        URL += `&ItemCode=${ItemCode}`
      }
      const historyData: any = await axios.get(URL);
      dispatch(quotationsummaryactions.getquotationsummarySuccess(historyData?.data));
    } catch (error) {
      dispatch(quotationsummaryactions.getquotationsummaryFailure());
    }
  };
}

export function quotationFilterDetails(sessionId: any) {
  return async (dispatch: any) => {
     try {
       
       const URLsettings = BASE_URL + `/GetQuotationFilters`;
       const URL = BASE_URL + `/GetFilterDetails`;
       const response: any = await axios.get(URL);
       if (response.status == "200") {
         var filterJsonData = response?.data;
         const settingresponse: any = await axios.get(URLsettings);
         var filterSettingJsonData = settingresponse.data;
         dispatch(quotationsummaryactions.getquotationFilterSuccess({filterJsonData,filterSettingJsonData}));
       }
       
     } catch (error) {
       // dispatch(orderhistoryactions.getorderhistoryFailure());
     }
   };
 }

