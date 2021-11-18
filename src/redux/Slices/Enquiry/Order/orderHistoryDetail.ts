import { createSlice } from "@reduxjs/toolkit";
import axios from '@utilities/api/httpService';
import { BASE_URL } from "../../../../routers/AppRoute";
import qs from "querystring";

export const initialState = {
  loading: true,
  hasErrors: false,
  hasorderlineErrors: false,
  orderdetail: [],
  errorCode: "",
};

const orderHistoryDetailSlice = createSlice({
  name: "orderhistorydetail",
  initialState,
  reducers: {
    getorderhistorydetailSuccess: (state, { payload }) => {
      state.orderdetail = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getorderhistorydetailFailure: (state) => {
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
  },
});

// Three actions generated from the slice
export const orderhistorydetailactions = orderHistoryDetailSlice.actions;

// A selector
export const orderhistorydetailSelector = (state: any) => state;

// The reducer
export default orderHistoryDetailSlice.reducer;

// Asynchronous thunk action
export function fetchorderhistorydetail(sessionId: any, OrderNumber: string) {
  return async (dispatch: any) => {
    try {
      
      let URL =
        BASE_URL +
        `/GetSalesOrderDetails?OrderNumber=${OrderNumber}&sessionId=` +
        `${sessionId}`;
      const historyDetailData: any = await axios.get(URL);
      dispatch(
        orderhistorydetailactions.getorderhistorydetailSuccess(
          historyDetailData?.data
        )
      );
    } catch (error) {
      dispatch(orderhistorydetailactions.getorderhistorydetailFailure());
    }
  };
}

export function deleteorder(sessionId: any, OrderNumber: string) {
  return async (dispatch: any) => {
    try {
     
      let URL =
        BASE_URL +
        `/DeleteOrder?orderNum=${OrderNumber}&sessionId=` +
        `${sessionId}`;
      const historyDetailData: any = await axios.get(URL);

      if (
        typeof historyDetailData?.data?.messageCode === 'number' &&
        historyDetailData?.data?.messageCode != 4000
      ) {
       
        dispatch(orderhistorydetailactions.setHasError(true));
        dispatch(
          orderhistorydetailactions.setErrorCode(
            historyDetailData?.data?.messageCode
          )
        );
      
        dispatch(orderhistorydetailactions.setLoading(false));
      } else {
        dispatch(orderhistorydetailactions.setHasError(false));
        dispatch(orderhistorydetailactions.setErrorCode(""));
      
        dispatch(orderhistorydetailactions.setLoading(false));
      }
    } catch (error) {
      dispatch(orderhistorydetailactions.setHasError(true));
      dispatch(orderhistorydetailactions.setLoading(false));
    }
  };
}

type deleteOrderLineData = {
  orderNum: string;
  lineNumber: number;
}[];
export function deleteOrderLines(
  sessionId: any,
  lineData: deleteOrderLineData
) {
  return async (dispatch: any) => {
    try {
      const URL = BASE_URL + `/deleteOrderLines`;

      const response: any = await axios({
        method: "POST",
        url: URL,
        data: qs.stringify({
          deleteOrderLineData: `${JSON.stringify(lineData)}`,
          //
        }),
      });
      if (
        typeof  response?.data?.[0]?.messageCode === 'number' &&
        response?.data?.[0]?.messageCode != "4000"
      ) {
        dispatch(
          orderhistorydetailactions.setErrorCode(
            response?.data?.[0]?.messageCode
          )
        );
        dispatch(orderhistorydetailactions.setHasOrderLineErrors(true));
        dispatch(orderhistorydetailactions.setLoading(false));
      } else {
        dispatch(orderhistorydetailactions.setErrorCode(""));
        dispatch(orderhistorydetailactions.setHasOrderLineErrors(false));
        dispatch(fetchorderhistorydetail(sessionId, lineData?.[0]?.orderNum));
        dispatch(orderhistorydetailactions.setLoading(false));
      }
    } catch (error) {
      console.log(error);
    }
  };
}

type enquiryMailData = {
  mailFrom: string;
  subject: string;
  body: string;
}[];
export function SendMailEnquiry(
  sessionId: any,
  enquiryMailData: enquiryMailData
) {
  return async (dispatch: any) => {
    try {
      const URL = BASE_URL + `/SendMailEnquiry`;

      const response: any = await axios({
        method: "POST",
        url: URL,
        data: qs.stringify({
          enquiryMailData: `${JSON.stringify(enquiryMailData)}`,
          //
        }),
      });
      dispatch(orderhistorydetailactions.getlisitemsuccess());
     
    } catch (error) {
      console.log(error);
    }
  };
}
// enquiryMailData: [{"mailFrom":"madhusudhan.reddy@iptor.com","mailTo":"","subject":"NetStore Item Enquiry","body":"Product : BOCENTER9300\nDescription : BeoCenter 9300\nCustomer number : 112040\nCustomer : Duplicator Ltd 1\nNetStore user's email id : madhusudhan.reddy@iptor.com\n","UIErrorKey":null,"UIErrorParams":[],"startShowError":true,"showMailFrom":true,"showMailTo":false}]
