import React, { useContext } from "react";
import { PdfSVG } from "@icons";
import { useSelector } from "react-redux";
import {
  PDFDownloadLink,
  Document,
  Page,
  View,
  Image,
  Text,
  Font,
} from "@react-pdf/renderer";
import { styles } from "@pages/Cart/ShoppingCart/OrderReceipt";
import Logo from "../../../../../../assets/images/logo.png";
import OpenSansFont from "../../../../../../assets/fonts/OpenSans-Regular.ttf";
import OpenSansFontBold from "../../../../../../assets/fonts/OpenSans-Bold.ttf";
import OpenSansFontSemiBold from "../../../../../../assets/fonts/OpenSans-SemiBold.ttf"
import { orderhistorydetailSelector } from "@slices/Enquiry/Order/orderHistoryDetail";
import { useTranslation } from "react-i18next";
import { WebSettingsContext } from "@providers/WebsettingsProvider";

Font.register({
  family: `'OpenSans-Regular'`,
  fonts: [
    { src: OpenSansFont },
    { src: OpenSansFontBold, fontWeight: 700 },
    { src: OpenSansFontSemiBold, fontWeight: 600 },
  ],
});

const CartDocument = ({
  userCartData,
  t,
  webSettings,
}: {
  userCartData: any;
  t: any;
  webSettings: any;
}) => {
  

  const deliveryAddress = userCartData?.delAddress?.split('</br>').map((address: string) => <Text style={styles.medium}> {address} </Text>)

  const confirmedAddress = userCartData?.confAddress?.split('</br>').map((address: string) => <Text style={styles.medium}> {address} </Text>)

  return (
    <Document>
      <Page size="A3" orientation="portrait" wrap style={styles.page}>
        {/* Header */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            marginBottom: "30px",
          }}
        >
          <View
            style={{
              ...styles.bold,
              ...styles.fontSize16,
              flexGrow: 1,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Image style={styles.logo} src={Logo} />
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            marginBottom: "8px",
          }}
        >
          <Text
            style={[{ ...styles.bold, ...styles.fontSize16, color: "#000" }]}
          >
            {t("CON_ORDER_NUMBER")} {userCartData?.orderNumber}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            marginBottom: "8px",
          }}
        >
          <Text
            style={[{ ...styles.bold, ...styles.fontSize16, color: "#000" }]}
          >
            {t("CON_ORDER_LINES")}
          </Text>
        </View>
        <View
          style={[styles.tableContainer, styles.border, { marginTop: "30px" }]}
        >
          {/* Table Header */}
          <View style={[styles.containerHeader, styles.tablePadding]}>
            <Text style={[{ ...styles.columns, color: "#000" }]}>
              {t("COH_LINE")}
            </Text>
            <Text style={{ ...styles.columns, color: "#000",display:"flex",flexDirection:"row" , width: "130%"}}>
              {t("CON_PRODUCT")}
            </Text>
            <Text style={[{ ...styles.columns, color: "#000",display:"flex",flexDirection:"row", width: "230%"  }]}>
              {t("COH_DESCRIPTION")}
            </Text>
            <Text style={[{ ...styles.columns, color: "#000" }]}>
              {t("CON_UNIT")}
            </Text>
            <Text style={[{ ...styles.columns, color: "#000" }]}>
              {t("COH_QUANTITY")}
            </Text>
            {(webSettings?.allowDiscountDisplay == "*ALL" ||
              webSettings?.allowDiscountDisplay == "*ALL_PRICE" ||
              webSettings?.allowDiscountDisplay == "*ACTUAL_PRICE") && (
              <Text style={[{ ...styles.columns, color: "#000" }]}>
                {t("COH_ACTUAL_PRICE")}
              </Text>
            )}
            {(webSettings?.allowDiscountDisplay == "*ALL" ||
              webSettings?.allowDiscountDisplay == "*DISCOUNT_PRICE" ||
              webSettings?.allowDiscountDisplay == "*ALL_PRICE") && (
              <Text style={[{ ...styles.columns, color: "#000" }]}>
                {t("COH_DISCOUNT_PRICE")}
              </Text>
            )}
            {webSettings?.allowDiscountDisplay == "*ALL" && (
              <Text style={[{ ...styles.columns, color: "#000" }]}>
                {t("CON_DISCOUNT_%")}
              </Text>
            )}
            <Text style={[{ ...styles.columns, color: "#000" }]}>
              {t("COH_DELIVERY_DATE")}
            </Text>
            {webSettings?.isShowPrice && (
              <Text style={[{ ...styles.columns, color: "#000" }]}>
                {t("CON_VALUE")}
                {webSettings?.currencyCode}
              </Text>
            )}
          </View>
          {/* Table Body */}
          {userCartData &&
            userCartData?.orderLineList?.map((cart: any) => (
              <View style={styles.row}>
                <>
                  <View style={[styles.columns, styles.medium]}>
                    <Text>{cart?.lineNumber}</Text>
                  </View>
                  <View style={[styles.columns, styles.medium,{ width: "130%" }]}>
                    <Text  break>{cart?.itemCode}</Text>
                  </View>
                  <View style={[styles.columns, styles.medium,{ width: "230%" }]}>
                    <Text break>{cart?.itemDescription}</Text>
                  </View>
                  <View style={[styles.columns, styles.medium]}>
                    <Text>{cart?.unit}</Text>
                  </View>
                  <View style={[styles.columns, styles.medium]}>
                    <Text>{cart?.ordered}</Text>
                  </View>
                  {(webSettings?.allowDiscountDisplay == "*ALL" ||
                    webSettings?.allowDiscountDisplay == "*ALL_PRICE" ||
                    webSettings?.allowDiscountDisplay == "*ACTUAL_PRICE") && (
                    <View style={[styles.columns, styles.medium]}>
                      <Text>{cart?.totalExclVAT}</Text>
                    </View>
                  )}
                  {(webSettings?.allowDiscountDisplay == "*ALL" ||
                    webSettings?.allowDiscountDisplay == "*DISCOUNT_PRICE" ||
                    webSettings?.allowDiscountDisplay == "*ALL_PRICE") && (
                    <View style={[styles.columns, styles.medium]}>
                      <Text>{cart?.discountPrice}</Text>
                    </View>
                  )}
                  {webSettings?.allowDiscountDisplay == "*ALL" && (
                    <View style={[styles.columns, styles.medium]}>
                      <Text>{cart?.discountPercent}</Text>
                    </View>
                  )}
                  <View style={[styles.columns, styles.medium]}>
                    <Text>{cart?.delDate}</Text>
                  </View>
                  {webSettings?.isShowPrice && (
                    <View style={[styles.columns, styles.medium]}>
                      <Text>{cart?.price}</Text>
                    </View>
                  )}
                </>
              </View>
            ))}
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            marginBottom: "5px",
          }}
        >
          <Text
            style={[{ ...styles.bold, ...styles.fontSize16, color: "#000" }]}
          >
            {t("CON_BASIC_INFORMATION")}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "5px 0",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "400px",
              justifyContent: "space-between",
            }}
          >
            <Text style={[{ ...styles.bold, ...styles.medium, color: "#000" }]}>
              {t("COH_CUSTOMER")}
            </Text>
            <Text> {userCartData?.customerDesc}</Text>
            <Text> {userCartData?.customerCode}</Text>
          </View>
        </View>
        <View
          style={{ display: "flex", flexDirection: "column", padding: "5px 0" }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "500px",
              justifyContent: "space-between",
            }}
          >
            <Text style={[{ ...styles.bold, ...styles.medium, color: "#000" }]}>
              {t("CON_ORDER_NUMBER")}
            </Text>
            <Text> {userCartData?.orderNumber}</Text>
            <Text style={[{ ...styles.bold, ...styles.medium, color: "#000" }]}>
              {t("COH_ORDER_DATE")}
            </Text>
            <Text> {userCartData?.orderDate}</Text>
          </View>
        </View>
        <View
          style={{ display: "flex", flexDirection: "column", padding: "5px 0" }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "500px",
              justifyContent: "space-between",
            }}
          >
            <Text style={[{ ...styles.bold, ...styles.medium, color: "#000" }]}>
              {t("CON_ORDER_STATUS")}
            </Text>
            <Text> {userCartData?.orderStatus}</Text>
            <Text style={[{ ...styles.bold, ...styles.medium, color: "#000" }]}>
              {t("CON_HELD")}
            </Text>
            <Text> { t(userCartData?.held)}</Text>
          </View>
        </View>
        <View
          style={{ display: "flex", flexDirection: "column", padding: "5px 0" }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "200px",
              justifyContent: "space-between",
            }}
          >
            <Text style={[{ ...styles.bold, ...styles.medium, color: "#000" }]}>
              {t("COH_CURRENCY")}
            </Text>
            <Text> {userCartData?.currency}</Text>
          </View>
        </View>
        <View
          style={{ display: "flex", flexDirection: "column", padding: "5px 0" }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "500px",
              justifyContent: "space-between",
            }}
          >
            <Text style={[{ ...styles.bold, ...styles.medium, color: "#000" }]}>
              {t("CON_ORDER_VALUE_EXCLUDING_VAT")}
            </Text>
            <Text> {userCartData?.orderValueExclVAT}</Text>
            <Text style={[{ ...styles.bold, ...styles.medium, color: "#000" }]}>
              {t("CON_ORDER_VALUE_INCLUDING_VAT")}
            </Text>
            <Text> {userCartData?.orderValueInclVAT}</Text>
          </View>
        </View>
        <View
          style={{ display: "flex", flexDirection: "column", padding: "5px 0" }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "200px",
              justifyContent: "space-between",
            }}
          >
            <Text style={[{ ...styles.bold, ...styles.medium, color: "#000" }]}>
              {t("COH_GOODS_MARKING")}
            </Text>
            <Text> {userCartData?.goodsMarking}</Text>
          </View>
        </View>
        <View
          style={{ display: "flex", flexDirection: "column", padding: "5px 0" }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "400px",
              justifyContent: "space-between",
            }}
          >
            <Text style={[{ ...styles.bold, ...styles.medium, color: "#000" }]}>
              {t("CON_MANNER_OF_TRANSPORT")}
            </Text>
            <Text> {userCartData?.motCode}</Text>
            <Text> {userCartData?.motDesc}</Text>
          </View>
        </View>
        <View
          style={{ display: "flex", flexDirection: "column", padding: "5px 0" }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "400px",
              justifyContent: "space-between",
            }}
          >
            <Text style={[{ ...styles.bold, ...styles.medium, color: "#000" }]}>
              {t("CON_TERMS_OF_DELIVERY")}
            </Text>
            <Text> {userCartData?.todCode}</Text>
            <Text> {userCartData?.todDesc}</Text>
          </View>
        </View>
        <View
          style={{ display: "flex", flexDirection: "column", padding: "5px 0" }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "400px",
              justifyContent: "space-between",
            }}
          >
            <Text style={[{ ...styles.bold, ...styles.medium, color: "#000" }]}>
              {t("CON_TERMS_OF_PAYMENT")}
            </Text>
            <Text> {userCartData?.topCode}</Text>
            <Text> {userCartData?.topDesc}</Text>
          </View>
        </View>

        {userCartData?.orderTextFlag && (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              marginBottom: "5px",
            }}
          >
            <Text
              style={[{ ...styles.bold, ...styles.fontSize16, color: "#000" }]}
            >
              {t("CON_ORDER_TEXT")}
            </Text>
          </View>
        )}
        {userCartData?.orderTextFlag && (
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "5px 0",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "200px",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={[{ ...styles.medium, color: "#000" }]}
              >
              <Text> {userCartData?.orderText}</Text>
              </Text>
             
            </View>
          </View>
        )}
         <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              marginBottom: "5px",
            }}
          >
            <Text
              style={[{ ...styles.bold, ...styles.fontSize16, color: "#000" }]}
            >
              {t("CON_ORDER_REFERENCES")}
            </Text>
          </View>
          {webSettings?.showHandlerOrderDetails && <View
          style={{ display: "flex", flexDirection: "column", padding: "5px 0" }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "400px",
              justifyContent: "space-between",
            }}
          >
            <Text style={[{ ...styles.bold, ...styles.medium, color: "#000" }]}>
              {t("COH_HANDLER")}
            </Text>
            <Text> {userCartData?.handlerCode}</Text>
            <Text> {userCartData?.handlerDesc}</Text>
          </View>
        </View>}
        { webSettings?.showSalesMan &&
        <View
          style={{ display: "flex", flexDirection: "column", padding: "5px 0" }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "400px",
              justifyContent: "space-between",
            }}
          >
            <Text style={[{ ...styles.bold, ...styles.medium, color: "#000" }]}>
              {t("CON_SALES_PERSON")}
            </Text>
            <Text> {userCartData?.handlerCode}</Text>
            <Text> {userCartData?.handlerDesc}</Text>
          </View>
        </View>
}
<View
          style={{ display: "flex", flexDirection: "column", padding: "5px 0" }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "200px",
              justifyContent: "space-between",
            }}
          >
            <Text style={[{ ...styles.bold, ...styles.medium, color: "#000" }]}>
              {t("CON_YOUR_ORDER_NUMBER")}
            </Text>
            <Text> {userCartData?.yourOrder}</Text>
           
          </View>
        </View>
      
        <View
          style={{ display: "flex", flexDirection: "column", padding: "5px 0" }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "200px",
              justifyContent: "space-between",
            }}
          >
            <Text style={[{ ...styles.bold, ...styles.medium, color: "#000" }]}>
              {t("COH_YOUR_REFERENCE")}
            </Text>
            <Text> {userCartData?.yourReference}</Text>
           
          </View>
        </View>
        <View
          style={{ display: "flex", flexDirection: "column", padding: "5px 0" }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "200px",
              justifyContent: "space-between",
            }}
          >
            <Text style={[{ ...styles.bold, ...styles.medium, color: "#000" }]}>
              {t("CON_OUR_REFERENCE")}
            </Text>
            <Text> {userCartData?.ourReference}</Text>
           
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            marginBottom: "5px",
          }}
        >
          <Text
            style={[{ ...styles.bold, ...styles.fontSize16, color: "#000" }]}
          >
            {t("CON_ADDRESSES")}
          </Text>
        </View>
        <View
          style={[styles.tableContainer, styles.border, { marginTop: "30px" }]}
        >
          {/* Table Header */}
          <View style={[styles.containerHeader, styles.tablePadding]}>
            <Text style={[{ ...styles.columns, color: "#000" }]}>
              {t("CON_CONFIRMATION_ADDRESS")}
            </Text>
            <Text style={[{ ...styles.columns, color: "#000" }]}>
              {t("CON_DELIVERY_ADDRESS")}
            </Text>
            </View>
            <View style={styles.row}>
                <>
                  <View style={[styles.columns, styles.medium]}>
                     {confirmedAddress}
                  </View>
                  <View style={[styles.columns, styles.medium]}>
                  {deliveryAddress}  
                  </View>
                  </>
                  </View> 
            </View>
      </Page>
    </Document>
  );
};

interface Props {}

function PDF(props: Props) {
  const {} = props;
  const { t, i18n } = useTranslation();
  const state = useSelector(orderhistorydetailSelector);
  const webSettings: any = useContext(WebSettingsContext);
  const userCartData = state?.orderHistoryDetail?.orderdetail;
  console.log(userCartData);
  return (
    <>
      <span title={t("CON_ORDER_LINE_PDF")}>
        <PDFDownloadLink
          fileName={`OrderDetail_${Date.now().toString()}`}
          document={<CartDocument {...{ userCartData, t, webSettings }} />}
        >
          <PdfSVG className="primary-icon-2 icon-lg" />
        </PDFDownloadLink>
      </span>
    </>
  );
}

export default PDF;
