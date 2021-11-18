import styled from "styled-components";
import { Fragment ,useContext} from "react";
import { useTranslation } from "react-i18next";
import { WebSettingsContext } from "@providers/WebsettingsProvider";

const ListContainer = styled.div`
  width: 100%;
`;

const OrderInformation = (orderdetail: any) => {
  const { t, i18n } = useTranslation();
  const webSettings: any = useContext(WebSettingsContext);
  return (
    <div className="d-flex flex-column  w-100">
      {orderdetail?.orderdetail?.orderTextFlag && (
        <div>
          <div className="sub-heading">
            <h3>{t("CON_ORDER_TEXT")}</h3>
          </div>
          <div
            className="cust-label-bold align-self-start"
            style={{ padding: "2px 0px 5px 24px" }}
          >
            <label>{t("CON_ORDER_TEXT")}</label>
          </div>

          <div
            className=" align-self-start cust-value ml-3"
            style={{ padding: "2px 0 0 9px" }}
          >
            {orderdetail?.orderdetail?.orderText}
            <hr />
          </div>
        </div>
      )}
      <hr />
      {orderdetail?.orderdetail?.isOrderFeesFlag && (
        <Fragment>
          <div className="sub-heading">
            <h3>{t("CON_ORDER_FEES")}</h3>
          </div>
          <ListContainer>
            <div className="order-fees-cont m-lr-20">
              <div className="card-table">
                <div className="card-tbody">
                  <div className="row p-0">
                    <div className="col">
                      <div className="card-table">
                        <div className="card-thead">
                          <div className="row">
                            <div className="col cust-label-bold align-self-start max-width-50 float">
                              {t("CON_ADMINISTRATION_FEE")}
                            </div>
                            <div className="col cust-label-bold align-self-start max-width-50 float">
                              {t("CON_FREIGHT")}
                            </div>
                          </div>
                        </div>
                        <div className="card-tbody ">
                          <div className="row gray-bg">
                            <div className="col max-width-50 float">
                              {orderdetail?.orderdetail?.administrationFee}
                            </div>
                            <div className="col max-width-50 float">
                              {orderdetail?.orderdetail?.freight}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div className="card-table">
                        <div className="card-thead">
                          <div className="row">
                            <div className="col cust-label-bold align-self-start max-width-50 float">
                              {t("CON_INVOICE_FEE")}
                            </div>
                            <div className="col cust-label-bold align-self-start max-width-50 float">
                              {t("CON_POSTAGE")}
                            </div>
                          </div>
                        </div>
                        <div className="card-tbody">
                          <div className="row gray-bg">
                            <div className="col max-width-50 float" >
                              {orderdetail?.orderdetail?.invoiceFee}
                            </div>
                            <div className="col max-width-50 float">
                              {orderdetail?.orderdetail?.postage}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div className="card-table">
                        <div className="card-thead">
                          <div className="row">
                            <div className="col cust-label-bold align-self-start max-width-50 float">
                              {t("CON_INSURANCE")}
                            </div>
                            <div className="col cust-label-bold align-self-start max-width-50 float">
                              {t("CON_SURCHARGE")}
                            </div>
                          </div>
                        </div>
                        <div className="card-tbody">
                          <div className="row gray-bg">
                            <div className="col max-width-50 float">
                              {orderdetail?.orderdetail?.insurance}
                            </div>
                            <div className="col max-width-50 float">
                              {orderdetail?.orderdetail?.surcharge}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ListContainer>
        </Fragment>
      )}
      <div>
        <div className="sub-heading">
          <h3>{t("CON_ORDER_REFERENCES")}</h3>
        </div>
        <div className="odrder-basic-info">
          <div className="card-table">
            <div className="card-tbody">
              <div className="row">
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">{t("COH_HANDLER")}</div>
                    {webSettings?.showHandlerOrderDetails && <div className="cust-value">
                      {orderdetail?.orderdetail?.handlerCode}
                     <span className="m-2"> {orderdetail?.orderdetail?.handlerDesc}</span>
                    </div>}
                  </div>
                </div>
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">{t("CON_SALES_PERSON")}</div>
                  { webSettings?.showSalesMan && <div className="cust-value">
                      {orderdetail?.orderdetail?.salespersonCode}
                      <span className="m-2"> {orderdetail?.orderdetail?.salespersonDesc}</span>
                    </div>
}
                  </div>
                </div>
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">
                      {t("CON_YOUR_ORDER_NUMBER")}
                    </div>
                    <div className="cust-value">
                      {orderdetail?.orderdetail?.yourOrder}
                    </div>
                  </div>
                </div>
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">{t("CON_YOUR_ORDER")}</div>
                    <div className="cust-value">
                      {orderdetail?.orderdetail?.yourOrder}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">{t("COH_YOUR_REFERENCE")}</div>
                    <div className="cust-value">
                      {orderdetail?.orderdetail?.yourReference}
                    </div>
                  </div>
                </div>
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">{t("CON_OUR_REFERENCE")}</div>
                    <div className="cust-value">
                      {orderdetail?.orderdetail?.ourReference}
                    </div>
                  </div>
                </div>
                <div className="col align-self-start">
                  <div className="flex-container">
                  <div className="cust-label">{t("COH_GOODS_MARKING")}</div>
                 { webSettings?.showGoodsMarks &&  <div className="cust-value">
                      {orderdetail?.orderdetail?.goodsMarking}
                    </div>
}
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
    </div>
  );
};

export default OrderInformation;
