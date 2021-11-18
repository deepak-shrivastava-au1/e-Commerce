import { createSlice } from "@reduxjs/toolkit";
import axios from '@utilities/api/httpService';
import qs from "qs";
import { BASE_URL } from "../../../routers/AppRoute";

export const initialState = {
  loading: true,
  hasErrors: false,
  bestOffer: [],
  bestOfferViewAll: [],
};

const bestOfferSlice = createSlice({
  name: "bestOffer",
  initialState,
  reducers: {
    getbestOfferSuccess: (state, { payload }) => {
      state.bestOffer = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getbestOfferFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
    getbestOfferViewAllSuccess: (state, { payload }) => {
      state.bestOfferViewAll = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getUpdatedBestOfferViewAllSuccess: (state, { payload }) => {
      const oldData = state?.bestOfferViewAll ? state.bestOfferViewAll : [{}];
      oldData[payload?.index] = { ...payload?.data.productList[0] };
      state.loading = false;
      state.hasErrors = false;
    },
    getbestOfferViewAllFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
    intitalizeLoader: (state) => {
      state.loading = true;
    },
  },
});

// Three actions generated from the slice
export const {
  getbestOfferSuccess,
  getbestOfferFailure,
  getbestOfferViewAllSuccess,
  getbestOfferViewAllFailure,
  intitalizeLoader,
  getUpdatedBestOfferViewAllSuccess,
} = bestOfferSlice.actions;

// A selector
export const bestOfferSelector = (state: any) => state?.bestOffer;

// The reducer
export default bestOfferSlice.reducer;

// Asynchronous thunk action
export function fetchbestOffer() {
  return async (dispatch: any) => {
    try {
      const URL =
        BASE_URL +
        `/GetPromotionCampaignItems?OrderBy=ASC&SortBy=code&Page=Catalogue&Type=PromotionCampaign&currentPage=home&PageNo=1&mobile=false`;
      const bestOfferdata: any = await axios.get(URL);
      dispatch(getbestOfferSuccess(bestOfferdata?.data?.productList));
    } catch (error) {
      dispatch(getbestOfferFailure());
    }
  };
}

export function fetchbestOfferViewAll() {
  return async (dispatch: any) => {
    try {
      const URL =
        BASE_URL +
        `/GetPromotionCampaignItems?OrderBy=ASC&SortBy=code&Page=Catalogue&Type=PromotionCampaign&PageNo=1&mobile=false`;
      const bestOfferdata: any = await axios.get(URL);
      dispatch(getbestOfferViewAllSuccess(bestOfferdata?.data?.productList));
    } catch (error) {
      dispatch(getbestOfferViewAllFailure());
    }
  };
}

export function fetchUpdatedParams(
  itemCode: string,
  sessionId: any,
  unit: string,
  index: number
) {
  return async (dispatch: any) => {
    try {
      
      const URL =
        BASE_URL +
        `/GetSingleItemDetail?ITEM_CODE=${itemCode}&UNIT_CODE=${unit}`;
      let productdata: any = await axios.get(URL);
      productdata.index = index;

      dispatch(getUpdatedBestOfferViewAllSuccess(productdata));
    } catch (error) {
      dispatch(getbestOfferViewAllFailure());
    }
  };
}
