import { createSlice } from '@reduxjs/toolkit';
import axios from '@utilities/api/httpService';
import { BASE_URL } from '../../../routers/AppRoute'

export const initialState = {
  loading: false,
  hasErrors: false,
  messageCode:null,
  data: {},
};

// A slice for products with our three reducers
const shoppingListLineDetails = createSlice({
  name: 'shoppingListLineDetails',
  initialState,
  reducers: {
    getShoppingListLineDetailsSuccess: (state, { payload }) => {

      if(!payload){
        state.loading = false;
        state.hasErrors = true;
        state.data=[]
        state.messageCode=null;
        return;
      }

      if (typeof payload?.messageCode==='number') {
        state.loading = false;
        state.hasErrors = true;
        state.messageCode = payload?.messageCode;
        if(payload?.messageCode===111){
          state.data=[]
        }
        return;
      }
      state.data = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    initializeShoppingListLineDetailsLoader: (state) => {
      state.loading = true;
    },
    setShoppingListLineDetailsMessageCode:(state,{ payload })=>{
      state.messageCode = payload
    },
    setShoppingListLineDetailsHasErrors:(state,{ payload })=>{
      state.hasErrors = payload
    },
    getShoppingListLineDetailsFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    }
  },
});

// Three actions generated from the slice
export const { getShoppingListLineDetailsFailure,getShoppingListLineDetailsSuccess,initializeShoppingListLineDetailsLoader, setShoppingListLineDetailsHasErrors, setShoppingListLineDetailsMessageCode } = shoppingListLineDetails.actions;

// A selector
export const shoppingListLineDetailsSelector = (state: any) => state?.shoppingListLineDetails;

// The reducer
export default shoppingListLineDetails.reducer;


export function fetchGetShoppingListLineDetails(sessionId:any, { ListId, ListOwnerCode, PageNo }:{ ListId:string|undefined, ListOwnerCode:string, PageNo?:number  }){
  return async (dispatch: any) => {
    try {

      const URL = BASE_URL +`/GetShoppingListLineDetails`

      const tempData: any = await axios({
        method: "GET",
        url: URL,
        params:{ListId,ListOwnerCode,PageNo},
      });

      dispatch(getShoppingListLineDetailsSuccess(tempData?.data));
    } catch (error) {
      dispatch(getShoppingListLineDetailsFailure());
    }
  };
}