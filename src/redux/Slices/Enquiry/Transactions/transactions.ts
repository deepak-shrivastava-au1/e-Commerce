import { createSlice } from "@reduxjs/toolkit";
import axios from '@utilities/api/httpService';
import {BASE_URL} from '../../../../routers/AppRoute'

export const initialState = {
  loading: true,
  hasErrors: false,
  transactionslst: [],
  searchFilterslist: [],
  searchFilterSettings :[],
  searchFilters: {},
  isFilterApply: false
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    gettransactionsSuccess: (state, { payload }) => {
      state.transactionslst = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    gettransactionsFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
    gettransactionsFilterSuccess: (state, { payload }) => {
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
export const transactionactions = transactionSlice.actions;

// A selector
export const transactionSelector = (state: any) => state;

// The reducer
export default transactionSlice.reducer;

// Asynchronous thunk action
export function fetchtransaction(
  sessionId: any,
  orderBy: any,
  sortColumn: any,
  pageNumber? : number,
  isSearch: boolean = false,
  Customer? : string,
  Currency?: string,
  OrgAmtRel? : string,
  OrgAmtVal1?:  string,
  OrgAmtVal2?:  string,
  RemAmtRel? : string,
  RemAmtVal1? : string,
  RemAmtVal2? :string,
  DocDateRel? : string,
  DocDateVal1?: string,
  DocDateVal2? :string,
  DueDateRel?:string,
  DueDateVal1? : string,
  DueDateVal2? :string
 
) {
  
 return async (dispatch: any) => {
    try {
     
      let URL =  BASE_URL + `/GetTransactionDetails?OrderBy=${orderBy}&sortColumn=${sortColumn}&PageNo=${pageNumber}&sessionId=` +
      `${sessionId}`;
      if(isSearch){
        URL +=`&Currency=${Currency}&OrgAmtRel=${OrgAmtRel}&RemAmtRel=${RemAmtRel}&DocDateRel=${DocDateRel}&DueDateRel=${DueDateRel}`
        if(Customer!== '')
        URL += `&Customer=${Customer}`
        if(OrgAmtVal1!== '')
        URL += `&OrgAmtVal1=${OrgAmtVal1}`
        if(OrgAmtVal2!== '')
        URL += `&OrgAmtVal2=${OrgAmtVal2}`
        if(RemAmtVal1!== '')
        URL += `&RemAmtVal1=${RemAmtVal1}`
        if(RemAmtVal2!== '')
        URL += `&RemAmtVal2=${RemAmtVal2}`
        if(DocDateVal1!== '')
        URL += `&DocDateVal1=${DocDateVal1}`
        if(DocDateVal2!== '')
        URL += `&DocDateVal2=${DocDateVal2}`
        if(DueDateVal1 !== '')
        URL += `&DueDateVal1=${DueDateVal1}`
        if(DueDateVal2 !== '')
        URL += `&DueDateVal2=${DueDateVal2}`
      }
      const historyData: any = await axios.get(URL);
      dispatch( transactionactions.gettransactionsSuccess(historyData?.data));
    } catch (error) {
      dispatch(transactionactions.gettransactionsFailure());
    }
  };
}

export function transactionFilterDetails(sessionId: any) {
  return async (dispatch: any) => {
     try {
      
       const URLsettings = BASE_URL + `/GetTransactionFilters`;
       const URL = BASE_URL + `/GetFilterDetails`;
       const response: any = await axios.get(URL);
       if (response.status == "200") {
         var filterJsonData = response?.data;
         const settingresponse: any = await axios.get(URLsettings);
         var filterSettingJsonData = settingresponse.data;
         dispatch(transactionactions.gettransactionsFilterSuccess({filterJsonData,filterSettingJsonData}));
       }
       
     } catch (error) {
       // dispatch(orderhistoryactions.getorderhistoryFailure());
     }
   };
 }


