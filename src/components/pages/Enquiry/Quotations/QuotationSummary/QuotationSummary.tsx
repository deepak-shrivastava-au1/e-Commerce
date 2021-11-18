import { Fragment } from "react";
import styled from "styled-components";
import QuotationTable from "./QuotationTable";
import QuotationSearch from "./QuotationSearch";
import LeftNevigation from "@pages/Enquiry/Order/OrderHistory/LeftNevigation";
import { useMediaQuery } from "@material-ui/core";
import { breakpoints } from "@constants/styled-components";
import { useTranslation } from 'react-i18next';
import QuotationSearchChips from './QuotationSearchChips';
import Breadcrumb from "@fragments/Breadcrumb";
import PDF from "./Exports/PDF";
import Excel from "./Exports/Excel";
import { useContext } from "react";
import { WebSettingsContext } from "@providers/WebsettingsProvider";

const OrderHistoryContainer = styled.aside`
  display: flex;
`;

const OrderHistorySection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0 0px 0 0px;
  flex-grow: 1;
  > :not(:last-child) {
    margin-bottom: 14px;
  }
`;

const ListContainer = styled.div`
  width: 100%;
`;

const OrderHistory = () => {
  const isMobile = useMediaQuery(`(min-width:${breakpoints.md})`);
  const { t, i18n } = useTranslation();
  const webSettings = useContext(WebSettingsContext);
  return (
    <Fragment>
       <div className="content-area">
       <Breadcrumb  />
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
                  <li className="list-inline-item">
                    {webSettings?.showExcelIcon ? <Excel /> : null}
                  </li>
                </ul>
              </div>
            </div>
        
          <div className="row">
            <QuotationSearch/>
             <QuotationSearchChips/>
          </div>
          <ListContainer>
            <QuotationTable />
          </ListContainer>
        </OrderHistorySection>
      </OrderHistoryContainer>
      </div>
    </Fragment>
  );
};

export default OrderHistory;
