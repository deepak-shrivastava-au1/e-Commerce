import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useGetLoggedInUserInfo } from "@hooks";
import { useMediaQuery } from "@material-ui/core";
import { breakpoints } from "@constants/styled-components";

const ListContainer = styled.div`
  width: 100%;
`;

const QuotationReferences = (quotationdetails: any) => {
  const { t, i18n } = useTranslation();
  const quotationdetail = { ...quotationdetails?.quotationdetails };
  return (
    <div className="d-flex flex-column  w-100">
      <div className="card-table-detail-basic">
        <div className="odrder-basic-info">
          <div className="card-table">
            <div className="card-tbody">
              <div className="row">
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">{t("CON_HANDLER")}</div>
                    <div className="col-labeltext">
                      {quotationdetail?.handlerCode}
                      <span className="m-1"> {quotationdetail?.handlerDesc}</span>
                    </div>
                  </div>
                </div>
              
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">
                      {t("CON_SALES_PERSON")}
                    </div>
                    <div className="col-labeltext">
                      {quotationdetail?.salespersonCode}
                      <span className="m-1"> {quotationdetail?.salespersonDesc}</span>
                    </div>
                  </div>
                </div>
               
              </div>
            
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default QuotationReferences;
