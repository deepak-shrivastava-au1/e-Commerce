import { useParams, useLocation } from "react-router-dom";
import LeftNevigation from "@pages/Enquiry/Order/OrderHistory/LeftNevigation";
import { Fragment, useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { ExpandMore, Mail } from "@icons";
import { useMediaQuery } from "@material-ui/core";
import { breakpoints } from "@constants/styled-components";
import { useTranslation } from "react-i18next";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { respondTo } from "@utilities/styled-components";
import SendEnquiry from "@fragments/SendEnquiry";
import InvoiceBasic from "./InvoiceBasic";
import InvoiceInformation from "./InvoiceInformation";
import LoadingOverlay from "@common/LoadingOverlay";
import { WebSettingsContext } from "@providers/WebsettingsProvider";
import {
  fetchinvoicehistorydetail,
  invoicehistorydetailactions,
  invoicehistorydetailSelector,
} from "@slices/Enquiry/Invoices/invoiceHistoryDetail";
import { useGetLoggedInUserInfo } from "@hooks";
import Breadcrumb from "@fragments/Breadcrumb";
import PDF from "./Exports/PDF";

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

const InvoiceHistoryDetail = () => {
  const params = useParams<any>();
  const location = useLocation<any>();
  const sessionId = useGetLoggedInUserInfo()?.sessionId;
  const dispatch = useDispatch();

  const [isEnquiryDrawerOpen, setIsEnquiryDrawerOpen] =
    useState<boolean>(false);

  const webSettings: any = useContext(WebSettingsContext);
  const state = useSelector(invoicehistorydetailSelector);
  const invoicedetail = state?.invoiceHistoryDetail?.invoicedetail;
  const loading = state?.invoiceHistoryDetail?.loading;

  const invoicenumber = location?.state?.invoicenumber;
  const ordernumber = location?.state?.ordernumber;
  const documenttype = location?.state?.documenttype;
  const invoicetype = location?.state?.invoicetype;
  const invoiceyear = location?.state?.invoiceyear;

  useEffect(() => {
    if (sessionId) {
      dispatch(invoicehistorydetailactions.intitalizeLoader());
      dispatch(
        fetchinvoicehistorydetail(
          sessionId,
         state?.invoiceHistoryDetail?.invoicerouteparms?.invoicenumber,
         state?.invoiceHistoryDetail?.invoicerouteparms?.ordernumber,
         state?.invoiceHistoryDetail?.invoicerouteparms?.documenttype,
         state?.invoiceHistoryDetail?.invoicerouteparms?.invoicetype,
         state?.invoiceHistoryDetail?.invoicerouteparms?.invoiceyear
        )
      );
    }
  }, [sessionId]);

  useEffect(() => {
    if (location?.state !== undefined) {
      dispatch(
        invoicehistorydetailactions.setinvoicerouteparms({ invoicenumber,ordernumber,documenttype,invoicetype,invoiceyear })
      );
    }
  }, []);


  const isMobile = useMediaQuery(`(min-width:${breakpoints.md})`);
  const { t, i18n } = useTranslation();
  return (
    <Fragment>
      <div className="content-area">
        <Breadcrumb />
        <OrderHistoryContainer>
          {isMobile && <LeftNevigation />}
          <OrderHistorySection>
            <div className="row page-header">
              <div className="col-lg-6 left-section"></div>
              <div className="col-lg-6 right-section">
                <ul className="list-inline">
                  <li className="list-inline-item p-l-10 p-r-5">
                    <SendEnquiry
                      status={isEnquiryDrawerOpen}
                      subject={`Invoice #${invoicedetail?.invoiceNumber}`}
                      email={webSettings?.userEmail}
                    />
                    <Mail
                      className="primary-icon-2 icon-lg"
                      onClick={() =>
                        setIsEnquiryDrawerOpen((prevState) => !prevState)
                      }
                    />
                  </li>

                  <li className="list-inline-item p-r-5">
                    {webSettings?.showPdfIcon ? <PDF /> : null}
                  </li>
                </ul>
              </div>
            </div>
            <div className="card-table-detail">
              <Accordion className="custom-accordian" defaultExpanded={true}>
                <AccordionSummary
                  expandIcon={<ExpandMore className="primary-icon-3 icon-md" />}
                >
                  <div className="d-flex w-100">
                    <div>
                      <h3>{t("CON_BASIC_INFORMATION")}</h3>
                    </div>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <InvoiceBasic invoicedetails={invoicedetail} />
                </AccordionDetails>
              </Accordion>
              <Accordion className="custom-accordian">
                <AccordionSummary
                  expandIcon={<ExpandMore className="primary-icon-3 icon-md" />}
                >
                  <h3>{t("CON_INVOICE_DETAIL")}</h3>
                </AccordionSummary>
                <AccordionDetails>
                  <InvoiceInformation invoicedetails={invoicedetail} />
                </AccordionDetails>
              </Accordion>
              <Accordion className="custom-accordian">
                <AccordionSummary
                  expandIcon={<ExpandMore className="primary-icon-3 icon-md" />}
                >
                  <h3>{t("CON_ADDRESSES")}</h3>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="order-address">
                    <div className="flex-fill">
                      <div
                        className="card"
                        style={{ margin: "17px", padding: "10px" }}
                      >
                        <div className="cust-label">
                          {t("CON_INVOICE_ADDRESS")}
                        </div>
                        <div
                          className="cust-value"
                          dangerouslySetInnerHTML={{
                            __html: invoicedetail?.address,
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
    </Fragment>
  );
};

export default InvoiceHistoryDetail;
