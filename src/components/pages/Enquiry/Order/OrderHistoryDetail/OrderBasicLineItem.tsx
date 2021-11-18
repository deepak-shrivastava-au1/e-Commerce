import { Fragment, useState, useContext } from "react";
import { useDispatch,useSelector } from "react-redux";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { TrashForModalSVG } from "@icons";
import altImage from "@images/awaited_image.png";
import * as Constants from "@constants/Constants";
import { alignCenter } from "@utilities/styled-components";
import Modal from "@common/Modal";
import OrderAddCartLineItem from "./OrderAddCartLineItem";
import NoData from "@common/NoData";
import {
  orderhistorydetailactions,
  deleteOrderLines,
  orderhistorydetailSelector
} from "@slices/Enquiry/Order/orderHistoryDetail";
import { ArrowLeft ,CloseSVG} from "@icons";
import { WebSettingsContext } from "@providers/WebsettingsProvider";
import { useGetLoggedInUserInfo } from "@hooks";
import { Link } from "react-router-dom";
import { BASE_URL_IMAGE } from '@routers/AppRoute';
import { getErrorMsgForDeleteOrders } from "@utilities/error/serviceErrorCodeUtil";
import * as ROUTES from '@constants/Routes';

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

const OrderBasicLineItem = (orderdetails: any) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [deleteDialogStatus, setDeleteDialogStatus] = useState<boolean>(false);
  const [showAddCart, setShowAddCart] = useState<Array<boolean>>([]);
  const sessionId = useGetLoggedInUserInfo()?.sessionId;
  const webSettings: any = useContext(WebSettingsContext);

  const state = useSelector(orderhistorydetailSelector);
   const onCartToggle = (index: number) => {
    setShowAddCart((prevState: Array<boolean>) => {
      const copiedArr = [...prevState];
      copiedArr[index] = !copiedArr[index];
      return copiedArr;
    });
  };

  const DeleteCartLineItem = (linenumber: number) => {
    const OrderLineData = [
      {
        orderNum: orderdetails?.orderdetails?.orderNumber,
        lineNumber: linenumber,
      },
    ];
    dispatch(orderhistorydetailactions.intitalizeLoader());
    dispatch(deleteOrderLines(sessionId, OrderLineData));
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
                <div className="col-title">{t("CON_ORDER_INFORMATION")}</div>
              </div>
            </div>

            <div className="col col-w-3">
              <div className="d-flex">
                <div className="col-title"> {t("CON_DELIVERY_DATE")}</div>
              </div>
            </div>
            {webSettings?.isShowPrice && (
              <div className="col col-w-3">
                <div className="d-flex">
                  <div className="col-title">
                   {t("CON_VALUE")} ({webSettings?.currencyCode})
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="card-tbody">
          {orderdetails?.orderdetails?.orderLineList == null && <NoData />}
          {orderdetails?.orderdetails?.orderLineList == null
            ? ""
            : Object.values(orderdetails?.orderdetails?.orderLineList)?.map(
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
                                    to={`/orderhistory/${orderdetails?.orderdetails?.orderNumber}/${items.lineNumber}`}
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
                                        alt="orderImg"
                                        onError={(e: any) => {
                                          e.target.onerror = null;
                                          e.target.src = altImage;
                                        }}
                                      />
                                    </ImageWrapper>
                                  </div>
                                  <div className="flex-md-fill">
                                    <div className="d-flex flex-column">
                                    <Link to={`${ROUTES.DETAILS}/${items?.itemCode}`}>
                                    <div> {items.itemCode}</div>
                                    </Link>
                                    <Link to={`${ROUTES.DETAILS}/${items?.itemCode}`}>
                                      <div> {items.itemDescription}</div>
                                      </Link>
                                      {!showAddCart[index] && (
                                        <div className="d-flex m-t-10">
                                          <div className="d-none d-md-block">
                                            <span
                                              className="cust-anchor m-r-20"
                                              onClick={() =>
                                                setDeleteDialogStatus(true)
                                              }
                                            >
                                              {t("CON_DELETE")}
                                            </span>
                                          </div>
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
                                  {(webSettings?.allowDiscountDisplay ==
                                    "*ALL" ||
                                    webSettings?.allowDiscountDisplay ==
                                      "*ALL_PRICE" ||
                                    webSettings?.allowDiscountDisplay ==
                                      "*ACTUAL_PRICE") && (
                                    <tr>
                                      <td className="text-md-right text-sm-left cust-label">
                                        {t("COH_ACTUAL_PRICE")}
                                      </td>
                                      <td>{items.totalExclVAT}</td>
                                    </tr>
                                  )}
                                  {(webSettings?.allowDiscountDisplay ==
                                    "*ALL" ||
                                    webSettings?.allowDiscountDisplay ==
                                      "*DISCOUNT_PRICE" ||
                                    webSettings?.allowDiscountDisplay ==
                                      "*ALL_PRICE") && (
                                    <tr>
                                      <td className="text-md-right text-sm-left cust-label">
                                        {t("COH_DISCOUNT_PRICE")}
                                      </td>
                                      <td>{items.discountPrice}</td>
                                    </tr>
                                  )}
                                  {webSettings?.allowDiscountDisplay ==
                                    "*ALL" && (
                                    <tr>
                                      <td className="text-md-right text-sm-left cust-label">
                                        {t("CON_DISCOUNT_%")}
                                      </td>
                                      <td>{items.discountPercent}</td>
                                    </tr>
                                  )}
                                </table>
                              </div>
                            </div>
                            <div className="col col-w-2 align-self-start">
                              <div className="flex-container">
                                <table className="table-fit-content">
                                  <tr>
                                    <td className="text-md-right text-sm-left cust-label">
                                      {t("COH_ORDERED_QUANTITY")}
                                    </td>
                                    <td>{items.ordered}</td>
                                  </tr>
                                  <tr>
                                    <td className="text-md-right text-sm-left cust-label">
                                      Confirmed Unit
                                    </td>
                                    <td>{items.unit}</td>
                                  </tr>
                                </table>
                              </div>
                            </div>
                            <div className="col order-value-position col-w-3 align-self-start">
                              <div className="flex-container">
                                <div className="label text-md-right text-sm-left cust-label">
                                  {t("CON_DELIVERY_DATE")}
                                </div>
                                {items.delDate}
                              </div>
                            </div>
                            {webSettings?.isShowPrice && (
                              <div className="col col-w-3 align-self-start">
                                <div className="flex-container">
                                  <div className="label text-md-right text-sm-left cust-label">
                                    {t("CON_VALUE")} (
                                    {webSettings?.currencyCode})
                                  </div>
                                  {items.price}
                                </div>
                              </div>
                            )}
                            {!showAddCart[index] && (
                              <div className="col d-sm-block d-md-none align-self-start">
                                <div className="flex-container">
                                  <div className="d-flex m-t-10">
                                    {orderdetails?.orderdetails
                                      ?.isDeleteLineAllowedFlag && (
                                      <div className="d-md-block">
                                        <span
                                          className="cust-anchor m-r-20"
                                          onClick={() =>
                                            setDeleteDialogStatus(true)
                                          }
                                        >
                                          {t("CON_DELETE")}
                                        </span>
                                      </div>
                                    )}
                                    <div className="d-md-block ">
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
                                unitList={items.itemUnitsDesc}
                                handleCartToggle={onCartToggle}
                                enquiryDetail={`Product : ${items.itemCode}\nDescription : ${items.itemDescription}\n Customer number : ${orderdetails?.orderdetails?.customerCode}\n Customer : ${orderdetails?.orderdetails?.customerDesc}\n NetStore user's email id : ${webSettings?.userEmail}`}
                              />
                            )}
                          </div>
                        </div>
                      </div>

                      <div>
                        <Modal
                          isAlert
                          icon={<TrashForModalSVG className="primary-icon-1"/>}
                          title="Want to Delete ?"
                          message="Are you sure you want to delete this ?"
                          isOpen={deleteDialogStatus}
                          onRequestClose={() => setDeleteDialogStatus(false)}
                          onSecondaryButtonClick={() => {
                            {
                              DeleteCartLineItem(items.lineNumber);
                            }
                            setTimeout(() => {
                              setDeleteDialogStatus(false);
                            }, 1000);
                          }}
                          secondaryActionText={t("CON_DELETE")}
                        />
                      </div>
                    </Fragment>
                  );
                }
              )}
        </div>
      </div>
      { state?.orderHistoryDetail?.hasorderlineErrors && 
      <Modal
        isAlert
        icon={<div className="icon-fail"><CloseSVG className="icon" /></div>}
        title={t('CON_STATUS_DELETE_ORDER_LINE')}
        message={t(getErrorMsgForDeleteOrders(state?.errorCode))}
        isOpen={true}
        hasCancelButton={false}
        onRequestClose={() => {
          dispatch(orderhistorydetailactions.setHasOrderLineErrors(false));
          dispatch(orderhistorydetailactions.setErrorCode(''));
        }}
        secondaryActionText={'ok'}
        onSecondaryButtonClick={() => {
          dispatch(orderhistorydetailactions.setHasOrderLineErrors(false));
          dispatch(orderhistorydetailactions.setErrorCode(''));
        }}
      />}
    </ListContainer>
  );
};

export default OrderBasicLineItem;
