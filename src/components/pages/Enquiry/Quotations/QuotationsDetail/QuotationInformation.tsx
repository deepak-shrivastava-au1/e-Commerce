import { Fragment,useContext, useState ,useEffect,useRef} from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import QuotationLines from "./QuotationLines";
import Modal from "@common/Modal";
import { CheckCircleForModalSVG,CloseSVG } from "@icons";
import { useGetLoggedInUserInfo } from "@hooks";
import { useMediaQuery } from "@material-ui/core";
import { breakpoints } from "@constants/styled-components";
import {
  quotationsummarydetailSelector,
  quotationsummarydetailactions,
  quotationtoorder,
} from "@slices/Enquiry/Quotations/QuotationSummaryDetail";
import { WebSettingsContext } from "@providers/WebsettingsProvider";
import Button from "@common/Button";


const ListContainer = styled.div`
  width: 100%;
`;

const QuotationInformation = (quotationdetails: any) => {
  const { t, i18n } = useTranslation();
  const quotationdetail = { ...quotationdetails?.quotationdetails };
  const sessionId = useGetLoggedInUserInfo()?.sessionId;
  const isMobile = useMediaQuery(`(min-width:${breakpoints.md})`);
  const [deleteDialogStatus, setDeleteDialogStatus] = useState<boolean>(false);
  const [sucessModalOpen, setSucessModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const state = useSelector(quotationsummarydetailSelector);
  const webSettings: any = useContext(WebSettingsContext);
  const isModalRef = useRef(false);
  const history = useHistory();

  const handlequotationtoorder = () => {
    dispatch(quotationsummarydetailactions.intitalizeLoader());
    dispatch(
      quotationtoorder(
        sessionId,
        quotationdetail?.quotationNumber,
        quotationdetail?.versionNumber
      )
    );
    setTimeout(() => {
      setDeleteDialogStatus(false);
    }, 1000);
  };

    // hook to avoid redirection when order delete fails
    useEffect(() => {
      if(!isModalRef.current){
        isModalRef.current=true;
        return;
      }
      if(state?.quotationSummaryDetail?.ordernumber != ""){
        history.push(`/thankYou/INVOICE/NA/${state?.quotationSummaryDetail?.ordernumber}`)

     }
    }, [state?.quotationSummaryDetail?.ordernumber]);

   
  return (
    <div className="d-flex flex-column  w-100">
      <div className="card-table-detail-basic">
        <div className="odrder-basic-info">
          <div className="card-table">
            <div className="card-tbody">
              <div className="row">
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">{t("CON_CUSTOMER_NAME")}</div>
                    <div className="col-labeltext">
                      {quotationdetail.customerDesc}
                    </div>
                  </div>
                </div>
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">{t("COH_CUSTOMER_NUMBER")}</div>
                    <div className="cust-value">
                      {quotationdetail.customerCode}
                    </div>
                  </div>
                </div>
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">
                      {t("CON_QUOTATION_NUMBER")}
                    </div>
                    <div className="col-labeltext">
                      {quotationdetail?.quotationNumber}
                    </div>
                  </div>
                </div>
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">{t("CON_VERSION_NUMBER")}</div>
                    <div className="cust-value">
                      {quotationdetail?.versionNumber}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">
                      {t("CON_TERMS_OF_PAYMENT")}
                    </div>
                    <div className="cust-value">
                      {quotationdetail?.topCode}
                      <span className="m-1"> {quotationdetail?.topDesc}</span>
                    </div>
                  </div>
                </div>
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">{t("COH_CURRENCY")}</div>
                    <div className="cust-value">
                      {quotationdetail?.currency}
                    </div>
                  </div>
                </div>
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">{t("COH_EXPIRE_DATE")}</div>
                    <div className="cust-value">{quotationdetail?.dueDate}</div>
                  </div>
                </div>
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">
                      {t("CON_MANNER_OF_TRANSPORT")}
                    </div>
                    <div className="cust-value">
                      <span> {quotationdetail?.motCode}</span>
                      <span className="m-1"> {quotationdetail?.motDesc}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">
                      {t("CON_TERMS_OF_DELIVERY")}
                    </div>
                    <div className="cust-value">
                      {quotationdetail?.todCode}
                      <span className="m-1"> {quotationdetail?.todDesc}</span>
                    </div>
                  </div>
                </div>
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">
                      {t("CON_ORDER_VALUE_EXCLUDING_VAT")}
                    </div>
                    <div className="cust-value">
                      {quotationdetail?.orderValueExclVAT}
                    </div>
                  </div>
                </div>
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">
                      {t("CON_ORDER_VALUE_INCLUDING_VAT")}
                    </div>
                    <div className="cust-value">
                      {quotationdetail?.orderValueInclVAT}
                    </div>
                  </div>
                </div>
                <div className="col align-self-start">
                  <div className="flex-container"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-table-lineitem">
        <div className="d-flex">
          <div className="p-2 mr-auto">
            <h3>{t("CON_QUOTATION_LINE_INFORMATION")}</h3>
          </div>
          {quotationdetail?.quotationLineBean?.[0].convertOrderFlag && (  
            <Fragment>
              <div
                style={{
                  float: "right",
                }}
                className="p-2"
              >
                <Button
                  variant="outlined"
                  color="neutral"
                  size="medium"
                  onClick={() => setDeleteDialogStatus(true)}
                >
                  <span>{t("CON_QUOTATION_TO_ORDER")}</span>
                </Button>
              </div>
              <div>
                <Modal
                  isAlert
                  icon={<CheckCircleForModalSVG className="primary-icon-1" />}
                  title={t("CON_QUOTATION_TO_ORDER")}
                  message={t("CON_CONFIRM_QUOTATION_TO_ORDER")}
                  isOpen={deleteDialogStatus}
                  onRequestClose={() => setDeleteDialogStatus(false)}
                  onSecondaryButtonClick={handlequotationtoorder}
                  secondaryActionText={t("CON_YES")}
                />
              </div>
              {state?.quotationSummaryDetail?.hasErrors && state?.quotationSummaryDetail?.ordernumber === "" && (
                <Modal
                  isAlert
                  icon={
                    <div className="icon-fail">
                      <CloseSVG className="icon" />
                    </div>
                  }
                  title={t("CON_QUOTATION_TO_ORDER")}
                  message={state?.quotationSummaryDetail?.errorCode}
                  isOpen={true}
                  hasCancelButton={false}
                  onRequestClose={() => {
                    dispatch(quotationsummarydetailactions.setHasError(false));
                    dispatch(quotationsummarydetailactions.setErrorCode(""));
                  }}
                  secondaryActionText={"ok"}
                  onSecondaryButtonClick={() => {
                    dispatch(quotationsummarydetailactions.setHasError(false));
                    dispatch(quotationsummarydetailactions.setErrorCode(""));
                  }}
                />
              )}
            </Fragment>
          )}
        </div>
        <div>
          <ListContainer>
            <QuotationLines quotationdetails={quotationdetail} />
          </ListContainer>
        </div>
      </div>
    </div>
  );
};

export default QuotationInformation;
