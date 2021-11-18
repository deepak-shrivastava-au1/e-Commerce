import React, { useContext } from 'react'
import { PdfSVG } from "@icons"
import { UserCartContext } from "@providers/UserCartCtxProvider";
import { PDFDownloadLink, Document, Page, View, Image, Text, Font } from "@react-pdf/renderer"
import { styles } from '@pages/Cart/ShoppingCart/OrderReceipt'
import Logo from '../../../../assets/images/logo.png';
import OpenSansFont from '../../../../assets/fonts/OpenSans-Regular.ttf'
import OpenSansFontBold from '../../../../assets/fonts/OpenSans-Bold.ttf'
import OpenSansFontSemiBold from '../../../../assets/fonts/OpenSans-SemiBold.ttf'
import { ShoppingListsContext } from '../CtxProvider';

Font.register({
  family: `'OpenSans-Regular'`,
  fonts: [{ src: OpenSansFont }, { src: OpenSansFontBold, fontWeight: 700 }, { src: OpenSansFontSemiBold, fontWeight: 600 }]
})

const CartDocument = ({ shoppingListLineDetails, t, webSettings }: { shoppingListLineDetails: any, t: any, webSettings:any }) => {

  return (
    <Document>
      <Page size="A3" orientation="portrait" wrap style={styles.page}>

        {/* Header */}
        <View style={{ display: 'flex', flexDirection: "row", width: '100%', marginBottom: "30px" }}>
          <View style={{ ...styles.bold, ...styles.fontSize16, flexGrow: 1, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
            <Image style={styles.logo} src={Logo} />
          </View>
        </View>

        <View>
          <Text>{t('CON_SHOPPING_LIST_ENTRY')}</Text>
        </View>

        {/* Table Container */}
        <View style={[styles.tableContainer, styles.border, { marginTop: "30px" }]}>
          {/* Table Header */}
          <View style={[styles.containerHeader, styles.tablePadding]}>
            <Text style={[{ ...styles.columns, width: "150%", color: "#000" }]}>{t('CON_PRODUCT')}#</Text>
            <Text style={{ ...styles.columns, width: "170%", color: "#000" }}>{t('CON_DESCRIPTION')}</Text>
            <Text style={[{ ...styles.columns, color: "#000" }]}>{t('COH_ACTUAL_PRICE')} {webSettings?.currencyCode}</Text>
            <Text style={[{ ...styles.columns, color: "#000" }]}>{t('COH_DISCOUNT_PRICE')}</Text>
            <Text style={[{ ...styles.columns, color: "#000" }]}>{t('CON_DISCOUNT_%')}</Text>
            <Text style={[{ ...styles.columns, color: "#000" }]}>{t('CON_QUANTITY')}</Text>
            <Text style={[{ ...styles.columns, color: "#000" }]}>{t('CON_UNIT')}</Text>
          </View>
          {/* Table Body */}
          {
            shoppingListLineDetails?.listOfLine?.map((line: any) => (
              <View style={styles.row}>
                <>
                  <View style={[styles.columns, styles.medium, { width: "150%" }]}>
                    <Text>
                      {line?.code}
                    </Text>
                  </View>
                  <View style={[styles.columns, styles.medium, { width: "170%" }]}>
                    <Text>
                    {line?.description}
                    </Text>
                  </View>
                  <View style={[styles.columns, styles.medium]}>
                    <Text>
                      {line?.actualPrice}
                    </Text>
                  </View>
                  <View style={[styles.columns, styles.medium]}>
                    <Text>
                      {line?.discountPrice}
                    </Text>
                  </View>
                  <View style={[styles.columns, styles.medium]}>
                    <Text>
                      {line?.discountPercentage}
                    </Text>
                  </View>
                  <View style={[styles.columns, styles.medium]}>
                    <Text>
                      {line?.quantity}
                    </Text>
                  </View>
                  <View style={[styles.columns, styles.medium]}>
                    <Text>
                      {line?.defaultSalesUnit}
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

interface Props { shoppingListLineDetails:any }


function ShoppingListsPDF(props: Props) {

  const { shoppingListLineDetails } = props

  const {
    webSettings,
    t
  } = useContext(ShoppingListsContext);

  return (
    <>
      <span title="Download PDF">
        <PDFDownloadLink fileName={`ShoppingList_${Date.now().toString()}`} document={<CartDocument {...{ shoppingListLineDetails, t, webSettings }} />} >
          <PdfSVG className="primary-icon-2 icon-lg" />
        </PDFDownloadLink>
      </span>
    </>
  )
}

export default ShoppingListsPDF