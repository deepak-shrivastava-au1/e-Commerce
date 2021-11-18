import React, { useContext, useState, useEffect } from 'react'
import { UserCartContext } from '@providers/UserCartCtxProvider'
import { alignCenter, respondTo } from '@utilities/styled-components'
import styled, { css } from "styled-components"
import { ArrowLeft, CheckMarkSVG, CloseSVG, Info, Invoice, NetBankingSVG } from '@icons'
import { cssVar, rgba } from 'polished'
import { useMediaQuery } from '@material-ui/core'
import { breakpoints } from '@constants/styled-components'
import altImage from '@images/awaited_image.png';
import moment from 'moment'
import { TimelineContext } from '@fragments/HorizontalTimeline/TimelineContextProvider'
import Button from '@common/Button'
import Checkbox from '@common/Checkbox'
import TermsAndCondn from '../ShoppingCart/TermsAndCondn'
import maestroCardImg from '@images/maestro.png'
import masterCardImg from '@images/mastercard.png'
import aeCardImg from '@images/ae.png'
import visaCardImg from '@images/visa.png'
import { useHistory } from 'react-router-dom'
import { closeCartSelector, fetchCloseCart, getCloseCartSuccess, initializeCloseCartLoader, setCloseCartHasErrors, setCloseCartMessageCode } from "@slices/cart/getCloseCart"
import { useSelector } from 'react-redux'
import { fetchcartItems } from '@slices/cart/getTemporaryOrderData'
import LoadingOverlay from '@common/LoadingOverlay'
import { BASE_URL_IMAGE } from '@routers/AppRoute'
import Modal from '@common/Modal'
import { getErrorMsgForShoppingCart, internalServerErrorCode } from '@utilities/error/serviceErrorCodeUtil'
import { fetchCurbStoneURL, initializeCurbStoneURLLoader } from '@slices/cart/getCurbStoneURL'
import { CART, PAYMENT } from '@constants/Routes'

const PaymentCardContainer = styled.div`
  flex-grow: 1;
  display:flex;
  flex-direction: column;
  border-radius: var(--border-radius);
  background-color: var(--white);

  >:not(:last-child){
    border: var(--thin-border) var(--border-color);
  }
`
const Row = styled.div`
  display:flex;
  flex-direction:column; 
  flex-grow: 1;
  padding: 24px;
  border-radius: var(--border-radius);

  .title{
    font-size:calc(var(--base-font-size) + 4px);
    font-weight:var(--font-weight-medium);
  }
`
const Column = styled.div`
  display:flex; 
  padding:18px 0;

  ${respondTo.xs`
    flex-direction:column;

    >:not(:last-child){
      margin-bottom:16px;
    }
  `}

  ${respondTo.md`
    flex-direction:row;
    >:not(:last-child){
      margin-bottom:0;
    }
  `}

  .online_method{

  ${respondTo.md`
    margin-left:24px;
  `}
  }
`
const Details = styled.div`
  display:flex;
  flex-direction:column; 
  width:100%;
  /* border:5px solid red; */

  >:last-child{
    margin-top:7px;
  }

  .detail{
    &__title{
      color: var(--primary-color-4);
    }

    &__value{
      padding-right:50px;
      font-weight: var(--font-weight-medium);
      font-size: calc(var(--base-font-size) + 2px);
      word-break: break-all;
      display:block;
    }
} 
`
interface IProps {
  status: boolean
}

const PaymentMethodBox = styled.div`
  ${({ status }: IProps) => css`
    position: relative;
    ${alignCenter}
    flex-direction: column;
    width:217px;
    height:112px;
    background:var(--white);
    border:var(--thin-border) var(--primary-color-3);
    border-radius: var(--border-radius);
    background-color: ${status ? '#D0EEEE' : 'var(--white)'};

    .checkmark_svg{
      position:absolute;
      display: ${status ? 'block' : 'none'};
      top:0;
      right:0;
      margin-right:20px;
      margin-top:11px;
    }

    .label{
      font-weight: ${status ? 'var(--font-weight-medium)' : 'var(--font-weight-regular)'};
      font-size: calc(var(--base-font-size) + 2px);
    }
  `}
`
const Header = styled.div`
  display:flex;
  justify-content:space-between; 
  margin-bottom:23px;
  /* margin-top: 19px; */

  .title{
    font-weight:var(--font-weight-bold);
    font-size:calc(var(--base-font-size) - 2px);
    
    ${respondTo.xs`
        font-size:calc(var(--base-font-size) + 4px);
    `}

    ${respondTo.md`
    font-size:calc(var(--base-font-size) + 10px);
    `}
  }
  .warning_text{
    display:flex;
    align-items:center;
    color:var(--note-info);
  }

`
const ProductsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top:24px;
`
const CartItemsContainer = styled.div`
  display:flex;
  flex-direction:column;
  /* padding: 24px 26px; */

   ${respondTo.xs`
    >:not(:first-child){
        margin-top: 16px;
      }
   `}

   ${respondTo.md`
   
   >:not(:first-child){
      margin-top:0;
    }

   >:not(:first-child){
      border-bottom: var(--thin-border) ${rgba(cssVar(`--primary-color-4`), 0.2)};
    }
   `}

`
const CartItemHeader = styled.div`
  display:flex;
  margin-bottom:16px;

  >span{
    display: flex;
    flex-grow: 1;
    font-size: calc(var(--base-font-size) - 2px);
    text-transform:uppercase;
    color:var(--primary-color-3);

    &:first-child{
      width:28%;
    }

    &:nth-child(2){
      flex-grow:1;
      justify-content: center;
    }

    &:nth-child(3){
      flex-grow:1;
      justify-content: center;
    }

    &:nth-child(4),:nth-child(5){
      flex-grow:1;
      justify-content: center;
    }
  }
`
const CartItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding:24px 0;

  >span{
    display:flex;

    .label-text{
      color:var(--primary-color-3);

      ${respondTo.xs`
      margin-bottom:8px;
      `}

      ${respondTo.md`
        margin-bottom:0px;
      `}
    }

    ${respondTo.xs`
      flex-direction:column;
    `}

    ${respondTo.md`
      flex-direction:row;
    `}
  }

  >:not(:first-child){
    font-weight: var(--font-weight-medium);
  }

  ${respondTo.xs`
    flex-direction:column;

    >:not(:last-child){
      margin-bottom:16px;
    }
    background-color:var(--white);
    padding:24px 16px;
  `}

  ${respondTo.sm`
    flex-direction:row;
    align-items: center;
    padding:24px 18px;

    >:not(:last-child){
      margin-bottom:0px;
    }
  `}
`
// const CartItemDetails = styled.span`
//   display: flex;

//   >div{
//     display:flex;
//   }

//   .brand{
//     display:flex;
//     align-items:center;
//     width:100%;
//     margin-left: 8px;

//     &__name{
//       display:block;
//       word-break: break-all;
//       line-height: 19px;
//       text-transform: uppercase;
//     }
//   }
// `
const ImageWrapper = styled.div`
  ${alignCenter}
  padding:5px;
  width:60px;
  height:60px;
  border:var(--thin-border) var(--form-base-color);
  border-radius:var(--border-radius);

  >img{
    object-fit: cover;
    width:100%;
  }
`
const ButtonSwitcher = styled.div`
  margin-top:24px ;
  display:flex;
  justify-content: space-between;

  ${respondTo.xs`
    flex-direction:column;

    >:last-child{
      display:flex;
      justify-content: space-between;
      margin-top:10px;
    }
  `}

  ${respondTo.md`
    flex-direction:row;
    
    >:last-child{
      margin-top:0px;
    }
  `}
`
const ProductsTitle = styled.p`
  font-weight:var(--font-weight-bold);
  font-size:calc(var(--base-font-size) + 4px);
  margin-bottom:16px;
`
const PaymentCards = styled.div`
  display:flex;
  align-items: center;

  .info{
   color:var(--primary-color-4);
   font-size:calc(var(--base-font-size) - 2px); 
  }

  .card_list{
    margin-left:55px;

    >:not(:last-child){
      margin-right:10px;
    }

    img{
      width:42px;
    }
  }
`
const PlaceOrderContainer = styled.div`
  display:flex;
  align-items:center;

  .label-text{
    cursor:pointer;
    font-size:calc(var(--base-font-size) + 2px);
    font-weight: var(--font-weight-regular);
  }

  ${respondTo.xs`
    flex-direction:column;
    button{
      margin-top:15px;
      width:100%; 
    }
  `}

  ${respondTo.sm`
    flex-direction:row;
    margin-left: 20px;
    button{
      margin-top:0;
      margin-left:10px;
      width:max-content;
    }
  `}
`
export const hyphenTextGenerator = (value: any) => (value?.length === 0 || !value) ? '-' : value;

export const creationDate = (date: any) => {

  if (!date || typeof date === 'undefined') {
    return hyphenTextGenerator(undefined);
  }
  return `${date?.month}/${date?.dayOfMonth}/${date?.year}`
}

function PaymentSection() {

  const {
    deliveryInformationData,
    t,
    data: userCartData,
    isTermsNCondChecked,
    setIsTermsNCondChecked,
    FormattedCurrency,
    webSettings,
    currencyStatus, 
    setCurrencyStatus,
    dispatch,
    sessionId,
    defaultPaymentMethod,
    setDefaultPaymentMethod }: any = useContext(UserCartContext);

  const isMobile = useMediaQuery(`(max-width:${breakpoints.sm})`);

  const closeCartState: any = useSelector(closeCartSelector)

  const { handleTab } = useContext(TimelineContext);

  const history = useHistory();

  const billingAddress = `${deliveryInformationData?.billingAddress ? `${deliveryInformationData?.billingAddress?.address1},${deliveryInformationData?.billingAddress?.address2},${deliveryInformationData?.billingAddress?.address3},${deliveryInformationData?.billingAddress?.address4}` : '-'}`

  const deliveryAddress = `${deliveryInformationData?.invoiceAddress ? `${deliveryInformationData?.invoiceAddress?.address1},${deliveryInformationData?.invoiceAddress?.address2},${deliveryInformationData?.invoiceAddress?.address3},${deliveryInformationData?.invoiceAddress?.address4}` : '-'}`

  const [isTermsNCondClicked, setisTermsNCondClicked] = useState<boolean>(false);

  useEffect(() => {
    if (closeCartState?.data && Object.keys(closeCartState?.data).length > 0) {
      history.push(`/thankYou/INVOICE/NA/${closeCartState?.data?.orderNumber}`)
      dispatch(fetchcartItems(sessionId))
    }
  }, [closeCartState?.data])

  useEffect(() => {
    return () => {
      dispatch(getCloseCartSuccess("unmounted text"))
    }
  }, [])

  const deliveryDate = (item: any, webSettings: any) => {
    return moment(item.ivEnteredValues.Date).format(webSettings?.defaultDateFormat.toUpperCase())
  }

  return (
    <div className="flex flex-col flex-grow-1">
      {!isMobile ?
        <Header>
          <p className="title">{t('CON_CONFIRM')} {t('CON_ORDER')}</p>
          <span className="warning_text"> <Info className="info-icon" width="14px" style={{ marginRight: "5px" }} /> <p>{t('TXT_OE_007')}</p> </span>
        </Header> :
        null
      }
      <LoadingOverlay active={closeCartState?.loading} />
      <PaymentCardContainer>
        {/* Payment Method */}
        <Row>
          <p className="title">{t('CON_PAYMENT_METHOD')}</p>
          <Column>
            {/* <Row> */}
            {
              webSettings?.paymentMethod === 'INVOICE' ||  webSettings?.paymentMethod === 'INVOICE,ONLINE' ?
                <PaymentMethodBox
                  status={defaultPaymentMethod['invoice']['status']}
                  onClick={() =>
                    setDefaultPaymentMethod(() => {
                      return {
                        'online': { status: false },
                        'invoice': { status: true }
                      }
                    })}
                >
                  <CheckMarkSVG width="16px" className="checkmark_svg primary-icon-1" />
                  <Invoice width="40px" height="40px" className="primary-icon-1" />
                  <label className="label"> {t('COH_INVOICE')} </label>
                </PaymentMethodBox> : null
            }

            {webSettings?.paymentMethod === 'ONLINE' || webSettings?.paymentMethod === 'INVOICE,ONLINE' ?
              <PaymentMethodBox
                className='online_method'
                status={defaultPaymentMethod['online']['status']}
                onClick={() =>
                  setDefaultPaymentMethod(() => {
                    return {
                      'online': { status: true },
                      'invoice': { status: false }
                    }
                  })}
              >
                <CheckMarkSVG width="16px" className="checkmark_svg primary-icon-1" />
                <NetBankingSVG width="50px" height="50px" className="primary-icon-1" />
                <label className="label"> {t('CON_ONLINE_PAYMENT')} </label>
              </PaymentMethodBox> : null
            }
          </Column>
          <PaymentCards>
            <span className="info">
              ({t('CON_TERMS_OF_PAYMENT')} : 30 days net)
            </span>
            <span className="card_list">
              <img src={masterCardImg} alt="" />
              <img src={visaCardImg} alt="" />
              <img src={aeCardImg} alt="" />
              <img src={maestroCardImg} alt="" />
            </span>
          </PaymentCards>
        </Row>
        {/* Address Details */}
        <Row>
          <p className="title">Address Details</p>
          <Column>
            <Details>
              <p className="detail__title">{t('CON_DELIVERY_ADDRESS')}</p>
              <span>
                <p className="detail__value">{hyphenTextGenerator(deliveryAddress)}</p>
              </span>
            </Details>

            <Details>
              <p className="detail__title">{t('CON_BILLING_ADDRESS')}</p>
              <span>
                <p className="detail__value">{hyphenTextGenerator(billingAddress)}</p>
              </span>
            </Details>
          </Column>
        </Row>
        {/* Order references */}
        <Row>
          <p className="title">{t('CON_ORDER_REFERENCES')}</p>
          <div>
            <Column>
              <Details>
                <p className="detail__title">{t('CON_YOUR_ORDER')}</p>
                <span>
                  <p className="detail__value">{hyphenTextGenerator(deliveryInformationData?.currentOrder?.customerOrderNumber)}</p>
                </span>
              </Details>

              <Details>
                <p className="detail__title">{t('CON_YOUR_REFERENCE')}</p>
                <span>
                  <p className="detail__value">{hyphenTextGenerator(deliveryInformationData?.currentOrder?.yourReference)}</p>
                </span>
              </Details>

              <Details>
                <p className="detail__title">{t('CON_OUR_REFERENCE')}</p>
                <span>
                  <p className="detail__value">{hyphenTextGenerator(deliveryInformationData?.customer?.ourReference)}</p>
                </span>
              </Details>

              <Details>
                <p className="detail__title">{t('CON_CREATION_DATE')}</p>
                <span>
                  <p className="detail__value">{creationDate(deliveryInformationData?.currentOrder?.orderDate)}</p>
                </span>
              </Details>
            </Column>
          </div>
          <div>
            <Column>
              <Details>
                <p className="detail__title">{t('CON_COMPLETE_DELIVERY')}</p>
                <span>
                  <p className="detail__value">{!deliveryInformationData?.currentOrder?.isCompleteDelivery ? t('CON_NOT_REQUESTED') : 'requested'}</p>
                </span>
              </Details>

              <Details>
                <p className="detail__title">{t('CON_FREE_TEXT')}</p>
                <span>
                  <p className="detail__value">{hyphenTextGenerator(deliveryInformationData?.currentOrder?.orderText)}</p>
                </span>
              </Details>
              {webSettings?.showGoodsMarks ?
                <Details>
                  <p className="detail__title">{t('CON_GOODS_MARK')}</p>
                  <span>
                    <p className="detail__value">{hyphenTextGenerator(deliveryInformationData?.currentOrder?.shipmentMark)}</p>
                  </span>
                </Details> : null
              }
              {webSettings?.showMannerOfTransport ?
                <Details>
                  <p className="detail__title">{t('CON_MANNER_OF_TRANSPORT')}</p>
                  <span>
                    <p className="detail__value">{hyphenTextGenerator(deliveryInformationData?.billingAddress?.mannerOfTransportDesc)}</p>
                  </span>
                </Details> : null
              }
            </Column>
          </div>

        </Row>
      </PaymentCardContainer>

      <ProductsContainer>
        <ProductsTitle>Products</ProductsTitle>
        <CartItemsContainer className="card-table">
          {
            !isMobile &&
            <div className="card-thead">
              <div className="row">
                <div className="col">
                  <span>{t('CON_ITEM')}</span>
                </div>
                <div className="col">
                  <span>{t('CON_DELIVERY_DATE')}</span>
                </div>
                <div className="col">
                  <span>{t('CON_QUANTITY')}</span>
                </div>
                <div className="col">
                  {!webSettings?.showOrderLineValueInclVAT ?
                    <span>{t('CON_AMOUNT')}</span> :
                    <span>{t('COH_TOTAL_AMOUNT_INCL_VAT')}</span>
                  }
                </div>
                <div className="col">
                  <span>{t('CON_SHIPMENT_MARKING')}</span>
                </div>
              </div>

            </div>
          }
          <div className="card-tbody">
            {userCartData?.lineCount > 0 ?
              Object.values(userCartData.orderLines).map((order: any, i: number) => (
                <div className="row" key={`${i}${order?.ivOrderLine?.itemDescription}`}>
                  {/* Img */}
                  <div className="col">
                    <div className="flex-container">
                      <label className="label">{t('CON_ITEM')}</label>
                      <div className="d-flex align-items-center">
                        {/* Item Image */}
                        <ImageWrapper>
                          <img
                            src={`${BASE_URL_IMAGE}${order.ivOrderLine.imageUrl}`}
                            alt="cartItemImg"
                            onError={(e: any) => {
                              e.target.onerror = null;
                              e.target.src = altImage;
                            }}
                          />
                        </ImageWrapper>
                        {/* Item Details */}
                        <div className="ml-3">
                          {/* Item Name */}
                          <span>{order.ivOrderLine.itemDescription}</span>
                        </div>

                      </div>

                    </div>
                  </div>
                  {/* Delivery Date */}
                  <div className="col">
                    <div className="flex-container">
                      {isMobile && <label className="label-text">{t('CON_DELIVERY_DATE')}</label>}
                      {deliveryDate(order, webSettings)}
                    </div>
                  </div>
                  {/* Quantity */}
                  <div className="col">
                    <div className="flex-container">
                      {isMobile && <label className="label-text">{t('CON_QUANTITY')}</label>}
                      {order.ivOrderLine.orderedQuantity}
                    </div>
                  </div>
                  {/* Amount */}
                  <div className="col">
                    <div className="flex-container">
                      {isMobile && <label className="label-text">{t('CON_AMOUNT')}</label>}
                      {!webSettings?.showOrderLineValueInclVAT ? FormattedCurrency(order.ivOrderLine.lineNetVal) : FormattedCurrency(order.ivOrderLine.lineVal)}
                    </div>
                  </div>
                  {/* Shipment Marking */}
                  <div className="col">
                    <div className="flex-container">
                      {isMobile && <label className="label-text">{t('CON_SHIPMENT_MARKING')}</label>}
                      <span>{hyphenTextGenerator(order.ivOrderLine.shipmentMark)}</span>
                    </div>
                  </div>
                </div>

              ))
              :
              null
            }
          </div>
        </CartItemsContainer>

      </ProductsContainer>

      {/* Button Switcher */}
      <ButtonSwitcher>
        <Button variant="outlined" onClick={() => handleTab(2)}> <ArrowLeft className="icon" /> <span>{t('COH_DELIVERY_INFORMATION')}</span>  </Button>
        <PlaceOrderContainer>
          {webSettings?.showSalesTermsAndConditions === 'termsandcondition.html' ?
            <>
              <Checkbox
                showLabel={false}
                checked={isTermsNCondChecked}
                onChange={(e) => {
                  setIsTermsNCondChecked(e.target.checked);
                }}
              />
              <p
                className="label-text"
                onClick={() => { setisTermsNCondClicked(prevState => !prevState) }}
              >{t('SALES_AND_CONDITION')}</p>
            </>
            : null
          }
          <TermsAndCondn status={isTermsNCondClicked} handleStatus={setisTermsNCondClicked} />

          <Button
            variant="solid"
            disabled={isTermsNCondChecked ? false : true}
            onClick={() => {
              // If user pick invoice payment method
              if (defaultPaymentMethod.invoice.status) {
                dispatch(initializeCloseCartLoader())
                dispatch(fetchCloseCart(sessionId, {
                  YourReference: deliveryInformationData?.currentOrder?.yourReference,
                  addressNumber: deliveryInformationData?.ivDispatchAddressCode,
                  freeText: deliveryInformationData?.orderText,
                  emailInvoiceDispatch: '',
                  emailInvoiceDispCheckBox: false
                }))
              }
              // If user pick online payment method
              if (defaultPaymentMethod.online.status) {
                if(currencyStatus.currencyCode!=='USD'){
                  setCurrencyStatus((prevState:any)=>{
                    return {
                      ...prevState,
                      showPopUp:true
                    }
                  })
                  return;
                }
                dispatch(initializeCurbStoneURLLoader())
                dispatch(fetchCurbStoneURL(sessionId, {
                  YourReference: deliveryInformationData?.currentOrder?.yourReference,
                  addressNumber: deliveryInformationData?.defaultAddressNumber,
                  freeText: deliveryInformationData?.orderText,
                  nsuiURI: window.location.href.split(CART)[0],
                  nsuiBaseFragment: `thankYou`
                }))
                history.push(PAYMENT)
              }

            }}
          >
            <span>{t('CON_CONFIRM_ORDER')}</span>
          </Button>

        </PlaceOrderContainer>
      </ButtonSwitcher>
      
      {/* Modal for USD verification */}
      <Modal
        isPopUp
        icon={<div className="icon-fail"><CloseSVG className="icon" /></div>}
        title={t(getErrorMsgForShoppingCart(internalServerErrorCode))}
        message={'Make Sure preferred currency is set to USD or either pick invoice payment method'}
        isOpen={currencyStatus.showPopUp}
        hasCancelButton={false}
        onRequestClose={() => {
          setCurrencyStatus((prevState:any)=>{ return {
            ...prevState,
            showPopUp:false
          } })
        }}
        secondaryActionText={t('CON_OK')}
      />

      {/* Modal for Error Handling */}
      <Modal
        isAlert
        icon={<div className="icon-fail"><CloseSVG className="icon" /></div>}
        title={t(getErrorMsgForShoppingCart(closeCartState.messageCode))}
        message={''}
        isOpen={closeCartState.hasErrors}
        hasCancelButton={false}
        onRequestClose={() => {
          dispatch(setCloseCartHasErrors(false));
          dispatch(setCloseCartMessageCode(null));
        }}
        secondaryActionText={'ok'}
        onSecondaryButtonClick={() => {
          dispatch(setCloseCartHasErrors(false));
          dispatch(setCloseCartMessageCode(null));
        }}
      />
    </div >
  )
}

export default PaymentSection
