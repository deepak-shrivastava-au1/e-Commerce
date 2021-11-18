import { CSVLink } from "react-csv";
import React, { useContext } from 'react'
import { ExcelSVG } from "@icons"
import { useSelector } from "react-redux";
import { orderSelector } from "@slices/Enquiry/Order/orderHistory";
import { useTranslation } from "react-i18next";
import { WebSettingsContext } from "@providers/WebsettingsProvider";


interface Props { }


function Excel(props: Props) {

  const { } = props
  const { t, i18n } = useTranslation();
  const state = useSelector(orderSelector);
  const webSettings: any = useContext(WebSettingsContext);
  const userCartData = state?.orderHistory?.orders;



  const csvData = userCartData?.salesOrderBean?.length > 0 ?
    userCartData?.salesOrderBean?.map((cart: any) => {
      return {
        [`#${t('CON_ORDER')}`]: cart?.orderNumber,
        [t('COH_CUSTOMER')]: `${cart?.customer}`,
        [t('CON_ORDER_DATE')]: cart?.orderDate,
        [t('CON_STATUS')]: cart?.status,
        [t('CON_ORDER_VALUE')]: !cart?.isOrderValueFlag && cart?.orderValue,
        [t('CON_HANDLER')] : cart?.handler,
        [`${t('CON_YOUR_ORDER')}#`]: cart?.yourOrderNo,
      
      }
    })
    :
    [];

  return (
    <>
      <CSVLink filename={`OrderSearch_${Date.now().toString()}.csv`} data={csvData} title= {t("CON_ORDER_HISTORY_EXCEL")}>
        <ExcelSVG className="primary-icon-2 icon-lg"/>
      </CSVLink>
    </>
  )
}

export default Excel
