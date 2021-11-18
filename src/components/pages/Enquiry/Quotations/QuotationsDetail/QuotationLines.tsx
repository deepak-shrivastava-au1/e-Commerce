import { Fragment, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import altImage from "@images/awaited_image.png";
import { alignCenter } from "@utilities/styled-components";
import NoData from "@common/NoData";
import {
  quotationsummarydetailSelector
 } from "@slices/Enquiry/Quotations/QuotationSummaryDetail";
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

const QuotationLines = (quotationdetails: any) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [deleteDialogStatus, setDeleteDialogStatus] = useState<boolean>(false);
  const [showAddCart, setShowAddCart] = useState<Array<boolean>>([]);
  const sessionId = useGetLoggedInUserInfo()?.sessionId;
  const webSettings: any = useContext(WebSettingsContext);
  const quotationdetail = quotationdetails?.quotationdetails;
  const state = useSelector(quotationsummarydetailSelector);
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
                  {t("COH_PRICE")} ({webSettings?.currencyCode})
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
                <div className="col-title">{t("COH_BACKLOG")}</div>
              </div>
            </div>
            <div className="col col-w-3">
              <div className="d-flex">
                <div className="col-title"> {t("CON_DELIVERY_DATE")}</div>
              </div>
            </div>

            <div className="col col-w-3">
              <div className="d-flex">
                <div className="col-title">{t("CON_AVAILABLE")}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-tbody">
          {(quotationdetail?.quotationLineBean == null || quotationdetail?.quotationLineBean?.length == 0 )&& <NoData />}
          {quotationdetail?.quotationLineBean == null
            ? ""
            : Object.values(quotationdetail?.quotationLineBean)?.map(
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
                                    to={{
                                      pathname: QUOTATIONDETAILLINE,
                                      state: { lineno : `${items.lineNumber}` }
                                    }}
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
                                        to={`${ROUTES.DETAILS}/${items?.itemCode}`}
                                      >
                                        <div> {items.itemCode}</div>
                                      </Link>
                                      <Link
                                        to={`${ROUTES.DETAILS}/${items?.itemCode}`}
                                      >
                                        <div> {items.itemDescription}</div>
                                      </Link>
                                      {!showAddCart[index] && (
                                        <div className="d-flex m-t-10">
                                          <div className="d-none d-md-block">
                                            <span
                                              className="cust-anchor"
                                              onClick={() =>
                                                onCartToggle(index)
                                              }
                                            >
                                              More Actions
                                            </span>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col col-w-2 align-self-start">
                              <div className="flex-container">
                                <table className="table-fit-content">
                                  <tr>
                                    <td className="text-md-right text-sm-left cust-label">
                                      {t("COH_ACTUAL_PRICE")}
                                    </td>
                                    <td>{items.price}</td>
                                  </tr>
                                  <tr>
                                    <td className="text-md-right text-sm-left cust-label">
                                      {t("COH_AMOUNT")}
                                    </td>
                                    <td>{items.amount}</td>
                                  </tr>
                                </table>
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
                                    <td>{items.unit}</td>
                                  </tr>
                                </table>
                              </div>
                            </div>
                            <div className="col col-w-3 align-self-start">
                              <div className="flex-container">
                                <div className="label text-md-right text-sm-left cust-label">
                                  {t("COH_BACKLOG")} (
                                </div>
                                {items.backlog}
                              </div>
                            </div>
                            <div className="col order-value-position col-w-3 align-self-start">
                              <div className="flex-container">
                                <div className="label text-md-right text-sm-left cust-label">
                                  {t("CON_DELIVERY_DATE")}
                                </div>
                                {items.deliveryDate}
                              </div>
                            </div>

                            <div className="col col-w-3 align-self-start">
                              <div className="flex-container">
                                <div className="label text-md-right text-sm-left cust-label">
                                  {t("CON_AVAILABLE")} (
                                </div>
                                {items.availability}
                              </div>
                            </div>
                            {!showAddCart[index] && (
                              <div className="col d-sm-block d-md-none align-self-start">
                                <div className="flex-container">
                                  <div className="d-flex m-t-10">
                                    <div className="d-md-block">
                                      <span
                                        className="cust-anchor"
                                        onClick={() => onCartToggle(index)}
                                      >
                                        More Actions
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            {showAddCart[index] && (
                              <OrderAddCartLineItem
                                index={index}
                                itemCode={items.itemCode}
                                unit={items.unit}
                                quantity={1}
                                unitList={items.unitCodeDesc}
                                handleCartToggle={onCartToggle}
                                enquiryDetail=""
                                enquiryShow={false}
                                addtocartshow={
                                  webSettings?.AllowBuyFromQuotationLine
                                }
                              />
                            )}
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

export default QuotationLines;
