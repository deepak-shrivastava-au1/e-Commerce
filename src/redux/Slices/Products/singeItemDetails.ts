import { createSlice } from "@reduxjs/toolkit";
import axios from '@utilities/api/httpService';
import { BASE_URL } from "../../../routers/AppRoute";

export const initialState = {
  loading: true,
  hasErrors: false,
  singeItemDetails: [],
};

const singleItemDetailsSlice = createSlice({
  name: "banners",
  initialState,
  reducers: {
    getSingleItemDetailsSuccess: (state, { payload }) => {
      state.singeItemDetails = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getSingleItemDetailsFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

// Three actions generated from the slice
export const { getSingleItemDetailsSuccess, getSingleItemDetailsFailure } =
  singleItemDetailsSlice.actions;

// A selector
export const bannersSelector = (state: any) => state?.banners;

// The reducer
export default singleItemDetailsSlice.reducer;

// Asynchronous thunk action
export function fetchbanners() {
  return async (dispatch: any) => {
    try {
      const URL = BASE_URL + `/GetBanner`;
      const singleItemData: any = await axios.get(URL);
      dispatch(getSingleItemDetailsSuccess(singleItemData.data));
    } catch (error) {
      dispatch(getSingleItemDetailsFailure());
    }
  };
}
