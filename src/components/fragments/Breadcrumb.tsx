import React from 'react';
import {
  Breadcrumbs as MUIBreadcrumbs,
  Link,
  Typography,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import '../../scss/components/_breadcrumb.scss';
import { useTranslation } from 'react-i18next';
import { DEFAULTSHOPPINGLISTS } from '@constants/Routes';

const Breadcrumbs = (props: any) => {
  const {
    history,
    location: { pathname },
  } = props;
  const { t, i18n } = useTranslation();
  const breadCrumbValues: any = {
    account: 'TXT_PAGE_TITLE_ACCOUNT',
    cart: 'TXT_PAGE_TITLE_SHOPPING_CART',
    admin: 'Admin',
    products: 'Products',
    signin: 'CON_SIGN_IN',
    signout: 'CON_SIGN_OUT',
    signup: 'Sign Up',
    search: 'Search',
    productSearch: 'CON_PRODUCT_SEARCH',
    productDetails: 'CON_PRODUCT_DETAILS',
    orderhistory: 'COH_ORDER_SEARCH',
    orderhistorydetail: 'Order History Detail',
    recentPurchase: 'CON_RECENT_PURCHASES',
    accountSettings:'CON_EDIT_ACCOUNT',
    shoppingLists:'CON_SHOPPING_LIST',
    listDetails:'CON_SHOPPING_LIST_ENTRY'
  };

  const getValueToDisp = (val: string) => {
    let getV = val;

    if (breadCrumbValues.hasOwnProperty(getV)) {
      return `${breadCrumbValues[getV]}`;
    } else {
      return getV;
    }
  };

  const pathnames = pathname.split('/').filter((x: any) => x);

  return (
    <MUIBreadcrumbs separator='›' aria-label='breadcrumb'>
      {pathnames.length > 0 ? (
        <Link onClick={() => history.push('')}>Home</Link>
      ) : (
        <Typography> Home </Typography>
      )}
      {pathnames.map((name: string, index: any) => {

        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
       
        const isLast = index === pathnames.length - 1;

        return isLast ? (
          !pathname?.includes(DEFAULTSHOPPINGLISTS+'/') ? <Typography key={name}>{t(getValueToDisp(name))}</Typography> : ''
        ) : (
          <Link key={name} onClick={() => history.push(routeTo)}>
            {t(getValueToDisp(name))}
          </Link>
        );
      })}
    </MUIBreadcrumbs>
  );
};

export default withRouter(Breadcrumbs);
