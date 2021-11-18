import { IuserWebSettings } from '@constants/interfaces/userWebSettings';
import { useGetLoggedInUserInfo } from '@hooks';
import { userSelector } from '@slices/UserAccount/userSlice';
import React,{ useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchwebSettings, webSettingsSelector } from '../Slices/webSettings';
import {setMaxInactiveInterval} from '@utilities/api/authentication';

const WebSettingsContext = React.createContext<IuserWebSettings | null>(
  null
);

const WebSettingsProvider = (props: any) => {
  
  const state: any = useSelector(webSettingsSelector)?.webSettings;

  const sessionId = useGetLoggedInUserInfo()?.sessionId;

  const dispatch = useDispatch();

  const userData = useSelector(userSelector);

  const [userWebSettings, setUserWebSettings] = useState<IuserWebSettings|null>(null)

  useEffect(() => {
    if(state && Object.keys(state).length>0){
      setUserWebSettings(state)
      if(state?.maxInactiveInterval){
        setMaxInactiveInterval(state?.maxInactiveInterval);
    }
    }
  }, [state])

  useEffect(() => {
    dispatch(fetchwebSettings(userData?.user?.user?.data?.userName,sessionId))
  }, [])

  return (
    <WebSettingsContext.Provider value={userWebSettings}>
      {props.children}
    </WebSettingsContext.Provider>
  );
};

export { WebSettingsContext, WebSettingsProvider };
