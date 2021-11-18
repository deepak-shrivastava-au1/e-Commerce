import { useParams, useLocation, withRouter } from "react-router-dom";
import LeftNevigation from "@pages/Enquiry/Order/OrderHistory/LeftNevigation";
import { Fragment, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { ExpandMore } from "@icons";
import { useMediaQuery } from "@material-ui/core";
import { breakpoints } from "@constants/styled-components";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { respondTo } from "@utilities/styled-components";
import QuotationReferences from "./QuotationReferences";
import QuotationInformation from "./QuotationInformation";
import LoadingOverlay from "@common/LoadingOverlay";
import {
  fetchquotationdetail,
  quotationsummarydetailSelector,
  quotationsummarydetailactions,
} from "@slices/Enquiry/Quotations/QuotationSummaryDetail";
import { useGetLoggedInUserInfo } from "@hooks";
import Breadcrumb from "@fragments/Breadcrumb";
import { useTranslation } from "react-i18next";
import PDF from "./Exports/PDF";
import { WebSettingsContext } from "@providers/WebsettingsProvider";

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

const QuotationDetail = (props: any) => {
  const params = useParams<any>();
  const sessionId = useGetLoggedInUserInfo()?.sessionId;
  const dispatch = useDispatch();
  const state = useSelector(quotationsummarydetailSelector);
  const quotationdetail = state?.quotationSummaryDetail.quotationhistorydetail;
  const loading = state?.quotationSummaryDetail?.loading;
  const { t } = useTranslation();
  const webSettings = useContext(WebSettingsContext);
  const location = useLocation<any>();

  const qno = location?.state?.qno;
  const vno = location?.state?.vno;
  const type = location?.state?.type;

  useEffect(() => {
    if (location?.state !== undefined) {
      dispatch(
        quotationsummarydetailactions.setquotationrouteparms({ qno, vno, type })
      );
    }
  }, []);

  useEffect(() => {
    if (sessionId) {
      dispatch(quotationsummarydetailactions.intitalizeLoader());

      dispatch(
        fetchquotationdetail(
          sessionId,
          state?.quotationSummaryDetail?.quotationrouteparms?.qno,
          state?.quotationSummaryDetail?.quotationrouteparms?.vno,
          state?.quotationSummaryDetail?.quotationrouteparms?.type
        )
      );
    }
  }, [sessionId]);

  const isMobile = useMediaQuery(`(min-width:${breakpoints.md})`);
  return (
    <Fragment>
      <div className="content-area">
        <Breadcrumb />
        <OrderHistoryContainer>
          {isMobile && <LeftNevigation />}
          <OrderHistorySection>
            <div className="row page-header">
              <div className="col-lg-6 left-section"></div>
              <div className=" col-lg-6 right-section">
                <ul className="list-inline icons-hr">
                  <li className="list-inline-item">
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
                  <h3>{t("CON_QUOTATION_HEADER_INFORMATION")}</h3>
                </AccordionSummary>
                <AccordionDetails>
                  <QuotationInformation quotationdetails={quotationdetail} />
                </AccordionDetails>
              </Accordion>
              <Accordion className="custom-accordian">
                <AccordionSummary
                  expandIcon={<ExpandMore className="primary-icon-3 icon-md" />}
                >
                  <h3>{t("CON_QUOTATION_REFERENCES")}</h3>
                </AccordionSummary>
                <AccordionDetails>
                  <QuotationReferences
                    quotationdetails={quotationdetail}
                  ></QuotationReferences>
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

export default QuotationDetail;
