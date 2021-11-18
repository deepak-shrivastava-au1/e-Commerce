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
const saveShoppingListLines = createSlice({
  name: 'saveShoppingListLines',
  initialState,
  reducers: {
    getSaveShoppingListLinesSuccess: (state, { payload }) => {

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
    initializeSaveShoppingListLinesLoader: (state) => {
      state.loading = true;
    },
    setSaveShoppingListLinesMessageCode: (state, { payload }) => {
      state.messageCode = payload
    },
    setSaveShoppingListLinesHasErrors: (state, { payload }) => {
      state.hasErrors = payload
    },
    getSaveShoppingListLinesFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    }
  },
});

// Three actions generated from the slice
export const { getSaveShoppingListLinesFailure, getSaveShoppingListLinesSuccess, initializeSaveShoppingListLinesLoader, setSaveShoppingListLinesHasErrors, setSaveShoppingListLinesMessageCode } = saveShoppingListLines.actions;

// A selector
export const saveShoppingListLinesSelector = (state: any) => state?.saveShoppingListLines;

// The reducer
export default saveShoppingListLines.reducer;


export function fetchSaveShoppingListLines(sessionId: any, ListOwnerCode:string , rest: any) {
  return async (dispatch: any) => {

    try {

      const URL = BASE_URL + `/SaveShoppingListLines`

      const tempData: any = await axios({
        method: "POST",
        url: URL,
        data: qs.stringify({
          SaveShoppingListLine: `${JSON.stringify(rest)}`
        }),
      });

      if (tempData?.data[0]?.messageCode === 2269) {

        dispatch(initializeShoppingListLineDetailsLoader())

        dispatch(fetchGetShoppingListLineDetails(sessionId,
          {
            ListId: rest[0].listId,
            ListOwnerCode: ListOwnerCode
          }))
      }

      dispatch(getSaveShoppingListLinesSuccess(tempData?.data));
    } catch (error) {
      dispatch(getSaveShoppingListLinesFailure());
    }
  };
}