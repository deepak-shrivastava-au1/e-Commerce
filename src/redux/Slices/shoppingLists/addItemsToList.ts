import { fetchGetShoppingListLineDetails, initializeShoppingListLineDetailsLoader } from './getShoppingListLineDetails';
import { createSlice } from '@reduxjs/toolkit';
import axios from '@utilities/api/httpService';
import { BASE_URL } from '../../../routers/AppRoute'
import qs from 'querystring'

export const initialState = {
  loading: false,
  hasErrors: false,
  messageCode: null,
  data: null,
};

// A slice for products with our three reducers
const addItemsToList = createSlice({
  name: 'addItemsToList',
  initialState,
  reducers: {
    getAddItemsToListSuccess: (state, { payload }) => {

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
    initializeAddItemsToListLoader: (state) => {
      state.loading = true;
    },
    setAddItemsToListMessageCode: (state, { payload }) => {
      state.messageCode = payload
    },
    setAddItemsToListHasErrors: (state, { payload }) => {
      state.hasErrors = payload
    },
    getAddItemsToListFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    }
  },
});

// Three actions generated from the slice
export const { getAddItemsToListFailure, getAddItemsToListSuccess, initializeAddItemsToListLoader, setAddItemsToListHasErrors, setAddItemsToListMessageCode } = addItemsToList.actions;

// A selector
export const addItemsToListSelector = (state: any) => state?.addItemsToList;

// The reducer
export default addItemsToList.reducer;


export function fetchAddItemsToList(sessionId: any, ListId: string, ListOwnerCode: string, rest: any) {
  return async (dispatch: any) => {

    try {

      const URL = BASE_URL + `/AddItemsToList`

      const tempData: any = await axios({
        method: "POST",
        url: URL,
        data:qs.stringify({
            AddItemsToListDetails:`${JSON.stringify(rest)}`
          }),
        });

      if (tempData?.data?.addListBean[0]?.messageCode === '2258') {
        dispatch(initializeShoppingListLineDetailsLoader())

        dispatch(fetchGetShoppingListLineDetails(sessionId, {
          ListId,
          ListOwnerCode
        }))
      }

      dispatch(getAddItemsToListSuccess(tempData?.data));
    } catch (error) {
      dispatch(getAddItemsToListFailure());
    }
  };
}