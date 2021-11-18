import { createSlice } from '@reduxjs/toolkit';
import axios from '../../../utilities/api/httpService';
import { BASE_URL } from '../../../routers/AppRoute'
import qs from 'querystring'

export const initialState = {
  loading: false,
  hasErrors: false,
  messageCode: null,
  data: [],
};

// A slice for products with our three reducers
const emailOrderDetails = createSlice({
  name: 'emailOrderDetails',
  initialState,
  reducers: {
    getEmailOrderDetailsSuccess: (state, { payload }) => {

      if (!payload) {
        state.loading = false;
        state.hasErrors = true;
        state.messageCode = null;
        return;
      }

      if (typeof payload?.messageCode === 'number') {
        state.loading = false;
        state.hasErrors = true;
        state.messageCode = payload?.messageCode;
        return;
      }
      state.data = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    initializeEmailOrderDetailsLoader: (state) => {
      state.loading = true;
    },
    setEmailOrderDetailsMessageCode: (state, { payload }) => {
      state.messageCode = payload
    },
    setEmailOrderDetailsHasErrors: (state, { payload }) => {
      state.hasErrors = payload
    },
    getEmailOrderDetailsFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    }
  },
});

// Three actions generated from the slice
export const { getEmailOrderDetailsSuccess, getEmailOrderDetailsFailure,initializeEmailOrderDetailsLoader,setEmailOrderDetailsHasErrors,setEmailOrderDetailsMessageCode } = emailOrderDetails.actions;

// A selector
export const emailOrderDetailsSelector = (state: any) => state?.emailOrderDetails;

// The reducer
export default emailOrderDetails.reducer;


export function fetchEmailOrderDetails(data: any) {
  return async (dispatch: any) => {

    try {

      const URL = BASE_URL + `/SendMailSalesOrder`

      const tempData: any = await axios({
        method: "POST",
        url: URL,
        data:qs.stringify({
          salesOrderMailData:JSON.stringify(data)
        })
      });

      dispatch(getEmailOrderDetailsSuccess(tempData?.data));
    } catch (error) {
      // dispatch(getCloseCartFailure());
    }
  };
}