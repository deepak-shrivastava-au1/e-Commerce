import axios from '@utilities/api/httpService';
import {BASE_URL} from '@routers/AppRoute'
import winSession from './sessionService';

export async function getSingedInWebUser (userId:string) {
    const WEBUSERURL = BASE_URL + `/GetWebUser?UserID=${userId}`;
    const user = await axios.get(WEBUSERURL);
    return user;
}

export async function getWebSetting (userId:string) {
    let user = (userId != null && userId.trim().length > 0 && userId !== undefined) ? `?UserID=${userId}` : '';
      const URL = BASE_URL + `/GetWebSettings` + user;
      const webSettingData = await axios.get(URL);
      return webSettingData?.data;
}



export async function getSessionUser(userCode : string){
    const userInfoData  = await getSingedInWebUser(userCode)
        
    if(isSignedIn(userInfoData?.data)){
        winSession.registerSuccessLogin(userInfoData?.data, userInfoData?.data?.sessionId);
        return userInfoData;
    }
    
        
}

export function registerUserLogin(userCode :  string){
    getSessionUser(userCode);
}

export function performLogout(){
    localStorage.setItem(getLogOutEventDispatchStorageCode(), (new Date().getTime() / 1000).toString());
    localStorage.removeItem(getLogOutEventDispatchStorageCode())
    winSession.logout();
    
}

export function getLogOutEventDispatchStorageCode(): string{
    return winSession.getLogOutEventDispatchStorageCode()
}

export function signOutInAnyTab(){
    winSession.signOutInAnyTab();
    
}

export function removeSignOutInAnyTab(){
    winSession.removeSignOutInAnyTab();
    
}

export function getLastActiveTime():number{
    return winSession.getLastActiveTime();
    
}

export function setLastActiveTime(lastActiveTime : string){
    winSession.setLastActiveTime(lastActiveTime);
    
}

export function getSessionUserID () : string {
    return winSession.getSessionUser();
}


export function isUserSignedOutInAnyTab () {
    return winSession.isUserSignedOutInAnyTab();
}  



export async function syncSessions (userId:any) {
    const webSettingData = await getWebSetting(userId);
    setMaxInactiveInterval(webSettingData?.maxInactiveInterval);
    const user = await getSessionUser(webSettingData?.userCode);
    return user;
}

export function getMaxInactiveInterval () : number {
    return winSession.getMaxInactiveInterval();
}

export function setMaxInactiveInterval (maxInactiveInterval : string) {
    winSession.setMaxInactiveInterval(maxInactiveInterval);
}


export function isSignedIn (userData:any) {
    //const userData = await getSingedInWebUser(userId)
    if(userData?.isAuthenticated)
        return true;
    return false;
}

export function isSessionExpired(){
    const signedInUser = getSessionUserID();
    if(signedInUser === null || signedInUser?.trim() === '' || signedInUser?.trim()  === 'NETSTORE_DEFAULT'){
        return false;
    }
    const idleTime : number= (Math.floor(new Date().getTime() / 1000) - getLastActiveTime()) 
    const maxintervel: number = getMaxInactiveInterval();
    if(idleTime > maxintervel || isUserSignedOutInAnyTab()){
        return true;
    }
    setLastActiveTime( String(Math.floor(new Date().getTime() / 1000)));
    return false;
}

export function clearSession () {
    
}