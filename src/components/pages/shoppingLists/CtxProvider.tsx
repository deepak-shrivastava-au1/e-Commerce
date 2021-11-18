import { IuserWebSettings } from '@constants/interfaces/userWebSettings';
import { breakpoints } from '@constants/styled-components';
import { useGetLoggedInUserInfo } from '@hooks';
import { useMediaQuery } from '@material-ui/core';
import { WebSettingsContext } from '@providers/WebsettingsProvider';
import React, { createContext, useContext } from 'react'
import { TFunction, useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

interface IShoppingList {
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
  FormattedCurrency:(currency:string)=>string
}

export const ShoppingListsContext = createContext({} as IShoppingList);

function CtxProvider({ children }: { children: React.ReactNode }) {

  const dispatch = useDispatch()

  const isMobile = useMediaQuery(`(max-width:${breakpoints.sm})`);

  const userInfo = useGetLoggedInUserInfo();

  const FormattedCurrency = (currency: string) => {
    return webSettings?.isShowCurrencySymbolBefore ? ` ${webSettings?.currencyCode} ${currency}` : `${currency} ${webSettings?.currencyCode}`;
  }

  const webSettings: IuserWebSettings | null = useContext(WebSettingsContext);

  const { t } = useTranslation();


  return (
    <ShoppingListsContext.Provider
      value={{
        t,
        webSettings,
        dispatch,
        isMobile,
        userInfo,
        FormattedCurrency,
      }}
    >
      {children}
    </ShoppingListsContext.Provider>
  );
}

export default CtxProvider
