import React, { useEffect } from "react";
import axios from "@utilities/api/httpService";
import {getSessionUserID} from "@utilities/api/authentication";
import { useDispatch } from "react-redux";
import { setSessionExpired} from "@slices/UserAccount/logout";

type CheckRequestsProps = {
  updateSessionExpiryStatus: (arg: boolean) => void;
};
const CheckRequests = (Wrapped: any) => {
  const handleClose = () => {};
  function CheckRequests(props: any) {
   const dispatch =  useDispatch()
    useEffect(() => {
      axios.interceptors.request.use((req) => {
       
        try {
          
        } catch (exception) {}
        return req;
      });
      axios.interceptors.response.use(
        function (response) {
          // Do something with response data
          const signedInUser = getSessionUserID();
          if(signedInUser === null || signedInUser?.trim() === '' || signedInUser?.trim()  === 'NETSTORE_DEFAULT'){
            return response;
          }
          if(response?.data?.messageCode === 5000){
            dispatch(setSessionExpired(true));
          }
          return response;
        },
        function (error) {
          switch (error.response.status) {
            case 5000:
              //     <Modal
              //     isAlert
              //     icon
              //     title="Session Expired"
              //     message="Kindly relogin to continue?"
              //     isOpen={true}
              //     onRequestClose={() => handleClose()}
              //     secondaryActionText={"Cancel"}
              //     onSecondaryButtonClick={() => {
              //       handleClose();
              //     }}
              //   >;
              //   </Modal>
              //  props.history.push(ROUTES.SIGNIN); //we will redirect user into login page
              break;
            default:
              break;
          }
          // alert(error.message)
          // Do something with response error
          return Promise.reject(error);
        }
      );
    });

    return <Wrapped {...props} />;
  }
  return CheckRequests;
};

export default CheckRequests;
