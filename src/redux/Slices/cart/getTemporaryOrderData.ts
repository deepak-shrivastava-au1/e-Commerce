import { createSlice } from '@reduxjs/toolkit';
import axios from '@utilities/api/httpService';
import qs from "querystring"
import { BASE_URL } from '../../../routers/AppRoute'

export const initialState = {
  loading: true,
  hasErrors: false,
  hasPromotionError: false,
  messageCode:null,
  isPromotionCodeApplied:false,
  addCartItemStatus:[],
  cartItems: [],
  defaultScreen: { timeLine: { status: true, page: "cart" }, addProduct: { status: false }, interruptedCart: { status: false } }
};

// A slice for products with our three reducers
const cartItemsSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    getCartItemsSuccess: (state, { payload }) => {

      if(!payload){
        state.loading = false;
        state.hasErrors = true;
        state.messageCode=null;
        return;
      }

      if (typeof payload?.messageCode === 'number') {        
        state.messageCode = payload?.messageCode;
        state.loading = false;
        state.hasErrors = true;
        return;
      }
      if(payload?.temporaryOrderData){
        state.cartItems = payload?.temporaryOrderData;
        state.addCartItemStatus = payload?.addItemStatusList;
      }else{
        state.cartItems = payload;
      }
      state.loading = false;
      state.hasErrors = false;
    },
    setAddCartItemStatus:(state, { payload })=>{
      state.addCartItemStatus=payload
    },
    setLoading:(state,{ payload })=>{
      state.loading=payload
    },
    setHasErrors:(state,{ payload })=>{
      state.hasErrors=payload;
    },
    setMessageCode:(state,{ payload })=>{
      state.messageCode=payload;
    },
    setDefaultScreen: (state, { payload }) => {
      state.defaultScreen = payload
    },
    setPromotionCodeError: (state) => {
      state.hasPromotionError = true;
      state.loading = false;
    },
    initializeCartLoader: (state) => {
      state.loading = true;
    },
    setPromotionCodeApplied: (state, { payload }) =>{
      state.isPromotionCodeApplied = payload
    },
    disablePromotionCodeError: (state) => {
      state.hasPromotionError = false;
    },
    getCartItemsFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
    getRecalculatedItems: (state, { payload }) => {
      
      if(!payload){
        state.loading = false;
        state.hasErrors = true;
        state.messageCode=null;
        return;
      }
      if (typeof payload?.messageCode === 'number') {
        state.messageCode = payload?.messageCode;
        state.loading = false;
        state.hasErrors = true;
        return;
      }
      state.cartItems = payload;
      state.loading = false;
      state.hasErrors = false;
    }
  },
});

// Three actions generated from the slice
export const { getCartItemsSuccess,setAddCartItemStatus, getCartItemsFailure, setLoading, setPromotionCodeApplied, setMessageCode, setHasErrors, setDefaultScreen, setPromotionCodeError, getRecalculatedItems, initializeCartLoader, disablePromotionCodeError } = cartItemsSlice.actions;

// A selector
export const cartSelector = (state: any) => state?.cartItems;

// The reducer
export default cartItemsSlice.reducer;

// Asynchronous thunk action to fetch cart items
export function fetchcartItems(sessionId: any) {
  return async (dispatch: any) => {
    try {
      const URL =
        BASE_URL +
        `/GetTemporaryOrderData`

      const tempData: any = await axios({
        method: "GET",
        url: URL,
        });

      dispatch(getCartItemsSuccess(tempData?.data));
    } catch (error) {
      dispatch(getCartItemsFailure());
    }
  };
}

export function fetchCreateNewCart(sessionId: any) {
  return async (dispatch: any) => {

    try {

      const URL = BASE_URL + `/CreateNewCart`

      const tempData: any = await axios({
        method: "GET",
        url: URL,
       });

      dispatch(getCartItemsSuccess(tempData?.data));
    } catch (error) {
      dispatch(getCartItemsFailure());
    }
  };
}

export function fetchDeleteCurrentCart(sessionId: any) {
  return async (dispatch: any) => {

    try {

      const URL = BASE_URL + `/DeleteCurrentCart`

      const tempData: any = await axios({
        method: "GET",
        url: URL,
        });

      dispatch(getCartItemsSuccess(tempData?.data));
    } catch (error) {
      dispatch(getCartItemsFailure());
    }
  };
}

export function fetchPromotionCode(sessionId: any, promotionCode: string) {

  return async (dispatch: any) => {

    try {

      const URL = `${BASE_URL}/ApplyPromotion`;

      const tempData: any = await axios({
        method: "GET",
        url: URL,
        params: {
          promotionCode: `${promotionCode}`
        },
        });

      if (typeof tempData?.data?.messageCode === 'number') {
        dispatch(setPromotionCodeApplied(false))
        return dispatch(setPromotionCodeError())
      }

      dispatch(setPromotionCodeApplied(true))
      dispatch(getCartItemsSuccess(tempData?.data));
    } catch (error) {
      dispatch(getCartItemsFailure());
    }
  };
}

// Asynchronous thunk action to fetch latest data for individual cart item
export function fetchRecalculate(sessionId: any, orderLineData: Array<{ lineNumber: string, quantity: string }>) {

  return async (dispatch: any) => {

    try {

      const URL =
        BASE_URL +
        `/RecalculateCart`

      const tempData: any = await axios({
        method: "POST",
        url: URL,
        data: qs.stringify({
          orderLineData: `${JSON.stringify(orderLineData)}`,
        }),
       });

      dispatch(getRecalculatedItems(tempData?.data));
    } catch (error) {
      dispatch(getCartItemsFailure());
    }
  };
}

export function fetchEditCart(sessionId: any, orderNumber: string) {

  return async (dispatch: any) => {

    try {

      const URL = BASE_URL + `/EditCart`;

      const orderData: any = await axios({
        method: "GET",
        url: URL,
        params: { OrderNumber:parseInt(orderNumber) },
        })

      dispatch(getCartItemsSuccess(orderData?.data));

    } catch (error) {
    

      dispatch(getCartItemsFailure());
    }
  };
}

export function fetchAddItemToCart(sessionId: any, data: any) {

  return async (dispatch: any) => {

    try {

      const URL =
        BASE_URL +
        `/AddItemsToCart`

      const tempData: any = await axios({
        method: "POST",
        url: URL,
        data: qs.stringify({
          inputItems: `${JSON.stringify(data)}`,
        }),
       });

      dispatch(getRecalculatedItems(tempData?.data?.temporaryOrderData));
    } catch (error) {
    

      dispatch(getCartItemsFailure());
    }
  };
}

export function fetchApplyDeliveryDateForCart(sessionId: any, orderLineData: Array<{ lineNumber: string, quantity: string }>) {

  return async (dispatch: any) => {

    try {

      const URL = BASE_URL + `/ApplyDeliveryDateForCart`

      const tempData: any = await axios({
        method: "POST",
        url: URL,
        data: qs.stringify({
          orderLineData: `${JSON.stringify(orderLineData)}`,
        }),
        });

      dispatch(getRecalculatedItems(tempData?.data));
    } catch (error) {
    

      dispatch(getCartItemsFailure());
    }
  };
}

{/*
 // @ts-ignore*/}
export function fetchUpdateLineInCart({ sessionId, ...rest }: any) {

  return async (dispatch: any) => {

    try {

      const URL =
        BASE_URL +
        `/UpdateLineInCart`

      const orderData: any = await axios({
        method: "GET",
        url: URL,
        params: { ...rest },
        })

      dispatch(getRecalculatedItems(orderData?.data));

    } catch (error) {
    

      dispatch(getCartItemsFailure());
    }
  };
}

export function fetchDeleteLineFromCart({ sessionId, ...rest }: any) {
  return async (dispatch: any) => {

    try {

      const URL =
        BASE_URL +
        `/DeleteLineFromCart`

      axios({
        method: "GET",
        url: URL,
        params: { ...rest },
       }).then((response) => {
        dispatch(getRecalculatedItems(response?.data));

      })

    } catch (error) {
    

      dispatch(getCartItemsFailure());
    }
  };
}

/**
 * temporaryOrderNumber: 52407
lineNumber: 40
itemQuantity: 3
unitCode: EACH
shipmentMark:
lineText:
deliveryDate: 7/22/21
 */

/**
 * temporaryOrderNumber: 59586
lineNumber: 10
itemQuantity: 4
unitCode: BOX10
shipmentMark:
lineText:
deliveryDate: 7/27/21
 */

/**
 * [
  {
    "name": "Olle's customer",
    "addressName": "Olle's customer",
    "adressCode": "1",
    "addressLine1": "Address 1 in England",
    "addressLine2": "-----------------------------------",
    "addressLine3": "-----------------------------------",
    "adressLine4": "Normal address --------------------",
    "postalCode": "----------------",
    "countryCode": "GB",
    "stateProvCode": "",
    "countyCode": "",
    "isCompleteDelivery": "",
    "mannerOfTransportCode": "ROD",
    "mannerOfTransportDesc": "Road haulage",
    "emailConfirmDispatch": "",
    "emailOrderDispatch": "",
    "emailOrderDispCheckBox": "false",
    "emailInvoiceDispCheckBox": "false",
    "yourOrder": "N52419",
    "yourReference": "Vikrant",
    "orderText": "test",
    "shipmentMark": "test",
    "addressNumber": "1",
    "emailConfirmDispCheckBox": "NO"
  }
]


 */