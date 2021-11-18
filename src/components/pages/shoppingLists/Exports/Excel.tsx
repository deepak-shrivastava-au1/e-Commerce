import { CSVLink } from "react-csv";
import React, { useContext } from 'react'
import { ExcelSVG } from "@icons"
import { UserCartContext } from "@providers/UserCartCtxProvider";
import { ShoppingListsContext } from "../CtxProvider";


interface Props {
  shoppingListLineDetails:any
}


function ShoppingListsExcel(props: Props) {

  const { shoppingListLineDetails } = props

  const {
    webSettings,
    t
  } = useContext(ShoppingListsContext);

  const csvData = shoppingListLineDetails?.listOfLine?.length > 0 ?

  shoppingListLineDetails?.listOfLine?.map((line: any) => {
      return {
        [`${t('CON_PRODUCT')}`]: line?.code,
        [t('CON_DESCRIPTION')]: line?.description,
        [`${t('COH_ACTUAL_PRICE')} ${webSettings?.currencyCode}`]: line?.actualPrice,
        [t('COH_DISCOUNT_PRICE')]: line?.discountPrice,
        [`${t('CON_DISCOUNT_%')} `]: line?.discountPercentage,
        [t('CON_QUANTITY')]: line?.quantity,
        [t('CON_UNIT')]: line?.defaultSalesUnit,
      }
    })
    :
    [];


  return (
    <>
      <CSVLink filename={`ShoppingList_${Date.now().toString()}.csv`} data={csvData} title="Download excel sheet">
        <ExcelSVG className="primary-icon-2 icon-lg" style={{ marginLeft: '7px' }} />
      </CSVLink>
    </>
  )
}

export default ShoppingListsExcel
