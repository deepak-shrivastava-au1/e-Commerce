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
import { requesthistorydetailSelector } from "@slices/Enquiry/Request/RequestHistoryDetail";
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
            {t("CON_REQUEST_NUMBER")} {userCartData?.requestId}
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
            {t("CON_REQUEST_LINES")}
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
              {t("COH_DATE")}
              
            </Text>
            <Text style={[{ ...styles.columns, color: "#000" }]}>
              {t("COH_REQUEST_TYPE")}
             
            </Text>
           
          </View>
          {/* Table Body */}
          {userCartData &&
            userCartData?.reqLineBeanList?.map((cart: any) => (
              <View style={styles.row}>
                <>
                  <View style={[styles.columns, styles.medium]}>
                    <Text>{cart?.lineNumber}</Text>
                  </View>
                  <View style={[styles.columns, styles.medium]}>
                    <Text>{cart?.product}</Text>
                  </View>
                  <View style={[styles.columns, styles.medium]}>
                    <Text>{cart?.description}</Text>
                  </View>
                  <View style={[styles.columns, styles.medium]}>
                    <Text>{cart?.unitDesc}</Text>
                  </View>
                  <View style={[styles.columns, styles.medium]}>
                    <Text>{cart?.quantity}</Text>
                  </View>
                  <View style={[styles.columns, styles.medium]}>
                    <Text>{cart?.date}</Text>
                  </View>
                  <View style={[styles.columns, styles.medium]}>
                    <Text>{cart?.requestType}</Text>
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
            {t("CON_REQUEST_HEADER_INFORMATION")}
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
            <Text> {userCartData?.customer}</Text>
           
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
              {t("CON_REQUEST_NUMBER")}
            </Text>
            <Text> {userCartData?.requestId}</Text>
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
              {t("COH_ORDER_STATUS")}
            </Text>
            <Text> {userCartData?.status}</Text>
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
              {t("COH_YOUR_REFERENCE")}
            </Text>
            <Text> {userCartData?.yourReference}</Text>
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
              {t("COH_HANDLER")}
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
              {t("COH_DATE")}
            </Text>
            <Text> {userCartData?.date}</Text>
            
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
              {t("CON_TIME")}
            </Text>
            <Text> {userCartData?.time}</Text>
            
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
              {t("CON_DESTINATION")}
            </Text>
            <Text> {userCartData?.destination}</Text>
         
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
              {t("COH_REQUEST_TYPE")}
            </Text>
            <Text> {userCartData?.requestType}</Text>
         
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
              {t("COH_REQUEST_DESCRIPTION")}
            </Text>
            <Text> {userCartData?.reqDesc}</Text>
         
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
              {t("CON_RESOLUTION_TYPE")}
            </Text>
            <Text> {userCartData?.resolutionType}</Text>
         
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
              {t("CON_RESOLUTION_DESCRIPTION")}
            </Text>
            <Text> {userCartData?.resolutionDesc}</Text>
         
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
  const state = useSelector(requesthistorydetailSelector);
  const webSettings: any = useContext(WebSettingsContext);
  const userCartData = state?.requestHistoryDetail?.requestdetail;
 
  return (
    <>
      <span title={t("CON_REQUEST_SEARCH_PDF")}>
        <PDFDownloadLink
          fileName={`requestDetail_${Date.now().toString()}`}
          document={<CartDocument {...{ userCartData, t, webSettings }} />}
        >
          <PdfSVG className="primary-icon-2 icon-lg" />
        </PDFDownloadLink>
      </span>
    </>
  );
}

export default PDF;
