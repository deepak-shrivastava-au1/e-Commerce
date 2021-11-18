import { createSlice } from "@reduxjs/toolkit";
import axios from '@utilities/api/httpService';
import { BASE_URL } from "../../../../routers/AppRoute";
import qs from "querystring";

export const initialState = {
  loading: true,
  hasErrors: false,
  hasorderlineErrors: false,
  quotationhistorydetail: [],
  errorCode: "",
  ordernumber : "",
  quotationrouteparms :[]
};

const quotationSummaryDetailSlice = createSlice({
  name: "quotationSummaryDetail",
  initialState,
  reducers: {
    getquotationsummarydetailSuccess: (state, { payload }) => {
      state.quotationhistorydetail = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getquotationsummarydetailFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
    intitalizeLoader: (state) => {
      state.loading = true;
    },
    setHasError: (state, action) => {
      state.hasErrors = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setErrorCode: (state, action) => {
      state.errorCode = action.payload;
    },
    setToOrderSucess: (state, action) => {
      state.ordernumber = action.payload;
    },
    setquotationrouteparms: (state, { payload }) => {
     
      state.quotationrouteparms = {
        ...payload
        };
    },
  },
});

// Three actions generated from the slice
export const quotationsummarydetailactions = quotationSummaryDetailSlice.actions;

// A selector
export const quotationsummarydetailSelector = (state: any) => state;

// The reducer
export default quotationSummaryDetailSlice.reducer;

// Asynchronous thunk action
export function fetchquotationdetail(sessionId: any, QuotationNumber: string,VersionNumber: string , Type: string) {
  return async (dispatch: any) => {
    try {
      let URL =
        BASE_URL +
        `/GetQuotationDetails?QuotationNumber=${QuotationNumber}&VersionNumber=${VersionNumber}&Type=${Type}&sessionId=` +
        `${sessionId}`;
      const historyDetailData: any = await axios.get(URL);
      dispatch(
        quotationsummarydetailactions.getquotationsummarydetailSuccess(
          historyDetailData?.data
        )
      );
    } catch (error) {
      dispatch(quotationsummarydetailactions.getquotationsummarydetailFailure());
    }
  };
}

export function quotationtoorder(sessionId: any, quotationNo: string,versionNo: string) {
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
        `/QuotationToOrder?quotationNo=${quotationNo}&versionNo=${versionNo}&sessionId=` +
        `${sessionId}`;
      const historyDetailData: any = await axios.get(URL, options);

      if (historyDetailData?.data?.isOrderInError) {
        
        dispatch(quotationsummarydetailactions.setHasError(true));
        dispatch(
          quotationsummarydetailactions.setErrorCode(
            historyDetailData?.data?.errorMessage
          )
        );
      
        dispatch(quotationsummarydetailactions.setLoading(false));
      } else {
      
        dispatch(quotationsummarydetailactions.setToOrderSucess(historyDetailData?.data?.orderNumber))
        dispatch(quotationsummarydetailactions.setHasError(false));
        dispatch(quotationsummarydetailactions.setErrorCode(""));
      
        dispatch(quotationsummarydetailactions.setLoading(false));
      }
    } catch (error) {
      dispatch(quotationsummarydetailactions.setHasError(true));
      dispatch(quotationsummarydetailactions.setLoading(false));
    }
  };
}



