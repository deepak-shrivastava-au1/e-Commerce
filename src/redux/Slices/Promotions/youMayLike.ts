import { createSlice } from "@reduxjs/toolkit";
import axios from '@utilities/api/httpService';
import { BASE_URL } from "../../../routers/AppRoute";

export const initialState = {
  loading: true,
  hasErrors: false,
  youMayLike: [],
  youMayLikethis: [],
  relatedItems: [],
  youDontWantToMiss: [],
};

const youMayLikeSlice = createSlice({
  name: "youMayLike",
  initialState,
  reducers: {
    getyouMayLikeSuccess: (state, { payload }) => {
      state.youMayLike = payload;
      state.youDontWantToMiss = payload.crossSellProductList;
      state.youMayLikethis = payload.productList;
      state.relatedItems = payload.realtedItemsList;
      state.loading = false;
      state.hasErrors = false;
    },
    getUpdatedYouMayLikeSuccess: (state, { payload }) => {
      if (payload.page == "CON_YOU_MAY_LIKE_THIS") {
        const oldData = state?.youMayLikethis ? state.youMayLikethis : [{}];
        oldData[payload?.index] = { ...payload?.data.productList[0] };
      } else if (payload.page == "CON_RELATEDITEMS") {
        const oldData = state?.relatedItems ? state.relatedItems : [{}];
        oldData[payload?.index] = { ...payload?.data.productList[0] };
      } else if (payload.page == "CON_YOU_DONT_WANT_TO_MISS") {
        const oldData = state?.youDontWantToMiss
          ? state.youDontWantToMiss
          : [{}];
        oldData[payload?.index] = { ...payload?.data.productList[0] };
      }
      state.loading = false;
      state.hasErrors = false;
    },
    getyouMayLikeFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

// Three actions generated from the slice
export const {
  getyouMayLikeSuccess,
  getyouMayLikeFailure,
  getUpdatedYouMayLikeSuccess,
} = youMayLikeSlice.actions;

// A selector
export const youMayLikeSelector = (state: any) => state.youMayLike;

// The reducer
export default youMayLikeSlice.reducer;

// Asynchronous thunk action
export function fetchyouMayLike(
  sessionId: any,
  page: any,
  orderNumber: any,
  itemCode: any
) {
  return async (dispatch: any) => {
    try {
     
      let URL =
        BASE_URL +
        `/GetPromotionalItems?OrderBy=ASC&SortBy=code&Page=${page}&PageNo=1&mobile=false`;
      if (orderNumber != "") {
        URL =
          BASE_URL +
          `/GetPromotionalItems?OrderBy=ASC&SortBy=code&Page=${page}&OrderNum=${orderNumber}&PageNo=1&mobile=false`;
      }
      if (itemCode != "") {
        URL =
          BASE_URL +
          `/GetPromotionalItems?OrderBy=ASC&SortBy=code&Page=${page}&ItemCode=${itemCode}&PageNo=1&mobile=false`;
      }
      const youMayLikedata: any = await axios.get(URL);
      dispatch(getyouMayLikeSuccess(youMayLikedata?.data));
    } catch (error) {
      dispatch(getyouMayLikeFailure());
    }
  };
}

export function fetchUpdatedParamsPromotion(
  itemCode: string,
  sessionId: any,
  unit: string,
  index: number,
  page: string
) {
  return async (dispatch: any) => {
    try {
      const URL =
        BASE_URL +
        `/GetSingleItemDetail?ITEM_CODE=${itemCode}&UNIT_CODE=${unit}`;
      let productdata: any = await axios.get(URL);
      productdata.index = index;
      productdata.page = page;

      dispatch(getUpdatedYouMayLikeSuccess(productdata));
    } catch (error) {
      dispatch(getyouMayLikeFailure());
    }
  };
}
