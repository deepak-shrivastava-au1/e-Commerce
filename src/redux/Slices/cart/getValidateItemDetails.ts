import { createSlice } from '@reduxjs/toolkit';
import axios from '@utilities/api/httpService';
import qs from "querystring"
import { BASE_URL } from '../../../routers/AppRoute'

export const initialState = {
  loading: false,
  hasErrors: false,
  messageCode:null,
  shouldCallAPI:false,
  data: null,
};

// A slice for products with our three reducers
const validateItemDetails = createSlice({
  name: 'validateItemDetails',
  initialState,
  reducers: {
    getValidateItemDetailsSuccess: (state, { payload }) => {
      
      if (typeof payload?.messageCode==='number') {
        state.messageCode=payload?.messageCode;
        state.loading = false;
        state.hasErrors = true;
        return;
      }
      state.data = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    setShouldCallValidateItemsAPI:(state,{ payload })=>{
      state.shouldCallAPI=payload;
    },
    setvalidateItemDetailsErrors:(state,{ payload })=>{
      state.hasErrors=payload;
    },
    initializeValidateItemDetailsLoader: (state) => {
      state.loading = true;
    },
    setValidateItemsMessageCode:(state,{ payload })=>{
      state.messageCode=payload
    },
    getValidateItemDetailsFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    }
  },
});

// Three actions generated from the slice
export const { getValidateItemDetailsFailure,getValidateItemDetailsSuccess,setValidateItemsMessageCode,setShouldCallValidateItemsAPI, setvalidateItemDetailsErrors, initializeValidateItemDetailsLoader } = validateItemDetails.actions;

// A selector
export const validateItemDetailsSelector = (state: any) => state?.validateItemDetails;

// The reducer
export default validateItemDetails.reducer;


export function fetchValidateItemsDetails(sessionId:any,itemsDetails:any){
  return async (dispatch: any) => {

    try {

      const URL = BASE_URL +`/validateItemsDetails`

      const tempData: any = await axios({
        method: "POST",
        url: URL,
        data: qs.stringify({
          ValidateItemsDetails: `${JSON.stringify(itemsDetails)}`,
        }),
        });

      dispatch(getValidateItemDetailsSuccess(tempData?.data));
    } catch (error) {
      dispatch(getValidateItemDetailsFailure());
    }
  };
}