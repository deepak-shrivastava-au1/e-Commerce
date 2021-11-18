import { createSlice } from '@reduxjs/toolkit';
import axios from '@utilities/api/httpService';
import { BASE_URL } from '../../../routers/AppRoute'
import { fetchGetShoppingListLineDetails, initializeShoppingListLineDetailsLoader } from './getShoppingListLineDetails';
import qs from 'querystring'

export const initialState = {
  loading: false,
  hasErrors: false,
  messageCode: null,
  data: null,
};

// A slice for products with our three reducers
const deleteShoppingListLines = createSlice({
  name: 'deleteShoppingListLines',
  initialState,
  reducers: {
    getDeleteShoppingListLinesSuccess: (state, { payload }) => {

      if (!payload) {
        state.loading = false;
        state.hasErrors = true;
        state.messageCode = null;
        return;
      }

      if (typeof payload?.messageCode === 'number') {
        state.loading = false;
        state.hasErrors = true;
        state.messageCode = payload?.messageCode;
        return;
      }

      state.data = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    initializeDeleteShoppingListLinesLoader: (state) => {
      state.loading = true;
    },
    setDeleteShoppingListLinesMessageCode: (state, { payload }) => {
      state.messageCode = payload
    },
    setDeleteShoppingListLinesHasErrors: (state, { payload }) => {
      state.hasErrors = payload
    },
    getDeleteShoppingListLinesFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    }
  },
});

// Three actions generated from the slice
export const { getDeleteShoppingListLinesFailure, getDeleteShoppingListLinesSuccess, initializeDeleteShoppingListLinesLoader, setDeleteShoppingListLinesHasErrors, setDeleteShoppingListLinesMessageCode } = deleteShoppingListLines.actions;

// A selector
export const deleteShoppingListLinesSelector = (state: any) => state?.deleteShoppingListLines;

// The reducer
export default deleteShoppingListLines.reducer;


export function fetchDeleteShoppingListLines(sessionId: any, rest: any) {
  return async (dispatch: any) => {

    try {

      const URL = BASE_URL + `/DeleteShoppingListLines`

      const tempData: any = await axios({
        method: "POST",
        url: URL,
        data: qs.stringify({
          DeleteShoppingListLines: `${JSON.stringify(rest.lineToDelete)}`
        }),
      });

      if (tempData?.data?.delShopLineBeanList[0]?.messageCode === "2261") {

        dispatch(initializeShoppingListLineDetailsLoader())

        dispatch(fetchGetShoppingListLineDetails(sessionId,
          {
            ListId: rest.ListId,
            ListOwnerCode: rest.ListOwnerCode
          }))
      }

      dispatch(getDeleteShoppingListLinesSuccess(tempData?.data));
    } catch (error) {
      dispatch(getDeleteShoppingListLinesFailure());
    }
  };
}