import { REDUX_PERSIST_KEY } from "@constants/Constants";

const  AUTHENTICATED_USER_NAME = 'authenticatedUser';
const  JSESSIONID = 'JSESSIONID';
const LAST_ACTIVE_TIME = 'lastActiveTime'
const MAX_INACTIVE_INTERVAL = 'maxInactiveInterval';

class SessionService {
    
    registerSuccessLogin(userInfo:any, sessionId:string){
        sessionStorage.setItem(AUTHENTICATED_USER_NAME, userInfo?.userID);
        sessionStorage.setItem(JSESSIONID, sessionId);
        this.setLastActiveTime( String(Math.floor(new Date().getTime() / 1000)));
    }
    logout(){
        sessionStorage.removeItem(`persist:${REDUX_PERSIST_KEY}`);
        sessionStorage.clear();        
    }

    
    getLastActiveTime():number{
        if(sessionStorage.getItem(LAST_ACTIVE_TIME) === null){
            return Math.floor(new Date().getTime() / 1000);
        }
        return Number(sessionStorage.getItem(LAST_ACTIVE_TIME))
    
    }

    setLastActiveTime(lastActiveTime:string){
       sessionStorage.setItem(LAST_ACTIVE_TIME,lastActiveTime);
    }

    getSessionId():string | null{
        const sessionId = sessionStorage.getItem(JSESSIONID) !== null ? sessionStorage.getItem(JSESSIONID) : '';
        return sessionId;
    }

    getSessionUser():string{
        const userCode = sessionStorage.getItem(AUTHENTICATED_USER_NAME) !== null ? sessionStorage.getItem(AUTHENTICATED_USER_NAME) : '';
        if(userCode !== null)
            return userCode;
        else
            return '';
    }

    setMaxInactiveInterval(maxInactiveInterval:string){
        sessionStorage.setItem(MAX_INACTIVE_INTERVAL,maxInactiveInterval);
     }

    getMaxInactiveInterval():number{
        const maxInactiveInterval = sessionStorage.getItem(MAX_INACTIVE_INTERVAL) !== null ? sessionStorage.getItem(MAX_INACTIVE_INTERVAL) : '1800';
        if(maxInactiveInterval !== null)
            return Number(maxInactiveInterval);
        else
            return Number(1800);
    }

    getLogOutEventDispatchStorageCode(): string{
        return 'NETSTORE_SIGN_OUT_' + this.getSessionId() + '_' + this.getSessionUser();
    }

    signOutInAnyTab(){
        sessionStorage.setItem(this.getLogOutEventDispatchStorageCode(),'true');
    }

    isUserSignedOutInAnyTab(){
        return sessionStorage.getItem(this.getLogOutEventDispatchStorageCode()) === 'true'
    }

    removeSignOutInAnyTab(){
        sessionStorage.removeItem(this.getLogOutEventDispatchStorageCode());
    }
     
    
}

export default new SessionService();