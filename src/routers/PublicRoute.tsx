import React, {useEffect, useState} from "react";
import { Redirect, Route } from "react-router-dom";
// import HOME from "../components/pages/Home/index"
// import CommonRoute from './CommonRoute';
// import * as ROUTES from '../constants/Routes';



function PublicRoute(props: any) {
  const { Component, store, ...rest } = props;
  const [sessionExpired, setSessionExpired] = useState<boolean>(false);

  
  
  return (
    <>
      <Route
        {...rest}
        render={(props) => {
          //if user is already authenticated then redirect him/her to home page
          // const isAuth = store?.getState()?.user?.user?.data?.isAuthenticated;

    
          // else if (isAuth) {
          //   return <Redirect from="signin" to="/" />;
          // }

          return (
            <React.Fragment>
              <Component {...props} />

            </React.Fragment>
          );
        }}
      />
    </>
  );
}

export default PublicRoute;
