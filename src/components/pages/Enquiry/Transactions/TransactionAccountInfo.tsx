import { useState, Fragment, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { transactionSelector } from "@slices/Enquiry/Transactions/transactions";
import { useTranslation } from "react-i18next";
import { Divider } from "@material-ui/core";

const TransactionAccountInfo = () => {
  const state = useSelector(transactionSelector);
  const transactionInfo = state?.transactions?.transactionslst;
  const { t, i18n } = useTranslation();

  return (
    <div className="d-flex flex-column  w-100">
      <div className="custom-accordian">
        <div className="card-table-detail-basic card-table-lines">
          <div className="card-table">
            <div className="card-tbody">
              <div className="d-flex row row-border">
                <div className="mr-auto p-lr-16">
                  <h3>{t("CON_ACCOUNT_INFORMATION")}</h3>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 col-6 align-self-start">
                <div className="cust-label">
                  {t("COH_DEBTOR")} :
                  </div>
                  <div className="col-labeltext">
                    {transactionInfo?.debtorCode},{transactionInfo?.debtorDesc}
                  </div>
                
                </div>
              
              <div className="col-md-4 col-6 align-self-start">
               
                <div className="cust-label">
                  {t("CON_BALANCE")}:
                  </div>
                  <div className="col-labeltext">
                    {transactionInfo?.balance}
                  </div>
               
               
              </div>
             
                <div className="col-md-4 col-6 align-self-start">
                  <div className="cust-label">
                    {t("CON_CREDIT_LIMIT")} :
                    </div>
                    <div className="col-labeltext">
                      {transactionInfo?.creditLimit}
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

export default TransactionAccountInfo;
