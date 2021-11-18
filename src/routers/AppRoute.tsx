import React, { useEffect, useState, useContext, Fragment } from "react";
import { Route, HashRouter, Switch, Redirect } from "react-router-dom";
import "../scss/index.scss";
import * as ROUTES from "../constants/Routes";
import CheckRequests from "../redux/api/HandleWebServiceCalls";
import HOME from "../components/pages/Promotions/index";
import SIGNIN from "../components/pages/UserAccount/SplashScreen";
import CART from "../components/pages/Cart";
import PRODUCT_SEARCH from "../components/pages/Product/ProductSearch";
import PRODUCT_DETAILS from "../components/pages/Product/ProductDetails";
import PRODUCT_COMPARE from "@fragments/ProductCompare";
import CATALOG from "@pages/Catalog/Catalog";
import { createBrowserHistory } from "history";
import PublicRoute from "./PublicRoute";
import CommonRoute from "./CommonRoute";
import OrderReceipt from "@pages/Cart/ShoppingCart/OrderReceipt";
import OrderHistory from "@pages/Enquiry/Order/OrderHistory/OrderHistory";
import OrderHistoryDetail from "@pages/Enquiry/Order/OrderHistoryDetail/OrderHistoryDetail";
import OrderHistoryDetailLine from "@pages/Enquiry/Order/OrderHistoryDetailLine/OrderHistoryDetailLine";
import QuotationSummary from "@pages/Enquiry/Quotations/QuotationSummary/QuotationSummary";
import QuotationDetail from "@pages/Enquiry/Quotations/QuotationsDetail/QuotationDetail";
import ThankYou from "@pages/Cart/ThankYou/index"
import BestOfferViewAll from "@pages/Promotions/Promotion/BestOfferViewAll";
import MostPopularViewAll from "@pages/Promotions/Promotion/MostPopularViewAll";
import { useGetBaseURL } from "@hooks";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL_KEY, IMAGE_URL_KEY } from "@constants/Constants";
import RecentPurchase from "@pages/Promotions/RecentPurchase/RecentPurchase";
import AccountSettings from "@pages/UserAccount/AccountSettings";
import PasswordReset from "@pages/UserAccount/PasswordReset";
import Transactions from "@pages/Enquiry/Transactions/Transactions";
import ChangeCustomer from "@pages/UserAccount/ChangeCustomer";
import PAYMENT from "@pages/Cart/PaymentGateway";
import QuotationDetailLine from "@pages/Enquiry/Quotations/QuotationsDetailLine/QuotationsDetailLine";
import SHOPPINGLISTS from "@pages/shoppingLists";
import InvoiceHistory from "@pages/Enquiry/Invoices/InvoiceHistory/InvoiceHistory";
import InvoiceHistoryDetail from "@pages/Enquiry/Invoices/InvoiceHistoryDetail/InvoiceHistoryDetail";
import InvoiceHistoryDetailLine from "@pages/Enquiry/Invoices/InvoiceHistoryDetailLine/InvoiceHistoryDetailLine";
import useMonitor from "../hooks/useMonitor";
import ContactUs from "@pages/UserAccount/ContactUs";
import {syncSessions} from "@utilities/api/authentication";
import { syncSession } from "../redux/Slices/UserAccount/userSlice";
import {userSelector} from "@slices/UserAccount/userSlice";
import {getSessionUserID} from "@utilities/api/authentication";
import Modal from "@common/Modal";
import { CloseSVG } from "@icons";
import { LogoutUser, logoutSelector } from "@slices/UserAccount/logout"
import { useTranslation } from "react-i18next";
import RequestHistory from "@pages/Enquiry/Request/RequestHistory/RequestHistory";
import RequestHistoryDetail from "@pages/Enquiry/Request/RequestHistoryDetail/RequestHistoryDetail";
import RequestHistoryDetailLine from "@pages/Enquiry/Request/RequestHistoryDetailLine/RequestHistoryDetailLine";
import RequestSubmit from "@pages/RequestSubmit"
import RequestReceived from '@pages/RequestSubmit/RequestReceived'

export const history = createBrowserHistory();
export let BASE_URL: any = localStorage.getItem(BASE_URL_KEY);
export let BASE_URL_IMAGE: any = localStorage.getItem(IMAGE_URL_KEY);

export interface ConfigData {
  baseUrl: string;
  port: string;
  context: string;
  custom_login: boolean;
}

function AppRouter(props: any) {
  const { store } = props;
  const configData = useGetBaseURL();
  const [base_url, setBase_url] = useState<undefined | string>(undefined);
  const [image_url, setImage_url] = useState<undefined | string>(undefined);
  const [isCustomLogin, setIsCustomLogin] = useState<undefined | boolean>(true);
  const dispatch = useDispatch();
  const customLogin: any = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--custom-login");
  const monitor = useMonitor(); // this is to check the session expiry
 //const webSettingsData = useContext(WebSettingsContext);
  const [load,setLoad] = useState<boolean>(false);
  const  loadPage  = useSelector(userSelector)?.user?.loadPage;

  
  useEffect(() => {
    if (configData) {
      // store Data in State Data Variable
      let data = Object.assign(configData);
      const url = data?.baseUrl + data?.port + data?.context + "WS/NSWS";
      const imgUrl = data?.baseUrl + data?.port;
      setBase_url(url);
      setImage_url(imgUrl);

      const localStorage_base_url = localStorage.getItem(BASE_URL_KEY);
      const localStorage_image_url = localStorage.getItem(IMAGE_URL_KEY);

      if (localStorage_base_url !== null) {
        // check whether base_url value in localStorage has context url i.e base_url = '/NS11Q/'
        localStorage.removeItem(BASE_URL_KEY);

        localStorage.setItem(BASE_URL_KEY, url);
      } else {
        // if base_url in localStorage is empty then replace null with latest base_url coming from useGetBaseURL hook
        localStorage.setItem(BASE_URL_KEY, url);
      }
      if (localStorage_image_url !== null) {
        localStorage.removeItem(IMAGE_URL_KEY);

        localStorage.setItem(IMAGE_URL_KEY, imgUrl);
      } else {
        localStorage.setItem(IMAGE_URL_KEY, imgUrl);
      }
      BASE_URL = url;
      BASE_URL_IMAGE = imgUrl;

      syncSessions('').then(user=>{
        dispatch(syncSession(user));
      }
      );
         
     
    }
  }, [configData]);

  useEffect(() => {
    if (String(customLogin)?.trim() == "true") {
      setIsCustomLogin(true);
    } else {
      setIsCustomLogin(false);
    }
  }, []);
 
  const [sessionExpired, setSessionExpired] = useState<boolean>(false);
  const isSessionExpired = useSelector(logoutSelector)?.sessionExpired;
  const { t } = useTranslation();
  useEffect(() => {
   if (isSessionExpired) {
      setSessionExpired(true);
     
    } else {
      setSessionExpired(false);
    }
  }, [isSessionExpired])

  const handleSessionExpire = ()=>{
    dispatch(LogoutUser(getSessionUserID(),''))
    setSessionExpired(false);
  }

  useEffect(() => {
    if(loadPage){
      setLoad(true);
    }
    
  }, [loadPage])
  
  return (
   <Fragment>
        
      <Modal
          isAlert
          icon={
            <div className="icon-fail">
              <CloseSVG className="icon" />
            </div>
          }
          title={t('MSG_SESSION_EXPIRED_LOGIN_AGAIN')}
          isOpen={sessionExpired}
          hasCancelButton={false}
          onRequestClose={handleSessionExpire}
          secondaryActionText={t('CON_OK')}
          onSecondaryButtonClick={handleSessionExpire}
        />
   <HashRouter>
      {/* React Router's DOM Switch Condition */}
      {load &&
       <Switch>
        {isCustomLogin && (
          <PublicRoute
            Component={SIGNIN}
            exact
            store={store}
            path={ROUTES.SIGNIN}
          />
        )}
        {!isCustomLogin && (
          <CommonRoute component={HOME} exact path={ROUTES.HOME} />
        )}
        <CommonRoute component={CART} exact path={ROUTES.CART} />
        <CommonRoute component={PRODUCT_SEARCH} exact path={ROUTES.PRODUCTS} />
        <CommonRoute
          component={PRODUCT_COMPARE}
          exact
          path={ROUTES.COMPARE + "/*"}
        />
        <CommonRoute component={PRODUCT_COMPARE} exact path={ROUTES.COMPARE} />
        <CommonRoute
          exact
          path="/resetPassword/:token"
          renderDefaultComponent={false}
          component={PasswordReset}
          noLayout
        />

        <CommonRoute
          component={SHOPPINGLISTS}
          exact
          path={ROUTES.SHOPPINGLISTS}
        />

        <CommonRoute
          component={SHOPPINGLISTS}
          exact
          path={ROUTES.DEFAULTSHOPPINGLISTS}
        />

        <CommonRoute
          component={SHOPPINGLISTS}
          exact
          path={ROUTES.LISTDETAILS}
        />

        <CommonRoute
        component={RequestSubmit}
        exact
        path={ROUTES.REQUESTSUBMIT}
        />

        <CommonRoute
          component={PRODUCT_DETAILS}
          exact
          path={ROUTES.DETAILS + "/*"}
        />
        <CommonRoute component={CATALOG} exact path={ROUTES.CATALOG + "/*"} />

        <CommonRoute
          component={OrderHistory}
          exact
          path={ROUTES.ORDERHISTORY}
        />

        <CommonRoute
        component={RequestReceived}
        exact
        path={ROUTES.REQUESTRECEIVED}
        />
        <CommonRoute
          component={OrderHistoryDetail}
          exact
          path={ROUTES.ORDERHISTORYDETAIL }
        />

        <CommonRoute
          component={OrderHistoryDetailLine}
          exact
          path={ROUTES.ORDERHISTORYDETAILLINE}
        />

        <CommonRoute
          component={RecentPurchase}
          exact
          path={ROUTES.RECENTPURCHASE}
        />

        <CommonRoute
          component={BestOfferViewAll}
          exact
          path={ROUTES.BESTOFFER}
        />
        <CommonRoute
          component={MostPopularViewAll}
          exact
          path={ROUTES.MOSTPOPULAR}
        />
        <CommonRoute
          component={Transactions}
          exact
          path={ROUTES.TRANSACTIONS}
        />
        <CommonRoute component={ThankYou} exact path={ROUTES.THANKYOU} />

        <CommonRoute
          component={ChangeCustomer}
          exact
          path={ROUTES.CHANGECUSTOMER}
        />

        <CommonRoute component={PAYMENT} exact path={ROUTES.PAYMENT} />
        <CommonRoute
          component={AccountSettings}
          exact
          path={ROUTES.ACCOUNTSETTINGS}
        />
        <CommonRoute
          component={QuotationSummary}
          exact
          path={ROUTES.QUOTATION}
        />
        <CommonRoute
          component={QuotationDetail}
          exact
          path={ROUTES.QUOTATIONDETAIL}
        />
        <CommonRoute
          component={QuotationDetailLine}
          exact
          path={ROUTES.QUOTATIONDETAILLINE}
        />
        <PublicRoute
          component={OrderReceipt}
          exact
          path={ROUTES.ORDERRECEIPT}
        />

        <CommonRoute component={InvoiceHistory} exact path={ROUTES.INVOICE} />
        <CommonRoute
          component={InvoiceHistoryDetail}
          exact
          path={ROUTES.INVOICEDETAIL}
        />
        <CommonRoute
          component={InvoiceHistoryDetailLine}
          exact
          path={ROUTES.INVOICEDETAILLINE}
        />
         <CommonRoute
          component={ContactUs}
          exact
          path={ROUTES.CONTACTUS}
        />
         <CommonRoute
          component={RequestHistory}
          exact
          path={ROUTES.REQUEST}
        />
          <CommonRoute
          component={RequestHistoryDetail}
          exact
          path={ROUTES.REQUESTHISTORYDETAIL}
        />
          <CommonRoute
          component={RequestHistoryDetailLine}
          exact
          path={ROUTES.REQUESTHISTORYDETAILLINE}
        />
        <CommonRoute
          exact
          path={ROUTES.HOME}
          isAuth
          renderDefaultComponent={base_url ? true : false} //prop to hide header and footer once base_url is undefined
          render={({ history }: { history: any }) => {
            const isAuth = store?.getState()?.user?.user?.data?.isAuthenticated;

            if (isAuth) {
              return <HOME />;
            }

            return base_url ? history.push("/signin") : null; //push to sign in page once bas_url is set
          }}
        />
        {/* if page does not exist then redirect to home page */}
        <Redirect from="*" to="/" />
      </Switch>}
    </HashRouter>
    </Fragment> 
  );
}

export default CheckRequests(AppRouter);
