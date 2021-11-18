import { createSlice } from '@reduxjs/toolkit';
import axios from '@utilities/api/httpService';
import qs from 'qs';
import {registerUserLogin} from '@utilities/api/authentication';
import {fetchwebSettings } from '../webSettings';
import {BASE_URL} from '../../../routers/AppRoute'


export const initialState = {
  loading: true,
  hasErrors: false,
  user: {},
  loadPage: false
};

// A slice for products with our three reducers
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser: state => {
      state.loading = true
    },
    getLoginSuccess: (state, { payload }) => {
      state.user = payload;
      state.loading = false;
      state.hasErrors = false;
      state.loadPage = true;
    },
    getLoginFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
    syncSession: (state, { payload }) => {
      state.user = payload
      state.loadPage = true;
    },
  },
});

// Three actions generated from the slice
export const { getUser, getLoginSuccess, getLoginFailure, syncSession} = userSlice.actions;

// A selector
export const userSelector = (state: any) => state;

// The reducer
export default userSlice.reducer;

// Asynchronous thunk action
export function ValidateLoggedUser(userName: string | undefined, password: string | undefined,languageCode: string) {
  return async (dispatch: any) => {
    // dispatch(getUser())
    try {
      const url = BASE_URL+'/ValidateLoggedUser';
     
     await axios({
        method: 'POST',
        url: url,
        data: qs.stringify({
          UserLoginData: `[{"userID":"${userName}","password":"${password}","languageCode":"${languageCode}"}]`,
        })
      }).then((result) => {
            dispatch(getLoginSuccess(result));
            
            dispatch(fetchwebSettings(result.data.userName,result.data.sessionId))
            // console.log(result.data.sessionId);
            // alert("Login Successful")
            registerUserLogin(result?.data?.userID);
          })
          .catch((err) => {
            // Do somthing
            dispatch(getLoginFailure());
            console.log(err)
            // alert("Login Failed. Please check your credentials")
          });
      
    } catch (error) {
      dispatch(getLoginFailure());
      alert("Failed")
    }
  };
}

