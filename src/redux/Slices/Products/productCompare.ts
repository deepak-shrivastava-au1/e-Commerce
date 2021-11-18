
// GetProductDetails
import { createSlice } from "@reduxjs/toolkit";
import axios from '@utilities/api/httpService';
import { BASE_URL } from "../../../routers/AppRoute";
import qs from "qs";
import { internalServerErrorCode } from '@utilities/error/serviceErrorCodeUtil';

export const initialState = {
  compareDetails: [],
  isCompleted:false,
  messageCode:0
};

// A slice for products Details
const productCompareSlice = createSlice({
  name: "productCompare",
  initialState,
  reducers: {
    getCompareDetails: (state, { payload }) => {
      state.compareDetails = payload;
    },
    setCompleted: (state, { payload }) => {
      state.isCompleted = payload;
    },
    setMessageCode: (state, { payload }) => {
      state.messageCode = payload;
    },
  },
});

export const { getCompareDetails, setCompleted, setMessageCode } =
  productCompareSlice.actions;

// A selector
export const productsCompareListSelector = (state: any) => state.productCompare;
// The reducer
export default productCompareSlice.reducer;

export function compareProducts(itemCodes: any, sessionId: any) {
  console.log("compare", itemCodes);
  return async (dispatch: any) => {
    try {
      dispatch(getCompareDetails([]));
      dispatch(setCompleted(false));
      dispatch(setMessageCode(0));
      const url = BASE_URL + `/CompareItems;jsessionid=${sessionId}`;
      const productdata = await axios({
        method: "POST",
        url: url,
        data: qs.stringify({
          CompareBean: `[{"ITEM_ID":"${itemCodes[0]}"},{"ITEM_ID":"${
            itemCodes[1]
          }"}${itemCodes[2] ? `, {"ITEM_ID":"${itemCodes[2]}"}`:''}${
            itemCodes[3] ? `, {"ITEM_ID": "${itemCodes[3]}"}`:''
          }]`,
        }),
      }).then((result: any) => {
        dispatch(getCompareDetails(result?.data));
        dispatch(setCompleted(true));
        if(result.data.messageCode != null) {
          dispatch(setMessageCode(result.data.messageCode));
        }
     
      }
      ).catch(error => {
        dispatch(setCompleted(true));
        dispatch(setMessageCode(internalServerErrorCode));
    
      })
    } catch (error) {
      dispatch(setCompleted(true));
      dispatch(setMessageCode(internalServerErrorCode));
 
    }
  };
}
