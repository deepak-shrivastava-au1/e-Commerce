import { CSVLink } from "react-csv";
import React, { useContext } from 'react'
import { ExcelSVG } from "@icons"
import { useSelector } from "react-redux";
import { quotationsummarySelector } from "@slices/Enquiry/Quotations/QuotationSummary";
import { useTranslation } from "react-i18next";
import { WebSettingsContext } from "@providers/WebsettingsProvider";


interface Props { }


function Excel(props: Props) {

  const { } = props
  const { t, i18n } = useTranslation();
  const state = useSelector(quotationsummarySelector);
  const webSettings: any = useContext(WebSettingsContext);
  const userCartData = state?.quotationsummary?.quotationHistory;



  const csvData = userCartData?.quotationHistoryBean?.length > 0 ?
    userCartData?.quotationHistoryBean?.map((cart: any) => {
      return {
        [t('CON_QUOTATION')]: cart?.QuotationNumber,
        [t('CON_VERSION')]: cart?.VersionNumber,
        [t('CON_CUSTOMER')]: cart?.CustomerDesc,
        [t('CON_VALUE')]: cart?.OrderValue,
        [t('CON_HANDLER')]: cart?.HandlerDesc,
        [t('COH_EXPIRE_DATE')] : cart?.DueDate,
        
      
      }
    })
    :
    [];

  return (
    <>
      <CSVLink filename={`QuotationSearch_${Date.now().toString()}.csv`} data={csvData} title= {t("CON_QUOTATION_HISTORY_EXCEL")}>
        <ExcelSVG className="primary-icon-2 icon-lg"/>
      </CSVLink>
    </>
  )
}

export default Excel
