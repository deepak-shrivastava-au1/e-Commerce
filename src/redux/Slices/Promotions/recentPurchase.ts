import { createSlice } from "@reduxjs/toolkit";
import axios from '@utilities/api/httpService';
import { BASE_URL } from "../../../routers/AppRoute";

export const initialState = {
  loading: true,
  hasErrors: false,
  recentItems: [],
  searchFilterslist: [],
  searchFilterSettings: [],
  searchFilters: {},
  isFilterApply: false,
};

const recentPurchaseSlice = createSlice({
  name: "recentPurchase",
  initialState,
  reducers: {
    getrecentPurchaseSuccess: (state, { payload }) => {
      state.recentItems = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getrecentPurchaseFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
    getorderFilterSuccess: (state, { payload }) => {
      state.searchFilterslist = payload.filterJsonData;
      state.searchFilterSettings = payload.filterSettingJsonData;

      state.hasErrors = false;
    },
    updateSearchFilter: (state, { payload }) => {
      const {
        customerSearch,
        statusSearch,
        orderTypeSearch,
        requestInputSearch,
      } = payload;
      state.searchFilters = {
        Customer: customerSearch,
        Status: statusSearch,
        OrderType: orderTypeSearch,
        RequestTextSearch: requestInputSearch,
      };
      state.isFilterApply = true;
    },
    clearSearchFilter: (state) => {
      state.searchFilters = {};
      state.isFilterApply = false;
    },
    intitalizeLoader: (state) => {
      state.loading = true;
    },
  },
});

// Three actions generated from the slice
export const recentPurchaseactions = recentPurchaseSlice.actions;

// A selector
export const recentPurchaseSelector = (state: any) => state.recentPurchase;

// The reducer
export default recentPurchaseSlice.reducer;

// Asynchronous thunk action
export function fetchrecentPurchase(
  sessionId: any,
  orderBy: any,
  sortColumn: any,
  pageNumber?: number,
  isSearch: boolean = false,
  Customer?: any,
  Status?: any,
  OrderType?: any,
  RequestTextSearch?: any
) {
  return async (dispatch: any) => {
    try {
      

      let URL =
        BASE_URL +
        `/GetMyTopItems?OrderBy=${orderBy}&sortColumn=${sortColumn}&PageNo=${pageNumber}&sessionId=` +
        `${sessionId}`;

      if (
        isSearch &&
        (Status != null ||
          Status != "" ||
          OrderType != null ||
          OrderType != "" ||
          RequestTextSearch != null ||
          RequestTextSearch != "")
      ) {
        URL =
          BASE_URL +
          `/GetMyTopItems?OrderBy=${orderBy}&sortColumn=${sortColumn}&PageNo=${pageNumber}` +
          `${Status ? "&Status=" + Status : ""}` +
          `${Customer ? "&Customer=All" : ""}` +
          `${OrderType ? "&OrderType=" + OrderType : ""}` +
          `${RequestTextSearch ? "&Product=" + RequestTextSearch : ""}` +
          `&sessionId=${sessionId} `;
      }

      const historyData: any = await axios.get(URL);
      dispatch(
        recentPurchaseactions.getrecentPurchaseSuccess(historyData?.data)
      );
    } catch (error) {
      dispatch(recentPurchaseactions.getrecentPurchaseFailure());
    }
  };
}

export function recentPurchaseFilterDetails(sessionId: any) {
  return async (dispatch: any) => {
    try {
      
      const URLsettings = BASE_URL + `/GetMyTopItemsSearchFilter`;
      const URL = BASE_URL + `/GetFilterDetails`;
      const response: any = await axios.get(URL);
      if (response.status == "200") {
        var filterJsonData = response?.data;
        const settingresponse: any = await axios.get(URLsettings);
        var filterSettingJsonData = settingresponse.data;
        dispatch(
          recentPurchaseactions.getorderFilterSuccess({
            filterJsonData,
            filterSettingJsonData,
          })
        );
      }
    } catch (error) {
      // dispatch(recentPurchaseactions.getrecentPurchaseFailure());
    }
  };
}
