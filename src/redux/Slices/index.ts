import { combineReducers } from "redux";

import userReducer from "./UserAccount/userSlice";
import productsReducer from "./Products/productSearch";
import productsDetailsSlice from "./Products/productDetails";
import filterChipsReducer from "./Products/filterChipsReducer";
import languageCodesReducer from "./UserAccount/getLanguageCodes";
import bannersReducer from "./Promotions/banner";
import bestOfferReducer from "./Promotions/bestOffer";
import mostPopularReducer from "./Promotions/mostPopular";
import youMayLikeReducer from "./Promotions/youMayLike";
import webSettingsReducer from "./webSettings";
import customerListReducer from "./UserAccount/getCustomersList";
import getAllMenuReducer from "./getAllMenu";

import getTempOrderDataReducer from "./cart/getTemporaryOrderData";
import deliveryInformationReducer from "./cart/getDeliveryInformationData";
import orderHistoryReducer from "./Enquiry/Order/orderHistory";
import selectedCustomerReducer from "./UserAccount/selectedCustomerReducer";

import productsOnSaleReducer from "./Promotions/productsOnSale";
import logoutReducer from "./UserAccount/logout";
import orderHistoryDetailReducer from "./Enquiry/Order/orderHistoryDetail";
import GetFilterDetailsSlice from "./getFilterDetails";
import closeCartReducer from "./cart/getCloseCart";
import shoppingListReducer from "./shoppingList/addToShoppingList";
import addToCartReducer from "./cart/addToCart";
import interruptedCartReducer from "./cart/getInterruptedCart";
import getItemValidateDetails from "./cart/getItemValidateDetails";
import getValidateItemDetails from "./cart/getValidateItemDetails";
import recentPurchaseReducer from "./Promotions/recentPurchase";
import forgotPasswordReducer from "./UserAccount/getForgotPassword";
import validateCustomerNewAccountReducer from "./UserAccount/validateCustomerNewAccount";
import createNewAccountReducer from "./UserAccount/createNewAccount";
import getAllCountriesReducer from "./UserAccount/getAllCountries";
import getLocaleListReducer from "./UserAccount/getLocaleList";
import productCompareSlice from "./Products/productCompare";
import catalogSlice from './Catalog/getCatalogData';
import getStateListReducer from "./UserAccount/getStateList";
import getCountyForStateReducer from "./UserAccount/getCountyForState";
import resetPasswordReducer from "./UserAccount/resetPassword";
import salesOrderDetailsReducer from "./cart/getSalesOrderDetails";
import changeDefaultCustomerReducer from './UserAccount/changeDefaultCustomer';
import getCatalogueMenuReducer from "./Catalog/Menu/getCatalogueMenu";
import curbStoneURLReducer from './cart/getCurbStoneURL'
import transactions from './Enquiry/Transactions/transactions';
import paymentOrderStatusReducer from './cart/getPaymentOrderStatus'
import quotationSummary from './Enquiry/Quotations/QuotationSummary';
import QuotationSummaryDetail from './Enquiry/Quotations/QuotationSummaryDetail'
import shoppingListsDetailsReducer from './shoppingLists/getShoppingListSearchDetails'
import createNewShoppingListReducer from './shoppingLists/CreateNewShoppingList'
import makeDefaultShoppingListReducer from './shoppingLists/makeDefaultShoppingList'
import deleteShoppingListReducer from './shoppingLists/deleteShoppingList'
import shoppingListLineDetailsReducer from './shoppingLists/getShoppingListLineDetails'
import saveShoppingListLinesReducer from './shoppingLists/SaveShoppingListLines'
import deleteShoppingListLinesReducer from './shoppingLists/deleteShoppingListLines'
import invoiceHistory from './Enquiry/Invoices/InvoiceHistory'
import changePasswordReducer from './UserAccount/changePassword'
import editUserReducer from './UserAccount/editUser'
import catalogueCategoryTreeReducer from './Catalog/getCatalogueCategoryTree';
import invoiceHistoryDetail from './Enquiry/Invoices/invoiceHistoryDetail'
import getWebUserDetailsReducer from './UserAccount/getWebUserDetails'
import sendEmailReducer from './UserAccount/sendEmail'
import RequestHistory from './Enquiry/Request/RequestHistory';
import RequestHistoryDetail from './Enquiry/Request/RequestHistoryDetail';
import requestSubmit from './Request/getRequestFilters'
import EmailOrderDetails from './cart/getEmailOrderDetails'

const combineReducer = combineReducers({
  logout: logoutReducer,
  user: userReducer,
  products: productsReducer,
  productDetails: productsDetailsSlice,
  productCompare: productCompareSlice,
  catalogDetails: catalogSlice,
  filterChips: filterChipsReducer,
  banners: bannersReducer,
  languageCodes: languageCodesReducer,
  bestOffer: bestOfferReducer,
  mostPopular: mostPopularReducer,
  productsOnSale: productsOnSaleReducer,
  webSettings: webSettingsReducer,
  customersList: customerListReducer,
  getAllMenuData: getAllMenuReducer,
  getFilterDetails: GetFilterDetailsSlice,
  cartItems: getTempOrderDataReducer,
  interruptedCart: interruptedCartReducer,
  orderHistory: orderHistoryReducer,
  customer: selectedCustomerReducer,
  closeCart: closeCartReducer,
  deliveryInformation: deliveryInformationReducer,
  addToShoppingList: shoppingListReducer,
  orderHistoryDetail: orderHistoryDetailReducer,
  addToCart: addToCartReducer,
  itemValidateDetails: getItemValidateDetails,
  validateItemDetails: getValidateItemDetails,
  recentPurchase: recentPurchaseReducer,
  forgotPassword: forgotPasswordReducer,
  validCustomer: validateCustomerNewAccountReducer,
  countriesList: getAllCountriesReducer,
  localeList: getLocaleListReducer,
  statesList: getStateListReducer,
  countyList: getCountyForStateReducer,
  createAccount: createNewAccountReducer,
  resetpassword: resetPasswordReducer,
  salesOrderDetails: salesOrderDetailsReducer,
  transactions:transactions,
  youMayLike: youMayLikeReducer,
  changeCustomer: changeDefaultCustomerReducer,
  getCatalogueMenu: getCatalogueMenuReducer,
  curbStoneURL:curbStoneURLReducer,
  paymentOrderStatus:paymentOrderStatusReducer,
  quotationsummary  :quotationSummary,
  quotationSummaryDetail:QuotationSummaryDetail,
  shoppingListsDetails:shoppingListsDetailsReducer,
  createNewShoppingList:createNewShoppingListReducer,
  makeDefaultShoppingList:makeDefaultShoppingListReducer,
  deleteShoppingList:deleteShoppingListReducer,
  shoppingListLineDetails:shoppingListLineDetailsReducer,
  saveShoppingListLines:saveShoppingListLinesReducer,
  deleteShoppingListLines:deleteShoppingListLinesReducer,
  invoiceHistory : invoiceHistory,
  changePassword: changePasswordReducer,
  editUser :editUserReducer,
  catalogueCategoryTree: catalogueCategoryTreeReducer,
  invoiceHistoryDetail:invoiceHistoryDetail,
  webUser : getWebUserDetailsReducer,
  sendEmail : sendEmailReducer,
  requestHistory : RequestHistory,
  requestHistoryDetail : RequestHistoryDetail,
  requestSubmit : requestSubmit,
  emailOrderDetails: EmailOrderDetails
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "SIGNOUT") {
    return combineReducer(undefined, action); //To clear in-browser redux store
  }
  return combineReducer(state, action); //Use combine reducers with default state if no "sign_out" action is dispatched
};

export default rootReducer;
