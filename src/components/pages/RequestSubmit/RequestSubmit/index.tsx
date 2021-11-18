import Button from '@common/Button';
import { AddSVG } from '@icons';
import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components'
import { RequestSubmitCtx } from '../CtxProvider'
import ProductGridList from './ProductGridList';
import ProductSearch from './ProductsSearch';
import RequestHeader from './RequestHeader';
import { setScreenStatus } from '@slices/Request/getRequestFilters'
import { orderhistorydetailSelector } from '@slices/Enquiry/Order/orderHistoryDetail';
import { useLocation } from 'react-router';
import { invoicehistorydetailSelector } from '@slices/Enquiry/Invoices/invoiceHistoryDetail';
import { respondTo } from '@utilities/styled-components';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom:20px;

  ${respondTo.xs`
    flex-direction:column;
    align-items: start;
    margin-top:4rem;
  `}

  ${respondTo.sm`
    margin-top:0;
    align-items: center;
    flex-direction:row;
  `}

  .actions{
    display:flex;
    margin-top:1rem;

    ${respondTo.xs`
      flex-direction:column;
      margin-top:1rem;
    `}
    ${respondTo.sm`
      flex-direction:row;
      margin-top:0rem;
    `}
  }

  .submit_request_button{
    ${respondTo.xs`
      margin-left:0px;
      margin-top:1rem;
    `}
    ${respondTo.sm`
      margin-top:0rem;
      margin-left:8px;
    `}
  }
`

export default function RequestSubmit() {

  const { t, dispatch, requestHeaderDetails, setProductsList, filterData , setRequestSubmitReference, setRequestHeaderDetails } = useContext(RequestSubmitCtx);

  const location = useLocation()

  const referrer = new URLSearchParams(location?.search).get('referal')

  const { orderdetail } = useSelector(orderhistorydetailSelector)?.orderHistoryDetail;

  const invoicedetail = useSelector(invoicehistorydetailSelector)?.invoiceHistoryDetail?.invoicedetail;

  const [toggleProductSearchDrawer, setToggleProductSearchDrawer] = useState(false);

  const [descStatus, setDescStatus] = useState(false);

  useEffect(() => {
    if (referrer && referrer === 'orderDetail' && orderdetail?.orderLineList) {

      const copiedOrderListList = [...orderdetail.orderLineList];

      setRequestSubmitReference('order')

      setRequestHeaderDetails(prevState=>{
        return {
          ...prevState,
          reference:orderdetail?.orderNumber
        }
      })

      setProductsList(copiedOrderListList.map((order) => {
        return {
          restricted:order?.restricted,
          itemNumberOfDecimalsAllowed:order?.itemNumberOfDecimalsAllowed,
          code: order?.itemCode,
          defaultUnit: order?.unit,
          desc: '',
          productDesc: order?.itemDescription,
          quantity: Number(order?.ordered),
          requestType: filterData?.submitRequestType?.[0].code,
          Line: Number(order?.lineNumber),
          requestTypeDesc: filterData?.submitRequestType?.[0].description,
          unit: order?.itemUnitsDesc?.map((unit: any) => { return { label: unit?.salesUnitDesc, value: unit?.salesUnit } })
        }
      }))
    }

    if (referrer && referrer === 'invoiceDetail' && invoicedetail?.invoiceLineBeanList) {

      const copiedOrderListList = [...invoicedetail?.invoiceLineBeanList];

      setRequestSubmitReference('invoice')

      setRequestHeaderDetails(prevState=>{
        return {
          ...prevState,
          reference:invoicedetail?.invoiceNumber,
          docType:invoicedetail?.documentType
        }
      })

      setProductsList(copiedOrderListList.map((order) => {
        return {
          restricted:'',
          itemNumberOfDecimalsAllowed:order?.itemNumberOfDecimalsAllowed,
          code: order?.item,
          defaultUnit: order?.unit,
          desc: '',
          Line: Number(order?.invoiceLineNumber),
          productDesc: order?.itemDescription,
          quantity: Number(order?.quantity),
          requestType: filterData?.submitRequestType?.[0].code,
          requestTypeDesc: filterData?.submitRequestType?.[0].description,
          unit: order?.unitCodesDesc?.map((unit: any) => { return { label: unit?.salesUnitDesc, value: unit?.salesUnit } })
        }
      }))
    }
  }, [referrer,filterData])

  return (
    <div>
      <Header>
        <p className="new_request_title">
          {t('CON_BP_NEW_REQUEST')}
        </p>
        <div className="actions">
          { referrer !== null ?
          null
          :
          // Add Product button
          <Button
            variant="solid"
            color="critical"
            onClick={() => setToggleProductSearchDrawer(true)}
          >
            <AddSVG width="1.3em" height="1.3em" className="icon" /> <span> {t('CON_ADD_PRODUCTS')} </span>
          </Button>
          }

          {/* Submit Request */}
          <Button
            className="submit_request_button"
            onClick={() => {
              if (requestHeaderDetails.desc.length === 0) {
                setDescStatus(true)
                return;
              }
              if (requestHeaderDetails.desc.length > 0) {
                setDescStatus(false)
              }
              dispatch(setScreenStatus({
                requestSubmit: false, requestConfirmation: true
              }))
            }}
          >{t('CON_SUBMIT_REQUEST')}</Button>
        </div>
      </Header>

      <ProductSearch status={toggleProductSearchDrawer} handleStatus={setToggleProductSearchDrawer} />

      <RequestHeader {...{ descStatus, setDescStatus }} />

      <ProductGridList />
    </div>
  )
}
