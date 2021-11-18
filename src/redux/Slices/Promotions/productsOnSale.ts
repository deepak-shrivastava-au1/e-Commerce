import { createSlice } from '@reduxjs/toolkit';
import axios from '@utilities/api/httpService';
import { BASE_URL } from '../../../routers/AppRoute';

export const initialState = {
  loading: true,
  hasErrors: false,
  productsOnSale: [],
};

const productsOnSaleSlice = createSlice({
  name: 'productsOnSale',
  initialState,
  reducers: {
    getproductsOnSaleSuccess: (state, { payload }) => {
      state.productsOnSale = payload.productList;
      state.loading = false;
      state.hasErrors = false;
    },
    getproductsOnSaleFailure: (state) => {
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
  getproductsOnSaleSuccess,
  getproductsOnSaleFailure,
  intitalizeLoader,
} = productsOnSaleSlice.actions;

// A selector
export const productsOnSaleSelector = (state: any) => state?.productsOnSale;

// The reducer
export default productsOnSaleSlice.reducer;

// Asynchronous thunk action
export function fetchproductsOnSale(language?: string) {
  return async (dispatch: any) => {
    try {
      const URL =
        BASE_URL +
        `/GetHomeCatalogue?PageNo=1&NoOfItems=10&ResolutionChanged=false&LanguageCode=${
          language ? `${language}` : 'EN'
        }`;
      const productsOnSaledata: any = await axios.get(URL);
      dispatch(getproductsOnSaleSuccess(productsOnSaledata?.data));
    } catch (error) {
      dispatch(getproductsOnSaleFailure());
    }
  };
}
