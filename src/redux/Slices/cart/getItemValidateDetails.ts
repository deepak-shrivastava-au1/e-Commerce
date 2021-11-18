import { createSlice } from '@reduxjs/toolkit';
import axios from '@utilities/api/httpService';
import qs from "querystring"
import { BASE_URL } from '../../../routers/AppRoute'

interface IProps {
  loading:boolean
  hasErrors:boolean
  itemId:string
  row:number|undefined
  data:undefined|string
  quantity:number|undefined
}

export const initialState:IProps = {
  loading: false,
  hasErrors: false,
  row:undefined,
  quantity:undefined,
  itemId:'',
  data: undefined,
};

// A slice for products with our three reducers
const ItemValidateDetailsSlice = createSlice({
  name: 'itemValidateDetails',
  initialState,
  reducers: {
    getItemValidateDetailsSuccess: (state, { payload }) => {

      if (typeof payload?.messageCode==="number") {
        state.data='invalid item'
        state.loading = false;
        state.hasErrors = false;
        return;
      }
      state.data = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    setRow:(state,{ payload })=>{
      state.row=payload
    },
    setQuantity:(state,{ payload })=>{
      state.quantity=payload
    },
    setItemId:(state,{ payload })=>{
      state.itemId=payload
    },
    initializeItemValidateDetailsLoader: (state) => {
      state.loading = true;
    },
    getItemValidateDetailsFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    }
  },
});

// Three actions generated from the slice
export const { getItemValidateDetailsFailure, getItemValidateDetailsSuccess, setQuantity, setRow, initializeItemValidateDetailsLoader,setItemId } = ItemValidateDetailsSlice.actions;

// A selector
export const ItemValidateDetailsSelector = (state: any) => state?.itemValidateDetails;

// The reducer
export default ItemValidateDetailsSlice.reducer;


export function fetchGetItemValidateDetails(sessionId:any,row: number,itemId:string,ITEM_CODE:string,PAGE:string){
  return async (dispatch: any) => {

    try {

      const URL = BASE_URL +`/GetItemValidateDetails`

      dispatch(setItemId(itemId))
      dispatch(setRow(row))

      const tempData: any = await axios({
        method: "GET",
        url: URL,
        params:{ITEM_CODE,PAGE},
      });
      
      dispatch(getItemValidateDetailsSuccess(tempData?.data));
    } catch (error) {
      dispatch(getItemValidateDetailsFailure());
    }
  };
}