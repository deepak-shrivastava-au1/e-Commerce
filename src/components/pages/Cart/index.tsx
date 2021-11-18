import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import TimeLineContainer from "@fragments/HorizontalTimeline"
import ShoppingCart from "./ShoppingCart"
import DeliveryOption from "./DeliveryOption"
import { useTranslation } from "react-i18next";
import { CheckSVG } from "@icons"
import { respondTo } from '@utilities/styled-components';
import { UserCartCtxProvider } from "@providers/UserCartCtxProvider";
import AddProduct from "./ProductAdd"
import { cartSelector } from '@slices/cart/getTemporaryOrderData';
import { useSelector } from 'react-redux';
import ReviewAndPayment from "./Payment"
import InterruptedCart from './InterruptedCart'
import Breadcrumb from '@fragments/Breadcrumb';
import { useContext } from 'react';
import { WebSettingsContext } from '@providers/WebsettingsProvider';
import Excel from './Exports/Excel';
import PDF from './Exports/PDF';

const ProductCartContainer = styled.div`
  padding: 0px;

  .MuiBreadcrumbs-ol{
    margin-bottom:30px;
    margin-left:-10px;
  }

  ${respondTo.xs`
    padding: 0px;
  `}

  ${respondTo.md`
    padding: 0px;
  `}
`
const TimeLineHeader = styled.div`
  display: flex; 
  justify-content: space-between;
  position:relative;

  ${respondTo.xs`
    flex-direction:column;
    .exports_container{
      display:flex;
      margin-top:10px;
      justify-content:flex-end;
    }
    `}

  ${respondTo.sm`
    flex-direction:row;
    .exports_container{
      display:block;
      top:0;
      right:0
      position:absolute;
      margin-top:-10px;
    }
  `}
`

interface Props { }

function Index(props: Props) {

  const { } = props

  const { t } = useTranslation();

  const { defaultScreen }: any = useSelector(cartSelector);

  const orderCounts = useSelector(cartSelector)?.cartItems?.lineCount;

  const webSettings = useContext(WebSettingsContext)

  const [displayTitleAsNumber, setDisplayTitleAsNumber] = useState({ cart: true, delivery: false, payment: false })

  // INFO Hook to display digit or Tick SVG vice-versa on marker for timeline component 
  useEffect(() => {
    if (defaultScreen["timeLine"]["page"] === 'cart') {
      setDisplayTitleAsNumber({ delivery: true, cart: true, payment: true })
    } else if (defaultScreen["timeLine"]["page"] === 'delivery') {
      setDisplayTitleAsNumber({ cart: false, delivery: true, payment: true })
    } else if (defaultScreen["timeLine"]["page"] === 'payment') {
      setDisplayTitleAsNumber({ cart: false, delivery: false, payment: true })
    }
  }, [defaultScreen["timeLine"]["page"]])

  return (
    <div className="cart-main-wrap-pos r-m-l r-m-r r-m-b">
      <UserCartCtxProvider>
        <ProductCartContainer>
          <Breadcrumb />
          {defaultScreen?.["timeLine"]["status"] ?
            <div className="row">
              <div className="col-lg-12 timline-pos">
                <TimeLineContainer>
                  <TimeLineHeader>
                    <div className="timeline_container">
                      <TimeLineContainer.Panel title-data={`${t('CON_SHOPPINGCART')}`} for_={1}>
                        {displayTitleAsNumber["cart"] ? '1' : <CheckSVG className="primary-icon-1" />}
                      </TimeLineContainer.Panel>

                      <TimeLineContainer.Panel title-data={`${t('CON_DELIVERY_INFORMATION')}`} for_={2}>
                        {displayTitleAsNumber["delivery"] ? '2' : <CheckSVG className="primary-icon-1" />}
                      </TimeLineContainer.Panel>

                      <TimeLineContainer.Panel title-data="Payment & confirm Order" for_={3}>
                        {displayTitleAsNumber["payment"] ? '3' : <CheckSVG className="primary-icon-1" />}
                      </TimeLineContainer.Panel>
                    </div>

                    {orderCounts > 0 ?
                      <div className="exports_container icon-hr">
                        {webSettings?.showPdfIcon ? <PDF /> : null}
                        {webSettings?.showExcelIcon ? <Excel /> : null}
                      </div>
                      : null
                    }

                  </TimeLineHeader>

                  {/* INFO SHOPPING CART CONTENT */}
                  <TimeLineContainer.Content for_={1}>
                    <ShoppingCart />
                  </TimeLineContainer.Content>

                  {/* DELIVERY INFORMATION CONTENT */}
                  <TimeLineContainer.Content for_={2}>
                    <DeliveryOption />
                  </TimeLineContainer.Content>

                  {/* REVIEW AND ORDER CONTENT */}
                  <TimeLineContainer.Content for_={3}>
                    <ReviewAndPayment />
                  </TimeLineContainer.Content>

                </TimeLineContainer>
              </div>
            </div>
            :
            null
          }
          {
            defaultScreen?.["addProduct"]["status"] ? <AddProduct /> : null
          }
          {
            defaultScreen?.["interruptedCart"]["status"] ? <InterruptedCart /> : null
          }
        </ProductCartContainer>
      </UserCartCtxProvider>
    </div>
  )
}

export default Index
