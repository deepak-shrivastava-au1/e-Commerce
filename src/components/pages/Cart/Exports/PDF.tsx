import React, { useContext } from 'react'
import { PdfSVG } from "@icons"
import { UserCartContext } from "@providers/UserCartCtxProvider";
import { PDFDownloadLink, Document, Page, View, Image, Text, Font } from "@react-pdf/renderer"
import { styles } from '@pages/Cart/ShoppingCart/OrderReceipt'
import Logo from '../../../../assets/images/logo.png';
import OpenSansFont from '../../../../assets/fonts/OpenSans-Regular.ttf'
import OpenSansFontBold from '../../../../assets/fonts/OpenSans-Bold.ttf'
import OpenSansFontSemiBold from '../../../../assets/fonts/OpenSans-SemiBold.ttf'

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

        {/* Table Container */}
        <View style={[styles.tableContainer, styles.border, { marginTop: "30px" }]}>
          {/* Table Header */}
          <View style={[styles.containerHeader, styles.tablePadding]}>
            <Text style={[{ ...styles.columns, width: "150%", color: "#000" }]}>{t('CON_ITEM')}#</Text>
            <Text style={{ ...styles.columns, width: "170%", color: "#000" }}>{t('COH_DESCRIPTION')}</Text>
            <Text style={[{ ...styles.columns, color: "#000" }]}>{t('CON_DELIVERY_DATE')}</Text>
            <Text style={[{ ...styles.columns, color: "#000" }]}>{t('CON_UNIT')}</Text>
            <Text style={[{ ...styles.columns, color: "#000" }]}>{t('CON_DISCOUNT')} {webSettings?.currencyCode}</Text>
            <Text style={[{ ...styles.columns, color: "#000" }]}>{t('CON_PRICE')} {webSettings?.currencyCode}</Text>
            <Text style={[{ ...styles.columns, color: "#000" }]}>{t('CON_QUANTITY')}</Text>
            <Text style={[{ ...styles.columns, color: "#000" }]}>{t('COH_TOTAL_AMOUNT')} {webSettings?.currencyCode}</Text>
          </View>
          {/* Table Body */}
          {
            userCartData?.lineCount > 0 && Object.values(userCartData?.orderLines).map((cart: any) => (
              <View style={styles.row}>
                <>
                  <View style={[styles.columns, styles.medium, { width: "150%" }]}>
                    <Text>
                      {cart?.ivItem?.code}
                    </Text>
                  </View>
                  <View style={[styles.columns, styles.medium, { minWidth: "170%",flexWrap:"wrap" }]}>
                    <Text>
                      {cart?.ivOrderLine?.itemDescription}
                    </Text>
                  </View>
                  <View style={[styles.columns, styles.medium]}>
                    <Text>
                      {cart?.ivEnteredValues?.Date}
                    </Text>
                  </View>
                  <View style={[styles.columns, styles.medium]}>
                    <Text>
                      {cart?.ivEnteredValues?.UnitDesc}
                    </Text>
                  </View>
                  <View style={[styles.columns, styles.medium]}>
                    <Text>
                      {cart?.ivOrderLine?.lineDisCount}
                    </Text>
                  </View>
                  <View style={[styles.columns, styles.medium]}>
                    <Text>
                      {cart?.ivOrderLine?.price}
                    </Text>
                  </View>
                  <View style={[styles.columns, styles.medium]}>
                    <Text>
                      {cart?.ivEnteredValues?.Quantity}
                    </Text>
                  </View>
                  <View style={[styles.columns, styles.medium]}>
                    <Text>
                      {cart?.ivOrderLine?.lineNetVal}
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

  const {
    data: userCartData,
    webSettings,
    t
  }: any = useContext(UserCartContext);

  return (
    <>
      <span title="Download PDF">
        <PDFDownloadLink fileName={`ShoppingCart_${Date.now().toString()}`} document={<CartDocument {...{ userCartData, t, webSettings }} />} >
          <PdfSVG className="primary-icon-2 icon-lg" />
        </PDFDownloadLink>
      </span>
    </>
  )
}

export default PDF