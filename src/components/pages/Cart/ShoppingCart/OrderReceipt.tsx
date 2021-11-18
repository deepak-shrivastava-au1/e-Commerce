import React, { useContext, useEffect } from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
  Font,
} from '@react-pdf/renderer';
import styled from "styled-components"
import Logo from '../../../../assets/images/logo.png';
import OpenSansFont from '../../../../assets/fonts/OpenSans-Regular.ttf'
import OpenSansFontBold from '../../../../assets/fonts/OpenSans-Bold.ttf'
import OpenSansFontSemiBold from '../../../../assets/fonts/OpenSans-SemiBold.ttf'
import { cssVar } from 'polished';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { hyphenTextGenerator } from "../Payment/PaymentSection"
import { salesOrderDetailsSelector, fetchGetSalesOrderDetails, initializeSalesOrderDetailsLoader, getSalesOrderDetailsSuccess } from '@slices/cart/getSalesOrderDetails';
import { useGetLoggedInUserInfo } from '@hooks';
import { useLocation } from 'react-router-dom';
import LoadingOverlay from '@common/LoadingOverlay';
import { IuserWebSettings } from '@constants/interfaces/userWebSettings';
import { WebSettingsContext } from '@providers/WebsettingsProvider';


Font.register({
  family: `'OpenSans-Regular'`,
  fonts: [{ src: OpenSansFont }, { src: OpenSansFontBold, fontWeight: 700 }, { src: OpenSansFontSemiBold, fontWeight: 600 }]
})

export const PDFContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  >iframe{
    width:100%;
    height:100vh;
  }
`

// Create styles
export const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    color: `${cssVar('--primary-color-2')}`,
    padding: 30,
    paddingBottom: 60,
    fontFamily: `'OpenSans-Regular'`,
    fontSize: 10,
    fontWeight: Number(cssVar('--font-weight-regular'))
  },
  bold: {
    fontWeight: Number(cssVar('--font-weight-bold')),
  },
  medium: {
    fontWeight: Number(cssVar('--font-weight-medium')),
  },
  'fontSize16': {
    fontSize: `${Number(cssVar('--base-font-size').toString().split('px')[0]) + 2 + 'px'}`
  },
  border: {
    border: '1 solid #C5CDCF',
    borderRadius: '2',
  },
  greyBackground: {
    backgroundColor: '#E5E5E5',
  },
  link: {
    color: '#1b96c3',
    textDecoration: 'underline',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    flewWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    padding: 5,
  },
  columns: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    width: '100%',
  },
  tableContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    marginTop: 10,
  },
  containerHeader: {
    flexDirection: 'row',
    borderBottomColor: '#F4F5F7',
    backgroundColor: '#F4F5F7',
    borderBottomWidth: 1,
    alignItems: 'center',
    height: 27,
    textAlign: 'left',
    flexGrow: 1,
    fontWeight: 700,
  },
  tablePadding: {
    paddingHorizontal: 5,
  },
  summaryContainer: {
    display: 'flex',
    borderTop: "4px solid black",
    borderBottom: "4px solid black",
    flexDirection: 'row',
    justifyContent: "flex-end"
  },
  GrandTotal: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "flex-end"
  },
  userDetailsColor: {
    color: `${cssVar('--primary-color-3')}`
  },
  logo: {
    width: '200px'
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    position: 'absolute',
    bottom: 30,
    left: 30,
    fontSize: 8,
    color: '#000',
    marginTop: 10,
    width: '100%',
  }
});


// Create Document Component
const MyDocument = () => {

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { data: salesOrderDetails, loading } = useSelector(salesOrderDetailsSelector);

  const NotAvailableGenerator = (value: any) => value ? value : 'NA';

  const TotalLines = NotAvailableGenerator(salesOrderDetails?.nsOrderValueInfo?.emTotalLines);

  const AdminFees = NotAvailableGenerator(salesOrderDetails?.nsOrderValueInfo?.administrationFee);

  const location = useLocation();

  const TotalExcVAT = NotAvailableGenerator(salesOrderDetails?.nsOrderValueInfo?.emLineNet);

  const deliveryAddress = salesOrderDetails?.delAddress?.split('</br>').map((address: string) => <Text style={styles.medium}> {address} </Text>)

  const confirmedAddress = salesOrderDetails?.confAddress?.split('</br>').map((address: string) => <Text style={styles.medium}> {address} </Text>)

  const VAT = NotAvailableGenerator(salesOrderDetails?.nsOrderValueInfo?.emVAT);

  const Discount = NotAvailableGenerator(salesOrderDetails?.nsOrderValueInfo?.emDisCount);

  const CoinAdjustment = NotAvailableGenerator(salesOrderDetails?.nsOrderValueInfo?.coinAdjustment);

  const orderNumber = new URLSearchParams(location?.search).get('orderNumber');

  const webSettings: IuserWebSettings | null = useContext(WebSettingsContext);

  const sessionId = useGetLoggedInUserInfo()?.sessionId;

  const showIncludingVATorNot = () => webSettings?.showOrderLineValueInclVAT ? salesOrderDetails?.orderValueInclVAT : salesOrderDetails?.orderValueExclVAT;

  useEffect(() => {
    dispatch(initializeSalesOrderDetailsLoader())
    dispatch(fetchGetSalesOrderDetails(sessionId, orderNumber))

    return () => {
      dispatch(getSalesOrderDetailsSuccess(null))
    }
  }, [])

  return (
    <PDFContainer>
      <LoadingOverlay active={loading} />
      <PDFViewer>
        <Document>
          <Page size="A3" orientation="portrait" wrap style={styles.page}>

            {/* Header */}
            <View style={{ display: 'flex', flexDirection: "row", width: '100%', marginBottom: "30px" }}>
              <View style={{ ...styles.bold, ...styles.fontSize16, flexGrow: 1, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
                <Image style={styles.logo} src={Logo} />
              </View>
              <View style={{ flexGrow: 1 }}>
                <Text style={[styles.bold, { fontSize: "22px", marginBottom: "15px" }]}> {t('CON_ORDER_RECEIPT')} </Text>
                <View style={{ display: 'flex', flexDirection: "row", width: '100%', justifyContent: "space-between" }}>
                  <div style={{ display: 'flex', flexDirection: "column" }}>
                    <Text style={styles.userDetailsColor}>{t('CON_ORDER_NUMBER')}</Text>
                    <Text style={styles.medium}>#{salesOrderDetails?.orderNumber}</Text>
                  </div>
                  <div style={{ display: 'flex', flexDirection: "column" }}>
                    <Text style={styles.userDetailsColor}>{t('COH_ORDER_DATE')}</Text>
                    <Text style={styles.medium}>{salesOrderDetails?.orderDate}</Text>
                  </div>
                  <div style={{ display: 'flex', flexDirection: "column" }}>
                    <Text style={styles.userDetailsColor}>{t('CON_ORDER_TEXT')}</Text>
                    <Text style={styles.medium}>{salesOrderDetails?.orderText}</Text>
                  </div>
                </View>
              </View>
            </View>

            {/* User details */}
            <View style={styles.row}>
              <div style={{ ...styles.columns, justifyContent: "space-between" }}>
                <div>
                  <Text style={[{ ...styles.userDetailsColor, marginBottom: "5px" }]}>{t('CON_PAYMENT_METHOD')}</Text>
                  <Text style={styles.medium}>{t(salesOrderDetails?.paymentMethod)}</Text>
                </div>
                <div style={{ marginTop: "10px" }}>
                  <Text style={[{ ...styles.userDetailsColor, marginBottom: "5px" }]}>{t('CON_TERMS_OF_PAYMENT')}</Text>
                  <Text style={styles.medium}>{salesOrderDetails?.topDesc}</Text>
                </div>
              </div>
              <div style={styles.columns}>
                <Text style={[{ ...styles.userDetailsColor, marginBottom: "5px" }]}>{t('CON_DELIVERY_ADDRESS')}</Text>
                {deliveryAddress}
              </div>
              <div style={styles.columns}>
                <Text style={[{ ...styles.userDetailsColor, marginBottom: "5px" }]}>{t('CON_CONFIRMATION_ADDRESS')}</Text>
                {confirmedAddress}
              </div>
            </View>

            {/* Table Container */}
            <View style={[styles.tableContainer, styles.border, { marginTop: "30px" }]}>
              {/* Table Header */}
              <View style={[styles.containerHeader, styles.tablePadding]}>
                <Text style={[{ ...styles.columns, width: "150%", color: "#000" }]}>{t('CON_ITEM')}#</Text>
                <Text style={{ ...styles.columns, width: "170%", color: "#000" }}>{t('COH_DESCRIPTION')}</Text>
                <Text style={[{ ...styles.columns, color: "#000" }]}>{t('CON_DELIVERY_DATE')}</Text>
                <Text style={[{ ...styles.columns, color: "#000" }]}>{t('CON_UNIT')}</Text>
                <Text style={[{ ...styles.columns, color: "#000" }]}>{t('CON_DISCOUNT')}</Text>
                <Text style={[{ ...styles.columns, color: "#000" }]}>{t('CON_PRICE')}</Text>
                <Text style={[{ ...styles.columns, color: "#000" }]}>{t('CON_QUANTITY')}</Text>
                <Text style={[{ ...styles.columns, color: "#000" }]}>{t('COH_TOTAL_AMOUNT')}</Text>
              </View>
              {/* Table Body */}
              {
                salesOrderDetails && Object.values(salesOrderDetails?.orderLineList).map((cart: any) => (
                  <View style={styles.row}>
                    <>
                      <View style={[styles.columns, styles.medium, { width: "150%" }]}>
                        <Text>
                          {cart?.itemCode}
                        </Text>
                      </View>
                      <View style={[{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'flex-start', alignContent: 'flex-start' }, styles.medium, { minHeight: "50px", height: "50px", width: "170%" }]}>
                        <Text>
                          {cart?.itemDescription}
                        </Text>
                      </View>
                      <View style={[styles.columns, styles.medium]}>
                        <Text>
                          {cart?.delDate}
                        </Text>
                      </View>
                      <View style={[styles.columns, styles.medium]}>
                        <Text>
                          {cart?.unitDesc}
                        </Text>
                      </View>
                      <View style={[styles.columns, styles.medium]}>
                        <Text>
                          {cart?.discountTotal}
                        </Text>
                      </View>
                      <View style={[styles.columns, styles.medium]}>
                        <Text>
                          {cart?.currentPrice}
                        </Text>
                      </View>
                      <View style={[styles.columns, styles.medium]}>
                        <Text>
                          {cart?.ordered}
                        </Text>
                      </View>
                      <View style={[styles.columns, styles.medium]}>
                        <Text>
                          {cart?.price}
                        </Text>
                      </View>
                    </>
                  </View>
                ))
              }
            </View>

            {/* Summary */}
            <View style={styles.summaryContainer}>
              <View style={{ display: 'flex', flexDirection: "column", padding: "12px 0" }}>
                <View style={{ display: "flex", flexDirection: "row", width: "200px", justifyContent: "space-between" }}>
                  <Text>{t('CON_TOTAL_LINES')}</Text>
                  <Text>{TotalLines}</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", width: "200px", justifyContent: "space-between" }}>
                  <Text>{t('CON_ORDER_DISCOUNT')}</Text>
                  <Text>{Discount}</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", width: "200px", justifyContent: "space-between" }}>
                  <Text>{t('CON_ADMINISTRATION_FEE')}</Text>
                  <Text>{AdminFees}</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", width: "200px", justifyContent: "space-between" }}>
                  <Text>{t('CON_TOTAL_EXCLUDING_VAT')}</Text>
                  <Text>{TotalExcVAT}</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", width: "200px", justifyContent: "space-between" }}>
                  <Text>{t('CON_VAT')}</Text>
                  <Text>{VAT}</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", width: "200px", justifyContent: "space-between" }}>
                  <Text>{t('CON_COIN_ADJUSTMENT')}</Text>
                  <Text>{CoinAdjustment}</Text>
                </View>
              </View>
            </View>

            {/* Total Amount Section */}
            <View style={styles.GrandTotal}>
              <View style={{ display: 'flex', flexDirection: "column" }}>
                <View style={[styles.row, { alignItems: 'center' }]}>
                  <Text style={[styles.medium, styles['fontSize16']]}>{t('CON_GRAND_TOTAL')}</Text>
                  <Text style={[styles.medium, { marginLeft: "50px", fontSize: '24px' }]}>{webSettings?.isShowCurrencySymbolBefore ? ` ${salesOrderDetails?.currencyCodeOrSymbol} ${showIncludingVATorNot()}` : `${showIncludingVATorNot()} ${salesOrderDetails?.currencyCodeOrSymbol}`}</Text>
                </View>
              </View>
            </View>

            {/* Order Reference*/}
            <View style={[styles.containerHeader, styles.tablePadding, { flexGrow: 0, marginTop: "35px", marginBottom: "20px" }]}>
              <Text style={styles.columns}>{t('CON_ORDER_REFERENCES')}</Text>
            </View>

            <div style={styles.row}>
              <div style={styles.columns}>
                <Text style={styles.bold}>{t('CON_YOUR_ORDER')}</Text>
                <Text>{hyphenTextGenerator(salesOrderDetails?.customerOrderNumber)}</Text>
              </div>
              <div style={styles.columns}>
                <Text style={styles.bold}>{t('CON_YOUR_REFERENCE')}</Text>
                <Text>{hyphenTextGenerator(salesOrderDetails?.yourReference)}</Text>
              </div>
              <div style={styles.columns}>
                <Text style={styles.bold}>{t('CON_OUR_REFERENCE')}</Text>
                <Text>{hyphenTextGenerator(salesOrderDetails?.ourReference)}</Text>
              </div>
              <div style={styles.columns}>
                <Text style={styles.bold}>{t('CON_CREATION_DATE')}</Text>
                <Text>{hyphenTextGenerator(salesOrderDetails?.orderDate)}</Text>
              </div>
              <div style={styles.columns}>
                <Text style={styles.bold}>{t('CON_COMPLETE_DELIVERY')}</Text>
                <Text>{!salesOrderDetails?.isCompleteDelivery ? t('CON_NOT_REQUESTED') : 'requested'}</Text>
              </div>
            </div>

            <div style={styles.row}>
              <div style={styles.columns}>
                <Text style={styles.bold}>{t('CON_FREE_TEXT')}</Text>
                <Text>{hyphenTextGenerator(salesOrderDetails?.orderText)}</Text>
              </div>
              <div style={styles.columns}>
                <Text style={styles.bold}>{t('CON_GOODS_MARK')}</Text>
                <Text>{hyphenTextGenerator(salesOrderDetails?.goodsMarking)}</Text>
              </div>
              <div style={styles.columns}>
                <Text style={styles.bold}>{t('CON_MANNER_OF_TRANSPORT')}</Text>
                <Text>{hyphenTextGenerator(salesOrderDetails?.motDesc)}</Text>
              </div>
              <div style={styles.columns}></div>
              <div style={styles.columns}></div>

            </div>

            {/* Footer */}
            <View style={styles.footer} fixed>
              <Text>
                {t('TXT_OE_007')}
              </Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </PDFContainer>
  );
};

export default MyDocument;