import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Button from "@common/Button";
import { HeartSVG, CopySVG, CheckCircleForModalSVG } from "@icons";
import OrderBasicLineItem from "./OrderBasicLineItem";
import { addItemInShoppingList } from "@actions/shoppingList/addItemsToShoppingList";
import { useGetLoggedInUserInfo } from "@hooks";
import Modal from "@common/Modal";
import { Link } from "react-router-dom";
import { CART, REQUESTSUBMIT } from "@constants/Routes";
import { setDefaultScreen } from "@slices/cart/getTemporaryOrderData";
import { useMediaQuery } from "@material-ui/core";
import { breakpoints } from "@constants/styled-components";

const ListContainer = styled.div`
  width: 100%;
`;

const OrderBasic = (orderdetail: any) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const sessionId = useGetLoggedInUserInfo()?.sessionId;
  const [sucessModalOpen, setSucessModalOpen] = useState<boolean>(false);
  const isMobile = useMediaQuery(`(min-width:${breakpoints.md})`);

  const AddItemsInList = () => {
    const addToListRequest: any = [];
    if (orderdetail?.orderdetail?.orderLineList != null) {
      orderdetail?.orderdetail?.orderLineList?.map((item: any) => {
        addToListRequest.push({
          itemCode: item.itemCode,
          unitCode: item.unit,
          quantity: item.ordered,
        });
      });
      dispatch(addItemInShoppingList(sessionId, addToListRequest));
      setSucessModalOpen(true);
    }
  };
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
                      {orderdetail?.orderdetail?.customerDesc}
                    </div>
                  </div>
                </div>
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">{t("COH_CUSTOMER_NUMBER")}</div>
                    <div className="cust-value">
                      {orderdetail?.orderdetail?.customerCode}
                    </div>
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
                    <div className="cust-label">{t("CON_PAYMENT_METHOD")}</div>
                    <div className="cust-value">
                      {t(orderdetail?.orderdetail?.paymentMethod)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">{t("CON_HELD")}</div>
                    <div className="cust-value">
                      {t(orderdetail?.orderdetail?.held)}
                    </div>
                  </div>
                </div>
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">
                      {t("CON_TERMS_OF_PAYMENT")}
                    </div>
                    <div className="cust-value">
                      {orderdetail?.orderdetail?.topCode}
                     <span className="m-2"> {orderdetail?.orderdetail?.topDesc}</span>
                    </div>
                  </div>
                </div>
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">{t("COH_CURRENCY")}</div>
                    <div className="cust-value">
                      {orderdetail?.orderdetail?.currency}
                    </div>
                  </div>
                </div>
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">{t("COH_ORDER_VALUE")}</div>
                    <div className="cust-value"></div>
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
                      {orderdetail?.orderdetail?.motCode}
                      <span className="m-2"> {orderdetail?.orderdetail?.motDesc}</span>
                    </div>
                  </div>
                </div>
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">
                      {t("CON_TERMS_OF_DELIVERY")}
                    </div>
                    <div className="cust-value">
                      {orderdetail?.orderdetail?.todCode}
                      <span className="m-2"> {orderdetail?.orderdetail?.todDesc}</span>
                    </div>
                  </div>
                </div>
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">
                      {t("CON_ORDER_VALUE_EXCLUDING_VAT")}
                    </div>
                    <div className="cust-value">
                      {orderdetail?.orderdetail?.orderValueExclVAT}
                    </div>
                  </div>
                </div>
                <div className="col align-self-start">
                  <div className="flex-container">
                    <div className="cust-label">
                      {t("CON_ORDER_VALUE_INCLUDING_VAT")}
                    </div>
                    <div className="cust-value">
                      {orderdetail?.orderdetail?.orderValueInclVAT}
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
            <h3>{t("CON_ORDER_LINES")}</h3>
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
              </div>
              <div
                style={{
                  float: "right",
                }}
                className="p-2"
              >
                <Link
                  to={`${CART}?referal=orderDetail`}
                  onClick={() => {
                    dispatch(
                      setDefaultScreen({
                        timeLine: { status: false, page: "cart" },
                        addProduct: { status: true },
                        interruptedCart: { status: false },
                      })
                    );
                  }}
                >
                  <Button variant="outlined" color="neutral" size="medium">
                    <CopySVG width="1.3em" height="1.3em" className='icon'/>
                    <span>{t("CON_COPY_ORDER_LINES")}</span>
                  </Button>
                </Link>

                <Link
                  to={`${REQUESTSUBMIT}?referal=orderDetail`}
                >
                  <Button variant="outlined" color="neutral" size="medium" style={{marginLeft:"1rem"}}>
                    <CopySVG width="1.3em" height="1.3em" className='icon'/>
                    <span>{t("CON_SUBMIT_REQUEST")}</span>
                  </Button>
                </Link>

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
            <OrderBasicLineItem orderdetails={orderdetail?.orderdetail} />
          </ListContainer>
        </div>
      </div>
    </div>
  );
};

export default OrderBasic;
