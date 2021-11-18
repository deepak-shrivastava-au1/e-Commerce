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
import OpenSansFontSemiBold from "../../../../../../assets/fonts/OpenSans-SemiBold.ttf";
import { quotationsummarydetailSelector } from "@slices/Enquiry/Quotations/QuotationSummaryDetail";
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

        {/* Table Heading */}
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
            {t("CON_QUOTATION_NUMBER")} {userCartData?.quotationNumber}
          </Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            marginBottom: "3px",
          }}
        >
          <Text
            style={[{ ...styles.bold, ...styles.fontSize16, color: "#000" }]}
          >
            {t("CON_QUOTATION")}
          </Text>
        </View>

        {/* Table Container */}
        <View
          style={[styles.tableContainer, styles.border, { marginTop: "30px" }]}
        >
          {/* Table Header */}
          <View style={[styles.containerHeader, styles.tablePadding]}>
            <Text style={[{ ...styles.columns, color: "#000" }]}>
              {t("COH_LINE")}
            </Text>
            <Text style={{ ...styles.columns, color: "#000" }}>
              {t("CON_PRODUCT")}
            </Text>
            <Text style={[{ ...styles.columns, color: "#000" }]}>
              {t("COH_DESCRIPTION")}
            </Text>
            <Text style={[{ ...styles.columns, color: "#000" }]}>
              {t("CON_UNIT")}
            </Text>
            <Text style={[{ ...styles.columns, color: "#000" }]}>
              {t("COH_QUANTITY")}
            </Text>
            <Text style={[{ ...styles.columns, color: "#000" }]}>
              {t("CON_PRICE")}
              {webSettings?.currencyCode}
            </Text>
            <Text style={[{ ...styles.columns, color: "#000" }]}>
              {t("COH_AMOUNT")}
              {webSettings?.currencyCode}
            </Text>
            <Text style={[{ ...styles.columns, color: "#000" }]}>
              {t("COH_BACKLOG")}
            </Text>
            <Text style={[{ ...styles.columns, color: "#000" }]}>
              {t("CON_DELIVERY_DATE")}
            </Text>
          </View>
          {/* Table Body */}
          {userCartData &&
            userCartData?.quotationLineBean?.map((cart: any) => (
              <View style={styles.row}>
                <>
                  <View style={[styles.columns, styles.medium]}>
                    <Text>{cart?.lineNumber}</Text>
                  </View>
                  <View style={[styles.columns, styles.medium]}>
                    <Text>{cart?.itemCode}</Text>
                  </View>
                  <View style={[styles.columns, styles.medium]}>
                    <Text>{cart?.itemDescription}</Text>
                  </View>
                  <View style={[styles.columns, styles.medium]}>
                    <Text>{cart?.unit}</Text>
                  </View>
                  <View style={[styles.columns, styles.medium]}>
                    <Text>{cart?.quantity}</Text>
                  </View>
                  <View style={[styles.columns, styles.medium]}>
                    <Text>{cart?.price}</Text>
                  </View>
                  <View style={[styles.columns, styles.medium]}>
                    <Text>{cart?.amount}</Text>
                  </View>
                  <View style={[styles.columns, styles.medium]}>
                    <Text>{cart?.backlog}</Text>
                  </View>
                  <View style={[styles.columns, styles.medium]}>
                    <Text>{cart?.deliveryDate}</Text>
                  </View>
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
            {t("CON_QUOTATION_HEADER_INFORMATION")}
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
        <View style={{ display: "flex", flexDirection: "column", padding: "5px 0" }}>
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
        <View style={{ display: "flex", flexDirection: "column" , padding: "5px 0" }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "200px",
              justifyContent: "space-between",
            }}
          >
            <Text style={[{ ...styles.bold, ...styles.medium, color: "#000" }]}>
              {t("CON_ORDER_VALUE_EXCLUDING_VAT")}
            </Text>
            <Text> {userCartData?.orderValueExclVAT}</Text>
          </View>
        </View>
        <View style={{ display: "flex", flexDirection: "column", padding: "5px 0"  }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "200px",
              justifyContent: "space-between",
            }}
          >
            <Text style={[{ ...styles.bold, ...styles.medium, color: "#000" }]}>
              {t("CON_ORDER_VALUE_INCLUDING_VAT")}
            </Text>
            <Text> {userCartData?.orderValueInclVAT}</Text>
          </View>
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
              {t("CON_MANNER_OF_TRANSPORT")}
            </Text>
            <Text> {userCartData?.motCode}</Text>
            <Text> {userCartData?.motDesc}</Text>
          </View>
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
              {t("CON_TERMS_OF_DELIVERY")}
            </Text>
            <Text> {userCartData?.todCode}</Text>
            <Text> {userCartData?.todDesc}</Text>
          </View>
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
              {t("CON_TERMS_OF_PAYMENT")}
            </Text>
            <Text> {userCartData?.topCode}</Text>
            <Text> {userCartData?.topDesc}</Text>
          </View>
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
              width: "200px",
              justifyContent: "space-between",
            }}
          >
            <Text style={[{ ...styles.bold, ...styles.medium, color: "#000" }]}>
              {t("COH_EXPIRE_DATE")}
            </Text>
            <Text> {userCartData?.dueDate}</Text>
         
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
            {t("CON_QUOTATION_REFERENCES")}
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
              {t("CON_HANDLER")}
            </Text>
            <Text> {userCartData?.handlerCode}</Text>
            <Text> {userCartData?.handlerDesc}</Text>
          </View>
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
              {t("CON_SALES_PERSON")}
            </Text>
            <Text> {userCartData?.salespersonCode}</Text>
            <Text> {userCartData?.salespersonDesc}</Text>
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
  const state = useSelector(quotationsummarydetailSelector);
  const webSettings: any = useContext(WebSettingsContext);
  const userCartData = state?.quotationSummaryDetail?.quotationhistorydetail;
 
  return (
    <>
      <span title={t("CON_QUOTATION_HISTORY_PDF")}>
        <PDFDownloadLink
          fileName={`QuotationDetail_${Date.now().toString()}`}
          document={<CartDocument {...{ userCartData, t, webSettings }} />}
        >
          <PdfSVG className="primary-icon-2 icon-lg" />
        </PDFDownloadLink>
      </span>
    </>
  );
}

export default PDF;
