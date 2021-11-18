import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { WebSettingsContext } from "@providers/WebsettingsProvider";

const InvoiceInformation = (invoicedetails: any) => {
  const { t } = useTranslation();
  const webSettings: any = useContext(WebSettingsContext);
  const invoicedetail = invoicedetails?.invoicedetails;
  return (
    <div className="d-flex flex-column  w-100">
      <div>
        <div className="odrder-basic-info">
          <div className="card-table">
            <div className="card-tbody">
              <div className="row">
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">{t("COH_HANDLER")}</div>
                    {webSettings?.showHandlerOrderDetails && (
                      <div className="cust-value">
                        {invoicedetail?.handlerCode}
                        <span className="m-2">
                         {invoicedetail?.handlerDesc}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">{t("CON_SALES_PERSON")}</div>
                    {webSettings?.showSalesMan && (
                      <div className="cust-value">
                        {invoicedetail?.salespersonCode}
                        <span className="m-2">
                         {invoicedetail?.salespersonDesc}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">{t("CON_ORDER_NUMBER")}</div>
                    <div className="cust-value">
                      {invoicedetail?.orderNumber}
                    </div>
                  </div>
                </div>
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">{t("COH_ORDER_DATE")}</div>
                    <div className="cust-value">{invoicedetail?.orderDate}</div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">
                      {t("CON_ORDER_REFERENCES")}
                    </div>
                    <div className="cust-value">
                      {invoicedetail?.orderReference}
                    </div>
                  </div>
                </div>
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">{t("COH_YOUR_REFERENCE")}</div>
                    <div className="cust-value">
                      {invoicedetail?.yourReference}
                    </div>
                  </div>
                </div>
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">{t("COH_GOODS_MARKING")}</div>
                    {webSettings?.showGoodsMarks && (
                      <div className="cust-value">
                        {invoicedetail?.goodsMarking}
                      </div>
                    )}
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

export default InvoiceInformation;
