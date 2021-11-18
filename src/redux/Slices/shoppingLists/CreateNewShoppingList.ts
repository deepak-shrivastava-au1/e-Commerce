import { createSlice } from '@reduxjs/toolkit';
import axios from '@utilities/api/httpService';
import { BASE_URL } from '../../../routers/AppRoute'
import { fetchGetShoppingListSearchDetails, initializeShoppingListsDetailsLoader } from './getShoppingListSearchDetails';
import { fetchMakeDefaultShoppingList, initializeMakeDefaultShoppingListLoader } from './makeDefaultShoppingList';

export const initialState = {
  loading: false,
  hasErrors: false,
  messageCode: null,
  data: null,
};

// A slice for products with our three reducers
const createNewShoppingList = createSlice({
  name: 'createNewShoppingList',
  initialState,
  reducers: {
    getCreateNewShoppingListSuccess: (state, { payload }) => {

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
    initializeCreateNewShoppingListLoader: (state) => {
      state.loading = true;
    },
    setCreateNewShoppingListMessageCode: (state, { payload }) => {
      state.messageCode = payload
    },
    setCreateNewShoppingListHasErrors: (state, { payload }) => {
      state.hasErrors = payload
    },
    getCreateNewShoppingListFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    }
  },
});

// Three actions generated from the slice
export const { getCreateNewShoppingListFailure, getCreateNewShoppingListSuccess, initializeCreateNewShoppingListLoader, setCreateNewShoppingListHasErrors, setCreateNewShoppingListMessageCode } = createNewShoppingList.actions;

// A selector
export const createNewShoppingListSelector = (state: any) => state?.createNewShoppingList;

// The reducer
export default createNewShoppingList.reducer;


export function fetchCreateNewShoppingLists(sessionId: any, rest: any) {
  return async (dispatch: any) => {

    try {

      const URL = BASE_URL + `/CreatNewShoppingList`

      const tempData: any = await axios({
        method: "GET",
        url: URL,
        params: { ...rest },
      });

      if (tempData?.data?.messageCode === 2266) {
        dispatch(initializeMakeDefaultShoppingListLoader())

        dispatch(fetchMakeDefaultShoppingList(sessionId, {
          ListId: rest.ListId.toUpperCase(),
          ListOwnerCode: rest.ListOwnerCode,
          CustomerCode: rest.CustomerId
        }))
      }

      dispatch(getCreateNewShoppingListSuccess(tempData?.data));
    } catch (error) {
      dispatch(getCreateNewShoppingListFailure());
    }
  };
}