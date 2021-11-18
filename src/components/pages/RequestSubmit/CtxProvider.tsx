import { IuserWebSettings } from '@constants/interfaces/userWebSettings';
import { breakpoints } from '@constants/styled-components';
import { useGetLoggedInUserInfo } from '@hooks';
import { useMediaQuery } from '@material-ui/core';
import { WebSettingsContext } from '@providers/WebsettingsProvider';
import { fetchFilterDetails, GetFilterDetailsSelector } from '@slices/getFilterDetails';
import { setScreenStatus } from '@slices/Request/getRequestFilters';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { TFunction, useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

interface IRequestSubmit {
  t: TFunction<"translation">
  webSettings: IuserWebSettings | null
  dispatch: Dispatch<any>
  isMobile: boolean
  userInfo: {
    userID: string
    userName: string
    languageCode: string
    isAuthenticated: boolean
    isRegistered: boolean
    defaultCustomerCode: string
    isSystemAdmin: boolean
    sessionId: string
    defaultShoppingListId: string
    numShopListForUser: string
    numOfShopListItemLines: string
    isForcePasswordChange: boolean
    errorCode: number
    isForceSelectCustomer: boolean
    isActive: boolean
  }
  filterData: any
  FormattedCurrency: (currency: string) => string
  setProductsList: React.Dispatch<React.SetStateAction<{
    code: string;
    quantity: number;
    unit: Array<{ label: string, value: string }>;
    defaultUnit: string;
    requestType: string;
    requestTypeDesc:string
    productDesc:string
    itemNumberOfDecimalsAllowed: Array<any>
    restricted: boolean | string
    Line:number
    desc: string;
  }[]>>
  productsList: {
    code: string;
    quantity: number;
    itemNumberOfDecimalsAllowed: Array<any>
    restricted: boolean | string
    Line:number
    requestTypeDesc:string
    unit: Array<{ label: string, value: string }>;
    defaultUnit: string;
    requestType: string;
    desc: string;
    productDesc:string
  }[]
  productListref: boolean
  setProductListref: React.Dispatch<React.SetStateAction<boolean>>
  requestHeaderDetails: {
    customer: string | undefined;
    yourReference: string | undefined;
    requestType: string;
    desc: string;
    customerCode: any
    reference:string
    docType:string
    requestTypeDesc:string
  }
  setRequestHeaderDetails: React.Dispatch<React.SetStateAction<{
    customer: string | undefined;
    customerCode: any
    yourReference: string | undefined;
    requestType: string;
    reference:string
    docType:string
    desc: string;
    requestTypeDesc:string
  }>>
  requestSubmitReference: "product" | "invoice" | "order"
  setRequestSubmitReference: React.Dispatch<React.SetStateAction<"product" | "invoice" | "order">>
}

export const RequestSubmitCtx = createContext({} as IRequestSubmit);

function CtxProvider({ children }: { children: React.ReactNode }) {

  const dispatch = useDispatch();

  const [requestSubmitReference, setRequestSubmitReference] = useState<'product' | 'invoice' | 'order'>('product') 

  const filterData = useSelector(GetFilterDetailsSelector);

  const [productListref, setProductListref] = useState(false);

  const isMobile = useMediaQuery(`(max-width:${breakpoints.sm})`);

  const [productsList, setProductsList] = useState<Array<{requestTypeDesc:string, itemNumberOfDecimalsAllowed: Array<any> ,restricted: boolean | string, Line:number, productDesc:string, code: string, defaultUnit: string, quantity: number, unit: Array<{ label: string, value: string }>, requestType: string, desc: string }>>([])

  const userInfo = useGetLoggedInUserInfo();

  const FormattedCurrency = (currency: string) => {
    return webSettings?.isShowCurrencySymbolBefore ? ` ${webSettings?.currencyCode} ${currency}` : `${currency} ${webSettings?.currencyCode}`;
  }

  const webSettings: IuserWebSettings | null = useContext(WebSettingsContext);

  const { t } = useTranslation();

  const [requestHeaderDetails, setRequestHeaderDetails] = useState<{
    customer: string | undefined;
    customerCode: any
    yourReference: string | undefined;
    requestType: string;
    desc: string;
    requestTypeDesc:string
    reference:string
    docType:string
  }>({
    customer: '',
    reference: '',
    customerCode:0,
    requestType: '',
    desc: '',
    requestTypeDesc:'',
    yourReference:'',
    docType:''
  })

  useEffect(() => {
    dispatch(fetchFilterDetails())

    return()=>{
      dispatch(setScreenStatus({
        requestSubmit:true,requestConfirmation:false
      }))
    }
  }, [])

  useEffect(() => {
    setRequestHeaderDetails(prevState=>{
      return {
        ...prevState,
        customer:webSettings?.defaultCustomerName,
        customerCode:webSettings?.defaultCustomerCode,
        yourReference:webSettings?.userName
      }
    })
  }, [webSettings])


  return (
    <RequestSubmitCtx.Provider
      value={{
        requestHeaderDetails,
        requestSubmitReference,
        setRequestSubmitReference,
        productListref,
        setProductListref,
        setRequestHeaderDetails,
        filterData,
        t,
        webSettings,
        dispatch,
        isMobile,
        userInfo,
        FormattedCurrency,
        productsList,
        setProductsList
      }}
    >
      {children}
    </RequestSubmitCtx.Provider>
  );
}

export default CtxProvider
