import Checkbox from "@common/Checkbox";
import LoadingOverlay from "@common/LoadingOverlay";
import ScrollToTop from "@common/ScrollToTop";
import Button from "@common/Button";
import { ArrowLeft, CartDeleteSVG, CartSVG, CloseSVG, NoData } from "@icons";
import { UserCartContext } from "@providers/UserCartCtxProvider";
import {
  deleteInterruptedCart,
  fetchInterruptedCart,
  initializeInterruptedCartLoader,
  InterruptedCartSelector,
  setInterruptedCartErrors,
  setInterruptedCartMessageCode,
} from "@slices/cart/getInterruptedCart";
import {
  fetchEditCart,
  initializeCartLoader,
} from "@slices/cart/getTemporaryOrderData";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Warning } from "@material-ui/icons";
import { getErrorMsgForShoppingCart } from "@utilities/error/serviceErrorCodeUtil";
import Modal from "@common/Modal";
import styled from "styled-components";
import { respondTo } from "@utilities/styled-components";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;

  ${respondTo.xs`
    flex-direction:column;
    align-items:start;
    >button{
      margin-top:5px;
    }
  `}

  ${respondTo.sm`
    flex-direction:row;
    align-items: center;
    >button{
      margin-top:0px;
    }
  `}
`;


function Index() {

  const {
    data: interruptedCartData,
    loading: isInterruptedCartLoading,
    hasErrors,
    messageCode,
  } = useSelector(InterruptedCartSelector);

  const {
    t,
    dispatch,
    sessionId,
    setDefaultScreen,
    interruptedCartFormatedCurrency,
  }: any = useContext(UserCartContext);

  const [cartList, setCartList] = useState<
    Array<{
      showWarning: boolean;
      orderLocks: string;
      currencyCode: string;
      select: boolean;
      orderNo: string;
      date: string;
      value: string;
      lines: number;
      inUse: string;
      confirmed: boolean;
      marking: string;
    }>
  >([]);

  const [isSelectAll, setIsSelectAll] = useState<boolean>(false);

  const titleList = [
    "CON_SELECT",
    "COH_ACTIONS",
    "CON_ORDER",
    "CON_DATE",
    "CON_VALUE",
    "COH_LINES",
    "COH_IN_USE",
    "CON_CONFIRMED",
    "COH_GOODS_MARKING",
  ];

  useEffect(() => {
    dispatch(initializeInterruptedCartLoader());
    dispatch(fetchInterruptedCart(sessionId));
  }, []);

  useEffect(() => {
    if (
      interruptedCartData &&
      typeof interruptedCartData !== "undefined" &&
      interruptedCartData !== null &&
      interruptedCartData.cartList
    ) {
      setIsSelectAll(false);

      setCartList(
        Object.values(interruptedCartData?.cartList).map(
          (cart: any, i: number) => {
            return {
              select: false,
              orderNo: cart?.orderNumber,
              date: cart?.date,
              value: cart?.value,
              currencyCode: cart?.currencyCode,
              marking: cart?.goodsMarking,
              inUse: cart?.inUse,
              confirmed: cart?.isConfirmed,
              lines: cart?.lineCount,
              orderLocks: cart?.orderLocks,
              showWarning: cart?.showWarning,
            };
          }
        )
      );
    }
  }, [interruptedCartData]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Button
        variant='outlined'
        color='neutral'
        onClick={() =>
          dispatch(
            setDefaultScreen({
              timeLine: {
                status: true,
                page: "cart",
              },
              addProduct: { status: false },
              interruptedCart: { status: false },
            })
          )
        }
        style={{ border: "0", background: "transparent" }}
      >
        <ArrowLeft className='icon' style={{ marginRight: "11px" }} />
        <span>{t("CON_GO_TO_CART")}</span>
      </Button>

      <Header>
        <Checkbox
          labelText={t("CON_SELECT_ALL")}
          checked={isSelectAll}
          onChange={(e) => {
            const isChecked = e.target.checked;

            setIsSelectAll(e.target.checked);

            setCartList((prevState) => {
              const copiedArr = [...prevState];
              return copiedArr.map((obj) => {
                return {
                  ...obj,
                  select: isChecked ? true : false,
                };
              });
            });
          }}
        />
        <Button
          color='critical'
          onClick={() => {
            dispatch(initializeInterruptedCartLoader());
            dispatch(
              deleteInterruptedCart({
                sessionId,
                data: cartList
                  .filter((cart) => cart.select)
                  .map((cart) => {
                    return { orderNumber: cart.orderNo };
                  }),
              })
            );
          }}
          disabled={cartList.filter((cart) => cart.select).length === 0}
        >
          <CartDeleteSVG width='19px' className='secondary-icon-2' />
          <span style={{ marginLeft: "5px" }}>
            {t("CONF_DELETE_SELECTED_INTERRUPTED_CARTS")}
          </span>
        </Button>
      </Header>

      {/* Scroll to top */}
      <ScrollToTop />

      {/* Main */}
      <div className='card-table'>
        <div className='card-thead'>
          <div className='row'>
            {titleList.map((title, i) => (
              <div className='col' key={`${title}${i}`}>
                <div className='d-flex'>
                  <div className='col-title'>{t(title)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='card-tbody'>
          {cartList?.length === 0 && (
            <div className='d-flex flex-column justify-content-center align-items-center mt-10'>
              <NoData className='primary-icon-1' />
              <span>{t("CON_NO_DATA_FOUND")}</span>
            </div>
          )}
          {cartList?.map((cart, i) => {
            return (
              <div className='row' key={`${i}${cart?.orderNo}`}>
                <div className='col'>
                  <div className='flex-container'>
                    <div className='label'>{t("CON_SELECT")}</div>
                    <div>
                      <Checkbox
                        showLabel={false}
                        checked={cartList[i].select}
                        onChange={(e) => {
                          setCartList((prevState) => {
                            const copiedArr = [...prevState];
                            copiedArr[i].select = e.target.checked;
                            return copiedArr;
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className='col'>
                  <div className='flex-container'>
                    <div className='label'>{t("COH_ACTIONS")}</div>
                    <span
                      title={t("CON_ADD_TO_CART")}
                      style={{ width: "max-content" }}
                    >
                      <CartSVG
                        className='primary-icon-1'
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          dispatch(initializeCartLoader());
                          dispatch(fetchEditCart(sessionId, cart.orderNo));
                          dispatch(
                            setDefaultScreen({
                              timeLine: {
                                status: true,
                                page: "cart",
                              },
                              addProduct: { status: false },
                              interruptedCart: { status: false },
                            })
                          );
                        }}
                      />

                      {cart?.inUse === "yes" ? (
                        <Warning color='action' />
                      ) : null}
                    </span>
                  </div>
                </div>
                <div className='col'>
                  <div className='flex-container'>
                    <div className='label'>{t("CON_ORDER")}</div>
                    <div>{cart.orderNo}</div>
                  </div>
                </div>
                <div className='col'>
                  <div className='flex-container'>
                    <div className='label'>{t("CON_DATE")}</div>
                    <div> {cart.date} </div>
                  </div>
                </div>
                <div className='col'>
                  <div className='flex-container'>
                    <div className='label'>{t("CON_VALUE")}</div>
                    <div>{interruptedCartFormatedCurrency(cart.value)}</div>
                  </div>
                </div>
                <div className='col'>
                  <div className='flex-container'>
                    <div className='label'>{t("COH_LINES")}</div>
                    <div>{cart.lines}</div>
                  </div>
                </div>
                <div className='col'>
                  <div className='flex-container'>
                    <div className='label'>{t("COH_IN_USE")}</div>
                    <div>{cart.inUse}</div>
                  </div>
                </div>
                <div className='col'>
                  <div className='flex-container'>
                    <div className='label'>{t("CON_CONFIRMED")}</div>
                    <div>{cart.confirmed}</div>
                  </div>
                </div>
                <div className='col'>
                  <div className='flex-container'>
                    <div className='label'>{t("COH_GOODS_MARKING")}</div>
                    <div>{cart.marking ? cart.marking : "-"}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cart loader */}
        <LoadingOverlay active={isInterruptedCartLoading} />

        {/* Error Handling */}
        <Modal
          isAlert
          icon={
            <div className='icon-fail'>
              <CloseSVG className='icon' />
            </div>
          }
          title={t(getErrorMsgForShoppingCart(messageCode))}
          message={""}
          isOpen={hasErrors}
          hasCancelButton={false}
          onRequestClose={() => {
            dispatch(setInterruptedCartErrors(false));
            dispatch(setInterruptedCartMessageCode(""));
          }}
          secondaryActionText={t("CON_OK")}
          onSecondaryButtonClick={() => {
            dispatch(setInterruptedCartErrors(false));
            dispatch(setInterruptedCartMessageCode(""));
          }}
        />
      </div>
    </div>
  );
}

export default Index;
