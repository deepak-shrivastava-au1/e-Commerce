import React, { useEffect, useState } from "react";
import Button from "@common/Button";
import ScrollToTop from "@common/ScrollToTop";
import { Mail, ThankYouSVG, PrintSVG, Close } from "@icons";
import { getCloseCartSuccess } from "@slices/cart/getCloseCart";
import { alignCenter, respondTo } from "@utilities/styled-components";
import { rgba, cssVar } from "polished";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useHistory } from "react-router-dom";
import styled from "styled-components";
import { setDefaultScreen } from "@slices/cart/getTemporaryOrderData";
import { ORDERHISTORY, ORDERRECEIPT, HOME } from "@constants/Routes";
import Input from "@common/Input";
import TextArea from "@common/TextArea";
import YouMayLike from "@pages/Promotions/Promotion/YouMayLike";
import { useGetLoggedInUserInfo } from "@hooks";
import {
  fetchPaymentOrderStatus,
  paymentOrderStatusSelector,
} from "@slices/cart/getPaymentOrderStatus";
import LoadingOverlay from "@common/LoadingOverlay";
import {
  fetchGetSalesOrderDetails,
  getSalesOrderDetailsSuccess,
  initializeSalesOrderDetailsLoader,
  salesOrderDetailsSelector,
} from "@slices/cart/getSalesOrderDetails";
import EmailOrderDrawer from "./EmailOrderDrawer";
import { emailOrderDetailsSelector, getEmailOrderDetailsSuccess } from "@slices/cart/getEmailOrderDetails";
import Modal from "@common/Modal";


const ThankYouContainer = styled.div`
  min-height: 81vh;
  ${alignCenter}
  flex-direction: column;
  height: 466px;
  background: var(--white);
  margin-top: 70px;
  margin-bottom: 20px;

  ${respondTo.xs`
    width:100%
  `}
`;
const OrderDetails = styled.div`
  display: flex;
  background-color: ${rgba(cssVar(`--primary-color-4`), 0.1)};
  padding: 24px 22px;
  margin-bottom: 25px;
  border-radius: var(--border-radius);

  ${respondTo.xs`
    flex-direction:column;

    >:not(:last-child){
      margin-bottom:16px;
    }
  `}

  ${respondTo.sm`
    flex-direction:row;
    >:not(:last-child){
      margin-bottom:0;
    }
  `}

  .order_details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;

    &_title {
      color: var(--primary-color-3);
      margin-bottom: 5px;
    }

    &_value {
      font-weight: var(--font-weight-medium);
      font-size: calc(var(--base-font-size) + 2px);
      line-height: 21.79px;
    }
  }

  > :not(:last-child) {
    margin-right: 90px;
  }
`;
const ActionsContainer = styled.div`
  width: 450px;
  display: flex;
  justify-content: space-between;

  ${respondTo.xs`
    width:auto;
    flex-direction:column;

    >:not(:last-child){
      margin-bottom:25px;
    }
  `}

  ${respondTo.sm`
    width:450px;

    flex-direction:row;
  
    >:not(:last-child){
      margin-bottom:0;
    }
  `}

  >div,a {
    display: flex;
    align-items: center;
    font-weight: var(--font-weight-medium);
    font-size: calc(var(--base-font-size) + 2px);
    color: var(--primary-color-3);
    > svg {
      margin-right: 10px;
    }
  }
`;
const Title = styled.p`
  font-weight: var(--font-weight-bold);
  margin-bottom: 8px;
  line-height: 49.03px;

  ${respondTo.xs`
    font-size:calc(var(--base-font-size) + 16px);
  `}

  ${respondTo.sm`
    font-size:calc(var(--base-font-size) + 22px);
  `}
`;
const Message = styled.p`
  font-size: calc(var(--base-font-size) + 2px);
  color: var(--primary-color-3);
  margin-bottom: 27px;
`;
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;

  ${respondTo.xs`
    width:90%;
  `}

  ${respondTo.sm`
    width:73%;
  `}
`;
const ButtonSwitcher = styled.div`
  display: flex;
  justify-content: flex-end;

  ${respondTo.xs`
    flex-direction:column;
  `}

  ${respondTo.sm`
    flex-direction:row;
  `}
`;

function Index() {

  const { t } = useTranslation();

  const path = useLocation();

  const { data: paymentOrderStatus, loading } = useSelector(paymentOrderStatusSelector);

  const { loading: isEmailOrderDetailsLoading, data: emailOrderDetailsData } = useSelector(emailOrderDetailsSelector);

  const history = useHistory();

  const orderNumber = parseInt(path.pathname.split("/")[4]);

  const paymentMethod = path.pathname.split("/")[2] //"INVOICE" | "ONLINE"

  const { data: salesOrderDetails, loading: isSalesOrderLoading } = useSelector(salesOrderDetailsSelector);

  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const sessionId = useGetLoggedInUserInfo()?.sessionId;

  useEffect(() => {
    dispatch(
      setDefaultScreen({
        timeLine: { status: true, page: "cart" },
        addProduct: { status: false },
        interruptedCart: { status: false }
      })
    );
  }, [dispatch]);

  // fetch payment status
  useEffect(() => {
    dispatch(initializeSalesOrderDetailsLoader());
    dispatch(fetchGetSalesOrderDetails(sessionId, orderNumber));

    if (paymentMethod === "ONLINE") {
      dispatch(fetchPaymentOrderStatus(sessionId, orderNumber));
    }

    return () => {
      dispatch(getCloseCartSuccess(undefined));
      dispatch(getSalesOrderDetailsSuccess(null));
      dispatch(getEmailOrderDetailsSuccess([]))
    };
  }, []);

  return (
    <>
      <div className='d-flex align-items-center justify-content-center'>
        <LoadingOverlay active={isSalesOrderLoading || loading || isEmailOrderDetailsLoading} />
        <ScrollToTop />
        <MainContainer>
          <ThankYouContainer>
            <ThankYouSVG
              className='primary-icon-1'
              width='141px'
              height='110px'
            />

            <Title>{t("TXT_OE_006")}</Title>

            <Message>Your order has been recieved and assigned.</Message>

            <OrderDetails>
              <div className='order_details'>
                <span className='order_details_title'>
                  {t("TXT_PAGE_TITLE_ORDER")}
                </span>
                <span className='order_details_value'>{paymentMethod === "INVOICE" ? orderNumber : paymentOrderStatus?.orderNumber}</span>
              </div>
              <div className='order_details'>
                <span className='order_details_title'>
                  {t("CON_ORDER_STATUS")}
                </span>
                <span className='order_details_value'>{paymentMethod === "INVOICE" ? t('MSG_SUCCESS') : paymentOrderStatus?.orderNumber?.length > 0 ? t('MSG_SUCCESS') : t('MSG_FAIL')}</span>
              </div>
              {
                paymentMethod !== 'INVOICE' ?
                  <div className='order_details'>
                    <span className='order_details_title'>
                      {t("CON_TRANSACTION_ID")}
                    </span>
                    <span className='order_details_value'>{paymentOrderStatus?.transactionId}</span>
                  </div>
                  :
                  null
              }

            </OrderDetails>

            <ActionsContainer>
              {!salesOrderDetails &&
                typeof salesOrderDetails?.messageCode !== "number" ? null : (
                <>
                  <Link
                    to={`${ORDERRECEIPT}?orderNumber=${paymentMethod === "INVOICE" ? orderNumber : paymentOrderStatus?.orderNumber}`}
                    target='_blank'
                  >
                    <PrintSVG className='primary-icon-3 icon-lg' />
                    {t("CON_VIEW_PRINT_ORDER_RECEIPT")}
                  </Link>
                  <div
                    onClick={() => setIsOpen(true)}
                    style={{ cursor: "pointer" }}
                  >
                    <Mail className='primary-icon-3 icon-lg' />
                    {t("CON_EMAIL_ORDER_DETAILS")}
                  </div>
                </>
              )}
            </ActionsContainer>
          </ThankYouContainer>
          <ButtonSwitcher>
            <Link to={`/orderhistory/${paymentMethod === "INVOICE" ? orderNumber : paymentOrderStatus?.orderNumber}`}>
              <Button variant='outlined'> {t("CON_VIEW_ORDERS")} </Button>
            </Link>
            <Button
              style={{ marginLeft: "8px" }}
              onClick={() => history.push(HOME)}
            >
              {t("CON_CONTINUE_SHOPPING")}
            </Button>
          </ButtonSwitcher>

          <EmailOrderDrawer {...{ isOpen, setIsOpen, orderNumber: paymentMethod === "INVOICE" ? orderNumber : paymentOrderStatus?.orderNumber }} />

        </MainContainer>
        <Modal
          isAlert
          title={t('CON_STATUS_EMAIL_SENT')}
          isOpen={emailOrderDetailsData?.[0]?.messageCode === 4100}
          hasCancelButton={false}
          onRequestClose={() => {
            dispatch(getEmailOrderDetailsSuccess([]))
          }}
          secondaryActionText={t('CON_OK')}
          onSecondaryButtonClick={() => {
            dispatch(getEmailOrderDetailsSuccess([]))
          }}
        />
      </div>
      <YouMayLike page='OrderConf' orderNum={paymentMethod === "INVOICE" ? orderNumber : paymentOrderStatus?.orderNumber} />
    </>
  );
}

export default Index;