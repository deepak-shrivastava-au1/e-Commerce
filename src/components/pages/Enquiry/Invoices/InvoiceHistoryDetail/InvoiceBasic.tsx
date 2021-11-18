import { Fragment, useState,useContext} from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Button from "@common/Button";
import { HeartSVG, CopySVG, CheckCircleForModalSVG } from "@icons";
import InvoiceBasicLineItem from "./InvoiceBasicLineItem";
import { addItemInShoppingList } from "@actions/shoppingList/addItemsToShoppingList";
import { useGetLoggedInUserInfo } from "@hooks";
import Modal from "@common/Modal";
import { Link } from "react-router-dom";
import { CART, REQUESTSUBMIT } from "@constants/Routes";
import { setDefaultScreen } from "@slices/cart/getTemporaryOrderData";
import { useMediaQuery } from "@material-ui/core";
import { breakpoints } from "@constants/styled-components";
import { WebSettingsContext } from "@providers/WebsettingsProvider";

const ListContainer = styled.div`
  width: 100%;
`;

const InvoiceBasic = (invoicedetails: any) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const sessionId = useGetLoggedInUserInfo()?.sessionId;
  const [sucessModalOpen, setSucessModalOpen] = useState<boolean>(false);
  const isMobile = useMediaQuery(`(min-width:${breakpoints.md})`);
  const webSettings: any = useContext(WebSettingsContext);

 const invoicedetail = invoicedetails?.invoicedetails;
  const AddItemsInList = () => {
    const addToListRequest: any = [];
    if (invoicedetail?.invoiceLineBeanList != null) {
      invoicedetail?.invoiceLineBeanList?.map((item: any) => {
        addToListRequest.push({
          itemCode: item.item,
          unitCode: item.unit,
          quantity: item.quantity,
        });
      });
      dispatch(addItemInShoppingList(sessionId, addToListRequest));
      setSucessModalOpen(true);
    }
  }
  
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
                      {invoicedetail?.customerDesc}
                    </div>
                  </div>
                </div>
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">{t("COH_CUSTOMER_NUMBER")}</div>
                    <div className="cust-value">
                      {invoicedetail?.customerCode}
                    </div>
                  </div>
                </div>
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">
                      {t("CON_INVOICE_NUMBER")}
                    </div>
                    <div className="cust-value">
                      {invoicedetail?.invoiceNumber}
                    </div>
                  </div>
                </div>
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">{t("CON_DOCUMENT_TYPE")}</div>
                    <div className="cust-value">
                      {invoicedetail?.documentType}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">{t("CON_DOCUMENT_DATE")}</div>
                    <div className="cust-value">
                      {invoicedetail?.documentDate}
                    </div>
                  </div>
                </div>
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">
                      {t("CON_TERMS_OF_PAYMENT")}
                    </div>
                    <div className="cust-value">
                      {invoicedetail?.topCode}
                     <span className="m-2"> {invoicedetail?.topDesc}</span>
                    </div>
                  </div>
                </div>
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">{t("COH_CURRENCY")}</div>
                    <div className="cust-value">
                      {invoicedetail?.primeCurrency}
                    </div>
                  </div>
                </div>
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">{t("COH_GOODS_MARKING")}</div>
                    {webSettings?.showGoodsMarks && <div className="cust-value">{invoicedetail?.goodsMarking}</div>}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">
                      {t("CON_MANNER_OF_TRANSPORT")}
                    </div>
                    <div className="cust-value">
                      {invoicedetail?.motCode}
                      <span className="m-2"> {invoicedetail?.motDesc}</span>
                    </div>
                  </div>
                </div>
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">
                      {t("CON_TERMS_OF_DELIVERY")}
                    </div>
                    <div className="cust-value">
                      {invoicedetail?.todCode}
                      <span className="m-2"> {invoicedetail?.todDesc}</span>
                    </div>
                  </div>
                </div>
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">
                      {t("CON_INVOICE_VALUE_EXCLUDING_VAT")}
                    </div>
                    <div className="cust-value">
                      {invoicedetail?.amountExcludingVAT}
                    </div>
                  </div>
                </div>
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">
                      {t("CON_INVOICE_VALUE_INCLUDING_VAT")}
                    </div>
                    <div className="cust-value">
                      {invoicedetail?.amountIncludingVAT}
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
            <h3>{t("CON_INVOICE_LINE")}</h3>
          </div>
          {isMobile && (
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
                  onClick={AddItemsInList}
                >
                  <HeartSVG width="1.3em" height="1.3em" className='icon' />
                  <span>Add all to List</span>
                </Button>

                <Link
                  to={`${REQUESTSUBMIT}?referal=invoiceDetail`}
                >
                  <Button variant="outlined" color="neutral" size="medium" style={{marginLeft:"1rem"}}>
                    <CopySVG width="1.3em" height="1.3em" className='icon' />
                    <span>{t("CON_SUBMIT_REQUEST")}</span>
                  </Button>
                </Link>
              </div>
              <div
                style={{
                  float: "right",
                }}
                className="p-2"
              >
                
              </div>
              <Modal
                isAlert
                icon={<CheckCircleForModalSVG />}
                title="Added to default list"
                message="Items has been added to your default list."
                isOpen={sucessModalOpen}
                onRequestClose={() => setSucessModalOpen(false)}
                hasCancelButton={false}
                secondaryActionText="ok"
                onSecondaryButtonClick={() => {
                  setSucessModalOpen(false);
                }}
              />
            </Fragment>
          )}
        </div>
        <div>
          <ListContainer>
            <InvoiceBasicLineItem invoicedetails={invoicedetail} />
          </ListContainer>
        </div>
      </div>
    </div>
  );
};

export default InvoiceBasic;
