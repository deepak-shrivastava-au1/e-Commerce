import { CSVLink } from "react-csv";
import React, { useContext } from 'react'
import { ExcelSVG } from "@icons"
import { useSelector } from "react-redux";
import { requestSelector } from "@slices/Enquiry/Request/RequestHistory";
import { useTranslation } from "react-i18next";
import { WebSettingsContext } from "@providers/WebsettingsProvider";


interface Props { }


function Excel(props: Props) {

  const { } = props
  const { t, i18n } = useTranslation();
  const state = useSelector(requestSelector);
  const webSettings: any = useContext(WebSettingsContext);
  const userCartData = state?.requestHistory?.requests;



  const csvData = userCartData?.requestHistoryBean?.length > 0 ?
    userCartData?.requestHistoryBean?.map((cart: any) => {
      return {
        [t('COH_ID')]: cart?.requestId,
        [t('CON_STATUS')]: `${cart?.status}`,
        [t('COH_REQUEST_TYPE')]: cart?.requestType,
        [t('CON_RESOLUTION_TYPE')]: cart?.resolutionType,
        [t('COH_REFERENCE_TYPE')]: cart?.refType,
        [t('COH_REFERENCE')] : cart?.reference,
        [t('COH_DATE')] : cart?.date,
        [t('CON_HANDLER')] : cart?.handler,
        [t('COH_YOUR_REFERENCE')] : cart?.yourReference,
       
       
      
      }
    })
    :
    [];

  return (
    <>
      <CSVLink filename={`RequestSearch_${Date.now().toString()}.csv`} data={csvData} title= {t("CON_REQUEST_SEARCH_EXCEL")}>
        <ExcelSVG className="primary-icon-2 icon-lg"/>
      </CSVLink>
    </>
  )
}

export default Excel
