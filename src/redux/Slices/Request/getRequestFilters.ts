import { createSlice } from '@reduxjs/toolkit';
import axios from '../../../utilities/api/httpService';
import { BASE_URL } from '../../../routers/AppRoute'
import qs from 'querystring'

export const initialState = {
  loading: false,
  hasErrors: false,
  messageCode:null,
  data: null,
  screenStatus:{
    requestSubmit:true,requestConfirmation:false
  }
};

// A slice for products with our three reducers
const requestSubmit = createSlice({
  name: 'requestSubmit',
  initialState,
  reducers: {
    getRequestSubmitSuccess: (state, { payload }) => {
      state.data = payload;
      state.loading = false;
      state.hasErrors = false;
      state.messageCode = payload?.[0]?.messageCode;
    },
    setScreenStatus:(state,{ payload })=>{
      state.screenStatus=payload;
    },
    initializeRequestSubmitLoader: (state) => {
      state.loading = true;
    },
    setRequestSubmitMessageCode:(state,{ payload })=>{
      state.messageCode = payload
    },
    setRequestSubmitHasErrors:(state,{ payload })=>{
      state.hasErrors = payload
    },
    getRequestSubmitFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    }
  },
});

// Three actions generated from the slice
export const { getRequestSubmitFailure,setScreenStatus,getRequestSubmitSuccess,initializeRequestSubmitLoader, setRequestSubmitHasErrors, setRequestSubmitMessageCode } = requestSubmit.actions;

// A selector
export const requestSubmitSelector = (state: any) => state?.requestSubmit;

// The reducer
export default requestSubmit.reducer;


export function fetchSubmitBPRequest(requestInfoData:any,requestLineData?:any){

  /** requestBase:=//product || invoice || order  , reference := Order no | Invoice no
   * [{"requestBase":"product","customer":"OLLE","yourReference":"NETSTORE_ADMIN","probType":"L.SHIPJ","reqDesc":"dsd","reference":"","docType":""}]
   */

  /**
   * requestLineData: [{"lineNumber":"10","invoiceLineNumber":"0","product":"ds","quantity":"2","unit":"EACH","probType":"ABHPROB","requestDesc":"null","validQuantity":true,"itemNumberOfDecimalsAllowed":[0],"restricted":""},{"lineNumber":"20","invoiceLineNumber":"0","product":"ds","quantity":"3","unit":"EACH","probType":"L.SHIPXA","requestDesc":"null","validQuantity":true,"itemNumberOfDecimalsAllowed":[0],"restricted":""}]
   */
  return async (dispatch: any) => {

    try {

      const URL = BASE_URL +`/SubmitBPRequest`

      const tempData: any = await axios({
        method: "POST",
        url: URL,
        data: qs.stringify(!requestLineData ?{
          requestInfoData: `${JSON.stringify(requestInfoData)}`,
        }:
        {
          requestInfoData: `${JSON.stringify(requestInfoData)}`,
          requestLineData: `${JSON.stringify(requestLineData)}`
        }
        ),
      });

      dispatch(getRequestSubmitSuccess(tempData?.data));
    } catch (error) {
      dispatch(getRequestSubmitFailure());
    }
  };
}