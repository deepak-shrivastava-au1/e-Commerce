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
  requestFilterDetails,
  requesthistoryactions,
  requestSelector,
} from "@slices/Enquiry/Request/RequestHistory";
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
  const { t, i18n } = useTranslation();
  const searchstate = useSelector(requestSelector);
  const [state, setState] = React.useState<any>({
    right: false,
  });

  const sessionId = useGetLoggedInUserInfo()?.sessionId;
  const dispatch = useDispatch();

  useEffect(() => {
    if (sessionId) {
      dispatch(requestFilterDetails(sessionId));
    }
  }, [sessionId]);

  const customerlist =
    searchstate?.requestHistory?.searchFilterslist?.customerList?.filter(
      (data: any) =>
        typeof data.defaultCode == undefined ? "" : data.defaultCode
    );
  const defaultcode =
    customerlist?.length > 0
      ? customerlist?.find((data: any) => data.defaultCode).defaultCode
      : "";

  const [inputValueState, setInputValueState] = useState<any>({
    requestnoInput: "",
    refnoInput: "",
    yourrefInput: "",
});
  const [customerState, setCustomerState] = useState<any>(defaultcode);
  const [statusState, setStatusState] = useState<any>("*ALL");
  const [reqTypeState, setreqTypeState] = useState<any>("*ALL");

  useEffect(() => {
    setCustomerState(defaultcode);
  }, []);

  const filterSettings = searchstate?.requestHistory?.searchFilterSettings;

  const onClearHandler = () => {
    dispatch(requesthistoryactions.clearSearchFilter());
    setCustomerState(defaultcode);
    setInputValueState({
        requestnoInput: "",
        refnoInput: "",
        yourrefInput: "",
    });
    setStatusState("*ALL");
    setreqTypeState("*ALL");
    setState(false);
  };

  useEffect(() => {
    if (!searchstate?.requestHistory?.isFilterApply) {
      onClearHandler();
    }
  }, [searchstate?.requestHistory?.isFilterApply]);
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
      requesthistoryactions.updateSearchFilter({
        Customer:
          filterSettings?.filterBeans?.filter(
            (data: any) => data.filterName == "CON_CUSTOMER" && data.isEnabled
          ).length > 0
            ? customerState
            : "",
        Status: statusState,
        RequestType: reqTypeState,
        RequestNumber: inputValueState.requestnoInput,
        ReferenceNumber: inputValueState.refnoInput,
        YourReference: inputValueState.yourrefInput,
      
      
      })
    );
    setState(false);
  };
  const webSettingsData: any = useContext(WebSettingsContext);

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
                          data.filterName == "CON_REQUEST_NUMBER" &&
                          data.isEnabled
                      ).length > 0 && (
                        <div>
                          <Input
                            type='text'
                            showLabel={true}
                            labelText={t("CON_REQUEST_NUMBER")}
                            onChange={(value: any) => {
                              setInputValueState((prevState: any) => {
                                return { ...prevState, requestnoInput: value };
                              });
                            }}
                            value={inputValueState.requestnoInput}
                          />
                        </div>
                      )}
                      {filterSettings?.filterBeans?.filter(
                        (data: any) =>
                          data.filterName == "CON_REFERENCE_NUMBER" &&
                          data.isEnabled
                      ).length > 0 && (
                        <div>
                          <Input
                            type='text'
                            showLabel={true}
                            labelText={t("CON_REFERENCE_NUMBER")}
                            onChange={(value: any) => {
                              setInputValueState((prevState: any) => {
                                return { ...prevState, refnoInput: value };
                              });
                            }}
                            value={inputValueState.refnoInput}
                          />
                        </div>
                      )}
                      {filterSettings?.filterBeans?.filter(
                        (data: any) =>
                          data.filterName == "CON_YOUR_REFERENCE" &&
                          data.isEnabled
                      ).length > 0 && (
                        <div>
                          <Input
                            type='text'
                            showLabel={true}
                            labelText={t("CON_YOUR_REFERENCE")}
                            onChange={(value: any) => {
                              setInputValueState((prevState: any) => {
                                return { ...prevState, yourrefInput: value };
                              });
                            }}
                            value={inputValueState.yourrefInput}
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
                            options={searchstate?.requestHistory?.searchFilterslist?.customerList?.map(
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
                          data.filterName == "CON_STATUS" &&
                          data.isEnabled
                      ).length > 0 && (
                        <Filterdiv>
                          <Select
                            showLabel={true}
                            onChange={(value: any) => {
                              setStatusState(value);
                            }}
                            options={searchstate?.requestHistory?.searchFilterslist?.requestStatusList?.map(
                              (item: any) => {
                                return {
                                  label: item.description,
                                  value: item.code,
                                };
                              }
                            )}
                            value={statusState}
                            labelText={t("CON_STATUS")}
                          />
                        </Filterdiv>
                      )}
                      {filterSettings?.filterBeans?.filter(
                        (data: any) =>
                          data.filterName == "CON_REQUEST_TYPE" &&
                          data.isEnabled
                      ).length > 0 && (
                        <Filterdiv>
                          <Select
                            showLabel={true}
                            onChange={(value: any) => {
                              setreqTypeState(value);
                            }}
                            options={searchstate?.requestHistory?.searchFilterslist?.requestTypeList?.map(
                              (item: any) => {
                                return {
                                  label: item.description,
                                  value: item.code,
                                };
                              }
                            )}
                            value={reqTypeState}
                            labelText={t("CON_REQUEST_TYPE")}
                          />
                        </Filterdiv>
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
