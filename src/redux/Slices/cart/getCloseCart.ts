import { createSlice } from '@reduxjs/toolkit';
import axios from '@utilities/api/httpService';
import { BASE_URL } from '../../../routers/AppRoute'

export const initialState = {
  loading: false,
  hasErrors: false,
  messageCode:null,
  data: [],
};

// A slice for products with our three reducers
const closeCartSlice = createSlice({
  name: 'closeCart',
  initialState,
  reducers: {
    getCloseCartSuccess: (state, { payload }) => {

      if(payload==="unmounted text"){
        state.loading = false;
        state.hasErrors = false;
        state.messageCode=null;
        state.data=[]
        return;
      }
      
      if(!payload){
        state.loading = false;
        state.hasErrors = true;
        state.messageCode=null;
        return;
      }

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
    initializeCloseCartLoader: (state) => {
      state.loading = true;
    },
    setCloseCartMessageCode:(state,{ payload })=>{
      state.messageCode = payload
    },
    setCloseCartHasErrors:(state,{ payload })=>{
      state.hasErrors = payload
    },
    getCloseCartFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    }
  },
});

// Three actions generated from the slice
export const { getCloseCartFailure,getCloseCartSuccess,initializeCloseCartLoader, setCloseCartHasErrors, setCloseCartMessageCode } = closeCartSlice.actions;

// A selector
export const closeCartSelector = (state: any) => state?.closeCart;

// The reducer
export default closeCartSlice.reducer;


export function fetchCloseCart(sessionId:any,...rest:any){
  return async (dispatch: any) => {

    try {

      const URL = BASE_URL +`/CloseCart`

      const tempData: any = await axios({
        method: "GET",
        url: URL,
        params:{...rest},
       });

      dispatch(getCloseCartSuccess(tempData?.data));
    } catch (error) {
      dispatch(getCloseCartFailure());
    }
  };
}