import { Fragment } from "react";
import styled from "styled-components";
import RequestTable from "@pages/Enquiry/Request/RequestHistory/RequestTable";
import RequestSearch from "./RequestSearch";
import LeftNevigation from "@pages/Enquiry/Order/OrderHistory/LeftNevigation";
import { useMediaQuery } from "@material-ui/core";
import { breakpoints } from "@constants/styled-components";
import { useTranslation } from "react-i18next";
import RequestSearchChips from "./RequestSearchChips";
import Breadcrumb from "@fragments/Breadcrumb";
import PDF from "./Exports/PDF";
import Excel from "./Exports/Excel";
import { useContext } from "react";
import { WebSettingsContext } from "@providers/WebsettingsProvider";
import Button from "@common/Button";
import { useHistory } from "react-router";
import { REQUESTSUBMIT } from "@constants/Routes";
import ScrollToTop from "@common/ScrollToTop";

const OrderHistoryContainer = styled.aside`
  display: flex;
`;

const OrderHistorySection = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  > :not(:last-child) {
    margin-bottom: 14px;
  }
`;

const ListContainer = styled.div`
  width: 100%;
`;

const RequestHistory = () => {
  const isMobile = useMediaQuery(`(min-width:${breakpoints.md})`);
  const { t } = useTranslation();
  const history = useHistory()
  const webSettings = useContext(WebSettingsContext);
  return (
    <Fragment>
      <div className="content-area">
        <Breadcrumb />
        <ScrollToTop/>
        <OrderHistoryContainer>
          {isMobile && <LeftNevigation />}
          <OrderHistorySection>
            <div className="row page-header">
              <div className="col-lg-6 left-section"></div>
              <div className=" col-lg-6 right-section d-flex flex-row align-items-center justify-content-end">
                <Button
                  color="critical"
                  onClick={() => history.push(REQUESTSUBMIT)}
                >
                  Create new request
                </Button>
                <ul className="list-inline icons-hr">
                  <li className="list-inline-item">
                    {webSettings?.showPdfIcon ? <PDF /> : null}
                  </li>
                  <li className="list-inline-item">
                    {webSettings?.showExcelIcon ? <Excel /> : null}
                  </li>
                </ul>
              </div>
            </div>
            <div className="row">
              <RequestSearch />
              <RequestSearchChips />
            </div>
            <ListContainer>
              <RequestTable />
            </ListContainer>
          </OrderHistorySection>
        </OrderHistoryContainer>
      </div>
    </Fragment>
  );
};

export default RequestHistory;
