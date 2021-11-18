import { createSlice } from "@reduxjs/toolkit";
import axios from '@utilities/api/httpService';
import { BASE_URL } from "../../../routers/AppRoute";
import qs from "qs";

export const initialState = {
  string: "",
  page: 1,
  filterValues: {},
  loading: true,
  hasErrors: false,
  products: [],
  searchItems: [],
  filter: [],
  isCompleted: false,
  messageCode: 0,
};

// A slice for products with our three reducers
const productsSlice = createSlice({
  name: "productsearch",
  initialState,
  reducers: {
    getproductsSuccess: (state, { payload }) => {
      state.searchItems = payload.solrItemSearchListBean;

      state.products = payload;

      state.loading = false;
      state.hasErrors = false;
    },
    getUpdatedProductsSuccess: (state, { payload }) => {
      const oldData = state?.searchItems ? state.searchItems : [{}];
      oldData[payload?.index] = { ...payload?.data?.solrItemSearchListBean[0] };
      state.loading = false;
      state.hasErrors = false;
    },
    getproductsFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
    currentString(state, action) {
      state.string = action.payload;
    },
    currentPage(state, action) {
      state.page = action.payload;
    },
    filter_Values(state, { payload }) {
      state.filterValues = { ...state.filterValues, payload };
    },
    intitalizeLoader: (state) => {
      state.loading = true;
    },
    stopLoader: (state) => {
      state.loading = false;
    },
    setCompleted: (state, { payload }) => {
      state.isCompleted = payload;
    },
    setMessageCode: (state, { payload }) => {
      state.messageCode = payload;
    },
  },
});

// Three actions generated from the slice
export const {
  getproductsSuccess,
  getproductsFailure,
  currentString,
  filter_Values,
  intitalizeLoader,
  stopLoader,
  setCompleted,
  setMessageCode,
  currentPage,
  getUpdatedProductsSuccess,
} = productsSlice.actions;

// A selector
export const productsSelector = (state: any) => state?.products;

export const productItemsSelector = (state: any) => state?.products;
// A selector
export const CurrentSearchString = (state: any) => state?.products;

// A selector
export const FetchFilterValues = (state: any) =>
  state?.products.filterValues.payload;

// The reducer
export default productsSlice.reducer;

// Asynchronous thunk action
export function fetchProducts(
  inputQuery: any,
  PageNo?: number,
  language?: string
) {
  return async (dispatch: any) => {
    try {
      dispatch(setCompleted(false));
      const URL =
        BASE_URL +
        `/GetSolrSearchResults?${
          inputQuery ? "&FREE_TEXT=" + inputQuery : ""
        }&LanguageCode=${language ? `${language}` : "EN"}&OPR_AND_OR=&PageNo=${
          PageNo ? `${PageNo}` : "1"
        }&sortBy=&orderBy=`;
      const productdata: any = await axios.get(URL);
      dispatch(getproductsSuccess(productdata?.data));
      dispatch(setCompleted(true));
    } catch (error) {
      dispatch(getproductsFailure());
      dispatch(setCompleted(true));
    }
  };
}

//API call for filter

export function filterProducts(
  filterValues: any,
  sessionId: any,
  PageNo?: number,
  language?: string,
  inputQuery?: string
) {
  return async (dispatch: any) => {
    const objString = JSON.stringify(filterValues);
    let searchString = "";
    if (inputQuery) {
      searchString = `"ITEM_ID":${inputQuery},"ITEM_DESC":${inputQuery},"ITEM_WEBTXT":${inputQuery},`;
    }
    try {
      dispatch(setCompleted(false));
      const url =
        BASE_URL + `/SolrItemSearchMultiFiltersResults;jsessionid=${sessionId}`;
      const productdata = await axios({
        method: "POST",
        url: url,
        data: qs.stringify({
          solrSearchInputBean: `[{
          ${searchString}
          "OPR_AND_OR":"","languageCode":${
            language ? `${language}` : "EN"
          },"SortBy":"NONE","PAGE_NUMBER"=${
            PageNo ? `${PageNo}` : 1
          },"openSearch":false,${objString.substring(
            1,
            objString.length - 1
          )}}]`,
        }),
      })
        .then((result: any) => {
          console.log("result", result);
          dispatch(getproductsSuccess(result?.data));
          dispatch(setCompleted(true));
        })
        .catch((err) => {
          // Do somthing
          dispatch(getproductsFailure());
          dispatch(setCompleted(true));
        });
    } catch (error) {
      dispatch(getproductsFailure());
      dispatch(setCompleted(true));
      alert("Failed");
    }
  };
}

//API call for Sorting
export function sortProducts(
  sortBy: string,
  sessionId: any,
  language?: string,
  inputQuery?: string,
  filterValues?: any
) {
  var newValue = sortBy.split(" ");
  const objString = JSON.stringify(filterValues);
  let filterObject = "";
  if (
    objString !== null &&
    objString?.substring(1, objString.length - 1) !== null &&
    objString?.substring(1, objString.length - 1).length > 0
  ) {
    filterObject = "," + objString.substring(1, objString.length - 1);
  }
  let searchString = "";
  if (inputQuery) {
    searchString = `"ITEM_ID":${inputQuery},"ITEM_DESC":${inputQuery},"ITEM_WEBTXT":${inputQuery},`;
  }
  return async (dispatch: any) => {
    try {
      dispatch(setCompleted(false));
      const url =
        BASE_URL + `/SolrItemSearchMultiFiltersResults;jsessionid=${sessionId}`;
      const response = await axios({
        method: "POST",
        url: url,
        data: qs.stringify({
          solrSearchInputBean: `[{
            ${searchString}
            "languageCode":${language ? `"${language}"` : "EN"},"SortBy":"${
            newValue[0]
          }","orderBy":"${
            newValue[1]
          }","SEARCH_TYPE":"ADV","PAGE_NUMBER":1,"NoOfItems":10,"ResolutionChanged":true,"openSearch":false
        ${filterObject}}]`,
        }),
      })
        .then((result: any) => {
          console.log("resultS", result);
          dispatch(getproductsSuccess(result.data));
          dispatch(setCompleted(true));
        })
        .catch((err) => {
          // Do somthing
          dispatch(getproductsFailure());
          dispatch(setCompleted(true));
        });
    } catch (error) {
      dispatch(getproductsFailure());
      dispatch(setCompleted(true));
      alert("Failed");
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
        `/GetSingleItemDetail?ITEM_CODE=${itemCode}&UNIT_CODE=${unit}&Page=ItemSearchPage`;
      let productdata: any = await axios.get(URL);
      productdata.index = index;

      dispatch(getUpdatedProductsSuccess(productdata));
    } catch (error) {
      dispatch(getproductsFailure());
    }
  };
}
