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
const shoppingListsDetails = createSlice({
  name: 'shoppingListsDetails',
  initialState,
  reducers: {
    getShoppingListsDetailsSuccess: (state, { payload }) => {

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
        if(payload?.messageCode===111){
          state.data=[]
        }
        return;
      }
      state.data = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    setMessageCode:(state,{ payload })=>{
      state.messageCode=payload
    },
    initializeShoppingListsDetailsLoader: (state) => {
      state.loading = true;
    },
    setShoppingListsDetailsMessageCode:(state,{ payload })=>{
      state.messageCode = payload
    },
    setShoppingListsDetailsHasErrors:(state,{ payload })=>{
      state.hasErrors = payload
    },
    getShoppingListsDetailsFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    }
  },
});

// Three actions generated from the slice
export const { getShoppingListsDetailsFailure,getShoppingListsDetailsSuccess, setMessageCode ,initializeShoppingListsDetailsLoader, setShoppingListsDetailsHasErrors, setShoppingListsDetailsMessageCode } = shoppingListsDetails.actions;

// A selector
export const shoppingListsDetailsSelector = (state: any) => state?.shoppingListsDetails;

// The reducer
export default shoppingListsDetails.reducer;


export function fetchGetShoppingListSearchDetails(sessionId:any, rest:any){
  return async (dispatch: any) => {

    try {

      const URL = BASE_URL +`/GetShoppingListSearchDetails`

      const tempData: any = await axios({
        method: "GET",
        url: URL,
        params:{...rest},
      });

      dispatch(getShoppingListsDetailsSuccess(tempData?.data));
    } catch (error) {
      dispatch(getShoppingListsDetailsFailure());
    }
  };
}