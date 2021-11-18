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
import { BASE_URL_IMAGE } from '@routers/AppRoute';
import * as ROUTES from '@constants/Routes';
import {
  quotationsummarydetailSelector
} from "@slices/Enquiry/Quotations/QuotationSummaryDetail";

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

const QuotationDetailLine = () => {
  const { t, i18n } = useTranslation();
  const params = useParams<any>();
  const location = useLocation<any>();
  const state = useSelector(quotationsummarydetailSelector);
 // const { quotationnumber, linenumber } = params;
  const webSettings: any = useContext(WebSettingsContext);
  const isMobile = useMediaQuery(`(min-width:${breakpoints.md})`);
 const quotationnumber = state?.quotationSummaryDetail.quotationhistorydetail?.quotationNumber;
  const versionNumber =
  state?.quotationSummaryDetail.quotationhistorydetail?.versionNumber;
  const linedetail =
    state?.quotationSummaryDetail.quotationhistorydetail?.quotationLineBean?.find(
      (item: any) => item.lineNumber === location?.state?.lineno
    );

 
  return (
    <Fragment>
      <div className="content-area">
        <Breadcrumb />
        <OrderHistoryContainer>
          {isMobile && <LeftNevigation />}
          <OrderHistorySection>
           <div className="d-flex flex-column w-100">
              <div className="custom-accordian">
                <div className="card-table-detail-basic card-table-lines">
                  <div className="card-table">
                    <div className="card-tbody">
                      <div className="d-flex row row-border">
                        <div className="col-lg-6  mr-auto">
                          <h3>
                            {t("COH_LINE")} {linedetail?.lineNumber}
                          </h3>
                        </div>
                        <div className="col-lg-3 p-r-16 cust-label">
                          {t("CON_QUOTATION_NUMBER")}: {quotationnumber}
                        </div>
                        <div className="col-lg-3 p-r-16 cust-label">
                          {t("CON_VERSION_NUMBER")}: {versionNumber}
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
                         
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-3 col-6 align-self-start ">
                          <div className="cust-label">
                                   {t("CON_DISPATCH_DATE")}
                          </div>
                          <div className="cust-value">
                            {linedetail?.deliveryDate}
                          </div>
                        </div>
                        <div className="col-md-3 col-6 align-self-start">
                          <div className="cust-label"> {t("COH_QUANTITY")}</div>
                          <div className="cust-value">
                                   {linedetail?.quantity}<span className="m-3">{linedetail?.unit}</span>
                          </div>
                        </div>
                        <div className="col-md-3 col-6 align-self-start">
                          <div className="cust-label">
                                     {t("CON_PRICE_INCL_VAT")}
                          </div>
                          <div className="cust-value">
                                         {linedetail?.price}
                          </div>
                        </div>
                        <div className="col-md-3 col-6 align-self-start">
                          <div className="cust-label"> {t("CON_TOTAL_EXCLUDING_VAT")}</div>
                          <div className="cust-value"> {linedetail?.amountExclVAT}</div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-3 col-6 align-self-start">
                          <div className="cust-label">
                                     {t("CON_VAT")}
                          </div>
                          <div className="cust-value">
                            {linedetail?.vat}
                          </div>
                        </div>
                        <div className="col-md-3 col-6 align-self-start">
                          <div className="cust-label">
                                {t("CON_TOTAL_INCLUDING_VAT")}
                          </div>
                          <div className="cust-value">
                                              {linedetail?.amountInclVAT}  {linedetail?.currency}
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



export default QuotationDetailLine