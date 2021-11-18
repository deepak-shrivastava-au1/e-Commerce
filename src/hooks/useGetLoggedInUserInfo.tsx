import React,{ useEffect,useState } from 'react'
import { useSelector } from 'react-redux';
import { userSelector } from "../redux/Slices/UserAccount/userSlice"

function useGetLoggedInUserInfo() {


  const [userInfo,setUserInfo]=useState<any>();


  const userInfoselectorData = useSelector(userSelector)?.user?.user?.data;  

  useEffect(()=>{
    if(userInfoselectorData && Object.keys(userInfoselectorData).length>0){
      setUserInfo(userInfoselectorData)
    }
  },[userInfoselectorData])

  return userInfo;
}

export default useGetLoggedInUserInfo