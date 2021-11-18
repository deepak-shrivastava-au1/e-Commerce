import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartSelector, fetchcartItems, disablePromotionCodeError, setDefaultScreen, initializeCartLoader } from '@slices/cart/getTemporaryOrderData';
import { fetchdeliveryInformationData, fetchCountryList, deliveryInformationSelector, fetchAllMannerOfTransport } from "@slices/cart/getDeliveryInformationData"
import { InterruptedCartSelector } from "@slices/cart/getInterruptedCart"
import { useGetLoggedInUserInfo } from '../../hooks'
import { WebSettingsContext } from './WebsettingsProvider';
import { IuserWebSettings } from '@constants/interfaces/userWebSettings';
import { useTranslation } from 'react-i18next';

const UserCartContext: any = React.createContext(null);

const UserCartCtxProvider = ({ children }: { children: React.ReactNode }) => {

  const dispatch = useDispatch();

  const { cartItems, loading, hasErrors, defaultScreen, hasPromotionError, addCartItemStatus, isPromotionCodeApplied, messageCode: cartErrorCode }: any = useSelector(cartSelector);

  const { deliveryInformationData: deliveryInformation, loading: isDeliveryInformationLoading }: any = useSelector(deliveryInformationSelector);

  const deliveryInformationData = deliveryInformation?.deliveryInformation;

  const countryCodeList = deliveryInformation?.countryCodeList;

  const allMannerOftransport = deliveryInformation?.allMannerOftransport;

  const [promotionCode, setPromotionCode] = useState("")

  const [isTermsNCondChecked, setIsTermsNCondChecked] = useState<boolean>(false)

  const sessionId = useGetLoggedInUserInfo()?.sessionId;

  const webSettings: IuserWebSettings | null = useContext(WebSettingsContext);

  const [defaultPaymentMethod, setDefaultPaymentMethod] = useState<{ 'invoice': { status: boolean }, 'online': { status: boolean } }>({ 'invoice': { status: true }, 'online': { status: false } })

  const { t } = useTranslation();

  const [data, setData] = useState<any>(null);

  const [recalculatedCartData, setRecalculatedCartData] = useState<Array<{ lineNumber: string, quantity: string, deliveryDate: string }>>([]);  // stores the data for recalculate all present order line items

  const [currencyStatus, setCurrencyStatus] = useState<{
    currencyCode: string, showPopUp: boolean
  }>({
    currencyCode: '', showPopUp: false
  })

  /**
   * 
   * @param currency 
   * @returns formatted currency
   * @description Check if cart is empty if so then the function will not format the currency ex: returns 10,000 instead of SEK 10,000
   */
  const FormattedCurrency = (currency: any) => {
    if (!data?.currentOrder?.lineCount) {
      return currency;
    }
    return webSettings?.isShowCurrencySymbolBefore ? ` ${webSettings?.currencyCode} ${currency}` : `${currency} ${webSettings?.currencyCode}`;
  }

  const interruptedCartFormatedCurrency = (currency: string) => {
    if (!currency) {
      return currency;
    }
    return webSettings?.isShowCurrencySymbolBefore ? ` ${webSettings?.currencyCode} ${currency}` : `${currency} ${webSettings?.currencyCode}`;
  }

  useEffect(() => {
    // INFO When user switch to / clicks on "Delivery Info" tab run this sideeffect
    if (defaultScreen?.["timeLine"]["page"] === 'delivery') {
      dispatch(fetchdeliveryInformationData(sessionId))
    }
  }, [defaultScreen])

  // INFO Hook to initialize required webserices for shopping cart page
  useEffect(() => {
    if (sessionId) {
      dispatch(initializeCartLoader())
      dispatch(fetchcartItems(sessionId));
      dispatch(fetchdeliveryInformationData(sessionId))
      dispatch(fetchCountryList(sessionId))
      dispatch(fetchAllMannerOfTransport(sessionId))
    }
  }, [sessionId]);

  useEffect(() => {
    if (cartItems && Object.keys(cartItems)?.length > 0) {
      setData(cartItems)
    }
  }, [cartItems])

  // INFO Hook to set currency status for "Review and order" page
  useEffect(() => {
    if(webSettings?.currencyCode){
      setCurrencyStatus({
        currencyCode:webSettings?.currencyCode,
        showPopUp:false
      })
    }
  }, [webSettings])

  return (
    <UserCartContext.Provider
      value={{
        data,
        loading,
        dispatch,
        hasErrors,
        sessionId,
        FormattedCurrency,
        interruptedCartFormatedCurrency,
        disablePromotionCodeError,
        hasPromotionError,
        currencyStatus,
        setCurrencyStatus,
        recalculatedCartData,
        setRecalculatedCartData,
        addCartItemStatus,
        t,
        deliveryInformationData,
        countryCodeList,
        cartErrorCode,
        defaultPaymentMethod,
        setDefaultPaymentMethod,
        isPromotionCodeApplied,
        promotionCode,
        setPromotionCode,
        isDeliveryInformationLoading,
        allMannerOftransport,
        defaultScreen,
        setDefaultScreen,
        isTermsNCondChecked,
        setIsTermsNCondChecked,
        webSettings
      }}>
      {children}
    </UserCartContext.Provider>
  );
};

export { UserCartContext, UserCartCtxProvider };
