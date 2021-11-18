import { CSVLink } from "react-csv";
import React, { useContext } from 'react'
import { ExcelSVG } from "@icons"
import { UserCartContext } from "@providers/UserCartCtxProvider";


interface Props { }


function Excel(props: Props) {

  const { } = props

  const {
    data: userCartData,
    webSettings,
    t
  }: any = useContext(UserCartContext);

  const csvData = userCartData?.lineCount > 0 ?

    Object.values(userCartData?.orderLines).map((cart: any) => {
      return {
        [`${t('CON_ITEM')}#`]: cart?.ivItem?.code,
        [t('COH_DESCRIPTION')]: cart?.ivOrderLine?.itemDescription,
        [t('CON_DELIVERY_DATE')]: cart?.ivEnteredValues?.Date,
        [t('CON_UNIT')]: cart?.ivEnteredValues?.UnitDesc,
        [`${t('CON_DISCOUNT')} ${webSettings?.currencyCode}`]: cart?.ivOrderLine?.lineDisCount,
        [`${t('CON_PRICE')} ${webSettings?.currencyCode}`]: cart?.ivOrderLine?.price,
        [t('CON_QUANTITY')]: cart?.ivEnteredValues?.Quantity,
        [`${t('COH_TOTAL_AMOUNT')} ${webSettings?.currencyCode}`]: cart?.ivOrderLine?.lineNetVal,
      }
    })
    :
    [];


  return (
    <>
      <CSVLink filename={`ShoppingCart_${Date.now().toString()}.csv`} data={csvData} title="Download excel sheet">
        <ExcelSVG className="primary-icon-2 icon-lg" style={{ marginLeft: '10px' }} />
      </CSVLink>
    </>
  )
}

export default Excel
