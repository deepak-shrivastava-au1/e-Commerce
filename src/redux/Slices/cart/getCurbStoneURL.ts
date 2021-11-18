import { createSlice } from '@reduxjs/toolkit';
import axios from '@utilities/api/httpService';
import { BASE_URL } from '../../../routers/AppRoute'

interface IState{
  loading:boolean,
  hasErrors:boolean
  messageCode:any
  data:any
}

export const initialState:IState = {
  loading: false,
  hasErrors: false,
  messageCode:null,
  data: [],
};

// A slice for products with our three reducers
const curbStoneURL = createSlice({
  name: 'curbStoneURL',
  initialState,
  reducers: {
    getCurbStoneURLSuccess: (state, { payload }) => {
      
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
    initializeCurbStoneURLLoader: (state) => {
      state.loading = true;
    },
    setCurbStoneURLMessageCode:(state,{ payload })=>{
      state.messageCode = payload
    },
    setCurbStoneURLHasErrors:(state,{ payload })=>{
      state.hasErrors = payload
    },
    getCurbStoneURLFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    }
  },
});

// Three actions generated from the slice
export const { getCurbStoneURLFailure,getCurbStoneURLSuccess,initializeCurbStoneURLLoader, setCurbStoneURLHasErrors, setCurbStoneURLMessageCode } = curbStoneURL.actions;

// A selector
export const curbStoneURLSelector = (state: any) => state?.curbStoneURL;

// The reducer
export default curbStoneURL.reducer;


export function fetchCurbStoneURL(sessionId:any,rest:any){

  return async (dispatch: any) => {

    try {

      const URL = BASE_URL +`/GetCurbStoneUrl`

      const tempData: any = await axios({
        method: "GET",
        url: URL,
        params:{...rest},
       });

      dispatch(getCurbStoneURLSuccess(tempData?.data));
    } catch (error) {
      dispatch(getCurbStoneURLFailure());
    }
  };
}