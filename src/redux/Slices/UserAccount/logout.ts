import { createSlice } from '@reduxjs/toolkit';
import axios from '@utilities/api/httpService';
import {BASE_URL} from '../../../routers/AppRoute'
import {performLogout} from '@api/authentication';
import { fetchwebSettings } from '@slices/webSettings';


export const initialState = {
  isLoading: true,
  errorOccured: false,
  logoutresponse: {messageCode : 999},
  sessionExpired : false
};

// A slice for products with our three reducers
const logout = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutResp: state => {
      state.isLoading = true
    },
    getLogoutSuccess: (state, { payload }) => {
      state.logoutresponse = payload;
      state.isLoading = false;
      state.errorOccured = false;
    },
    getLogoutFailure: (state) => {
      state.isLoading = false;
      state.errorOccured = true;
    },
    setSessionExpired : (state, action) => {
      state.sessionExpired = action.payload;
    }
  },
});

// Three actions generated from the slice
export const { logoutResp, getLogoutSuccess, getLogoutFailure, setSessionExpired } = logout.actions;

// A selector
export const logoutSelector = (state: any) => state.logout;

// The reducer
export default logout.reducer;

// Asynchronous thunk action
export function LogoutUser(userId: string | undefined, sessionId: string | undefined) {
  return async (dispatch: any) => {
    try {
        await axios({
          method: 'GET',
          url: BASE_URL + '/LogOutUser',
          params: { UserID: userId },
        }).then((result) => {
          dispatch(getLogoutSuccess(result?.data));
          if (result?.data?.messageCode === 1100 || result?.data?.messageCode === 0) {
            dispatch({ type: "SIGNOUT" }) ;
            performLogout();
            const currentURL = window.location.href;
            const homePage= "index.html";
            const n = currentURL.indexOf(homePage);
            const index = n + homePage.length;
            if(Number(n) != Number(-1)){
              const homePageUrl : string = currentURL.substring(0,index);
              window.location.assign(homePageUrl);
            }else{
              window.location.assign("");
            }
            
            
          }
         
         })

      }catch(er){

      }
    
    // return combineReducer(state, action); //Use combine reducers with default state if no "sign_out" action is dispatched

  };
}