import { Fragment } from "react";
import styled from "styled-components";
import InvoiceTable from "@pages/Enquiry/Invoices/InvoiceHistory/InvoiceTable";
import InvoiceSearch from "./InvoiceSearch";
import LeftNevigation from "@pages/Enquiry/Order/OrderHistory/LeftNevigation";
import { useMediaQuery } from "@material-ui/core";
import { breakpoints } from "@constants/styled-components";
import { useTranslation } from 'react-i18next';
import InvoiceSearchChips from './InvoiceSearchChips';
import Breadcrumb from "@fragments/Breadcrumb";
import PDF from "./Exports/PDF";
import Excel from "./Exports/Excel";
import { useContext } from "react";
import { WebSettingsContext } from "@providers/WebsettingsProvider";

const OrderHistoryContainer = styled.aside`
  display: flex;
  padding: 10px 0px;
`;

const OrderHistorySection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0 0px 0 24px;
  flex-grow: 1;
  > :not(:last-child) {
    margin-bottom: 14px;
  }
`;

const ListContainer = styled.div`
  width: 100%;
`;

const InvoiceHistory = () => {
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
                <ul className="list-inline">
                  <li className="list-inline-item p-r-5">
                    {webSettings?.showPdfIcon ? <PDF /> : null}
                  </li>
                  <li className="list-inline-item p-r-5">
                    {webSettings?.showExcelIcon ? <Excel /> : null}
                  </li>
                </ul>
              </div>
            </div>
         
          <div className="row">
             <InvoiceSearch />
             
          </div>
          <div className="row">
           
             <InvoiceSearchChips/> 
          </div>
          <ListContainer>
            <InvoiceTable />
          </ListContainer>
        </OrderHistorySection>
      </OrderHistoryContainer>
      </div>
    </Fragment>
  );
};

export default InvoiceHistory;
