import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../../../routers/AppRoute";
import qs from "querystring";

export const initialState = {
  loading: true,
  hasErrors: false,
  hasorderlineErrors: false,
  invoicedetail: [],
  errorCode: "",
  invoicerouteparms :[]
};

const invoiceHistoryDetailSlice = createSlice({
  name: "invoicehistorydetail",
  initialState,
  reducers: {
    getinvoicehistorydetailSuccess: (state, { payload }) => {
      state.invoicedetail = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getinvoicehistorydetailFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
    intitalizeLoader: (state) => {
      state.loading = true;
    },
    getlisitemsuccess: (state) => {
      state.loading = false;
      state.hasErrors = false;
    },
    setHasError: (state, action) => {
      state.hasErrors = action.payload;
    },
    setHasOrderLineErrors: (state, action) => {
      state.hasorderlineErrors = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setErrorCode: (state, action) => {
      state.errorCode = action.payload;
    },
    setinvoicerouteparms: (state, { payload }) => {
      state.invoicerouteparms = {
         ...payload
         };
     },
  },
});

// Three actions generated from the slice
export const invoicehistorydetailactions = invoiceHistoryDetailSlice.actions;

// A selector
export const invoicehistorydetailSelector = (state: any) => state;

// The reducer
export default invoiceHistoryDetailSlice.reducer;

// Asynchronous thunk action
export function fetchinvoicehistorydetail(sessionId: any, InvoiceNumber: string,OrderNumber:string, DocumentType:string,InvoiceType: any,InvoiceYear:any) {
  return async (dispatch: any) => {
    try {
      const options = {
        headers: {
          "Set-Cookie": "JSESSIONID=" + `${sessionId}`,
          "Access-Control-Allow-Credentials": "true",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      let URL =
        BASE_URL +
        `/GetInvoiceDetails?InvoiceNumber=${InvoiceNumber}&OrderNumber=${OrderNumber}&DocumentType=${DocumentType}&InvoiceType=${InvoiceType}&InvoiceYear=${InvoiceYear}&sessionId=` +
        `${sessionId}`;
      const historyDetailData: any = await axios.get(URL, options);
      dispatch(
        invoicehistorydetailactions.getinvoicehistorydetailSuccess(
          historyDetailData?.data
        )
      );
    } catch (error) {
      dispatch(invoicehistorydetailactions.getinvoicehistorydetailFailure());
    }
  };
}




