import { CSVLink } from "react-csv";
import React, { useContext } from 'react'
import { ExcelSVG } from "@icons"
import { useSelector } from "react-redux";
import { transactionSelector } from "@slices/Enquiry/Transactions/transactions";
import { useTranslation } from "react-i18next";
import { WebSettingsContext } from "@providers/WebsettingsProvider";


interface Props { }


function Excel(props: Props) {

  const { } = props
  const { t, i18n } = useTranslation();
  const state = useSelector(transactionSelector);
  const webSettings: any = useContext(WebSettingsContext);
  const userCartData = state?.transactions?.transactionslst;



  const csvData = userCartData?.transactionBean?.length > 0 ?
    userCartData?.transactionBean?.map((cart: any) => {
      return {
        [t('COH_CUSTOMER')]: cart?.customerCode,
        [t('COH_DOCUMENT')]: `${cart?.documentTypeCode}${cart?.documentNumber}`,
        [t('CON_DOCUMENT_DATE')]: cart?.documentDate,
        [t('COH_DUE_DATE')]: cart?.dueDate,
        [t('COH_CURRENCY')]: cart?.transactionCurrencyCode,
        [t('COH_ORIGINAL_AMOUNT')] : cart?.originalAmount,
        [t('COH_REMAINING_AMOUNT')]: cart?.remainingAmount,
        [t('COH_DESCRIPTION')]: cart?.description,
        [t('COH_DEBTOR')]: cart?.debtorCode,
      }
    })
    :
    [];

  return (
    <>
      <CSVLink filename={`AccountInformation_${Date.now().toString()}.csv`} data={csvData} title= {t("CON_AR_EXCEL")}>
        <ExcelSVG className="primary-icon-2 icon-lg"/>
      </CSVLink>
    </>
  )
}

export default Excel
