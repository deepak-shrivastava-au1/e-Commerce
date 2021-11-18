import { createSlice } from '@reduxjs/toolkit';
import axios from '@utilities/api/httpService';
import {BASE_URL} from '../../routers/AppRoute'
import {getCatalogueMenuTree} from '@actions/catalog/getCatalogueCategoriesTree';

export const initialState = {
  loading: true,
  hasErrors: false,
  webSettings: [],
};

// A slice for webSettings with our three reducers
const webSettingsSlice = createSlice({
  name: 'webSettings',
  initialState,
  reducers: {
    getwebSettingsSuccess: (state, { payload }) => {
      state.webSettings = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getwebSettingsFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

// Three actions generated from the slice
export const { getwebSettingsSuccess, getwebSettingsFailure } =
  webSettingsSlice.actions;

// A selector
export const webSettingsSelector = (state : any) => state?.webSettings;

// The reducer
export default webSettingsSlice.reducer;

// Asynchronous thunk action
export function fetchwebSettings(userName : string, sessionId: string) {
  return async (dispatch : any) => {
    
    try {
      console.log("userName:"+userName+"sessionId:"+sessionId)
      let user = (userName != null && userName.trim().length > 0 && userName !== undefined) ? `?UserID=${userName}` : '';
      const URL = BASE_URL + `/GetWebSettings` + user;
    
      // const reqHeader =  `Set-Cookie:JSESSIONID=${inputQuery}`;
      const webSetting : any = await axios.get(URL);
      dispatch(getwebSettingsSuccess(webSetting?.data));
      getLoggedInUserInfo(webSetting?.data?.userCode)
      dispatch(getCatalogueMenuTree(sessionId,{langCode:webSetting?.data?.languageCode}));
    } catch (error) {
      dispatch(getwebSettingsFailure());
    }
  };
}

const getLoggedInUserInfo = async (userName : string) => {
  try {
    const TEMPORDERDATAURL = BASE_URL + `/GetTemporaryOrderData`;
    const WEBUSERURL = BASE_URL + `/GetWebUser?UserID=${userName}`;
    const LOCALELISTURL = BASE_URL + `/GetLocaleList`;
    const MAINCATALOGUEURL = BASE_URL + `/GetMainCatalogue?LanguageCode=EN&PageNo=1&mobile=false`;
    const HOMECATALOGUEURL = BASE_URL + `/GetHomeCatalogue?PageNo=1&NoOfItems=6&ResolutionChanged=false&LanguageCode=EN`;
    await Promise.all([
      axios.get(WEBUSERURL),
      axios.get(TEMPORDERDATAURL),
      axios.get(LOCALELISTURL),
      axios.get(MAINCATALOGUEURL),
      axios.get(HOMECATALOGUEURL)
    ]);
  } catch {
    throw Error("Promise failed");
  }
};
