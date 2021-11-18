import { createSlice } from '@reduxjs/toolkit';
import axios from '@utilities/api/httpService';
import { BASE_URL } from '../../../routers/AppRoute'

export const initialState = {
  loading: false,
  hasErrors: false,
  messageCode:null,
  data: null,
};

// A slice for products with our three reducers
const paymentOrderStatus = createSlice({
  name: 'paymentOrderStatus',
  initialState,
  reducers: {
    getPaymentOrderStatusSuccess: (state, { payload }) => {

      if (typeof payload?.messageCode==='number') {
        state.loading = false;
        state.hasErrors = true;
        state.messageCode = payload?.messageCode;
        return;
      }
      state.data = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    initializePaymentOrderLoader: (state) => {
      state.loading = true;
    },
    setPaymentOrderMessageCode:(state,{ payload })=>{
      state.messageCode = payload
    },
    setPaymentOrderHasErrors:(state,{ payload })=>{
      state.hasErrors = payload
    },
    getPaymentOrderFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    }
  },
});

// Three actions generated from the slice
export const { getPaymentOrderFailure,getPaymentOrderStatusSuccess,initializePaymentOrderLoader, setPaymentOrderHasErrors, setPaymentOrderMessageCode } = paymentOrderStatus.actions;

// A selector
export const paymentOrderStatusSelector = (state: any) => state?.paymentOrderStatus;

// The reducer
export default paymentOrderStatus.reducer;


export function fetchPaymentOrderStatus(sessionId:any,tempOrderNumber:any){
  return async (dispatch: any) => {

    try {

      const URL = BASE_URL +`/GetPaymentOrderStatus`

      const tempData: any = await axios({
        method: "GET",
        url: URL,
        params:{ tempOrderNumber },
      });

      dispatch(getPaymentOrderStatusSuccess(tempData?.data));
    } catch (error) {
      dispatch(getPaymentOrderFailure());
    }
  };
}