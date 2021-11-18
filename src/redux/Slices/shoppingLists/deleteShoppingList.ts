import { createSlice } from '@reduxjs/toolkit';
import axios from '@utilities/api/httpService';
import { BASE_URL } from '../../../routers/AppRoute'
import { fetchGetShoppingListSearchDetails, initializeShoppingListsDetailsLoader } from './getShoppingListSearchDetails';

export const initialState = {
  loading: false,
  hasErrors: false,
  messageCode:null,
  data: null,
};

// A slice for products with our three reducers
const deleteShoppingList = createSlice({
  name: 'deleteShoppingList',
  initialState,
  reducers: {
    getDeleteShoppingListSuccess: (state, { payload }) => {

      if(!payload){
        state.loading = false;
        state.hasErrors = true;
        state.messageCode=null;
        return;
      }

      if (typeof payload?.messageCode==='number') {
        state.loading = false;
        state.hasErrors = true;
        state.messageCode = payload?.messageCode;
        return;
      }
      state.data = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    initializeDeleteShoppingListLoader: (state) => {
      state.loading = true;
    },
    setDeleteShoppingListMessageCode:(state,{ payload })=>{
      state.messageCode = payload
    },
    setDeleteShoppingListHasErrors:(state,{ payload })=>{
      state.hasErrors = payload
    },
    getDeleteShoppingListFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    }
  },
});

// Three actions generated from the slice
export const { getDeleteShoppingListFailure,getDeleteShoppingListSuccess,initializeDeleteShoppingListLoader, setDeleteShoppingListHasErrors, setDeleteShoppingListMessageCode } = deleteShoppingList.actions;

// A selector
export const deleteShoppingListSelector = (state: any) => state?.deleteShoppingList;

// The reducer
export default deleteShoppingList.reducer;


export function fetchDeleteShoppingList(sessionId:any, rest:any){
  return async (dispatch: any) => {

    try {

      const URL = BASE_URL +`/DeleteShoppingList`

      const tempData: any = await axios({
        method: "GET",
        url: URL,
        params:{...rest},
      });

      if (tempData?.data?.messageCode === 2260) {
        dispatch(initializeShoppingListsDetailsLoader())
        dispatch(fetchGetShoppingListSearchDetails(sessionId, {
          OrderBy: 'ASC',
          SortBy: 'ListId',
          PageNo: 1
        }))
      }

      dispatch(getDeleteShoppingListSuccess(tempData?.data));
    } catch (error) {
      dispatch(getDeleteShoppingListFailure());
    }
  };
}