import { createSlice } from '@reduxjs/toolkit';
import axios from '@utilities/api/httpService';
import { BASE_URL } from '../../../routers/AppRoute'
import { fetchGetShoppingListSearchDetails, initializeShoppingListsDetailsLoader } from './getShoppingListSearchDetails';

export const initialState = {
  loading: false,
  hasErrors: false,
  messageCode: null,
  data: null,
};

// A slice for products with our three reducers
const makeDefaultShoppingList = createSlice({
  name: 'makeDefaultShoppingList',
  initialState,
  reducers: {
    getMakeDefaultShoppingListSuccess: (state, { payload }) => {

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
    initializeMakeDefaultShoppingListLoader: (state) => {
      state.loading = true;
    },
    setMakeDefaultShoppingListMessageCode: (state, { payload }) => {
      state.messageCode = payload
    },
    setMakeDefaultShoppingListHasErrors: (state, { payload }) => {
      state.hasErrors = payload
    },
    getMakeDefaultShoppingListFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    }
  },
});

// Three actions generated from the slice
export const { getMakeDefaultShoppingListFailure, getMakeDefaultShoppingListSuccess, initializeMakeDefaultShoppingListLoader, setMakeDefaultShoppingListHasErrors, setMakeDefaultShoppingListMessageCode } = makeDefaultShoppingList.actions;

// A selector
export const makeDefaultShoppingListSelector = (state: any) => state?.makeDefaultShoppingList;

// The reducer
export default makeDefaultShoppingList.reducer;


export function fetchMakeDefaultShoppingList(sessionId: any, rest: any) {
  return async (dispatch: any) => {

    try {

      const URL = BASE_URL + `/MakeDefaultShoppingList`

      const tempData: any = await axios({
        method: "GET",
        url: URL,
        params: { ...rest },
      });

      if (tempData?.data?.messageCode === 2263) {
        dispatch(initializeShoppingListsDetailsLoader())
        dispatch(fetchGetShoppingListSearchDetails(sessionId, {
          OrderBy: 'ASC',
          SortBy: 'ListId',
          PageNo: 1
        }))
      }

      dispatch(getMakeDefaultShoppingListSuccess(tempData?.data));
    } catch (error) {
      dispatch(getMakeDefaultShoppingListFailure());
    }
  };
}