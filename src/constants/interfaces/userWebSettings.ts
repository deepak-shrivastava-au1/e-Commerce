export interface IuserWebSettings {
  languageCode:                 string;
  localeCode:                   string;
  currencyCode:                 string;
  isShowPrice:                  boolean;
  itemAvailabilityType:         string;
  defaultCustomerCode:          string;
  defaultCustomerName:          string;
  userCode:                     string;
  userName:                     string;
  itemMiniImageURL:             string;
  salesOrderType:               string;
  maxInactiveInterval:          string;
  recipientEmailAddress:        string;
  isSendEnquiryAllowed:         boolean;
  enquiryOnProductsValue:       string;
  warehouseAvailQty:            string;
  warehouseOnHand:              string;
  warehouseAvailDate:           string;
  allowPurchase:                string;
  showItemMatrix:               string;
  showMatrixTableView:          string;
  supportedLanguage:            string;
  welcomeText:                  string;
  footerText:                   string;
  hasAdminFee:                  boolean;
  hasInvoiceFee:                boolean;
  isShowOrderDiscount:          boolean;
  isShowCurrencySymbolBefore:   boolean;
  hasInvoiceAmountAdjustment:   boolean;
  showOrderLineDiscount:        boolean;
  isShowImage:                  boolean;
  isShowCookiesDisclaimer:      boolean;
  allowSalesPromotions:         boolean;
  sendMailOnRequest:            string;
  currencySetting:              string;
  actualCurrencyCode:           string;
  showPdfIcon:                  boolean;
  showExcelIcon:                boolean;
  showXmlIcon:                  boolean;
  showWebTextColumn:            boolean;
  showNumberOfItemsInFilter:    boolean;
  newWebUserPrefix:             string;
  paymentMethod:                string;
  showFullWebTextInItemTable:   boolean;
  allowDecimalsForQuantities:   boolean;
  allowBuyFromQuotationLine:    boolean;
  showSalesTermsAndConditions:  string;
  useDatePicker:                boolean;
  isUseQuotationPrice:          boolean;
  emailConfirmOverrideAllowed:  boolean;
  showEmailInvoiceDispatch:     boolean;
  emailInvoiceOverrideAllowed:  boolean;
  showEmailOrderDispatch:       boolean;
  emailOrderOverrideAllowed:    boolean;
  autoEmailDispatch:            string;
  automEmailInvoice:            string;
  autoEmailOrder:               string;
  showCreditInfoMessage:        boolean;
  showInterruptedCart:          boolean;
  UseIbsAmtForNotifications:    boolean;
  showCatalogueBreadcrumb:      boolean;
  popUpWindowOpenTime:          string;
  showSalesMan:                 boolean;
  showGrossVolume:              boolean;
  showProductWidth:             boolean;
  showProductHeight:            boolean;
  showProductLength:            boolean;
  showProductGrossWeight:       boolean;
  showProductNetVolume:         boolean;
  showProductNetWeight:         boolean;
  showGoodsMarks:               boolean;
  enableLightTheme:             boolean;
  showItemAttributes:           boolean;
  showEANCodes:                 boolean;
  showHandlerOrder:             boolean;
  showHandlerOrderDetails:      boolean;
  showFilterOnTop:              boolean;
  showFiltersOpenClosed:        boolean;
  rightYouMayLike:              boolean;
  showMannerOfTransport:        boolean;
  showCommodityCode:            boolean;
  defaultCustomerWarehouseCode: string;
  showCategoryFeilds:           boolean;
  headerText:                   string;
  searchText:                   string;
  showCustomLoginPage:          boolean;
  customLoginBackGroundImage:   string;
  enablePagination:             boolean;
  showContainerInfo:            boolean;
  allowChangeOfLocale:          boolean;
  orderProgressBarClickable:    boolean;
  buyEnabledForUser:            boolean;
  showPriceSortingAndFiltering: boolean;
  validSearchFilters:           ValidSearchFilter[];
  showPriceValue:               string;
  allowDeleteOrder:             boolean;
  showPriceCalculation:         boolean;
  paymentHostName:              string;
  paymentMerchantId:            string;
  paymentTokenId:               string;
  remainInOrder:                boolean;
  paymentErrorCode:             number;
  isPaymentModeActivated:       boolean;
  isUse_E_Payment:              boolean;
  validMOT:                     string;
  showWelcomeText:              boolean;
  maxFutureDeliveryDays:        number;
  showMOTWarning:               boolean;
  confirmDeletion:              boolean;
  confirmDeletionOfLine:        boolean;
  validItemCatalogues:          string;
  cachingLevelSession:          number;
  validProblemCodes:            string;
  arTransRestriction:           string;
  itemSearchDatabase:           string;
  additionalItemRestriction:    string;
  validWebPages:                string;
  allowDiscountDisplay:         string;
  itemRestCode:                 string;
  useEPayment:                  string;
  startAmountPriceFilter1:      string;
  endAmountPriceFilter1:        string;
  startAmountPriceFilter2:      string;
  endAmountPriceFilter2:        string;
  startAmountPriceFilter3:      string;
  endAmountPriceFilter3:        string;
  startAmountPriceFilter4:      string;
  endAmountPriceFilter4:        string;
  advanceSearchFreeTextField:   string;
  showRelatedItems:             boolean;
  showExtendedItemDescription:  string;
  useCalculatedDeliveryDate:    boolean;
  isExtendedTextinGridView:     boolean;
  sessionId:                    string;
  senderEmailAddress:           string;
  userEmail:                    string;
  showDiscount:                 string;
  allowedSharedList:            string;
  numShoppingListForUser:       string;
  defaultShoppingListId:        string;
  currentListId:                string;
  selectedListOwner:            string;
  numOfShopListItemLines:       string;
  isShowMostPopularItems:       boolean;
  isShowCrossSellItems:         boolean;
  isShowUpSellItems:            boolean;
  isShowPromotionalItems:       boolean;
  maxQuantity:                  number;
  newCustomerPolicy:            string;
  newCustomerTypePolicy:        string;
  newWebUserPolicy:             string;
  defaultDelimiter:             string;
  showBanner:                   boolean;
  showBannerInterval:           number;
  allowDispatchAddressOverride: string;
  allowChangeCompleteDelivery:  string;
  allowChangeMannerOfTransport: string;
  showEmailConfirmDispatch:     boolean;
  emailDispatchOverrideAllowed: boolean;
  defaultDateFormat:            string;
  sessionDefaultCustomerCode:   string;
  sessionDefaultCustomerName:   string;
  showCrossReferenceColumn:     boolean;
  showItemGroupColumn:          boolean;
  defaultOrderBy:               string;
  defaultSortByParam:           string;
  maxNumOfShopList:             string;
  showOrderLineValueInclVAT:    boolean;
  allowSharedShoppingList:      string;
}

export interface ValidSearchFilter {
  searchOptionTypeCode: string;
  description:          string;
  maxVisualListSize:    string;
}