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
import { invoicehistorySelector } from "@slices/Enquiry/Invoices/InvoiceHistory";
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
            marginBottom: "5px",
          }}
        >
          <Text
            style={[{ ...styles.bold, ...styles.fontSize16, color: "#000" }]}
          >
            {t("CON_INVOICE_SEARCH")}
          </Text>
        </View>

        {/* Table Container */}
        <View
          style={[styles.tableContainer, styles.border, { marginTop: "30px" }]}
        >
          {/* Table Header */}
          <View style={[styles.containerHeader, styles.tablePadding]}>
            <Text style={[{ ...styles.columns ,color: "#000" }]}>
              {t("COH_INVOICE")}
            </Text>
            <Text style={{ ...styles.columns, color: "#000" }}>
              {t("COH_DOCUMENT_DATE")}
            </Text>
            <Text style={[{ ...styles.columns, color: "#000" }]}>
              {t("COH_TYPE")}
            </Text>
            <Text style={[{ ...styles.columns, color: "#000" }]}>
              {t("COH_INVOICE_CUSTOMER")}
            </Text>
            <Text style={[{ ...styles.columns, color: "#000" }]}>
              {t("COH_AMOUNT_INCLUDING_VAT")}
            </Text>
            <Text style={[{ ...styles.columns, color: "#000" }]}>
              {t("COH_ORDER_NUMBER")}
            </Text>
            <Text style={[{ ...styles.columns, color: "#000" }]}>
              {t("COH_ORDER_DATE")}
            </Text>
            <Text style={[{ ...styles.columns, color: "#000" }]}>
              {t("COH_SALESMAN")}
            </Text>
            <Text style={[{ ...styles.columns, color: "#000" }]}>
              {t("CON_YOUR_ORDER")}#
            </Text>
          </View>
          {/* Table Body */}
          {userCartData &&
            userCartData?.invoiceHistoryBean?.map((cart: any) => (
              <View style={styles.row}>
                <>
                  <View
                    style={[styles.columns, styles.medium]}
                  >
                    <Text>{cart?.invoiceNumber}</Text>
                  </View>
                  <View
                    style={[styles.columns, styles.medium]}
                  >
                    <Text>{cart?.invoiceDate}</Text>
                  </View>
                  <View style={[styles.columns, styles.medium]}>
                    <Text>{cart?.typeDescription}</Text>
                  </View>
                  <View style={[styles.columns, styles.medium]}>
                    <Text>{cart?.invoiceCustomer}</Text>
                  </View>
                  <View style={[styles.columns, styles.medium]}>
                    <Text>{cart?.amount}</Text>
                  </View>
                  <View style={[styles.columns, styles.medium]}>
                    <Text>{cart?.orderNumber}</Text>
                  </View>
                  <View style={[styles.columns, styles.medium]}>
                    <Text>{cart?.orderDate}</Text>
                  </View>
                  <View style={[styles.columns, styles.medium]}>
                    <Text>{cart?.salesman}</Text>
                  </View>
                  <View style={[styles.columns, styles.medium]}>
                    <Text>{cart?.yourReferrence}</Text>
                  </View>
                </>
              </View>
            ))}
        </View>
      </Page>
    </Document>
  );
};

interface Props {}

function PDF(props: Props) {
  const {} = props;
  const { t, i18n } = useTranslation();
  const state = useSelector(invoicehistorySelector);
  const webSettings: any = useContext(WebSettingsContext);
  const userCartData = state?.invoiceHistory?.invoices;

  return (
    <>
      <span title={t("CON_INVOICE_PDF")}>
        <PDFDownloadLink
          fileName={`InvoiceSearch_${Date.now().toString()}`}
          document={<CartDocument {...{ userCartData, t, webSettings }} />}
        >
          <PdfSVG className="primary-icon-2 icon-lg" />
        </PDFDownloadLink>
      </span>
    </>
  );
}

export default PDF;
