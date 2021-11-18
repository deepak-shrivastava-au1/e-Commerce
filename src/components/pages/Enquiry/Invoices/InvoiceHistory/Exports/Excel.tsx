import { CSVLink } from "react-csv";
import React, { useContext } from 'react'
import { ExcelSVG } from "@icons"
import { useSelector } from "react-redux";
import { invoicehistorySelector } from "@slices/Enquiry/Invoices/InvoiceHistory";
import { useTranslation } from "react-i18next";
import { WebSettingsContext } from "@providers/WebsettingsProvider";


interface Props { }


function Excel(props: Props) {

  const { } = props
  const { t, i18n } = useTranslation();
  const state = useSelector(invoicehistorySelector);
  const webSettings: any = useContext(WebSettingsContext);
  const userCartData = state?.invoiceHistory?.invoices;



  const csvData = userCartData?.invoiceHistoryBean?.length > 0 ?
    userCartData?.invoiceHistoryBean?.map((cart: any) => {
      return {
        [t('COH_INVOICE')]: cart?.invoiceNumber,
        [t('COH_DOCUMENT_DATE')]: cart?.invoiceDate,
        [t('COH_TYPE')]: cart?.typeDescription,
        [t('COH_INVOICE_CUSTOMER')]: cart?.invoiceCustomer,
        [t('COH_AMOUNT_INCLUDING_VAT')]: cart?.amount,
        [t('COH_ORDER_NUMBER')] : cart?.orderNumber,
        [t('COH_ORDER_DATE')]: cart?.orderDate,
        [t('COH_SALESMAN')]: cart?.salesman,
        [`${t('CON_YOUR_ORDER')}#`]: cart?.yourReferrence,
      
      }
    })
    :
    [];

  return (
    <>
      <CSVLink filename={`InvoiceSearch_${Date.now().toString()}.csv`} data={csvData} title= {t("CON_INVOICE_EXCEL")}>
        <ExcelSVG className="primary-icon-2 icon-lg" style={{ marginLeft: '20px' }} />
      </CSVLink>
    </>
  )
}

export default Excel
