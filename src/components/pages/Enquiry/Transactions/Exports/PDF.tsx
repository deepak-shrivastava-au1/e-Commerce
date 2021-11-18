import React, { useContext } from 'react'
import { PdfSVG } from "@icons"
import { useSelector } from "react-redux";
import { PDFDownloadLink, Document, Page, View, Image, Text, Font } from "@react-pdf/renderer"
import { styles } from '@pages/Cart/ShoppingCart/OrderReceipt'
import Logo from '../../../../../assets/images/logo.png';
import OpenSansFont from '../../../../../assets/fonts/OpenSans-Regular.ttf'
import OpenSansFontBold from '../../../../../assets/fonts/OpenSans-Bold.ttf'
import OpenSansFontSemiBold from '../../../../../assets/fonts/OpenSans-SemiBold.ttf'
import { transactionSelector } from "@slices/Enquiry/Transactions/transactions";
import { useTranslation } from "react-i18next";
import { WebSettingsContext } from "@providers/WebsettingsProvider";

Font.register({
  family: `'OpenSans-Regular'`,
  fonts: [{ src: OpenSansFont }, { src: OpenSansFontBold, fontWeight: 700 }, { src: OpenSansFontSemiBold, fontWeight: 600 }]
})

const CartDocument = ({ userCartData, t, webSettings }: { userCartData: any, t: any, webSettings:any }) => {

  return (
    <Document>
      <Page size="A3" orientation="portrait" wrap style={styles.page}>

        {/* Header */}
        <View style={{ display: 'flex', flexDirection: "row", width: '100%', marginBottom: "30px" }}>
          <View style={{ ...styles.bold, ...styles.fontSize16, flexGrow: 1, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
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
            {t("CON_ACCOUNT_INFORMATION")}
          </Text>
        </View>

        {/* Table Container */}
        <View style={[styles.tableContainer, styles.border, { marginTop: "30px" }]}>
          {/* Table Header */}
          <View style={[styles.containerHeader, styles.tablePadding]}>
            <Text style={[{ ...styles.columns, width: "130%", color: "#000" }]}>{t('COH_CUSTOMER')}</Text>
            <Text style={{ ...styles.columns, width: "130%", color: "#000" }}>{t('COH_DOCUMENT')}</Text>
            <Text style={[{ ...styles.columns, color: "#000" }]}>{t('CON_DOCUMENT_DATE')}</Text>
            <Text style={[{ ...styles.columns, color: "#000" }]}>{t('COH_DUE_DATE')}</Text>
            <Text style={[{ ...styles.columns, color: "#000" }]}>{t('COH_CURRENCY')}</Text>
            <Text style={[{ ...styles.columns, color: "#000" }]}>{t('COH_ORIGINAL_AMOUNT')}</Text>
            <Text style={[{ ...styles.columns, color: "#000" }]}>{t('COH_REMAINING_AMOUNT')}</Text>
            <Text style={[{ ...styles.columns, color: "#000" }]}>{t('COH_DESCRIPTION')} </Text>
            <Text style={[{ ...styles.columns, color: "#000" }]}>{t('COH_DEBTOR')} </Text>
          </View>
          {/* Table Body */}
          {
            userCartData && userCartData?.transactionBean?.map((cart: any) => (
              <View style={styles.row}>
                <>
                  <View style={[styles.columns, styles.medium, { width: "130%" }]}>
                    <Text>
                      {cart?.customerCode}
                    </Text>
                  </View>
                  <View style={[styles.columns, styles.medium, { width: "130%" }]}>
                    <Text>
                    {cart?.documentTypeCode}{cart?.documentNumber}
                     
                    </Text>
                  </View>
                  <View style={[styles.columns, styles.medium]}>
                    <Text>
                      {cart?.documentDate}
                    </Text>
                  </View>
                  <View style={[styles.columns, styles.medium]}>
                    <Text>
                      {cart?.dueDate}
                    </Text>
                  </View>
                  <View style={[styles.columns, styles.medium]}>
                    <Text>
                      {cart?.transactionCurrencyCode}
                    </Text>
                  </View>
                  <View style={[styles.columns, styles.medium]}>
                    <Text>
                      {cart?.originalAmount}
                    </Text>
                  </View>
                  <View style={[styles.columns, styles.medium]}>
                    <Text>
                      {cart?.remainingAmount}
                    </Text>
                  </View>
                  <View style={[styles.columns, styles.medium]}>
                    <Text>
                      {cart?.description}
                    </Text>
                  </View>
                  <View style={[styles.columns, styles.medium]}>
                    <Text>
                      {cart?.debtorCode}
                    </Text>
                  </View>
                </>
              </View>
            ))
          }
        </View>

      </Page>
    </Document>
  )
}

interface Props { }


function PDF(props: Props) {

  const { } = props
  const { t, i18n } = useTranslation();
  const state = useSelector(transactionSelector);
  const webSettings: any = useContext(WebSettingsContext);
  const userCartData = state?.transactions?.transactionslst;

  return (
    <>
      <span title={t("CON_AR_PDF")}>
        <PDFDownloadLink fileName={`AccountInformation_${Date.now().toString()}`} document={<CartDocument {...{ userCartData, t, webSettings }} />} >
          <PdfSVG className="primary-icon-2 icon-lg" />
        </PDFDownloadLink>
      </span>
    </>
  )
}

export default PDF