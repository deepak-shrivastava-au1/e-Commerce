import { Fragment, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import altImage from "@images/awaited_image.png";
import { alignCenter } from "@utilities/styled-components";
import NoData from "@common/NoData";
import {
  requesthistorydetailSelector
 } from "@slices/Enquiry/Request/RequestHistoryDetail";
import { ArrowLeft, CloseSVG } from "@icons";
import { WebSettingsContext } from "@providers/WebsettingsProvider";
import { useGetLoggedInUserInfo } from "@hooks";
import { Link } from "react-router-dom";
import { BASE_URL_IMAGE } from "@routers/AppRoute";
import * as ROUTES from "@constants/Routes";
import OrderAddCartLineItem from "../../Order/OrderHistoryDetail/OrderAddCartLineItem";
import { QUOTATIONDETAILLINE } from "@constants/Routes";

const ListContainer = styled.div`
  width: 100%;
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

const RequestLines = (requestdetails: any) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [deleteDialogStatus, setDeleteDialogStatus] = useState<boolean>(false);
  const [showAddCart, setShowAddCart] = useState<Array<boolean>>([]);
  const sessionId = useGetLoggedInUserInfo()?.sessionId;
  const webSettings: any = useContext(WebSettingsContext);
  const quotationdetail = requestdetails?.requestdetails;
  const state = useSelector(requesthistorydetailSelector);
  const onCartToggle = (index: number) => {
    setShowAddCart((prevState: Array<boolean>) => {
      const copiedArr = [...prevState];
      copiedArr[index] = !copiedArr[index];
      return copiedArr;
    });
  };

  return (
    <ListContainer>
      <div className="card-table">
        <div className="card-thead">
          <div className="row">
            <div className="col col-w-1">
              <div className="d-flex">
                <div className="col-title"> {t("COH_LINE")}</div>
              </div>
            </div>

            <div className="col">
              <div className="d-flex">
                <div className="col-title">{t("CON_PRODUCT")}</div>
              </div>
            </div>
            <div className="col col-w-2">
              <div className="d-flex justify-content-center">
                <div className="col-title">
                  {t("COH_DESCRIPTION")}
                </div>
              </div>
            </div>
            <div className="col col-w-2">
              <div className="d-flex justify-content-center">
                <div className="col-title">{t("COH_QUANTITY")}</div>
              </div>
            </div>
            <div className="col col-w-3">
              <div className="d-flex">
                <div className="col-title">{t("COH_DATE")}</div>
              </div>
            </div>
            <div className="col col-w-3">
              <div className="d-flex">
                <div className="col-title"> {t("COH_REQUEST_TYPE")}</div>
              </div>
            </div>

          
          </div>
        </div>
        <div className="card-tbody">
          {(quotationdetail?.reqLineBeanList == null || quotationdetail?.reqLineBeanList?.length == 0 )&& <NoData />}
          {quotationdetail?.reqLineBeanList == null
            ? ""
            : Object.values(quotationdetail?.reqLineBeanList)?.map(
                (items: any, index: number) => {
                  return (
                    <Fragment>
                      <div className="card-table">
                        <div className="card-tbody">
                          <div className="row">
                            <div className="col col-w-1 align-self-start">
                              <div className="flex-container">
                                <div className="label text-md-right text-sm-left cust-label">
                                  {t("COH_LINE")}
                                </div>
                                <div>
                                  <Link
                                    to={`${ROUTES.REQUEST}/${quotationdetail?.requestId}/${items.lineNumber}`}
                                    className="font-weight-medium"
                                  >
                                    {items.lineNumber}
                                  </Link>
                                </div>
                              </div>
                            </div>
                            <div className="col align-self-start">
                              <div className="flex-container">
                                <div className="d-flex">
                                  <div>
                                    <ImageWrapper>
                                      <img
                                        src={`${BASE_URL_IMAGE}${items.imageUrl}`}
                                        alt={items.enquiryImage}
                                        onError={(e: any) => {
                                          e.target.onerror = null;
                                          e.target.src = altImage;
                                        }}
                                      />
                                    </ImageWrapper>
                                  </div>
                                  <div className="flex-md-fill">
                                    <div className="d-flex flex-column">
                                      <Link
                                        to={`${ROUTES.DETAILS}/${items?.product}`}
                                      >
                                        <div> {items.product}</div>
                                      </Link>
                                     
                                      
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col col-w-3 align-self-start">
                            <div className="flex-container">
                                <div className="label text-md-right text-sm-left cust-label">
                                {t("COH_DESCRIPTION")} 
                                </div>
                                <td>{items.description}</td>
                              </div>

                             
                            </div>
                            <div className="col col-w-2 align-self-start">
                              <div className="flex-container">
                                <table className="table-fit-content">
                                  <tr>
                                    <td className="text-md-right text-sm-left cust-label">
                                      {t("COH_QUANTITY")}
                                    </td>
                                    <td>{items.quantity}</td>
                                  </tr>
                                  <tr>
                                    <td className="text-md-right text-sm-left cust-label">
                                      {t("COH_UNIT")}
                                    </td>
                                    <td>{items.unitDesc}</td>
                                  </tr>
                                </table>
                              </div>
                            </div>
                            <div className="col col-w-3 align-self-start">
                              <div className="flex-container">
                                <div className="label text-md-right text-sm-left cust-label">
                                  {t("COH_DATE")}
                                </div>
                                {items.date}
                              </div>
                            </div>
                            <div className="col order-value-position col-w-3 align-self-start">
                              <div className="flex-container">
                                <div className="label text-md-right text-sm-left cust-label">
                                  {t("COH_REQUEST_TYPE")}
                                </div>
                                {items.requestType}
                              </div>
                            </div>

                           
                           
                           
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  );
                }
              )}
        </div>
      </div>
    </ListContainer>
  );
};

export default RequestLines;
