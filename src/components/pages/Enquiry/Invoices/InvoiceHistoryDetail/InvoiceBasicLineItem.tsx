import { Fragment, useState, useContext } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import altImage from "@images/awaited_image.png";
import { alignCenter } from "@utilities/styled-components";
import OrderAddCartLineItem from "../../Order/OrderHistoryDetail/OrderAddCartLineItem";
import NoData from "@common/NoData";
import { WebSettingsContext } from "@providers/WebsettingsProvider";
import { useGetLoggedInUserInfo } from "@hooks";
import { Link } from "react-router-dom";
import { BASE_URL_IMAGE } from "@routers/AppRoute";
import { INVOICE, DETAILS, INVOICEDETAILLINE } from "@constants/Routes";

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

const InvoiceBasicLineItem = (invoicedetails: any) => {
  const { t } = useTranslation();
  const [showAddCart, setShowAddCart] = useState<Array<boolean>>([]);
  
  const webSettings: any = useContext(WebSettingsContext);
  const invoicedetail = invoicedetails?.invoicedetails;

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
          {invoicedetail?.invoiceLineBeanList == null && <NoData />}
          {invoicedetail?.invoiceLineBeanList == null
            ? ""
            : Object.values(invoicedetail?.invoiceLineBeanList)?.map(
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
                                    pathname: INVOICEDETAILLINE,
                                    state: { invoicenumber : `${invoicedetail?.invoiceNumber}`, linenumber :`${items?.invoiceLineNumber}`}
                                  }}
                                   className="font-weight-medium"
                                  >
                                    {items.invoiceLineNumber}
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
                                        alt="invoiceImg"
                                        onError={(e: any) => {
                                          e.target.onerror = null;
                                          e.target.src = altImage;
                                        }}
                                      />
                                    </ImageWrapper>
                                  </div>
                                  <div className="flex-md-fill">
                                    <div className="d-flex flex-column">
                                      <Link to={`${DETAILS}/${items?.item}`}>
                                        <div> {items.item}</div>
                                      </Link>
                                      <Link to={`${DETAILS}/${items?.item}`}>
                                        <div> {items.itemDescription}</div>
                                      </Link>
                                      {!showAddCart[index] && (
                                        <div className="d-flex m-t-10">
                                          <div className="d-none d-md-block m-r-20">
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
                                      <td>{items.salesPrice}</td>
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
                                    <td>{items.quantity}</td>
                                  </tr>
                                  <tr>
                                    <td className="text-md-right text-sm-left cust-label">
                                      {t("COH_UNIT")}
                                    </td>
                                    <td>{items.unitCodeDesc}</td>
                                  </tr>
                                </table>
                              </div>
                            </div>
                            <div className="col order-value-position col-w-3 align-self-start">
                              <div className="flex-container">
                                <div className="label text-md-right text-sm-left cust-label">
                                  {t("CON_DELIVERY_DATE")}
                                </div>
                                {items.deliveryTime}
                              </div>
                            </div>
                            <div className="col order-value-position col-w-3 align-self-start">
                              <div className="flex-container">
                                <div className="label text-md-right text-sm-left cust-label">
                                  {t("CON_AVAILABLE")}
                                </div>
                                {items.availabilityOfItem}
                              </div>
                            </div>

                            {!showAddCart[index] && (
                              <div className="col d-sm-block d-md-none align-self-start">
                                <div className="flex-container">
                                  <div className="d-flex m-t-10">
                                    <div className="d-md-block m-l-20">
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
                                itemCode={items.item}
                                unit={items.unit}
                                quantity={1}
                                unitList={items.unitCodeDesc}
                                handleCartToggle={onCartToggle}
                                enquiryDetail={`Product : ${items.item}\nDescription : ${items.itemDescription}\n Customer number : ${invoicedetail?.customerCode}\n Customer : ${invoicedetail?.customerDesc}\n NetStore user's email id : ${webSettings?.userEmail}`}
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

export default InvoiceBasicLineItem;
