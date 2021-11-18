import { createSlice } from "@reduxjs/toolkit";
import axios from '@utilities/api/httpService';
import { BASE_URL } from "../../../../routers/AppRoute";

export const initialState = {
  loading: true,
  hasErrors: false,
  invoices: [],
  searchFilterslist: [],
  searchFilterSettings: [],
  searchFilters: {},
  isFilterApply: false,
};

const invoicehistorySlice = createSlice({
  name: "invoicehistory",
  initialState,
  reducers: {
    getinvoiceSuccess: (state, { payload }) => {
      state.invoices = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getinvoiceFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
    getinvoiceFilterSuccess: (state, { payload }) => {
      state.searchFilterslist = payload.filterJsonData;
      state.searchFilterSettings = payload.filterSettingJsonData;
      state.loading = false;
      state.hasErrors = false;
    },
    updateSearchFilter: (state, { payload }) => {
      state.searchFilters = {
        ...payload,
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
export const invoicehistoryactions = invoicehistorySlice.actions;

// A selector
export const invoicehistorySelector = (state: any) => state;

// The reducer
export default invoicehistorySlice.reducer;

// Asynchronous thunk action
export function fetchinvoicehistory(
  sessionId: any,
  orderBy: any,
  sortColumn: any,
  pageNumber?: number,
  isSearch: boolean = false,
  customer?: any,
  invoiceno?: any,
  orderno?: any,
  orderref?: any,
  yourorderno?: any,
  invoiceCustomer?: any,
  product?: any,
  description?: any,
  address?: any,
  serialno?: any,
  invoiceType?: any,
  salesPerson?: any
) {
  return async (dispatch: any) => {
    try {
      
      let URL =
        BASE_URL +
        `/GetInvoiceHistory?OrderBy=${orderBy}&sortColumn=${sortColumn}&PageNo=${pageNumber}&sessionId=` +
        `${sessionId}`;
      if (isSearch) {
        URL += `&InvoiceType=${invoiceType}&Salesperson=${salesPerson}`
        if (customer !== "") URL += `&Customer=${customer}`;
        if (invoiceno !== "") URL += `&InvoiceNumber=${invoiceno}`;
        if (orderno !== "") URL += `&OrderNumber=${orderno}`;
        if (orderref !== "") URL += `&OrderReference=${orderref}`;
        if (yourorderno !== "") URL += `&YourReference=${yourorderno}`;
        if (invoiceCustomer !== "") URL += `&InvoiceCustomer=${invoiceCustomer}`;
        if (product !== "") URL += `&ItemCode=${product}`;
        if (description !== "") URL += `&ItemDescription=${description}`;
        if (address !== "") URL += `&CustomerAdd=${address}`;
        if (serialno !== "") URL += `&SerialNumber=${serialno}`;
      }
      const historyData: any = await axios.get(URL);
      dispatch(invoicehistoryactions.getinvoiceSuccess(historyData?.data));
    } catch (error) {
      dispatch(invoicehistoryactions.getinvoiceFailure());
    }
  };
}

export function invoiceFilterDetails(sessionId: any) {
  return async (dispatch: any) => {
    try {
      
      const URLsettings = BASE_URL + `/GetInvoiceSearchFilters`;
      const URL = BASE_URL + `/GetFilterDetails`;
      const response: any = await axios.get(URL);
      if (response.status == "200") {
        var filterJsonData = response?.data;
        const settingresponse: any = await axios.get(URLsettings);
        var filterSettingJsonData = settingresponse.data;
        dispatch(
          invoicehistoryactions.getinvoiceFilterSuccess({
            filterJsonData,
            filterSettingJsonData,
          })
        );
      }
    } catch (error) {
      // dispatch(orderhistoryactions.getorderhistoryFailure());
    }
  };
}
