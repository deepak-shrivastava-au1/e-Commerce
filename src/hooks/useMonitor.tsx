import React, { useEffect, useCallback } from "react";
import { setSessionExpired} from "@slices/UserAccount/logout";
import { useDispatch } from "react-redux";
import {removeSignOutInAnyTab, 
        signOutInAnyTab, 
        getLogOutEventDispatchStorageCode,
        getSingedInWebUser,
        getSessionUserID,
        setLastActiveTime,
        isSessionExpired
        } from '@utilities/api/authentication';

function useMonitor() {
  const dispatch = useDispatch();
   
  const checkSessionTimeout = useCallback(() => {
    if(isSessionExpired()){
      getSingedInWebUser(getSessionUserID()).then(user =>{
        if(!user?.data?.isAuthenticated && user?.data?.userID?.trim() !== "NETSTORE_DEFAULT" && user?.data?.userID?.trim() !== ""){
          dispatch(setSessionExpired(true));
        }else{
          setLastActiveTime( String(Math.floor(new Date().getTime() / 1000)));
        }
       }
       );
       removeSignOutInAnyTab();
    }
   }, []);

  const checkTabLoggedOut = useCallback((event) => {
    if(event.key === getLogOutEventDispatchStorageCode()){
      signOutInAnyTab();
     }
    }, []);
  

  useEffect(() => {
    
    window.addEventListener("load", checkSessionTimeout, false);
    window.addEventListener("click", checkSessionTimeout);
    window.addEventListener("storage", checkTabLoggedOut, false);
   

    return () => {
      window.addEventListener("load", checkSessionTimeout, false);
      window.addEventListener("click", checkSessionTimeout);
      window.addEventListener("storage", checkTabLoggedOut, false);
     
    };
  }, []);

 
}

export default useMonitor;
