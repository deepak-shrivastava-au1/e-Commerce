import { createSlice } from '@reduxjs/toolkit';
import axios from '@utilities/api/httpService';
import { BASE_URL } from '../../../routers/AppRoute';

export const initialState = {
  loading: true,
  hasErrors: false,
  banners: [],
};

const bannerSlice = createSlice({
  name: 'banners',
  initialState,
  reducers: {
    getbannersSuccess: (state, { payload }) => {
      state.banners = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getbannersFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

// Three actions generated from the slice
export const { getbannersSuccess, getbannersFailure } = bannerSlice.actions;

// A selector
export const bannersSelector = (state: any) => state?.banners;

// The reducer
export default bannerSlice.reducer;

// Asynchronous thunk action
export function fetchbanners() {
  return async (dispatch: any) => {
    try {
      const URL = BASE_URL + `/GetBanner`;
      const bannerdata: any = await axios.get(URL);
      dispatch(getbannersSuccess(bannerdata.data));
    } catch (error) {
      dispatch(getbannersFailure());
    }
  };
}
