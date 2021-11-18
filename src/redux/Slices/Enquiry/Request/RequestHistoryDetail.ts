import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../../../routers/AppRoute";


export const initialState = {
  loading: true,
  hasErrors: false,
  requestdetail: [],
  errorCode: "",
  
};

const requestHistoryDetailSlice = createSlice({
  name: "requesthistorydetail",
  initialState,
  reducers: {
    getrequesthistorydetailSuccess: (state, { payload }) => {
      state.requestdetail = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getrequesthistorydetailFailure: (state) => {
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
    }
   
  },
});

// Three actions generated from the slice
export const requesthistorydetailactions = requestHistoryDetailSlice.actions;

// A selector
export const requesthistorydetailSelector = (state: any) => state;

// The reducer
export default requestHistoryDetailSlice.reducer;

// Asynchronous thunk action
export function fetchrequesthistorydetail(sessionId: any, RequestNumber: string) {
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
        `/GetRequestDetails?RequestNumber=${RequestNumber}&sessionId=` +
        `${sessionId}`;
      const historyDetailData: any = await axios.get(URL, options);
      dispatch(
        requesthistorydetailactions.getrequesthistorydetailSuccess(
          historyDetailData?.data
        )
      );
    } catch (error) {
      dispatch(requesthistorydetailactions.getrequesthistorydetailFailure());
    }
  };
}




