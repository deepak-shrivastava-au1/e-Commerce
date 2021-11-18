import { createSlice } from '@reduxjs/toolkit'
import axios from '@utilities/api/httpService';
import {BASE_URL} from '../../../routers/AppRoute'

export const initialState = {
  loading: false,
  hasErrors: false,
  languageCodes: [],
}

// A slice for recipes with our three reducers
const languageCodesSlice = createSlice({
  name: 'languageCodes',
  initialState,
  reducers: {
    getLanguageCodes: state => {
      state.loading = true
    },
    getLanguageCodesSuccess: (state, { payload }) => {
      state.languageCodes = payload
      state.loading = false
      state.hasErrors = false
    },
    getLanguageCodesFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
  },
})

// Three actions generated from the slice
export const { getLanguageCodes, getLanguageCodesSuccess, getLanguageCodesFailure } = languageCodesSlice.actions

// A selector
export const getLaunguageCodesSelector = (state: { languageCodes: any; }) => state.languageCodes

// The reducer
export default languageCodesSlice.reducer

// Asynchronous thunk action
export function fetchLanguageCodes() {
  return async (dispatch:any) => {
    dispatch(getLanguageCodes())

    try {
      const URL =
        BASE_URL +
        `/GetPreloadedLanguages`;
      const languages : any = await axios.get(URL);
      dispatch(getLanguageCodesSuccess(languages?.data?.langBeanList));
    } catch (error) {
      console.log(error)
      dispatch(getLanguageCodesFailure());
    }
  }
}
