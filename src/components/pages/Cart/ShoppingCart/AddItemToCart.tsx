import React, { Fragment, useEffect, useContext } from 'react'
import styled from "styled-components"
import { useDispatch, useSelector } from 'react-redux';
import { cartSelector, } from "@slices/cart/getTemporaryOrderData";
import { useTranslation } from "react-i18next";
import { BASE_URL_IMAGE } from '@routers/AppRoute';
import { alignCenter } from '@utilities/styled-components'
import altImage from '@images/awaited_image.png';
import Drawer from '@fragments/SideBoard';
import { addToCartSelector } from "@slices/cart/addToCart";
import { addToCartActions } from "@slices/cart/addToCart";
import Modal from "@common/Modal";
import { CloseSVG } from "@icons";
import { getErrorMsgForShoppingCart } from "@utilities/error/serviceErrorCodeUtil";
import { WebSettingsContext } from '@providers/WebsettingsProvider'
import { IuserWebSettings } from '@constants/interfaces/userWebSettings'
import LoadingOverlay from "@common/LoadingOverlay";

const CartDetail = styled.div`
	.add-to-cart{
		padding: 20px;
	}
	.add-to-cart .cust-row{
		padding-bottom: 45px;
	}
	.add-to-cart .cust-label{
		color: var(--primary-color-3);
		display: none;
		font-size: 12px;
		padding-bottom: 10px;
	}
	.add-to-cart .cust-row:first-child .cust-label, .add-to-cart .cust-row:last-child .cust-label{
		display: block;
  }
  	.add-to-cart .col-w-3{
		width: 250px;
	}
	.add-to-cart .col-w-1{
    width: 100px;
	}
	.add-to-cart .col-w-2{
    	padding-right:15px;
    	width: 150px;
	}
	.add-to-cart .cust-row:nth-last-child(2){
		border-bottom: var(--thin-border) var(--border-color);
		margin-bottom: 16px;
  }
  	.add-to-cart .text-align{
		text-align: right;
  	}
  	.add-to-cart .text-mid-or-left{
		text-align: center;
	}
  @media screen and (max-width: 576px) {
    
	.add-to-cart .cust-flex-column {
		flex-direction: column;
	}
	.add-to-cart .cust-row{
		border-bottom: var(--thin-border) var(--border-color);
		margin-bottom: 16px;
		padding-bottom: 16px;
	}
	.add-to-cart .cust-row:last-child{
		border-bottom: var(--no-border) var(--border-color);
	}
	.add-to-cart .text-align{
		text-align: right;
  }
  	.add-to-cart .text-mid-or-left{
		text-align: left !important;
	}
	.add-to-cart .cust-spacing{
		padding-bottom: 16px;
	}
	.add-to-cart .cust-label{
		display: block;
	}
	.add-to-cart .col-w-1{
    	width: 100%;
	}
	.add-to-cart .col-w-2{
   		width: 100%;
  	}
  	.add-to-cart .col-w-3{
		width: 100%;
	}
}
`

const ImageWrapper = styled.div`
	${alignCenter}

	border-radius:var(--border-radius);
	border:var(--thin-border) var(--form-base-color);
	height:60px;
	width:80px;
	>img{
		object-fit: cover;
		width:100%;
	}
`



const AddItemToCart: React.FC<{ status: boolean, onClose: Function }> = (props) => {
  
  const isAddToCart = useSelector(addToCartSelector)?.isCompleted;
  const webSettings: IuserWebSettings | null = useContext(WebSettingsContext);
  const addToCartErrorCode = useSelector(addToCartSelector)?.messageCode;
  

  const cartItems = useSelector(cartSelector)?.cartItems;
  
  const { t } = useTranslation();
  
  const dispatch = useDispatch();

  useEffect(() => {
    let addToCartTimer: any;
    if(isAddToCart && addToCartErrorCode === 0){
      if (props.status === true) {
        addToCartTimer = setTimeout(() => {
          props.onClose(false)
        }, 12000)
      }
    }
      
    if (props.status === false) {
      dispatch(addToCartActions.setCompleted(false));
      dispatch(addToCartActions.setMessageCode(0));
      clearTimeout(addToCartTimer);
    }

  }, [props.status, isAddToCart, dispatch])

  return (
    <Fragment>
       <LoadingOverlay active={!isAddToCart && props.status} />
      { isAddToCart && addToCartErrorCode === 0 &&
        <Drawer drawerHeader={t('CON_CART_ITEMS')} anchor='right' status={props.status} onClose={props.onClose}>
          <CartDetail>
            <div className="add-to-cart">

              {cartItems?.lineCount>0 && Object.values(cartItems?.orderLines).map((order: any, i: number) =>


                <div className="cust-row d-flex cust-flex-column">
                  <div className="flex-grow-1 cust-spacing col-w-3">
                    <div className="d-flex flex-column">
                      <div className="flex-fill text-uppercase cust-label">{t('CON_ITEM')}</div>

                      <div className="flex-fill">
                        <div className="float-left m-r-10"> 
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
                        </div>
                        <div >{order.ivOrderLine.itemDescription}</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="d-flex">
                      <div className="col-w-1">
                        <div className="d-flex flex-column text-mid-or-left">
                          <div className="flex-fill text-uppercase cust-label">{t('CON_QUANTITY')}</div>
                          <div className="flex-fill font-weight-bold ">{order?.ivOrderLine?.orderedQuantity}</div>
                        </div>
                      </div>
                      <div className="col-w-2">
                        <div className="d-flex flex-column text-align">
                          <div className="flex-fill text-uppercase cust-label">{t('CON_SUB_TOTAL')}{" (" + webSettings?.currencyCode + ")"}</div>
                          <div className="flex-fill font-weight-bold">{order?.ivOrderLine?.lineNetVal}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}


              <div className="cust-row d-flex cust-flex-column justify-content-end">
                <div>
                  <div className="d-flex">
                    <div className="col-w-1">
                      <div className="d-flex flex-column text-mid-or-left">
                        <div className="flex-fill cust-label">{t('CON_ITEMS')}</div>
                        <div className="flex-fill font-weight-bold">{cartItems?.lineCount}</div>
                      </div>
                    </div>
                    <div className="col-w-2">
                      <div className="d-flex flex-column text-align">
                        <div className="flex-fill cust-label">{t('CON_GRAND_TOTAL')}</div>
                        <div className="flex-fill font-weight-bold">
                          {webSettings?.isShowCurrencySymbolBefore ? 
                          webSettings?.currencyCode + " " + cartItems?.nsOrderValueInfo?.emLineNet 
                          : cartItems?.nsOrderValueInfo?.emLineNet + " " + webSettings?.currencyCode }</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </CartDetail>
        </Drawer>}
      {isAddToCart && addToCartErrorCode !== 0 && 
      <Modal
        isAlert
        icon={<div className="icon-fail"><CloseSVG className="icon" /></div>}
        title={t(getErrorMsgForShoppingCart(addToCartErrorCode))}
        message={t('MSG_ITEM_ADDED_TO_CART_FAIL')}
        isOpen={true}
        hasCancelButton={false}
        onRequestClose={() => {
          props.onClose(false);
          dispatch(addToCartActions.setCompleted(false));
          dispatch(addToCartActions.setMessageCode(0));
        }}
        secondaryActionText={'ok'}
        onSecondaryButtonClick={() => {
          props.onClose(false);
          dispatch(addToCartActions.setCompleted(false));
          dispatch(addToCartActions.setMessageCode(0));
        }}
      />}
    </Fragment>
  )
}

export default AddItemToCart
