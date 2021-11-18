import { createSlice } from '@reduxjs/toolkit';
import axios from '@utilities/api/httpService';
import qs from 'qs';
import {BASE_URL} from '../../../routers/AppRoute'


export const initialState = {
  loading: true,
  hasErrors: false,
  createAccount: {},
};

// A slice for products with our three reducers
const createNewAccount = createSlice({
  name: 'createAccount',
  initialState,
  reducers: {
    createAccountSuccess: (state, { payload }) => {
      state.createAccount = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    createAccountFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

// Three actions generated from the slice
export const { createAccountSuccess, createAccountFailure } = createNewAccount.actions;

// A selector
export const createAccountSelector = (state: {createAccount :any}) => state?.createAccount;

// The reducer
export default createNewAccount.reducer;

// Asynchronous thunk action
export function CreateNewAccount(accountType: string , customerName: string ,address1: string,
                                 address2: string , address3: string ,postcode: string,
                                 city: string , state: string ,country: string,
                                 contact: string , phoneNum: string ,faxNum: string,
                                 language: string , userId: string ,webUserName: string,
                                 emailId: string , locale: string ,vatRegNum: string,
                                 customerCode: string , county: string ) {
  return async (dispatch: any) => {
    try {
      const url = BASE_URL+'/CreateNewAccount';
     await axios({
        method: 'POST',
        url: url,
        data: qs.stringify({
          NewCustomerData: `[{"accountType":"${accountType}","customerName":"${customerName}","address1":"${address1}",
                              "address2":"${address2}","address3":"${address3}","postcode":"${postcode}",
                              "city":"${city}","state":"${state}","country":"${country}",
                              "contact":"${contact}","phoneNum":"${phoneNum}","faxNum":"${faxNum}",
                              "language":"${language}","userId":"${userId}","webUserName":"${webUserName}",
                              "emailId":"${emailId}","locale":"${locale}","vatRegNum":"${vatRegNum}",
                               "customerCode" : "${customerCode}", "county" : "${county}"}]`,
        })
      //  options
        
      }).then((result) => {
            dispatch(createAccountSuccess(result?.data));
          })
          .catch((err) => {
            // Do somthing
            dispatch(createAccountFailure());
            console.log(err)
          });
      
    } catch (error) {
      dispatch(createAccountFailure());
    }
  };
}

