import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import {
  AddSVG,
  ArrowLeft,
  ArrowRight,
  CartAddSVG,
  CartDeleteSVG,
  CartForModalSVG,
  CartPauseSVG,
  CloseSVG,
  EmptyCartSVG,
  TrashForModalSVG
} from "@icons"

import { rgba, cssVar } from "polished"

import Button from "@common/Button"
import moment, { Moment } from "moment"
import SingleDatePicker from "@common/SingleDatePicker"

import { useMediaQuery } from '@material-ui/core'
import { breakpoints } from '@constants/styled-components'
import { respondTo } from '@utilities/styled-components'
import { UserCartContext } from "@providers/UserCartCtxProvider"
import { TimelineContext } from "@fragments/HorizontalTimeline/TimelineContextProvider"

import { fetchApplyDeliveryDateForCart, fetchcartItems, fetchCreateNewCart, fetchDeleteCurrentCart, initializeCartLoader, setHasErrors, setMessageCode, setPromotionCodeApplied } from '@slices/cart/getTemporaryOrderData'
import CartItemList from './CartItemList'
import LoadingOverlay from '@common/LoadingOverlay'
import { IuserWebSettings } from '@constants/interfaces/userWebSettings'
import { WebSettingsContext } from '@providers/WebsettingsProvider'
import Modal from '@common/Modal'
import { getErrorMsgForShoppingCart } from '@utilities/error/serviceErrorCodeUtil'
import { Link } from 'react-router-dom'
import { HOME } from '@constants/Routes'



const CartSectionContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow:1;
`
const CartSectionHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const CartSectionTitle = styled.span`
    font-size: calc(var(--base-font-size) + 10px);
    font-weight: var(--font-weight-bold);
`
const CartHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding:24px;
  border-bottom: var(--thin-border) ${rgba(cssVar(`--primary-color-4`), 0.2)};
`
const CartHeaderItemsCount = styled.span`
  font-weight:var(--font-weight-bold);
  font-size:calc(var(--base-font-size) + 4px);
`
const CartItemsContainer = styled.div`
  display:flex;
  flex-direction:column;
  padding: 24px 26px;

   ${respondTo.xs`
   >:not(:first-child){
        margin-top: 16px;
      }
      padding: 0px 0px;
   `}

   ${respondTo.md`
   padding: 24px 26px;
   
   >:not(:first-child){
      margin-top:0;
    }

   >:not(:last-child){
      border-bottom: var(--thin-border) ${rgba(cssVar(`--primary-color-4`), 0.2)};
    }
   `}

`
const CartItemHeader = styled.div`
  display:flex;

  >span{
    display: flex;
    flex-grow: 1;
    font-size: calc(var(--base-font-size) - 2px);
    text-transform:uppercase;
    color:var(--primary-color-3);

    &:first-child{
      width:20%;
    }

    &:nth-child(2){
      justify-content: center;
      width:5%;
    }

    &:nth-child(3){
      width:13%;
      justify-content: center;
    }

    &:nth-child(4),:nth-child(5){
      width:11%;
      justify-content: center;
    }
  }
`

const DateWrapper = styled.div`
  display:flex;
  align-items: center;

  .delivery_date_title{
    color:var(--primary-color-3);
    font-weight:var(--font-weight-medium);
    margin-right:8px;
  }

  .promotion_code{
    color:var(--primary-color-3);
    font-weight:var(--font-weight-medium);
    margin-right:35px;
  }

  ${respondTo.xs`
    margin-top:16px;
  `}

  ${respondTo.sm`
    margin-top:0;
  `}

  button{
    margin-left:7px;
  }
`
const SectionCard = styled.div`
  display:flex;
  flex-direction: column;
  background-color: var(--white);
  border-radius: var(--border-radius);

  ${respondTo.xs`
    background-color:transparent;
  `}

  ${respondTo.md`
    background-color: var(--white);

  `}
`
const Options = styled.div`
  display:flex;
  font-weight:var(--font-weight-medium);
  color:var(--primary-color-2);

  >:not(:last-child){
    margin-right:10px;
  }

  >div{
    cursor: pointer;
  }
`

const ButtonSwitcher = styled.div`
  margin-top:24px ;
  display:flex;
  justify-content: space-between;

  ${respondTo.xs`
    flex-direction:column;

    >:first-child{
      width:100%;

      >button{
        width:100%;
      }
    }

    >:last-child{
      margin-top:10px;
    }
  `}

  ${respondTo.md`
    flex-direction:row;
    
    >:first-child{
      width:auto;
      
      >button{
        width:auto;
      }
    }
    >:last-child{
      margin-top:0px;
    }
  `}
`

const EmptyCartContainer = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  width:100%;
  min-height:450px;

  .title{
    font-size:calc(var(--base-font-size) + 10px);
    font-weight:var(--font-weight-bold);
  }

  .message{
    font-size:calc(var(--base-font-size) + 2px);
  }

  >:not(:last-child){
    margin-bottom:20px;
  }
`
const PromotionCode = styled.div`
  display:flex;

  >:last-child{
    color:black;
    font-weight:var(--font-weight-bold);
    text-transform: uppercase;
  }
`

function CartSection(props: any) {

  const { } = props

  const { handleTab } = useContext(TimelineContext);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const webSettings: IuserWebSettings | null = useContext(WebSettingsContext);

  const [deleteDialogStatus, setDeleteDialogStatus] = useState<boolean>(false);

  const [createCartDialogStatus, setCreateCartDialogStatus] = useState<boolean>(false)

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const isMobile = useMediaQuery(`(max-width:${breakpoints.sm})`);

  const {
    data: userCartData,
    loading,
    hasErrors,
    t,
    sessionId,
    dispatch,
    setDefaultScreen,
    cartErrorCode,
    promotionCode,
    isPromotionCodeApplied
  }: any = useContext(UserCartContext);

  const [deliveryDate, setDeliveryDate] = useState<{ day: Moment, focused: boolean }>({
    day: moment(),
    focused: false
  })


  useEffect(() => {
    if (promotionCode.length > 0) {
      dispatch(setPromotionCodeApplied(false));
    }
  }, [promotionCode])

  return (
    <React.Fragment>

      <CartSectionContainer>

        {/* Header */}
        <CartSectionHeader style={{marginBottom: `${userCartData?.lineCount > 0 ? '16px' : '2.4rem'}`}}>
          <CartSectionTitle>
            {!isMobile ? <span>My Cart</span> : <CartHeaderItemsCount>{userCartData?.lineCount} Items in your cart</CartHeaderItemsCount>}
          </CartSectionTitle>

          {/* Options */}
          {userCartData?.lineCount > 0 ?
            <Options>
              {/* Add New Cart */}
              <Button
                color="neutral"
                variant="outlined"
                iconOnly
                onClick={() => {
                  setCreateCartDialogStatus(true)
                }}
                title={t('CONF_CREATE_NEW_CART')}
              > <CartAddSVG width="28px" className="primary-icon-2" />
              </Button>
              {/* Interrupted Cart */}
              {webSettings?.showInterruptedCart ?
                <Button
                  color="neutral"
                  variant="outlined"
                  iconOnly
                  title={t('CON_INTERRUPTED_CARTS')}
                  onClick={() => dispatch(setDefaultScreen({
                    timeLine: {
                      status: false,
                      page: "cart"
                    },
                    addProduct: {
                      status: false
                    },
                    interruptedCart: {
                      status: true
                    }
                  }))}
                >
                  <CartPauseSVG width="28px" className="primary-icon-2" />
                </Button> : null}
              {/* Delete Button */}
              <Button
                color="neutral"
                variant="outlined"
                iconOnly
                title={t('CON_DELETE_CART')}
                onClick={() => {
                  setDeleteDialogStatus(true);
                }} > <CartDeleteSVG width="28px" className="primary-icon-2" />
              </Button>
            </Options>
            : null
          }
        </CartSectionHeader>

        {/* Cart Items List */}
        <SectionCard>
          {
            !isMobile ?
              <>
                <CartHeader>
                  <CartHeaderItemsCount>{userCartData?.lineCount} Items in your cart</CartHeaderItemsCount>

                  <DateWrapper>
                    {
                      isPromotionCodeApplied && promotionCode.length > 0 ?
                        <>
                          <PromotionCode className="promotion_code">
                            <p> {t('CON_PROMOTION_CODE')}: </p>
                            <p>{promotionCode}</p>
                          </PromotionCode>
                        </> : null
                    }
                    <span className="delivery_date_title">{t('CON_DELIVERY_DATE')}</span>
                    <SingleDatePicker
                      readOnly
                      numberOfMonths={1}
                      date={deliveryDate.day}
                      placeholder={webSettings?.defaultDateFormat}
                      focused={deliveryDate.focused}
                      onDateChange={(day) => {
                        setDeliveryDate(() => { return { day: moment(day), focused: true } })
                      }}
                      onFocusChange={({ focused }) => { setDeliveryDate((prevState: any) => { return { ...prevState, focused: focused } }) }}
                      id="delivery_date"
                    />
                    {/* Error Handling Pop Up */}
                    <Modal
                      isPopUp
                      icon={<div className="icon-fail" style={{ marginBottom: "10px" }}><CloseSVG className="icon" /></div>}
                      isOpen={cartErrorCode===5000 ? false : hasErrors}
                      onRequestClose={() => {
                        dispatch(setHasErrors(false))
                        dispatch(setMessageCode(null))

                        // if(hasErrors){
                        dispatch(initializeCartLoader())
                        dispatch(fetchcartItems(sessionId));
                        // }
                      }}
                      title={t(getErrorMsgForShoppingCart(cartErrorCode))}
                      message={''}
                    />
                    <Button
                      className="delivery_date_apply"
                      onClick={() => {
                        dispatch(initializeCartLoader())

                        dispatch(fetchApplyDeliveryDateForCart(
                          sessionId,
                          Object.values(userCartData?.orderLines).map((order: any) => {
                            return { //deliveryDate.day
                              lineNumber: order.ivOrderLine.lineNumber,
                              quantity: order.ivOrderLine.orderedQuantity,
                              deliveryDate:deliveryDate.day?.format(webSettings?.defaultDateFormat.toUpperCase())
                            }
                          })))
                      }}
                      disabled={userCartData?.lineCount > 0 ? false : true}
                    >{t('CON_APPLY')}</Button>
                  </DateWrapper>

                </CartHeader>
                {/* Delete Modal */}
                <Modal
                  isAlert
                  icon={<TrashForModalSVG className="primary-icon-1" />}
                  title="Want to Delete ?"
                  message="Are you sure you want to delete this cart?"
                  isOpen={deleteDialogStatus}
                  secondaryActionText={t('CON_DELETE')}
                  onRequestClose={() => setDeleteDialogStatus(false)}
                  onSecondaryButtonClick={() => {

                    dispatch(initializeCartLoader());
                    dispatch(fetchDeleteCurrentCart(sessionId))
                    handleClose()

                    setTimeout(() => {
                      setDeleteDialogStatus(false)
                    }, 400);
                  }}
                />
                {/* Create New Cart Modal */}
                <Modal
                  isAlert
                  icon={<CartForModalSVG className="primary-icon-1" width="90px" height="90px" />}
                  title={t('CONF_CREATE_NEW_CART')}
                  message={t('MSG_USE_INTERRUPTED_CART_TO_RELOAD')}
                  isOpen={createCartDialogStatus}
                  secondaryActionText={t('CON_YES')}
                  onRequestClose={() => setCreateCartDialogStatus(false)}
                  onSecondaryButtonClick={() => {

                    dispatch(initializeCartLoader());
                    dispatch(fetchCreateNewCart(sessionId))
                    handleClose()

                    setTimeout(() => {
                      setCreateCartDialogStatus(false)
                    }, 400);
                  }}
                />
              </>

              :
              null
          }
          {/* Render if cart is empty */}
          {!userCartData?.lineCount
            &&
            <EmptyCartContainer>
              <EmptyCartSVG className="primary-icon-1" width="126px" height="148px" />
              <span className="title">{t('TXT_CF_007')}</span>
              <span className="message">Click below button to add products</span>
              <Button
                variant="solid"
                color="critical"
                style={{ padding: "8px 18px" }}
                onClick={() => dispatch(setDefaultScreen({
                  timeLine: {
                    status: false,
                    page: "cart"
                  },
                  addProduct: { status: true },
                  interruptedCart: { status: false }
                }))}
              > <AddSVG width="1.3em" height="1.3em" className="icon" /> <span> {t('CON_ADD_PRODUCTS')} </span></Button>
            </EmptyCartContainer>
          }
          {/* Render if cart is not empty */}
          {
            userCartData?.lineCount > 0
              ?
              <CartItemsContainer>
                {
                  !isMobile &&
                  <CartItemHeader style={{ borderBottom: "0" }}>
                    <span>{t('CON_ITEM')}</span>
                    <span>{t('CON_DELIVERY_DATE')}</span>
                    <span>{t('CON_QUANTITY')}</span>
                    <span>{t('CON_UNIT')}</span>
                    {!webSettings?.showOrderLineValueInclVAT ?
                      <span>{t('CON_AMOUNT')}</span> :
                      <span>{t('COH_TOTAL_AMOUNT_INCL_VAT')}</span>
                    }
                  </CartItemHeader>
                }

                <CartItemList />

              </CartItemsContainer>
              :
              null
          }

        </SectionCard>

        {/* Previous and Next Buttons */}
        <ButtonSwitcher>
          <Link to={HOME}><Button variant="outlined"> <ArrowLeft className="icon" /> <span>{t('CON_CONTINUE_SHOPPING')}</span>  </Button></Link>
          <Button variant="solid" onClick={() => handleTab(2)} disabled={userCartData?.lineCount > 0 ? false : true}> <span>{t('COH_DELIVERY_INFORMATION')}</span> <ArrowRight className="icon" />   </Button>
        </ButtonSwitcher>

      </CartSectionContainer>

      <LoadingOverlay active={loading} />
    </React.Fragment>
  )
}

export default CartSection
