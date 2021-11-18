import { Fragment,useContext, useState ,useEffect,useRef} from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import RequestLines from "./RequestLines";
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

const RequestInformation = (requestdetails: any) => {
  const { t, i18n } = useTranslation();
  const quotationdetail = { ...requestdetails?.requestdetails };
  const sessionId = useGetLoggedInUserInfo()?.sessionId;
  const isMobile = useMediaQuery(`(min-width:${breakpoints.md})`);
  const [deleteDialogStatus, setDeleteDialogStatus] = useState<boolean>(false);
  const [sucessModalOpen, setSucessModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const state = useSelector(quotationsummarydetailSelector);
  const webSettings: any = useContext(WebSettingsContext);
  const isModalRef = useRef(false);
  const history = useHistory();

  
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
                      {quotationdetail.customer}
                    </div>
                  </div>
                </div>
               
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">
                      {t("CON_REQUEST_NUMBER")}
                    </div>
                    <div className="col-labeltext">
                      {quotationdetail?.requestId}
                    </div>
                  </div>
                </div>
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">{t("COH_ORDER_STATUS")}</div>
                    <div className="cust-value">
                      {quotationdetail?.status}
                    </div>
                  </div>
                </div>
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">{t("COH_YOUR_REFERENCE")}</div>
                    <div className="cust-value">
                      {quotationdetail?.yourReference}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">
                      {t("COH_HANDLER")}
                    </div>
                    <div className="cust-value">
                      {quotationdetail?.handlerCode}
                      <span className="m-1"> {quotationdetail?.handlerDesc}</span>
                    </div>
                  </div>
                </div>
               
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">{t("COH_DATE")}</div>
                    <div className="cust-value">{quotationdetail?.date}</div>
                  </div>
                </div>
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">
                      {t("CON_TIME")}
                    </div>
                    <div className="cust-value">
                      <span> {quotationdetail?.time}</span>
                     
                    </div>
                  </div>
                </div>
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">
                      {t("CON_DESTINATION")}
                    </div>
                    <div className="cust-value">
                      {quotationdetail?.destination}
                   
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
              
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">
                      {t("COH_REQUEST_TYPE")}
                    </div>
                    <div className="cust-value">
                      {quotationdetail?.requestType}
                    </div>
                  </div>
                </div>
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">
                      {t("COH_REQUEST_DESCRIPTION")}
                    </div>
                    <div className="cust-value">
                      {quotationdetail?.reqDesc}
                    </div>
                  </div>
                </div>
                <div className="col align-self-start">
                  <div className="flex-container">
                  <div className="cust-label">
                      {t("CON_RESOLUTION_TYPE")}
                    </div>
                    <div className="cust-value">
                      {quotationdetail?.resolutionType}
                    </div>

                  </div>
                </div>
                <div className="col align-self-start">
                  <div className="flex-container">
                  <div className="cust-label">
                      {t("CON_RESOLUTION_DESCRIPTION")}
                    </div>
                    <div className="cust-value">
                      {quotationdetail?.resolutionDesc}
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-table-lineitem">
        <div className="d-flex">
          <div className="p-2 mr-auto">
            <h3>{t("CON_REQUEST_LINE_NUMBER")}</h3>
          </div>
          
        </div>
        <div>
          <ListContainer>
            <RequestLines requestdetails={quotationdetail} />
          </ListContainer>
        </div>
      </div>
    </div>
  );
};

export default RequestInformation;
