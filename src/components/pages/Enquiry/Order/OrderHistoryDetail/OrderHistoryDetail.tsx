import { useParams, useHistory } from "react-router-dom";
import LeftNevigation from "../OrderHistory/LeftNevigation";
import { Fragment, useEffect, useState, useContext,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  ArrowLeft,
  ExpandMore,
  Mail,
  CartDeleteSVG,
  TrashForModalSVG,
  CloseSVG
} from "@icons";
import { useMediaQuery } from "@material-ui/core";
import { breakpoints } from "@constants/styled-components";
import { useTranslation } from "react-i18next";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { respondTo } from "@utilities/styled-components";
import Modal from "@common/Modal";
import { Link } from "react-router-dom";
import SendEnquiry from "@fragments/SendEnquiry";
import OrderBasic from "./OrderBasic";
import OrderInformation from "./OrderInformation";
import OrderStatus from "@pages/Enquiry/Order/OrderHistory/OrderStatus";
import { ORDERHISTORY } from "@constants/Routes";
import LoadingOverlay from "@common/LoadingOverlay";
import { WebSettingsContext } from "@providers/WebsettingsProvider";
import {
  fetchorderhistorydetail,
  deleteorder,
  orderhistorydetailactions,
  orderhistorydetailSelector,
} from "@slices/Enquiry/Order/orderHistoryDetail";
import { useGetLoggedInUserInfo } from "@hooks";
import Breadcrumb from "@fragments/Breadcrumb";
import { getErrorMsgForDeleteOrders } from "@utilities/error/serviceErrorCodeUtil";
import PDF from "./Exports/PDF";

const OrderHistoryContainer = styled.aside`
  display: flex;

  ${respondTo.xs`
      padding: 0px 0px;
    `}
  ${respondTo.sm`
     padding: 0px 0px;
    `}
      ${respondTo.md`
     padding: 0px 0px;
    `}
`;

const OrderHistorySection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0 0 0 0px;
  flex-grow: 1;
  > :not(:last-child) {
    margin-bottom: 14px;
  }

  ${respondTo.xs`
      padding: 0;
    `}
  ${respondTo.sm`
     padding: 0;
    `}
      ${respondTo.md`
    padding: 0 0 0 0px;
    `}
`;

const OrderHistoryDetail = () => {
  const params = useParams<any>();
  const history = useHistory();
  const sessionId = useGetLoggedInUserInfo()?.sessionId;
  const dispatch = useDispatch();
  const [deleteDialogStatus, setDeleteDialogStatus] = useState<boolean>(false);
  const [isEnquiryDrawerOpen, setIsEnquiryDrawerOpen] =
    useState<boolean>(false);
   const isModalRef = useRef(false);
  const webSettings: any = useContext(WebSettingsContext);
  const state = useSelector(orderhistorydetailSelector);
  const orderdetail = state?.orderHistoryDetail.orderdetail;
  const loading = state?.orderHistoryDetail?.loading;
  const hasError = state?.orderHistoryDetail?.hasErrors;
  
  useEffect(() => {
    if (sessionId) {
      dispatch(orderhistorydetailactions.intitalizeLoader());
      dispatch(fetchorderhistorydetail(sessionId, params.ordernumber));
    }
  }, [sessionId, params.ordernumber]);


  const deleteOrder = () => {
    dispatch(orderhistorydetailactions.intitalizeLoader());
    dispatch(deleteorder(sessionId, orderdetail?.orderNumber));
    setTimeout(() => {
      setDeleteDialogStatus(false);
    }, 1000);
 
   
  };

  // hook to avoid redirection when order delete fails
  useEffect(() => {
    if(!isModalRef.current){
      isModalRef.current=true;
      return;
    }
    if(!state?.orderHistoryDetail?.hasErrors){
      history.replace(ORDERHISTORY);
   }
  }, [state?.orderHistoryDetail?.hasErrors]);

  const isMobile = useMediaQuery(`(min-width:${breakpoints.md})`);
  const { t, i18n } = useTranslation();
  return (
    <Fragment>
      <div className="content-area">
        <Breadcrumb />
        <OrderHistoryContainer>
          {isMobile && <LeftNevigation />}
          <OrderHistorySection>
          {/* <div className="row page-header">
              <div className="col-lg-6 left-section"></div>
              <div className=" col-lg-6 right-section">
                <ul className="list-inline">
                  <li className="list-inline-item p-r-5">
                    {webSettings?.showPdfIcon ? <PDF /> : null}
                  </li>
                 
                </ul>
              </div>
            </div> */}
            <div className="row page-header">
              <div className="col-lg-6 left-section">
                {/* <h2>
                  <Link to={ORDERHISTORY}>
                    <ArrowLeft className="primary-icon-2 m-r-10" />
                  </Link>
                  <span>
                    #{t("CON_ORDER")} : {orderdetail?.orderNumber}
                  </span>
                </h2> */}
              </div>
              <div className="col-lg-6 right-section">
                <ul className="list-inline icons-hr">
                  {!isMobile && (
                    <li className="list-inline-item float-left">
                      <OrderStatus
                        orderstatus={orderdetail?.orderStatus}
                        isOrderHeldFlag={false}
                      />
                    </li>
                  )}
                
                  <li className="list-inline-item">
                    <SendEnquiry
                      status={isEnquiryDrawerOpen}
                      subject={`Order # ${orderdetail?.orderNumber}`}
                      email={webSettings?.userEmail}
                    />
                    <Mail
                      className="primary-icon-2 icon-lg"
                      onClick={() =>
                        setIsEnquiryDrawerOpen((prevState) => !prevState)
                      }
                    />
                  </li>

                  {orderdetail?.isDeleteAllowedFlag && (
                    <li className="list-inline-item">
                       <CartDeleteSVG className="primary-icon-2"
                        onClick={() => setDeleteDialogStatus(true)}
                      />
                    </li>
                  )}
                    <li className="list-inline-item">
                    {webSettings?.showPdfIcon ? <PDF /> : null}
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <Modal
                isAlert
                icon={<TrashForModalSVG className="primary-icon-1"/>}
                title="Want to Delete ?"
                message="Are you sure you want to delete this ?"
                isOpen={deleteDialogStatus}
                onRequestClose={() => setDeleteDialogStatus(false)}
                onSecondaryButtonClick={deleteOrder}
                secondaryActionText={t("CON_DELETE")}
              />
            </div>

            <div className="card-table-detail">
              <Accordion className="custom-accordian" defaultExpanded={true}>
                <AccordionSummary expandIcon={<ExpandMore className="primary-icon-3 icon-md"/>}>
                  <div className="d-flex w-100">
                    <div>
                      <h3>{t("CON_BASIC_INFORMATION")}</h3>
                    </div>
                    {isMobile && (
                      <div className="ml-auto">
                        <OrderStatus
                          orderstatus={orderdetail?.orderStatus}
                          isOrderHeldFlag={false}
                        />
                      </div>
                    )}
                   
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <OrderBasic orderdetail={orderdetail} />
                </AccordionDetails>
              </Accordion>
              <Accordion className="custom-accordian">
                <AccordionSummary expandIcon={<ExpandMore className="primary-icon-3 icon-md"/>}>
                  <h3>{t("CON_ORDER_INFORMATION")}</h3>
                </AccordionSummary>
                <AccordionDetails>
                  <OrderInformation orderdetail={orderdetail} />
                </AccordionDetails>
              </Accordion>
              <Accordion className="custom-accordian">
                <AccordionSummary expandIcon={<ExpandMore className="primary-icon-3 icon-md"/>}>
                  <h3>{t("CON_ADDRESSES")}</h3>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="order-address">
                    <div className="flex-fill">
                    <div className="card m-tb-15 m-l-15 p-10">
                        <div className="cust-label">{t("CON_CONFIRMATION_ADDRESS")}</div>
                        <div
                          className="cust-value"
                          dangerouslySetInnerHTML={{
                            __html: orderdetail?.confAddress,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex-fill">
                      <div className="card m-tb-15 m-l-15 p-10">
                        <div className="cust-label">{t("CON_DELIVERY_ADDRESS")}</div>
                        <div
                          className="cust-value"
                          dangerouslySetInnerHTML={{
                            __html: orderdetail?.delAddress,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          </OrderHistorySection>
        </OrderHistoryContainer>
      </div>
      <LoadingOverlay active={loading} />
      {state?.orderHistoryDetail?.hasErrors && 
      <Modal
        isAlert
        icon={<div className="icon-fail"><CloseSVG className="icon" /></div>}
        title={t('CON_DELETE_ORDER')}
        message={t(getErrorMsgForDeleteOrders(state?.errorCode))}
        isOpen={true}
        hasCancelButton={false}
        onRequestClose={() => {
          dispatch(orderhistorydetailactions.setHasError(false));
          dispatch(orderhistorydetailactions.setErrorCode(''));
        }}
        secondaryActionText={'ok'}
        onSecondaryButtonClick={() => {
          dispatch(orderhistorydetailactions.setHasError(false));
          dispatch(orderhistorydetailactions.setErrorCode(''));
        }}
      />}
    </Fragment>
  );
};

export default OrderHistoryDetail;
