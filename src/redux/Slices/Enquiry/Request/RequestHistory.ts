import { createSlice } from "@reduxjs/toolkit";
import axios from '@utilities/api/httpService';
import {BASE_URL} from '../../../../routers/AppRoute'

export const initialState = {
  loading: true,
  hasErrors: false,
  requests: [],
  searchFilterslist: [],
  searchFilterSettings :[],
  searchFilters: {},
  isFilterApply: false,
  isrequestDeleted: false
};

const requesthistorySlice = createSlice({
  name: "requesthistory",
  initialState,
  reducers: {
    getrequesthistorySuccess: (state, { payload }) => {
      state.requests = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getrequesthistoryFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
    getrequestFilterSuccess: (state, { payload }) => {
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
    setrequestDeleted: (state, action) => {
      state.isrequestDeleted =!state.isrequestDeleted;
    },
  },
});

// Three actions generated from the slice
export const requesthistoryactions = requesthistorySlice.actions;

// A selector
export const requestSelector = (state: any) => state;

// The reducer
export default requesthistorySlice.reducer;

// Asynchronous thunk action
export function fetchrequesthistory(
  sessionId: any,
  orderBy: any,
  sortColumn: any,
  pageNumber? : number,
  isSearch: boolean = false,
  Customer?: any,
  Status?: any,
  RequestType?: any,
  RequestNumber?: any,
  ReferenceNumber? : any,
  YourReference? : any
) {
 return async (dispatch: any) => {
    try {
      
      let URL =  BASE_URL + `/GetRequestHistory?OrderBy=${orderBy}&sortColumn=${sortColumn}&PageNo=${pageNumber}&sessionId=` +
      `${sessionId}`;
      if(isSearch ){ 
      URL += `&Status=${Status}&RequestType=${RequestType}`
      if(Customer !== '')
        URL +=`&Customer=${Customer}`;
      if (RequestNumber !== "")
        URL +=`&RequestNumber=${RequestNumber}`;
        if (ReferenceNumber !== "")
        URL +=`&ReferenceNumber=${ReferenceNumber}`;
        if (YourReference !== "")
        URL +=`&YourReference=${YourReference}`;
    }
      const historyData: any = await axios.get(URL);
      dispatch(requesthistoryactions.getrequesthistorySuccess(historyData?.data));
    } catch (error) {
      dispatch(requesthistoryactions.getrequesthistoryFailure());
    }
  };
}

export function requestFilterDetails(sessionId: any) {
  return async (dispatch: any) => {
     try {
       
       const URLsettings = BASE_URL + `/GetRequestFilters`;
       const URL = BASE_URL + `/GetFilterDetails`;
       const response: any = await axios.get(URL);
       if (response.status == "200") {
         var filterJsonData = response?.data;
         const settingresponse: any = await axios.get(URLsettings);
         var filterSettingJsonData = settingresponse.data;
         dispatch(requesthistoryactions.getrequestFilterSuccess({filterJsonData,filterSettingJsonData}));
       }
       
     } catch (error) {
       // dispatch(orderhistoryactions.getorderhistoryFailure());
     }
   };
 }

 export function deleterequest(sessionId: any,requestId: any) {
  return async (dispatch: any) => {
     try {
       
       const URL = BASE_URL + `/DeleteBPRequest?requestId=${requestId}`;
       const response: any = await axios.get(URL);
       if (response.status == "200") {
         var filterJsonData = response?.data;
         dispatch(requesthistoryactions.setrequestDeleted({filterJsonData}));
       }
       
     } catch (error) {
       // dispatch(orderhistoryactions.getorderhistoryFailure());
     }
   };
 }



