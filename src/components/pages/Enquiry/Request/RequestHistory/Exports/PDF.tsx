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
import { requestSelector } from "@slices/Enquiry/Request/RequestHistory";
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
            {t("CON_REQUEST_SEARCH")}
          </Text>
        </View>

        {/* Table Container */}
        <View
          style={[styles.tableContainer, styles.border, { marginTop: "30px" }]}
        >
          {/* Table Header */}
          <View style={[styles.containerHeader, styles.tablePadding]}>
            <Text style={[{ ...styles.columns,  color: "#000" }]}>
              {t("COH_ID")}
            </Text>
            <Text style={{ ...styles.columns,  color: "#000" }}>
              {t("CON_STATUS")}
            </Text>
            <Text style={[{ ...styles.columns, color: "#000" }]}>
              {t("COH_REQUEST_TYPE")}
            </Text>
            <Text style={[{ ...styles.columns, color: "#000" }]}>
              {t("CON_RESOLUTION_TYPE")}
            </Text>
            <Text style={[{ ...styles.columns, color: "#000" }]}>
              {t("COH_REFERENCE_TYPE")}
            </Text>
            <Text style={[{ ...styles.columns, color: "#000" }]}>
              {t("COH_REFERENCE")}
            </Text>
            <Text style={[{ ...styles.columns, color: "#000" }]}>
              {t("COH_DATE")}
            </Text>
            <Text style={[{ ...styles.columns, color: "#000" }]}>
              {t("CON_HANDLER")}
            </Text>
            <Text style={[{ ...styles.columns, color: "#000" }]}>
              {t("COH_YOUR_REFERENCE")}
            </Text>
          </View>
          {/* Table Body */}
          {userCartData &&
            userCartData?.requestHistoryBean?.map((cart: any) => (
              <View style={styles.row}>
                <>
                  <View
                    style={[styles.columns, styles.medium]}
                  >
                    <Text>{cart?.requestId}</Text>
                  </View>
                  <View
                    style={[styles.columns, styles.medium]}
                  >
                    <Text>{cart?.status}</Text>
                  </View>
                  <View style={[styles.columns, styles.medium]}>
                    <Text>{cart?.requestType}</Text>
                  </View>
                   <View style={[styles.columns, styles.medium]}>
                    <Text>{cart?.resolutionType}</Text>
                  </View>
                  <View style={[styles.columns, styles.medium]}>
                    <Text>{cart?.refType}</Text>
                  </View>
                  <View style={[styles.columns, styles.medium]}>
                    <Text>{cart?.reference}</Text>
                  </View>
                  <View style={[styles.columns, styles.medium]}>
                    <Text>{cart?.date}</Text>
                  </View>
                  <View style={[styles.columns, styles.medium]}>
                    <Text>{cart?.handler}</Text>
                  </View>
                  <View style={[styles.columns, styles.medium]}>
                    <Text>{cart?.yourReference}</Text>
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
  const state = useSelector(requestSelector);
  const webSettings: any = useContext(WebSettingsContext);
  const userCartData = state?.requestHistory?.requests;

  return (
    <>
      <span title={t("CON_REQUEST_SEARCH_PDF")}>
        <PDFDownloadLink
          fileName={`RequestSearch_${Date.now().toString()}`}
          document={<CartDocument {...{ userCartData, t, webSettings }} />}
        >
          <PdfSVG className="primary-icon-2 icon-lg" />
        </PDFDownloadLink>
      </span>
    </>
  );
}

export default PDF;
