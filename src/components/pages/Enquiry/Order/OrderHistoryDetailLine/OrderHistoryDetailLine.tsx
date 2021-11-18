import { Fragment, useContext } from "react";
import { useParams } from "react-router-dom";
import LeftNevigation from "../OrderHistory/LeftNevigation";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { respondTo } from "@utilities/styled-components";
import styled from "styled-components";
import { useDispatch,useSelector } from "react-redux";
import Breadcrumb from "@fragments/Breadcrumb";
import { useMediaQuery } from "@material-ui/core";
import { breakpoints } from "@constants/styled-components";
import { alignCenter } from "@utilities/styled-components";
import altImage from "@images/awaited_image.png";
import { WebSettingsContext } from "@providers/WebsettingsProvider";
import ShipmentTracking from "./ShipmentTracking";
import { BASE_URL_IMAGE } from '@routers/AppRoute';
import * as ROUTES from '@constants/Routes';
import {
  fetchorderhistorydetail,
  deleteorder,
  orderhistorydetailactions,
  orderhistorydetailSelector,
} from "@slices/Enquiry/Order/orderHistoryDetail";

const OrderHistoryContainer = styled.aside`
  display: flex;
  ${respondTo.xs`
      padding: 5px 10px;
    `}
  ${respondTo.sm`
     padding: 5px 10px;
    `}
      ${respondTo.md`
     padding: 10px 0px;
    `}
`;

const OrderHistorySection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0 0 0 24px;
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
    padding: 0 0 0 24px;
    `}
`;

const ImageWrapper = styled.div`
  ${alignCenter}
  padding:5px;
  width: 60px;
  height: 60px;
  border: var(--thin-border) var(--form-base-color);
  border-radius: var(--border-radius);
  margin-right: 10px;

  > img {
    object-fit: cover;
    width: 100%;
  }
`;

const OrderHistoryDetailLine = () => {
  const { t, i18n } = useTranslation();
  const params = useParams<any>();
  
  const state = useSelector(orderhistorydetailSelector);
  const { ordernumber, linenumber } = params;
  const webSettings: any = useContext(WebSettingsContext);
  const isMobile = useMediaQuery(`(min-width:${breakpoints.md})`);
 

  const linedetail =
    state?.orderHistoryDetail?.orderdetail?.orderLineList?.find(
      (item: any) => item.lineNumber === linenumber
    );

 
  return (
    <Fragment>
      <div className="content-area">
        <Breadcrumb />
        <OrderHistoryContainer>
          {isMobile && <LeftNevigation />}
          <OrderHistorySection>
            {/* <div className="row page-header">
              <div className="col-lg-6 left-section">
                <h2>
                  <Link to={`/orderhistory/${ordernumber}`}>
                    <ArrowLeft className="primary-icon-2 m-r-10" />
                  </Link>
                  <span>{t("CON_ORDER_LINE_INFORMATION")}</span>
                </h2>
              </div>
            </div> */}
            <div className="d-flex flex-column  w-100">
              <div className="custom-accordian">
                <div className="card-table-detail-basic card-table-lines">
                  <div className="card-table">
                    <div className="card-tbody">
                      <div className="d-flex row row-border">
                        <div className="p-2 mr-auto">
                          <h3>
                            {t("COH_LINE")} {linedetail?.lineNumber}
                          </h3>
                        </div>
                        <div className="p-2 cust-label">
                          #{t("CON_ORDER")}: {ordernumber}
                        </div>
                      </div>
                      <div className="row row-border">
                        <div className="col-md-1 col-2 align-self-start">
                          <ImageWrapper>
                            <img
                              src={`${BASE_URL_IMAGE}${linedetail?.imageUrl}`}
                              alt="orderImg"
                              onError={(e: any) => {
                                e.target.onerror = null;
                                e.target.src = altImage;
                              }}
                            />
                          </ImageWrapper>
                        </div>
                        <div className="col-md-6 col-8 align-self-start">
                         <div className="cust-label">
                         <Link to={`${ROUTES.DETAILS}/${linedetail?.itemCode}`}>
                            {linedetail?.itemDescription}
                            </Link>
                          </div>
                          <div className="cust-label">
                          <Link to={`${ROUTES.DETAILS}/${linedetail?.itemCode}`}>
                                         {linedetail?.itemCode}
                                         </Link>
                          </div>
                        </div>

                        <div className="col-md-5 col-6 align-self-start">
                          <div className="cust-label">
                                 {t("CON_LINE_TEXT")}
                          </div>
                          <div className="cust-value">-</div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-3 col-6 align-self-start ">
                          <div className="cust-label">
                                   {t("CON_WAREHOUSE")}
                          </div>
                          <div className="cust-value">
                            {linedetail?.warehouse}
                          </div>
                        </div>
                        <div className="col-md-3 col-6 align-self-start">
                          <div className="cust-label"> {t("COH_STATUS")}</div>
                          <div className="cust-value">
                                   {linedetail?.status}
                          </div>
                        </div>
                        <div className="col-md-3 col-6 align-self-start">
                          <div className="cust-label">
                                     {t("CON_BACKLOGGED")}
                          </div>
                          <div className="cust-value">
                                         {linedetail?.backlogged}
                          </div>
                        </div>
                        <div className="col-md-3 col-6 align-self-start">
                          <div className="cust-label"> {t("COH_UNIT")}</div>
                          <div className="cust-value"> {linedetail?.unit}</div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-3 col-6 align-self-start">
                          <div className="cust-label">
                                     {t("CON_ORDER_QUANTITY")}
                          </div>
                          <div className="cust-value">
                            {linedetail?.ordered}
                          </div>
                        </div>
                        <div className="col-md-3 col-6 align-self-start">
                          <div className="cust-label">
                                {t("CON_CONFIRMED_QUANTITY")}
                          </div>
                          <div className="cust-value">
                                              {linedetail?.confirmed}
                          </div>
                        </div>
                        <div className="col-md-3 col-6 align-self-start">
                          <div className="cust-label">
                            {t("CON_DISCOUNTED_PRICE_EXCL_VAT")}{" "}
                          </div>
                          <div className="cust-value">
                                      {linedetail?.totalExclVAT}/ {linedetail?.unit}
                          </div>
                        </div>
                        <div className="col-md-3 col-6 align-self-start">
                          <div className="cust-label">
                                 {t("COH_ACTUAL_PRICE")}
                          </div>
                          {webSettings?.isShowPrice && (
                            <div className="cust-value">
                                                {linedetail?.actualPrice}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-3 col-6 align-self-start">
                          <div className="cust-label">
                                   {t("CON_TOTAL_DISCOUNT")}
                          </div>
                          <div className="cust-value">
                                        {linedetail?.discountTotal}{" "}
                          </div>
                        </div>
                        <div className="col-md-3 col-6 align-self-start">
                          <div className="cust-label">
                                           {t("CON_TOTAL_EXCLUDING_VAT")}
                          </div>
                          <div className="cust-value">
                                          {linedetail?.totalExclVAT}
                          </div>
                        </div>
                        <div className="col-md-3 col-6 align-self-start">
                          <div className="cust-label"> {t("CON_VAT")}</div>
                          <div className="cust-value">
                                     {linedetail?.vatAmount}
                          </div>
                        </div>
                        <div className="col-md-3 col-6 align-self-start">
                          <div className="cust-label">
                                          {t("CON_TOTAL_INCLUDING_VAT")}
                          </div>
                          <div className="cust-value">
                                         {linedetail?.totalInclVAT}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex flex-column  w-100">
              <div className="custom-accordian">
                <div className="card-table-detail-basic card-table-lines ">
                  <div className="card-table">
                    <div className="card-tbody">
                      <div className="d-flex row row-border">
                        <div className="p-2 mr-auto">
                          <h3> {t("CON_SHIPMENT_INFORMATION")}</h3>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-3 col-6 align-self-start">
                          <div className="cust-label">
                           {t("CON_REQUESTED_DELIVERY_TIME")}
                          </div>
                          <div className="cust-value">
                            {linedetail?.reqDeliveryTime}
                          </div>
                        </div>
                        <div className="col-md-3 col-6 align-self-start">
                          <div className="cust-label">
                             {t("CON_DELIVERY_TIME")}
                          </div>
                          <div className="cust-value">
                           {linedetail?.delDate}
                          </div>
                        </div>
                        <div className="col-md-3 col-6 align-self-start">
                          <div className="cust-label">
                             {t("CON_CONFIRMED_DATE")}
                          </div>
                          <div className="cust-value">
                            {linedetail?.confirmedDate}
                          </div>
                        </div>
                        <div className="col-md-3 col-6 align-self-start">
                          <div className="cust-label">
                            {t("COH_SHIPMENT_MARKING")}
                          </div>
                          <div className="cust-value">
                            {linedetail?.shipmentMarking}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-3 col-6 align-self-start">
                          <div className="cust-label">
                                   {t("CON_GROSS_WEIGHT")}
                          </div>
                          <div className="cust-value">
                            {linedetail?.grossWeight}
                          </div>
                        </div>
                        <div className="col-md-3 col-6 align-self-start">
                          <div className="cust-label">
                                       {t("COH_NET_WEIGHT")}
                          </div>
                          <div className="cust-value">
                                         {linedetail?.netWeight}
                          </div>
                        </div>
                        <div className="col-md-3 col-6 align-self-start">
                          <div className="cust-label">
                                             {t("CON_GROSS_VOLUME")}
                          </div>
                          <div className="cust-value">
                                                     {linedetail?.grossVolume}
                          </div>
                        </div>
                        <div className="col-md-3 col-6 align-self-start">
                          <div className="cust-label">
                                        {t("CON_NET_VOLUME")}
                          </div>
                          <div className="cust-value">
                                          {linedetail?.netVolume}
                          </div>
                        </div>
                      </div>
                      {state?.orderHistoryDetail?.orderdetail
                        ?.shipmentTrackingDataAvailable && 
                        (linedetail?.shipmentTrackingNumberList?.map(
                          (item: any) => {
                            return(<div>
                              <ShipmentTracking shipmentdata ={item} />
                             </div>)
                          }
                        ))
                        }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </OrderHistorySection>
        </OrderHistoryContainer>
      </div>
     
    </Fragment>
  );
};

export default OrderHistoryDetailLine;
