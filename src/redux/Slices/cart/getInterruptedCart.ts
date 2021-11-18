import { createSlice } from '@reduxjs/toolkit';
import axios from '@utilities/api/httpService';
import qs from "querystring"
import { BASE_URL } from '../../../routers/AppRoute'

export const initialState = {
  loading: false,
  hasErrors: false,
  data: [],
  messageCode:null
};

// A slice for products with our three reducers
const interruptedCartSlice = createSlice({
  name: 'interruptedCart',
  initialState,
  reducers: {
    getInterruptedCartSuccess: (state, { payload }) => {
      
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
    setInterruptedCartErrors:(state, { payload })=>{
      state.hasErrors= payload;
    },
    setInterruptedCartMessageCode:(state, { payload })=>{
      state.messageCode= payload;
    },
    initializeInterruptedCartLoader: (state) => {
      state.loading = true;
    },
    getInterruptedCartFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    }
}});

// Three actions generated from the slice
export const { getInterruptedCartFailure, setInterruptedCartMessageCode, setInterruptedCartErrors, getInterruptedCartSuccess,initializeInterruptedCartLoader } = interruptedCartSlice.actions;

// A selector
export const InterruptedCartSelector = (state: any) => state?.interruptedCart;

// The reducer
export default interruptedCartSlice.reducer;


export function fetchInterruptedCart(sessionId:any){
  return async (dispatch: any) => {

    try {

      const URL = BASE_URL +`/GetInterruptedCart`

      const tempData: any = await axios({
        method: "GET",
        url: URL,
        //headers: { 'Set-Cookie': 'JSESSIONID=' + `${sessionId}`, 'Access-Control-Allow-Credentials': 'true', 'Content-Type': "application/x-www-form-urlencoded" }
      });

      dispatch(getInterruptedCartSuccess(tempData?.data));
    } catch (error) {
      dispatch(getInterruptedCartFailure());
    }
  };
}

export function deleteInterruptedCart({sessionId, data}:{ sessionId:any, data:any }){
  return async (dispatch: any) => {
    try {

      const URL = BASE_URL +`/DeleteInterruptedCart`

      const tempData: any = await axios({
        method: "POST",
        url: URL,
        data: qs.stringify({
          interruptedCart: `${JSON.stringify(data)}`,
        }),
       });

      if(typeof tempData?.data?.messageCode==='number'){
        dispatch(getInterruptedCartFailure());
        return;
      }else {
        dispatch(fetchInterruptedCart(sessionId))
      }
    } catch (error) {
      dispatch(getInterruptedCartFailure());
    }
  };
}