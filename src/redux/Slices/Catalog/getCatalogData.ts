import { createSlice } from "@reduxjs/toolkit";
import axios from '@utilities/api/httpService';
import { BASE_URL } from "../../../routers/AppRoute";
import qs from "qs";

export const initialState = {
  page: 1,
  filterValues: {},
  products: [],
  filter: [],
  isCompleted: false,
  messageCode: 0,
  catalogProductsList: [],
};

// A slice for products with our three reducers
const catalogSlice = createSlice({
  name: "catalogProducts",
  initialState,
  reducers: {
    getCatalogProducts: (state, { payload }) => {
      state.catalogProductsList = payload.productList;
      state.products = payload;
    },
    getUpdatedCatalogProducts: (state, { payload }) => {
      const oldData = state?.catalogProductsList
        ? state.catalogProductsList
        : [{}];
      oldData[payload?.index] = { ...payload?.data?.productList[0] };
    },
    catalogFilterData(state, { payload }) {
      state.filterValues = { ...state.filterValues, payload };
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
  getCatalogProducts,
  catalogFilterData,
  setCompleted,
  setMessageCode,
  getUpdatedCatalogProducts,
} = catalogSlice.actions;

// A selector
export const catalogSelector = (state: any) => state?.catalogDetails;

export const catalogProductsSelector = (state: any) =>
  state?.catalogDetails?.catalogProductsList;

// The reducer
export default catalogSlice.reducer;

// Asynchronous thunk action
export function fetchCatalogProducts(
  CAT_ID: any,
  PageNo?: number,
  ELEMENT_ID?: string,
  NoOfItems?: number,
  ResolutionChanged?: boolean
) {
  return async (dispatch: any) => {
    try {
      dispatch(getCatalogProducts([]));
      dispatch(catalogFilterData([]));
      dispatch(setCompleted(false));
      dispatch(setMessageCode(0));
      const URL =
        BASE_URL +
        `/GetCatalogueProductList?CAT_ID=${CAT_ID}&PageNo=${
          PageNo ? `${PageNo}` : 1
        }&ELEMENT_ID=${ELEMENT_ID}&NoOfItems=${
          NoOfItems ? NoOfItems : 10
        }&ResolutionChanged=${ResolutionChanged ? ResolutionChanged : false}`;
      const productdata: any = await axios.get(URL);
      dispatch(getCatalogProducts(productdata?.data));
      dispatch(setCompleted(true));
    } catch (error) {
      dispatch(setCompleted(true));
    }
  };
}

//API call for filter catalog

export function filterCatalog(
  filterValues: any,
  sessionId: any,
  PageNo: number,
  ID: any,
  CAT_ID: any,
  ELEMENT_ID: string,
  orderBy?: any,
  sortBy?: any
) {
  return async (dispatch: any) => {
    const objString = JSON.stringify(filterValues);
    try {
      dispatch(getCatalogProducts([]));
      dispatch(catalogFilterData([]));
      dispatch(setCompleted(false));
      dispatch(setMessageCode(0));
      const url = BASE_URL + `/CatalogueProductList;jsessionid=${sessionId}`;
      const productdata = await axios({
        method: "POST",
        url: url,
        data: qs.stringify({
          CatalogueProductListInputBean: `[{"CAT_ID":'${CAT_ID}',"PAGE_NUMBER"=${
            PageNo ? `${PageNo}` : "1"
          },"ELEMENT_ID":'${ELEMENT_ID}',"SortBy":'${""}',"orderBy":'${""}',${objString.substring(
            1,
            objString.length - 1
          )}}]`,
        }),
      })
        .then((result: any) => {
          dispatch(getCatalogProducts(result?.data));
          dispatch(setCompleted(true));
        })
        .catch((err) => {
          // Do somthing
          dispatch(setCompleted(true));
        });
    } catch (error) {
      dispatch(setCompleted(true));
      alert("Failed");
    }
  };
}

//API call for sorting catalog

export function sortCatalog(
  filterValues: any,
  sessionId: any,
  PageNo: number,
  ID: any,
  CAT_ID: any,
  ELEMENT_ID: string,
  sortBy?: any
) {
  return async (dispatch: any) => {
    var newValue = sortBy.split(" ");
    const objString = JSON.stringify(filterValues);
    let filterObject = "";
    if (
      objString !== null &&
      objString?.substring(1, objString.length - 1) !== null &&
      objString?.substring(1, objString.length - 1).length > 0
    ) {
      filterObject = "," + objString?.substring(1, objString.length - 1);
    }
    try {
      dispatch(getCatalogProducts([]));
      dispatch(catalogFilterData([]));
      dispatch(setCompleted(false));
      dispatch(setMessageCode(0));
      const url = BASE_URL + `/CatalogueProductList;jsessionid=${sessionId}`;
      const productdata = await axios({
        method: "POST",
        url: url,
        data: qs.stringify({
          CatalogueProductListInputBean: `[{"CAT_ID":'${CAT_ID}',"PAGE_NUMBER"=${
            PageNo ? `${PageNo}` : "1"
          },"ELEMENT_ID":'${ELEMENT_ID}',"SortBy":'${newValue[0]}',"orderBy":'${
            newValue[1]
          }'${filterObject}}]`,
        }),
      })
        .then((result: any) => {
          dispatch(getCatalogProducts(result?.data));
          dispatch(setCompleted(true));
        })
        .catch((err) => {
          // Do somthing
          dispatch(setCompleted(true));
        });
    } catch (error) {
      dispatch(setCompleted(true));
      alert("Failed");
    }
  };
}

export function fetchUpdatedParamsCatalog(
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

      dispatch(getUpdatedCatalogProducts(productdata));
    } catch (error) {}
  };
}
