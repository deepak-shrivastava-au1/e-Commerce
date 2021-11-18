// GetProductDetails
import { createSlice } from "@reduxjs/toolkit";
import axios from '@utilities/api/httpService';
import { BASE_URL } from "../../../routers/AppRoute";
import qs from "qs";

export const initialState = {
  productDetails: [],
  updatePrice: [],
  isCompleted: false,
  messageCode: 0,
};

// A slice for products Details
const productsDetailsSlice = createSlice({
  name: "productDetails",
  initialState,
  reducers: {
    getProductDetails: (state, { payload }) => {
      state.productDetails = payload;
    },
    getUpdatedPrice: (state, { payload }) => {
      state.updatePrice = payload;
    },
    setCompleted: (state, { payload }) => {
      state.isCompleted = payload;
    },
    setMessageCode: (state, { payload }) => {
      state.messageCode = payload;
    },
  },
});

export const {
  getProductDetails,
  getUpdatedPrice,
  setCompleted,
  setMessageCode,
} = productsDetailsSlice.actions;

// A selector
export const productsDetailsSelector = (state: any) =>
  state?.productDetails.productDetails;
export const priceDetailsSelector = (state: any) =>
  state.productDetails.updatePrice;
export const productDetailsStates = (state: any) => state.productDetails;

// The reducer
export default productsDetailsSlice.reducer;

// The Get API call for product details
export function fetchProductDetails(itemCode: string, sessionId: any) {
  return async (dispatch: any) => {
    try {
      dispatch(setCompleted(false));
      dispatch(setMessageCode(0));
      
      const URL = BASE_URL + `/GetProductDetails?ITEM_CODE=${itemCode}`;
      const productdata: any = await axios.get(URL);
      console.log("Details6", productdata.data);
      dispatch(getProductDetails(productdata.data));
      dispatch(setCompleted(true));
    } catch (error) {
      dispatch(setCompleted(true));
    }
  };
}

// The Get API call for product details Units
export function fetchProductUnits(
  itemCode: string,
  sessionId: any,
  unit: string
) {
  return async (dispatch: any) => {
    try {
      dispatch(setCompleted(false));
      dispatch(setMessageCode(0));
     
      const URL =
        BASE_URL + `/GetProductDetails?ITEM_CODE=${itemCode}&UNIT_CODE=${unit}`;
      const productdata: any = await axios.get(URL);
      console.log("Details6", productdata.data);
      dispatch(getProductDetails(productdata.data));
      dispatch(setCompleted(true));
    } catch (error) {
      dispatch(setCompleted(true));
    }
  };
}

export function CalculatePrice(
  itemCode: string,
  sessionId: any,
  unit: any,
  currencyCode: any,
  dateString: string,
  quantity: number
) {
  return async (dispatch: any) => {
    try {
      dispatch(setCompleted(false));
      dispatch(setMessageCode(0));
      const url = BASE_URL + `/CalculatePrice;jsessionid=${sessionId}`;
      const productdata = await axios({
        method: "POST",
        url: url,
        data: qs.stringify({
          PriceCalculationData: `[{"itemCode":${itemCode},"unitCode":${unit},"currencyCode":${currencyCode},"dateString":${dateString},"quantity":${quantity}}]`,
        }),
      })
        .then((result: any) => {
          dispatch(getUpdatedPrice(result?.data));
          dispatch(setCompleted(true));
        })
        .catch(() => {
          dispatch(setCompleted(true));
        });
    } catch (error) {
      dispatch(setCompleted(true));
    }
  };
}
