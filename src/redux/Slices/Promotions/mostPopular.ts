import { createSlice } from "@reduxjs/toolkit";
import axios from '@utilities/api/httpService';
import { BASE_URL } from "../../../routers/AppRoute";

export const initialState = {
  loading: true,
  hasErrors: false,
  mostPopular: [],
  mostPopularViewAll: [],
};

const mostPopularSlice = createSlice({
  name: "mostPopular",
  initialState,
  reducers: {
    getmostPopularSuccess: (state, { payload }) => {
      state.mostPopular = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getmostPopularFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
    getmostPopularViewAllSuccess: (state, { payload }) => {
      state.mostPopularViewAll = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getUpdatedPopularViewAllSuccess: (state, { payload }) => {
      const oldData = state?.mostPopularViewAll
        ? state.mostPopularViewAll
        : [{}];
      oldData[payload?.index] = { ...payload?.data.productList[0] };
      state.loading = false;
      state.hasErrors = false;
    },
    getmostPopularViewAllFailure: (state) => {
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
  getmostPopularSuccess,
  getmostPopularFailure,
  getmostPopularViewAllSuccess,
  getmostPopularViewAllFailure,
  intitalizeLoader,
  getUpdatedPopularViewAllSuccess,
} = mostPopularSlice.actions;

// A selector
export const mostPopularSelector = (state: any) => state?.mostPopular;

// The reducer
export default mostPopularSlice.reducer;

// Asynchronous thunk action
export function fetchmostPopular() {
  return async (dispatch: any) => {
    try {
      const URL =
        BASE_URL +
        `/GetMostPopularItems?OrderBy=ASC&SortBy=code&Page=Catalogue&Type=MostPopular&currentPage=home&PageNo=1&mobile=false`;
      const mostPopulardata: any = await axios.get(URL);
      dispatch(getmostPopularSuccess(mostPopulardata?.data?.productList));
    } catch (error) {
      dispatch(getmostPopularFailure());
    }
  };
}

export function fetchmostPopularViewAll() {
  return async (dispatch: any) => {
    try {
      const URL =
        BASE_URL +
        `/GetMostPopularItems?OrderBy=ASC&SortBy=code&Page=Catalogue&Type=MostPopular&PageNo=1&mobile=false`;
      const mostPopulardata: any = await axios.get(URL);
      dispatch(
        getmostPopularViewAllSuccess(mostPopulardata?.data?.productList)
      );
    } catch (error) {
      dispatch(getmostPopularViewAllFailure());
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

      dispatch(getUpdatedPopularViewAllSuccess(productdata));
    } catch (error) {
      dispatch(getmostPopularViewAllFailure());
    }
  };
}
