import { createSlice } from '@reduxjs/toolkit'
import axios from '@utilities/api/httpService';
import qs from 'qs';
import {BASE_URL} from '../../../routers/AppRoute';

export const initialState = {
  loading: false,
  hasErrors: false,
  sendEmail: {},
}

const sendEmailSlice = createSlice({
  name: 'sendEmail',
  initialState,
  reducers: {
    sendEmail: state => {
      state.loading = true
    },
    sendEmailSuccess: (state, { payload }) => {
      state.sendEmail = payload
      state.loading = false
      state.hasErrors = false
    },
    sendEmailFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
  },
})

// Three actions generated from the slice
export const { sendEmail, sendEmailSuccess, sendEmailFailure } = sendEmailSlice.actions

// A selector
export const sendEmailSelector = (state: { sendEmail: any; }) => state.sendEmail

// The reducer
export default sendEmailSlice.reducer

// Asynchronous thunk action
export function SendMailEnquiry(mailFrom : string, mailTo :string, subject : string, body:string, uiErrorKey : string,
                                uiErrorParams :string, startShowError : boolean, showMailFrom:boolean, showMailTo: boolean) {
  return async (dispatch:any) => {
    try {
      const url = BASE_URL+'/SendMailEnquiry';
     await axios({
        method: 'POST',
        url: url,
        data: qs.stringify({
          enquiryMailData: `[{"mailFrom":"${mailFrom}","mailTo":"${mailTo}","subject":"${subject}","body":"${body}","UIErrorKey":"${uiErrorKey}","UIErrorParams":[],"startShowError":${startShowError},"showMailFrom":${showMailFrom},"showMailTo":${showMailTo}}]`,
        })
        
      }).then((result) => {
            dispatch(sendEmailSuccess(result?.data));
          })
          .catch((err) => {
            dispatch(sendEmailFailure());
            console.log(err)
          });
      
    } catch (error) {
      dispatch(sendEmailFailure());
    }
  }
}
