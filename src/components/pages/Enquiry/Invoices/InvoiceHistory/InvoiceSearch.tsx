import React, { useState, Fragment, useEffect, useContext } from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@common/Button";
import { SearchSVG } from "@icons";
import styled from "styled-components";
import Input from "@common/Input";
import Select from "@common/Select";
import { useTranslation } from "react-i18next";
import { respondTo } from "@utilities/styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  invoiceFilterDetails,
  invoicehistorySelector,
  invoicehistoryactions,
} from "@slices/Enquiry/Invoices/InvoiceHistory";
import { useGetLoggedInUserInfo } from "@hooks";
import { WebSettingsContext } from "@providers/WebsettingsProvider";

const DrawerRight = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-around;
`;

const Drawer = styled.figure`
  width: 400px;
  ${respondTo.xs`
     width: calc(100vw - 20px);
    `}
  ${respondTo.sm`
     width: calc(100vw - 20px);
    `}
      ${respondTo.md`
      width: 400px;
    `}
`;

const DrawerHeader = styled.h3`
  padding: 10px 0px 5px 15px;
  font-weight: var(--font-weight-medium);
`;

const DrawerCaption = styled.figcaption`
  padding: 0px 20px;
`;
const Filterdiv = styled.div`
  padding: 10px 0 10px 0px;
`;

export default function InvoiceSearch() {
  const webSettingsData: any = useContext(WebSettingsContext);
  const { t, i18n } = useTranslation();
  const searchstate = useSelector(invoicehistorySelector);
  const [state, setState] = React.useState<any>({
    right: false,
  });

  const sessionId = useGetLoggedInUserInfo()?.sessionId;
  const dispatch = useDispatch();

  useEffect(() => {
    if (sessionId) {
      dispatch(invoiceFilterDetails(sessionId));
    }
  }, [sessionId]);

  // const customerlist =
  //   searchstate?.invoiceHistory?.searchFilterslist?.customerList?.filter(
  //     (data: any) =>
  //       typeof data.defaultCode == undefined ? "" : data.defaultCode
  //   );
  // const defaultcode =
  //   customerlist?.length > 0
  //     ? customerlist?.find((data: any) => data.defaultCode).defaultCode
  //     : "";

  const [inputValueState, setInputValueState] = useState<any>({
    invoicenoInput: "",
    ordernoInput: "",
    orderrefInput: "",
    yourordernoInput: "",
    invoiceCustomerInput: "",
    productInput: "",
    descriptionInput: "",
    addressInput: "",
    serialnoInput: "",
  });
  const [customerState, setCustomerState] = useState<any>(
    webSettingsData?.defaultCustomerCode
  );
  const [invoiceTypeState, setInvoiceTypeState] = useState<any>(0);
  const [salesPersonState, setSalesPersonState] = useState<any>("*ALL");

  useEffect(() => {
    setCustomerState(webSettingsData?.defaultCustomerCode);
  }, []);

  const filterSettings = searchstate?.invoiceHistory?.searchFilterSettings;

  const onClearHandler = () => {
    dispatch(invoicehistoryactions.clearSearchFilter());
    setCustomerState(webSettingsData?.defaultCustomerCode);
    setInputValueState({
      invoicenoInput: "",
      ordernoInput: "",
      orderrefInput: "",
      yourordernoInput: "",
      invoiceCustomerInput: "",
      productInput: "",
      descriptionInput: "",
      addressInput: "",
      serialnoInput: "",
    });
    setInvoiceTypeState(0);
    setSalesPersonState("*ALL");
    setState(false);
  };

  useEffect(() => {
    if (!searchstate?.invoiceHistory?.isFilterApply) {
      onClearHandler();
    }
  }, [searchstate?.invoiceHistory?.isFilterApply]);
  // Open and Close Drawer Handler
  const toggleDrawer = (anchor: any, open: any) => (event: any) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const onSearchHandler = () => {
    dispatch(
      invoicehistoryactions.updateSearchFilter({
        customerSearch:
          filterSettings?.filterBeans?.filter(
            (data: any) => data.filterName == "CON_CUSTOMER" && data.isEnabled
          ).length > 0
            ? customerState
            : "",
        invoicenoSearch: inputValueState.invoicenoInput,
        ordernoSearch: inputValueState.ordernoInput,
        orderrefSearch: inputValueState.orderrefInput,
        yourordernoSearch: inputValueState.yourordernoInput,
        invoiceCustomerSearch: inputValueState.invoiceCustomerInput,
        productSearch: inputValueState.productInput,
        descriptionSearch: inputValueState.descriptionInput,
        addressSearch: inputValueState.addressInput,
        serialnoSearch: inputValueState.serialnoInput,
        invoiceTypeSearch: invoiceTypeState,
        salesPersonSearch: salesPersonState,
      })
    );
    setState(false);
  };

  return (
    <div>
      {["Click"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            variant='solid'
            style={{ padding: "7px 16px" }}
            onClick={toggleDrawer(anchor, true)}
          >
            <SearchSVG className='icon' />
            <span>{t("CON_SEARCH")}</span>
          </Button>

          <SwipeableDrawer
            anchor={"right"}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            <div className='row'>
              <DrawerRight className='col-md-12'>
                <Drawer>
                  <DrawerHeader>
                    {t("CON_SEARCH")}
                    <span style={{ float: "right", cursor: "pointer" }}>
                      <CloseIcon
                        onClick={toggleDrawer(anchor, false)}
                        className='primary-icon-3 icon-md'
                      />
                    </span>
                    <hr />
                  </DrawerHeader>
                  <div>
                    <DrawerCaption>
                      {filterSettings?.filterBeans?.filter(
                        (data: any) =>
                          data.filterName == "CON_INVOICE_NUMBER" &&
                          data.isEnabled
                      ).length > 0 && (
                        <div>
                          <Input
                            type='text'
                            showLabel={true}
                            labelText={t("CON_INVOICE_NUMBER")}
                            onChange={(value: any) => {
                              setInputValueState((prevState: any) => {
                                return { ...prevState, invoicenoInput: value };
                              });
                            }}
                            value={inputValueState.invoicenoInput}
                          />
                        </div>
                      )}
                      {filterSettings?.filterBeans?.filter(
                        (data: any) =>
                          data.filterName == "CON_ORDER_NUMBER" &&
                          data.isEnabled
                      ).length > 0 && (
                        <div>
                          <Input
                            type='text'
                            showLabel={true}
                            labelText={t("CON_ORDER_NUMBER")}
                            onChange={(value: any) => {
                              setInputValueState((prevState: any) => {
                                return { ...prevState, ordernoInput: value };
                              });
                            }}
                            value={inputValueState.ordernoInput}
                          />
                        </div>
                      )}
                      {filterSettings?.filterBeans?.filter(
                        (data: any) =>
                          data.filterName == "CON_ORDER_REFERENCE" &&
                          data.isEnabled
                      ).length > 0 && (
                        <div>
                          <Input
                            type='text'
                            showLabel={true}
                            labelText={t("CON_ORDER_REFERENCE")}
                            onChange={(value: any) => {
                              setInputValueState((prevState: any) => {
                                return { ...prevState, orderrefInput: value };
                              });
                            }}
                            value={inputValueState.orderrefInput}
                          />
                        </div>
                      )}
                      {filterSettings?.filterBeans?.filter(
                        (data: any) =>
                          data.filterName == "CON_YOUR_ORDER_NUMBER" &&
                          data.isEnabled
                      ).length > 0 && (
                        <div>
                          <Input
                            type='text'
                            showLabel={true}
                            labelText={t("CON_YOUR_ORDER_NUMBER")}
                            onChange={(value: any) => {
                              setInputValueState((prevState: any) => {
                                return {
                                  ...prevState,
                                  yourordernoInput: value,
                                };
                              });
                            }}
                            value={inputValueState.yourordernoInput}
                          />
                        </div>
                      )}
                      {filterSettings?.filterBeans?.filter(
                        (data: any) =>
                          data.filterName == "CON_INVOICE_CUSTOMER" &&
                          data.isEnabled
                      ).length > 0 && (
                        <div>
                          <Input
                            type='text'
                            showLabel={true}
                            labelText={t("CON_INVOICE_CUSTOMER")}
                            onChange={(value: any) => {
                              setInputValueState((prevState: any) => {
                                return {
                                  ...prevState,
                                  invoiceCustomerInput: value,
                                };
                              });
                            }}
                            value={inputValueState.invoiceCustomerInput}
                          />
                        </div>
                      )}
                      {filterSettings?.filterBeans?.filter(
                        (data: any) =>
                          data.filterName == "CON_CUSTOMER" && data.isEnabled
                      ).length > 0 && (
                        <Filterdiv>
                          <Select
                            showLabel={true}
                            onChange={(value: any) => {
                              setCustomerState(value);
                            }}
                            options={searchstate?.invoiceHistory?.searchFilterslist?.customerList?.map(
                              (item: any) => {
                                return {
                                  label: item.description,
                                  value: item.code,
                                  selected:
                                    item.code ===
                                    webSettingsData?.defaultCustomerCode,
                                };
                              }
                            )}
                            value={customerState}
                            labelText={t("CON_CUSTOMER")}
                          />
                        </Filterdiv>
                      )}
                      {filterSettings?.filterBeans?.filter(
                        (data: any) =>
                          data.filterName == "CON_INVOICE_TYPE" &&
                          data.isEnabled
                      ).length > 0 && (
                        <Filterdiv>
                          <Select
                            showLabel={true}
                            onChange={(value: any) => {
                              setInvoiceTypeState(value);
                            }}
                            options={searchstate?.invoiceHistory?.searchFilterslist?.invoiceTypeList?.map(
                              (item: any) => {
                                return {
                                  label: item.description,
                                  value: item.code,
                                };
                              }
                            )}
                            value={invoiceTypeState}
                            labelText={t("CON_INVOICE_TYPE")}
                          />
                        </Filterdiv>
                      )}
                      {filterSettings?.filterBeans?.filter(
                        (data: any) =>
                          data.filterName == "CON_SALES_PERSON" &&
                          data.isEnabled
                      ).length > 0 && (
                        <Filterdiv>
                          <Select
                            showLabel={true}
                            onChange={(value: any) => {
                              setSalesPersonState(value);
                            }}
                            options={searchstate?.invoiceHistory?.searchFilterslist?.salesmanList?.map(
                              (item: any) => {
                                return {
                                  label: item.description,
                                  value: item.code,
                                };
                              }
                            )}
                            value={salesPersonState}
                            labelText={t("CON_SALES_PERSON")}
                          />
                        </Filterdiv>
                      )}
                      {filterSettings?.filterBeans?.filter(
                        (data: any) =>
                          data.filterName == "CON_PRODUCT" && data.isEnabled
                      ).length > 0 && (
                        <div>
                          <Input
                            type='text'
                            showLabel={true}
                            labelText={t("CON_PRODUCT")}
                            onChange={(value: any) => {
                              setInputValueState((prevState: any) => {
                                return { ...prevState, productInput: value };
                              });
                            }}
                            value={inputValueState.productInput}
                          />
                        </div>
                      )}
                      {filterSettings?.filterBeans?.filter(
                        (data: any) =>
                          data.filterName == "CON_DESCRIPTION" && data.isEnabled
                      ).length > 0 && (
                        <div>
                          <Input
                            type='text'
                            showLabel={true}
                            labelText={t("CON_DESCRIPTION")}
                            onChange={(value: any) => {
                              setInputValueState((prevState: any) => {
                                return {
                                  ...prevState,
                                  descriptionInput: value,
                                };
                              });
                            }}
                            value={inputValueState.descriptionInput}
                          />
                        </div>
                      )}
                      {filterSettings?.filterBeans?.filter(
                        (data: any) =>
                          data.filterName == "CON_ADDRESS" && data.isEnabled
                      ).length > 0 && (
                        <div>
                          <Input
                            type='text'
                            showLabel={true}
                            labelText={t("CON_ADDRESS")}
                            onChange={(value: any) => {
                              setInputValueState((prevState: any) => {
                                return { ...prevState, addressInput: value };
                              });
                            }}
                            value={inputValueState.addressInput}
                          />
                        </div>
                      )}
                      {filterSettings?.filterBeans?.filter(
                        (data: any) =>
                          data.filterName == "CON_SERIAL_NUMBER" &&
                          data.isEnabled
                      ).length > 0 && (
                        <div>
                          <Input
                            type='text'
                            showLabel={true}
                            labelText={t("CON_SERIAL_NUMBER")}
                            onChange={(value: any) => {
                              setInputValueState((prevState: any) => {
                                return { ...prevState, serialnoInput: value };
                              });
                            }}
                            value={inputValueState.serialnoInput}
                          />
                        </div>
                      )}

                      <div
                        style={{
                          justifyContent: "space-between",
                          marginTop: "24px",
                        }}
                        className='row'
                      >
                        <Button
                          style={{
                            width: "45%",
                            marginTop: "8px",
                            paddingRight: "20px",
                          }}
                          onClick={onClearHandler}
                        >
                          <span>{t("CON_CLEARALL")}</span>
                        </Button>
                        <Button
                          variant='solid'
                          style={{ width: "45%", marginTop: "8px" }}
                          onClick={onSearchHandler}
                        >
                          <span>{t("CON_SEARCH")}</span>
                        </Button>
                      </div>
                    </DrawerCaption>
                  </div>
                </Drawer>
              </DrawerRight>
            </div>
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
