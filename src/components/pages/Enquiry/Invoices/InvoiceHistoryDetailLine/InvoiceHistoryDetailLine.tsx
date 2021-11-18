import { Fragment, useContext } from "react";
import { useParams,useLocation } from "react-router-dom";
import LeftNevigation from "@pages/Enquiry/Order/OrderHistory/LeftNevigation";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { respondTo } from "@utilities/styled-components";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Breadcrumb from "@fragments/Breadcrumb";
import { useMediaQuery } from "@material-ui/core";
import { breakpoints } from "@constants/styled-components";
import { alignCenter } from "@utilities/styled-components";
import altImage from "@images/awaited_image.png";
import { WebSettingsContext } from "@providers/WebsettingsProvider";
import { BASE_URL_IMAGE } from "@routers/AppRoute";
import * as ROUTES from "@constants/Routes";
import { invoicehistorydetailSelector } from "@slices/Enquiry/Invoices/invoiceHistoryDetail";

const OrderHistoryContainer = styled.aside`
  display: flex;

  padding: 10px 0px;
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

const InvoiceHistoryDetailLine = () => {
  const { t } = useTranslation();
  const params = useParams<any>();

  const state = useSelector(invoicehistorydetailSelector);
 
  const webSettings: any = useContext(WebSettingsContext);
  const isMobile = useMediaQuery(`(min-width:${breakpoints.md})`);
  const location = useLocation<any>();
  
  const linedetail =
    state?.invoiceHistoryDetail?.invoicedetail?.invoiceLineBeanList?.find(
      (item: any) => item.invoiceLineNumber === location?.state?.linenumber
    );

  return (
    <Fragment>
      <div className="content-area">
        <Breadcrumb />
        <OrderHistoryContainer>
          {isMobile && <LeftNevigation />}
          <OrderHistorySection>
            <div className="d-flex flex-column  w-100">
              <div className="custom-accordian">
                <div className="card-table-detail-basic card-table-lines">
                  <div className="card-table">
                    <div className="card-tbody">
                      <div className="d-flex row row-border">
                        <div className="p-2 mr-auto">
                          <h3>
                            {t("COH_LINE")} {linedetail?.invoiceLineNumber}
                          </h3>
                        </div>
                        <div className="p-2 cust-label">
                          #{t("CON_INVOICE_NUMBER")}: {location?.state?.invoicenumber}
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
                            <Link to={`${ROUTES.DETAILS}/${linedetail?.item}`}>
                              {linedetail?.itemDescription}
                            </Link>
                          </div>
                          <div className="cust-label">
                            <Link to={`${ROUTES.DETAILS}/${linedetail?.item}`}>
                              {linedetail?.item}
                            </Link>
                          </div>
                        </div>

                        <div className="col-md-5 col-6 align-self-start">
                          {/* <div className="cust-label">
                                 {t("CON_LINE_TEXT")}
                          </div>
                          <div className="cust-value">-</div> */}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4 col-6 align-self-start ">
                          <div className="cust-label">{t("CON_WAREHOUSE")}</div>
                          <div className="cust-value">
                            {linedetail?.warehouseDesc}
                          </div>
                        </div>
                        <div className="col-md-4 col-6 align-self-start">
                          <div className="cust-label"> {t("COH_UNIT")}</div>
                          <div className="cust-value"> {linedetail?.unit}</div>
                        </div>
                        <div className="col-md-4 col-6 align-self-start">
                          <div className="cust-label">
                            {t("CON_INVOICE_QUANTITY")}
                          </div>
                          <div className="cust-value">
                            {linedetail?.quantity}
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-4 col-6 align-self-start">
                          <div className="cust-label">
                            {t("CON_TOTAL_EXCLUDING_VAT")}
                          </div>
                          <div className="cust-value">
                            {linedetail?.amountExcludingVAT}
                          </div>
                        </div>
                        <div className="col-md-4 col-6 align-self-start">
                          <div className="cust-label"> {t("CON_VAT")}</div>
                          <div className="cust-value">
                            {linedetail?.VATAmount}
                          </div>
                        </div>
                        <div className="col-md-4 col-6 align-self-start">
                          <div className="cust-label">
                            {t("CON_TOTAL_INCLUDING_VAT")}
                          </div>
                          <div className="cust-value">
                            {linedetail?.amountIncludingVAT}
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
                        <div className="col-md-4 col-6 align-self-start">
                          <div className="cust-label">
                            {t("CON_REQUESTED_DELIVERY_TIME")}
                          </div>
                          <div className="cust-value">
                            {linedetail?.requestedDeliveryTime}
                          </div>
                        </div>
                        <div className="col-md-4 col-6 align-self-start">
                          <div className="cust-label">
                            {t("CON_DELIVERY_TIME")}
                          </div>
                          <div className="cust-value">
                            {linedetail?.deliveryTime}
                          </div>
                        </div>

                        <div className="col-md-4 col-6 align-self-start">
                          <div className="cust-label">
                            {t("COH_SHIPMENT_MARKING")}
                          </div>
                          <div className="cust-value">
                            {linedetail?.shipmentMarking}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4 col-6 align-self-start">
                          <div className="cust-label">
                            {t("CON_FREE_OF_CHARGE")}
                          </div>
                          <div className="cust-value">
                            {linedetail?.freeOfCharge}
                          </div>
                        </div>
                        <div className="col-md-4 col-6 align-self-start">
                          <div className="cust-label">
                            {t("CON_SERIAL_NUMBER_TRACKING")}
                          </div>
                          <div className="cust-value">
                            {linedetail?.serialNumberTracking}
                          </div>
                        </div>
                      </div>
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

export default InvoiceHistoryDetailLine;
