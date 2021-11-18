import styled from "styled-components";
import { getAllMenuDataSelector } from "@slices/getAllMenu";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { NavLink, useRouteMatch } from "react-router-dom";
import {
  ORDERHISTORY,
  RECENTPURCHASE,
  TRANSACTIONS,
  QUOTATION,
  INVOICE,
  ACCOUNTSETTINGS,
  INVOICEDETAIL,
  INVOICEDETAILLINE,
} from "@constants/Routes";
import * as ROUTES from "@constants/Routes";
import {
  Settings,
  Requisite,
  ShoppingList,
  DollarSign,
  Csv,
  Invoice,
  History,
  SubmitRequest,
  HelpCircle,
} from "@icons";

const Leftdiv = styled.div`
  background: var(--white);
  border: 1px solid var(--border-color);
  box-sizing: border-box;
  border-radius: var(--border-radius);
  min-width: 320px;
  height: 100%;
  padding: 14px 26px;

  .navtextmenu {
    font-weight: var(--font-weight-bold);
    text-align: left;
    font-size: calc(var(--base-font-size) + 2px);
    line-height: 40px;
  }

  .navtextsubmenu {
    font-weight: var(--font-weight-medium);
    color: var(--primary-color-3);
    line-height: 42px;
    padding-left: 22px;
    text-align: left;
  }
  .icon {
    margin-right: 8px;
    margin-top: -3px;
  }
`;
const LeftNevigation = () => {
  const getAllMenuData = useSelector(getAllMenuDataSelector);
  const { t, i18n } = useTranslation();
  let { path, url } = useRouteMatch();

  return (
    <Leftdiv className='left-nav'>
      <nav className='navbar'>
        <div className='d-flex flex-column flex-shrink-0'>
          <ul className='nav navbar-nav flex-column mb-auto '>
            <li className='nav-item'>
              <NavLink
                to={ACCOUNTSETTINGS}
                activeClassName='active'
                isActive={() => [ROUTES.ACCOUNTSETTINGS].includes(path)}
              >
                <div className='nav-link  navtextmenu' aria-current='page'>
                  <Settings className='icon icon-md' />
                  {t("CON_EDIT_ACCOUNT")}
                </div>
              </NavLink>
            </li>
          </ul>
         
          <ul className='nav nav-pills flex-column mb-auto '>
            <li className='nav-item'>
              <a href='#' className='nav-link navtextmenu' aria-current='page'>
                {/* <ShoppingList className="icon icon-md" /> */}
                <NavLink
                  to={ROUTES.SHOPPINGLISTS}
                  activeClassName='active'
                  isActive={() =>
                    [
                      ROUTES.SHOPPINGLISTS,
                      ROUTES.LISTDETAILS,
                      ROUTES.DEFAULTSHOPPINGLISTS,
                    ].includes(path)
                  }
                >
                  <span className='nav-link navtextmenu' aria-current='page'>
                    <ShoppingList className='icon icon-md' />
                    {t("TXT_PAGE_TITLE_SHOPPING_LIST")}
                  </span>
                </NavLink>
              </a>
            </li>
          </ul>
          <ul className='nav flex-column mb-auto '>
            <li className='nav-item'>
              <NavLink
                to={ORDERHISTORY}
                activeClassName='active'
                isActive={() =>
                  [
                    ROUTES.ORDERHISTORY,
                    ROUTES.ORDERHISTORYDETAIL,
                    ROUTES.ORDERHISTORYDETAILLINE,
                  ].includes(path)
                }
              >
                <div className='nav-link navtextmenu'>
                  <Requisite className='icon icon-md' />
                  {t("CON_ORDER")}
                </div>
              </NavLink>
            </li>
          </ul>
          <ul className='nav flex-column mb-auto '>
            <li className='nav-item'>
              <NavLink to={TRANSACTIONS} activeClassName='active'>
                <div className='nav-link navtextmenu'>
                  <DollarSign className='icon icon-md' />
                  {t("CON_TRANSACTIONS")}
                </div>
              </NavLink>
            </li>
          </ul>
          <ul className='nav nav-pills flex-column mb-auto '>
            <li className='nav-item'>
              <NavLink to={QUOTATION} activeClassName='active'>
                <div className='nav-link navtextmenu'>
                  <Csv className='icon icon-md' />
                  {t("CON_QUOTATION")}
                </div>
              </NavLink>
            </li>
          </ul>
          <ul className='nav nav-pills flex-column mb-auto '>
            <li className='nav-item'>
              <NavLink
                to={INVOICE}
                activeClassName='active'
                isActive={() =>
                  [
                    ROUTES.INVOICE,
                    ROUTES.INVOICEDETAIL,
                    ROUTES.INVOICEDETAILLINE,
                  ].includes(path)
                }
              >
                <div className='nav-link navtextmenu'>
                  <Invoice className='icon icon-md' />
                  {t("CON_INVOICE")}
                </div>
              </NavLink>
            </li>
          </ul>

          <ul className='nav nav-pills flex-column mb-auto '>
            <li className='nav-item'>
            <NavLink
                to={ROUTES.REQUEST}
                activeClassName='active'
                isActive={() =>
                  [
                    ROUTES.REQUEST,
                    ROUTES.REQUESTHISTORYDETAIL,
                    ROUTES.REQUESTHISTORYDETAILLINE,
                  ].includes(path)
                }
              >
                <div className='nav-link navtextmenu'>
                <SubmitRequest className='icon icon-md' />
                {t("CON_BP_REQUEST")}
                </div>
              </NavLink>

             
            </li>
          </ul>

          <ul className='nav nav-pills flex-column mb-auto '>
            <NavLink
              to={ROUTES.CONTACTUS}
              activeClassName='active'
              isActive={() => [ROUTES.CONTACTUS].includes(path)}
            >
              <li className='nav-item'>
                <a
                  href='#'
                  className='nav-link navtextmenu'
                  aria-current='page'
                >
                  <HelpCircle className='icon icon-md' />
                  {t("CON_CONTACT_US")}
                </a>
              </li>
            </NavLink>
            {/* <li className="nav-item">
              <a
                href="#"
                className="nav-link navtextsubmenu"
                aria-current="page"
              >
                Contact Info
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className="nav-link navtextsubmenu"
                aria-current="page"
              >
                {t("CON_GENERAL_ENQUIRY")}
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className="nav-link navtextsubmenu"
                aria-current="page"
              >
                {t("CON_HELP")}
              </a>
            </li> */}
          </ul>
        </div>
      </nav>
    </Leftdiv>
  );
};

export default LeftNevigation;
