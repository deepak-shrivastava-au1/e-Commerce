import { createSlice } from '@reduxjs/toolkit';
import axios from '@utilities/api/httpService';
import qs from "querystring"
import { BASE_URL } from '../../../routers/AppRoute'

export const initialState = {
  loading: true,
  hasErrors: false,
  messageCode:null,
  deliveryInformationData:{
    deliveryInformation:{},
    countryCodeList:[],
    allMannerOftransport:[]
  }
};

// A slice for products with our three reducers
const deliveryInformationSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    getDeliveryInformationSuccess: (state, { payload }) => {
      
      if(!payload){
        state.loading = false;
        state.hasErrors = true;
        state.messageCode=null;
        return;
      }

      if (typeof payload?.messageCode === 'number') {        
        state.messageCode = payload?.messageCode;
        state.loading = false;
        state.hasErrors = true;
        return;
      }

      state.deliveryInformationData.deliveryInformation = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getAllMannerOftransport:(state,{payload})=>{
      state.deliveryInformationData.allMannerOftransport = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    initializeDeliveryLoader: (state) => {
      state.loading = true;
    },
    setDeliveryInfoHasErrors:(state, { payload })=>{
      state.hasErrors=payload;
    },
    setDeliveryInfoMessageCode:(state, { payload })=>{
      state.messageCode=payload
    },
    getDeliveryInformationFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
    getCountryCodeList:(state,{ payload })=>{
      state.loading = false;
      state.hasErrors = false;
      state.deliveryInformationData.countryCodeList= payload;
    }
  },
});

// Three actions generated from the slice
export const { getDeliveryInformationFailure,getAllMannerOftransport, getCountryCodeList, getDeliveryInformationSuccess, initializeDeliveryLoader, setDeliveryInfoHasErrors, setDeliveryInfoMessageCode } = deliveryInformationSlice.actions;

// A selector
export const deliveryInformationSelector = (state: any) => state?.deliveryInformation;

// The reducer
export default deliveryInformationSlice.reducer;

// Asynchronous thunk action to fetch user's delivery information data 

export function fetchdeliveryInformationData(sessionId: any) {
  return async (dispatch: any) => {
    try {
      const URL =
        BASE_URL +
        `/GetDeliveryInformationData`

      const tempData: any = await axios({
        method: "GET",
        url: URL,
      });

      dispatch(getDeliveryInformationSuccess(tempData?.data));
    } catch (error) {
      dispatch(getDeliveryInformationFailure());
    }
  };
}

export function fetchAllMannerOfTransport(sessionId: any) {
  return async (dispatch: any) => {
    try {
      const URL =
        BASE_URL +
        `/GetAllMannerOfTransport`

      const tempData: any = await axios({
        method: "GET",
        url: URL,
        });

      dispatch(getAllMannerOftransport(tempData?.data));
    } catch (error) {
      dispatch(getDeliveryInformationFailure());
    }
  };
}

export function fetchCountryList(sessionId: any) {
  return async (dispatch: any) => {
    try {
      const URL =
        BASE_URL +
        `/GetAllCountries`

      const tempData: any = await axios({
        method: "GET",
        url: URL,
        //headers: { 'Set-Cookie': 'JSESSIONID=' + `${sessionId}`, 'Access-Control-Allow-Credentials': 'true', 'Content-Type': "application/x-www-form-urlencoded" }
      });

      dispatch(getCountryCodeList(tempData?.data));
    } catch (error) {
      dispatch(getDeliveryInformationFailure());
    }
  };
}

export function fetchSaveDeliveryInformation(sessionId: any, SaveDeliveryInformation: any) {

  return async (dispatch: any) => {

    try {

      const URL = BASE_URL +`/SaveDeliveryInformation`

      const tempData: any = await axios({
        method: "POST",
        url: URL,
        data: qs.stringify({
          SaveDeliveryInformation: `${JSON.stringify(SaveDeliveryInformation)}`,
        }),
        });

      dispatch(getDeliveryInformationSuccess(tempData?.data?.temporaryOrderData));
    } catch (error) {
      dispatch(getDeliveryInformationFailure());
    }
  };
}
