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
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { WebSettingsContext } from "@providers/WebsettingsProvider";

//import MomentInput from 'react-moment-input';
import {
  transactionFilterDetails,
  transactionSelector,
  transactionactions,
} from "@slices/Enquiry/Transactions/transactions";
import { useGetLoggedInUserInfo } from "@hooks";

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
  padding: 0 0 10px 0;
`;

const DefaultSet = [
  {
    label: "ALL",
    value: "*ALL",
  },
  {
    label: "EQUALS",
    value: "*EQ",
  },
  {
    label: "LESS THAN",
    value: "*LT",
  },
  {
    label: "GREATER THAN",
    value: "*GT",
  },
  {
    label: "NOT EQUAL TO",
    value: "*NE",
  },
  {
    label: "LESS THAN OR EQUAL TO",
    value: "*LE",
  },
  {
    label: "GREATER THAN OR EQUAL TO",
    value: "*GE",
  },
  {
    label: "BETWEEN",
    value: "*BETWEEN",
  },
  {
    label: "NOT BETWEEN",
    value: "*NOT_BETWEEN",
  },
];

export default function TransactionSearch() {
  const webSettingsData: any = useContext(WebSettingsContext);
  const { t, i18n } = useTranslation();
  const searchstate = useSelector(transactionSelector);
  const [state, setState] = React.useState<any>({
    right: false,
  });
  const [searchValidity, setSearchValidity] = useState<Boolean>(true);

  const sessionId = useGetLoggedInUserInfo()?.sessionId;
  const dispatch = useDispatch();

  useEffect(() => {
    if (sessionId) {
      dispatch(transactionFilterDetails(sessionId));
    }
  }, [sessionId]);

  // const customerlist =
  //   searchstate?.transaction?.searchFilterslist?.customerList?.filter(
  //     (data: any) =>
  //       typeof data.defaultCode == undefined ? "" : data.defaultCode
  //   );
  // const defaultcode =
  //   customerlist?.length > 0
  //     ? customerlist?.find((data: any) => data.defaultCode).defaultCode
  //     : "";

  const [currencyValue, setCurrencyState] = useState<string>("*ALL");
  const [customerState, setCustomerState] = useState<any>(
    webSettingsData?.defaultCustomerCode
  );
  const [originalAmtState, setOriginalAmtState] = useState<any>("*ALL");
  const [originalAmtValState, setOriginalAmtValState] = useState<any>({
    showOrgAmtVal1: false,
    OrgAmtVal1: "",
    showOrgAmtVal2: false,
    OrgAmtVal2: "",
    IsInValidOrgAmtVal1: false,
    IsInValidOrgAmtVal2: false,
  });
  const [remainingAmtState, setRemainingAmtState] = useState<any>("*ALL");
  const [remainingAmtValState, setRemainingAmtValState] = useState<any>({
    showRemAmtVal1: false,
    RemAmtVal1: "",
    showRemAmtVal2: false,
    RemAmtVal2: "",
    IsInValidRemAmtVal1: false,
    IsInValidRemAmtVal2: false,
  });
  const [docDateState, setDocDateState] = useState<any>("*ALL");
  const [docDateValState, setDocDateValState] = useState<any>({
    showDocDateVal1: false,
    DocDateVal1: "",
    showDocDateVal2: false,
    DocDateVal2: "",
    IsInValidDocDateVal1: false,
    IsInValidDocDateVal2: false,
  });
  const [dueDateState, setDueDateState] = useState<any>("*ALL");
  const [dueDateValState, setDueDateValState] = useState<any>({
    showDueDateVal1: false,
    DueDateVal1: "",
    showDueDateVal2: false,
    DueDateVal2: "",
    IsInValidDueDateVal1: false,
    IsInValidDueDateVal2: false,
  });

  useEffect(() => {
    setCustomerState(webSettingsData?.defaultCustomerCode);
  }, []);

  const filterSettings = searchstate?.transactions?.searchFilterSettings;
  const dateformat = filterSettings?.filterBeans?.find(
    (data: any) => data.filterName === "MSG_ENTER_DATES_IN_FORMAT"
  )?.dateFormat;

  const onCustomerChange = (code: string) => {
    setCustomerState(code);
  };

  const onCurrencyChange = (code: string) => {
    setCurrencyState(code);
  };

  const onOriginalAmtChange = (code: string) => {
    switch (code) {
      case "*EQ":
      case "*LT":
      case "*GT":
      case "*NE":
      case "*LE":
      case "*GE":
        setOriginalAmtValState((prevState: any) => {
          return {
            ...prevState,
            showOrgAmtVal1: true,
            showOrgAmtVal2: false,
            OrgAmtVal1: "",
            OrgAmtVal2: "",
            IsInValidOrgAmtVal1: true,
            IsInValidOrgAmtVal2: false,
          };
        });
        setSearchValidity(false);
        break;
      case "*BETWEEN":
      case "*NOT_BETWEEN":
        setOriginalAmtValState((prevState: any) => {
          return {
            ...prevState,
            OrgAmtVal1: "",
            OrgAmtVal2: "",
            showOrgAmtVal1: true,
            showOrgAmtVal2: true,
            IsInValidOrgAmtVal1: true,
            IsInValidOrgAmtVal2: true,
          };
        });
        setSearchValidity(false);
        break;
      case "*ALL":
        setOriginalAmtValState((prevState: any) => {
          return {
            ...prevState,
            showOrgAmtVal1: false,
            showOrgAmtVal2: false,
            OrgAmtVal2: "",
            OrgAmtVal1: "",
            IsInValidOrgAmtVal1: false,
            IsInValidOrgAmtVal2: false,
          };
        });
        setSearchValidity(true);
        break;
    }
    setOriginalAmtState(code);
  };

  const onRemainingAmtChange = (code: string) => {
    switch (code) {
      case "*EQ":
      case "*LT":
      case "*GT":
      case "*NE":
      case "*LE":
      case "*GE":
        setRemainingAmtValState((prevState: any) => {
          return {
            ...prevState,
            showRemAmtVal1: true,
            RemAmtVal1: "",
            showRemAmtVal2: false,
            RemAmtVal2: "",
            IsInValidRemAmtVal1: true,
            IsInValidRemAmtVal2: false,
          };
        });
        setSearchValidity(false);
        break;
      case "*BETWEEN":
      case "*NOT_BETWEEN":
        setRemainingAmtValState((prevState: any) => {
          return {
            ...prevState,
            RemAmtVal1: "",
            RemAmtVal2: "",
            showRemAmtVal1: true,
            showRemAmtVal2: true,
            IsInValidRemAmtVal1: true,
            IsInValidRemAmtVal2: true,
          };
        });
        setSearchValidity(false);
        break;
      case "*ALL":
        setRemainingAmtValState((prevState: any) => {
          return {
            ...prevState,
            showRemAmtVal1: false,
            showRemAmtVal2: false,
            RemAmtVal1: "",
            RemAmtVal2: "",
            IsInValidRemAmtVal1: false,
            IsInValidRemAmtVal2: false,
          };
        });
        setSearchValidity(true);
    }
    setRemainingAmtState(code);
  };

  const onDocDateChange = (code: string) => {
    switch (code) {
      case "*EQ":
      case "*LT":
      case "*GT":
      case "*NE":
      case "*LE":
      case "*GE":
        setDocDateValState((prevState: any) => {
          return {
            ...prevState,
            showDocDateVal1: true,
            DocDateVal1: "",
            showDocDateVal2: false,
            DocDateVal2: "",
            IsInValidDocDateVal1: true,
            IsInValidDocDateVal2: false,
          };
        });
        setSearchValidity(false);
        break;
      case "*BETWEEN":
      case "*NOT_BETWEEN":
        setDocDateValState((prevState: any) => {
          return {
            ...prevState,
            showDocDateVal1: true,
            showDocDateVal2: true,
            DocDateVal1: "",
            DocDateVal2: "",
            IsInValidDocDateVal1: true,
            IsInValidDocDateVal2: true,
          };
        });
        setSearchValidity(false);
        break;
      case "*ALL":
        setDocDateValState((prevState: any) => {
          return {
            ...prevState,
            showDocDateVal1: false,
            showDocDateVal2: false,
            DocDateVal1: "",
            DocDateVal2: "",
            IsInValidDocDateVal1: false,
            IsInValidDocDateVal2: false,
          };
        });
        setSearchValidity(true);
    }
    setDocDateState(code);
  };

  const onDueDateChange = (code: string) => {
    switch (code) {
      case "*EQ":
      case "*LT":
      case "*GT":
      case "*NE":
      case "*LE":
      case "*GE":
        setDueDateValState((prevState: any) => {
          return {
            ...prevState,
            showDueDateVal1: true,
            DueDateVal1: "",
            showDueDateVal2: false,
            DueDateVal2: "",
            IsInValidDueDateVal1: true,
            IsInValidDueDateVal2: false,
          };
        });
        setSearchValidity(false);
        break;
      case "*BETWEEN":
      case "*NOT_BETWEEN":
        setDueDateValState((prevState: any) => {
          return {
            ...prevState,
            showDueDateVal1: true,
            showDueDateVal2: true,
            DueDateVal1: "",
            DueDateVal2: "",
            IsInValidDueDateVal1: true,
            IsInValidDueDateVal2: true,
          };
        });
        setSearchValidity(false);
        break;
      case "*ALL":
        setDueDateValState((prevState: any) => {
          return {
            ...prevState,
            showDueDateVal1: false,
            showDueDateVal2: false,
            DueDateVal1: "",
            DueDateVal2: "",
            IsInValidDueDateVal1: false,
            IsInValidDueDateVal2: false,
          };
        });
        setSearchValidity(true);
    }
    setDueDateState(code);
  };

  const onClearHandler = () => {
    dispatch(transactionactions.clearSearchFilter());
    setCustomerState(webSettingsData?.defaultCustomerCode);
    setCurrencyState("*ALL");
    setOriginalAmtState("*ALL");
    setOriginalAmtValState({
      showOrgAmtVal1: false,
      OrgAmtVal1: "",
      showOrgAmtVal2: false,
      OrgAmtVal2: "",
      IsInValidOrgAmtVal1: false,
      IsInValidOrgAmtVal2: false,
    });
    setRemainingAmtState("*ALL");
    setRemainingAmtValState({
      showRemAmtVal1: false,
      RemAmtVal1: "",
      showRemAmtVal2: false,
      RemAmtVal2: "",
      IsInValidRemAmtVal1: false,
      IsInValidRemAmtVal2: false,
    });
    setDocDateState("*ALL");
    setDocDateValState({
      showDocDateVal1: false,
      DocDateVal1: "",
      showDocDateVal2: false,
      DocDateVal2: "",
      IsInValidDocDateVal1: false,
      IsInValidDocDateVal2: false,
    });
    setDueDateState("*ALL");
    setDueDateValState({
      showDueDateVal1: false,
      DueDateVal1: "",
      showDueDateVal2: false,
      DueDateVal2: "",
      IsInValidDueDateVal1: false,
      IsInValidDueDateVal2: false,
    });

    setState(false);
  };

  useEffect(() => {
    if (!searchstate?.transactions?.isFilterApply) {
      onClearHandler();
    }
  }, [searchstate?.transactions?.isFilterApply]);
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

  useEffect(() => {
    if (
      originalAmtValState.IsInValidOrgAmtVal1 ||
      originalAmtValState.IsInValidOrgAmtVal2 ||
      remainingAmtValState.IsInValidRemAmtVal1 ||
      remainingAmtValState.IsInValidRemAmtVal2 ||
      dueDateValState.IsInValidDueDateVal1 ||
      dueDateValState.IsInValidDueDateVal2 ||
      docDateValState.IsInValidDocDateVal1 ||
      docDateValState.IsInValidDocDateVal2
    ) {
      setSearchValidity(false);
    } else {
      setSearchValidity(true);
    }
  }, [
    originalAmtValState.OrgAmtVal1,
    originalAmtValState.OrgAmtVal2,
    remainingAmtValState.RemAmtVal1,
    remainingAmtValState.RemAmtVal2,
    dueDateValState.DueDateVal1,
    dueDateValState.DueDateVal2,
    docDateValState.DocDateVal1,
    docDateValState.DocDateVal2,
  ]);
  const onSearchHandler = () => {
    dispatch(
      transactionactions.updateSearchFilter({
        Customer:
          filterSettings?.filterBeans?.filter(
            (data: any) => data.filterName == "CON_CUSTOMER" && data.isEnabled
          ).length > 0
            ? customerState
            : "",
        Currency: currencyValue,
        OrgAmtRel: originalAmtState,
        OrgAmtVal1: originalAmtValState.OrgAmtVal1,
        OrgAmtVal2: originalAmtValState.OrgAmtVal2,
        RemAmtRel: remainingAmtState,
        RemAmtVal1: remainingAmtValState.RemAmtVal1,
        RemAmtVal2: remainingAmtValState.RemAmtVal2,
        DocDateRel: docDateState,
        DocDateVal1: docDateValState.DocDateVal1,
        DocDateVal2: docDateValState.DocDateVal2,
        DueDateRel: dueDateState,
        DueDateVal1: dueDateValState.DueDateVal1,
        DueDateVal2: dueDateValState.DueDateVal2,
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
            style={{ padding: "7px 16px", marginLeft: "-15px" }}
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
                          data.filterName == "CON_CURRENCY" && data.isEnabled
                      ).length > 0 && (
                        <Filterdiv>
                          <Select
                            showLabel={true}
                            onChange={onCurrencyChange}
                            options={searchstate?.transactions?.searchFilterslist?.currencyList?.map(
                              (item: any) => {
                                return {
                                  label: item.description,
                                  value: item.code,
                                };
                              }
                            )}
                            value={currencyValue}
                            labelText={t("CON_CURRENCY")}
                          />
                        </Filterdiv>
                      )}
                      {filterSettings?.filterBeans?.filter(
                        (data: any) =>
                          data.filterName == "CON_CUSTOMER" && data.isEnabled
                      ).length > 0 && (
                        <Filterdiv>
                          <Select
                            showLabel={true}
                            onChange={onCustomerChange}
                            options={searchstate?.transactions?.searchFilterslist?.customerList?.map(
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
                          data.filterName == "CON_ORIGINAL_AMOUNT" &&
                          data.isEnabled
                      ).length > 0 && (
                        <Filterdiv>
                          <Select
                            showLabel={true}
                            onChange={onOriginalAmtChange}
                            options={DefaultSet}
                            value={originalAmtState}
                            labelText={t("COH_ORIGINAL_AMOUNT")}
                          />
                        </Filterdiv>
                      )}

                      {originalAmtValState.showOrgAmtVal1 && (
                        <Input
                          type='text'
                          showLabel={false}
                          // onChange ={(value: any) => handleChange(value)}
                          onChange={(value: any) =>
                            setOriginalAmtValState((prevState: any) => {
                              if (value.trim() === "") {
                                return {
                                  ...prevState,
                                  OrgAmtVal1: value,
                                  IsInValidOrgAmtVal1: true,
                                  IsInValidOrgAmtVal2:
                                    originalAmtValState.showOrgAmtVal2 &&
                                    originalAmtValState.OrgAmtVal2 == ""
                                      ? true
                                      : false,
                                };
                              } else {
                                return {
                                  ...prevState,
                                  OrgAmtVal1: value,
                                  IsInValidOrgAmtVal1: false,
                                  IsInValidOrgAmtVal2:
                                    originalAmtValState.showOrgAmtVal2 &&
                                    originalAmtValState.OrgAmtVal2 == ""
                                      ? true
                                      : false,
                                };
                              }
                            })
                          }
                          onBlur={() =>
                            setOriginalAmtValState((prevState: any) => {
                              if (originalAmtValState.OrgAmtVal1 === "") {
                                return {
                                  ...prevState,
                                  IsInValidOrgAmtVal1: true,
                                  IsInValidOrgAmtVal2:
                                    originalAmtValState.showOrgAmtVal2 &&
                                    originalAmtValState.OrgAmtVal2 == ""
                                      ? true
                                      : false,
                                };
                              } else {
                                return {
                                  ...prevState,
                                  IsInValidOrgAmtVal1: false,
                                  IsInValidOrgAmtVal2:
                                    originalAmtValState.showOrgAmtVal2 &&
                                    originalAmtValState.OrgAmtVal2 == ""
                                      ? true
                                      : false,
                                };
                              }
                            })
                          }
                          isInvalid={originalAmtValState.IsInValidOrgAmtVal1}
                          value={originalAmtValState.OrgAmtVal1}
                        />
                      )}
                      {originalAmtValState.showOrgAmtVal2 && (
                        <Input
                          type='text'
                          showLabel={false}
                          onChange={(value: any) =>
                            setOriginalAmtValState((prevState: any) => {
                              if (value.trim() === "") {
                                return {
                                  ...prevState,
                                  OrgAmtVal2: value,
                                  IsInValidOrgAmtVal2: true,
                                  IsInValidOrgAmtVal1:
                                    originalAmtValState.showOrgAmtVal1 &&
                                    originalAmtValState.OrgAmtVal1 == ""
                                      ? true
                                      : false,
                                };
                              } else {
                                return {
                                  ...prevState,
                                  OrgAmtVal2: value,
                                  IsInValidOrgAmtVal2: false,
                                  IsInValidOrgAmtVal1:
                                    originalAmtValState.showOrgAmtVal1 &&
                                    originalAmtValState.OrgAmtVal1 == ""
                                      ? true
                                      : false,
                                };
                              }
                            })
                          }
                          onBlur={() =>
                            setOriginalAmtValState((prevState: any) => {
                              if (originalAmtValState.OrgAmtVal2 === "") {
                                return {
                                  ...prevState,
                                  IsInValidOrgAmtVal2: true,
                                  IsInValidOrgAmtVal1:
                                    originalAmtValState.showOrgAmtVal1 &&
                                    originalAmtValState.OrgAmtVal1 == ""
                                      ? true
                                      : false,
                                };
                              } else {
                                return {
                                  ...prevState,
                                  IsInValidOrgAmtVal2: false,
                                  IsInValidOrgAmtVal1:
                                    originalAmtValState.showOrgAmtVal1 &&
                                    originalAmtValState.OrgAmtVal1 == ""
                                      ? true
                                      : false,
                                };
                              }
                            })
                          }
                          isInvalid={originalAmtValState.IsInValidOrgAmtVal2}
                          value={originalAmtValState.OrgAmtVal2}
                        />
                      )}

                      {filterSettings?.filterBeans?.filter(
                        (data: any) =>
                          data.filterName == "CON_REMAINING_AMOUNT" &&
                          data.isEnabled
                      ).length > 0 && (
                        <Filterdiv>
                          <Select
                            showLabel={true}
                            onChange={onRemainingAmtChange}
                            options={DefaultSet}
                            value={remainingAmtState}
                            labelText={t("CON_REMAINING_AMOUNT")}
                          />
                        </Filterdiv>
                      )}

                      {remainingAmtValState.showRemAmtVal1 && (
                        <Input
                          type='text'
                          showLabel={false}
                          onChange={(value: any) =>
                            setRemainingAmtValState((prevState: any) => {
                              if (value.trim() === "") {
                                return {
                                  ...prevState,
                                  RemAmtVal1: value,
                                  IsInValidRemAmtVal1: true,
                                  IsInValidRemAmtVal2:
                                    remainingAmtValState.showRemAmtVal2 &&
                                    remainingAmtValState.RemAmtVal2 == ""
                                      ? true
                                      : false,
                                };
                              } else {
                                return {
                                  ...prevState,
                                  RemAmtVal1: value,
                                  IsInValidRemAmtVal1: false,
                                  IsInValidRemAmtVal2:
                                    remainingAmtValState.showRemAmtVal2 &&
                                    remainingAmtValState.RemAmtVal2 == ""
                                      ? true
                                      : false,
                                };
                              }
                            })
                          }
                          onBlur={() =>
                            setRemainingAmtValState((prevState: any) => {
                              if (remainingAmtValState.RemAmtVal1 === "") {
                                return {
                                  ...prevState,
                                  IsInValidRemAmtVal1: true,
                                  IsInValidRemAmtVal2:
                                    remainingAmtValState.showRemAmtVal2 &&
                                    remainingAmtValState.RemAmtVal2 == ""
                                      ? true
                                      : false,
                                };
                              } else {
                                return {
                                  ...prevState,
                                  IsInValidRemAmtVal1: false,
                                  IsInValidRemAmtVal2:
                                    remainingAmtValState.showRemAmtVal2 &&
                                    remainingAmtValState.RemAmtVal2 == ""
                                      ? true
                                      : false,
                                };
                              }
                            })
                          }
                          isInvalid={remainingAmtValState.IsInValidRemAmtVal1}
                          value={remainingAmtValState.RemAmtVal1}
                        />
                      )}
                      {remainingAmtValState.showRemAmtVal2 && (
                        <Input
                          type='text'
                          showLabel={false}
                          onChange={(value: any) =>
                            setRemainingAmtValState((prevState: any) => {
                              if (value.trim() === "") {
                                return {
                                  ...prevState,
                                  RemAmtVal2: value,
                                  IsInValidRemAmtVal2: true,
                                  IsInValidRemAmtVal1:
                                    remainingAmtValState.showRemAmtVal1 &&
                                    remainingAmtValState.RemAmtVal1 == ""
                                      ? true
                                      : false,
                                };
                              } else {
                                return {
                                  ...prevState,
                                  RemAmtVal2: value,
                                  IsInValidRemAmtVal2: false,
                                  IsInValidRemAmtVal1:
                                    remainingAmtValState.showRemAmtVal1 &&
                                    remainingAmtValState.RemAmtVal1 == ""
                                      ? true
                                      : false,
                                };
                              }
                            })
                          }
                          onBlur={() =>
                            setRemainingAmtValState((prevState: any) => {
                              if (remainingAmtValState.RemAmtVal2 === "") {
                                return {
                                  ...prevState,
                                  IsInValidRemAmtVal2: true,
                                  IsInValidRemAmtVal1:
                                    remainingAmtValState.showRemAmtVal1 &&
                                    remainingAmtValState.RemAmtVal1 == ""
                                      ? true
                                      : false,
                                };
                              } else {
                                return {
                                  ...prevState,
                                  IsInValidRemAmtVal2: false,
                                  IsInValidRemAmtVal1:
                                    remainingAmtValState.showRemAmtVal1 &&
                                    remainingAmtValState.RemAmtVal1 == ""
                                      ? true
                                      : false,
                                };
                              }
                            })
                          }
                          isInvalid={remainingAmtValState.IsInValidRemAmtVal2}
                          value={remainingAmtValState.RemAmtVal2}
                        />
                      )}

                      {filterSettings?.filterBeans?.filter(
                        (data: any) =>
                          data.filterName == "CON_DOCUMENT_DATE" &&
                          data.isEnabled
                      ).length > 0 && (
                        <Filterdiv>
                          <Select
                            showLabel={true}
                            onChange={onDocDateChange}
                            options={DefaultSet}
                            value={docDateState}
                            labelText={t("CON_DOCUMENT_DATE")}
                          />
                        </Filterdiv>
                      )}

                      {docDateValState.showDocDateVal1 && (
                        <Input
                          type='text'
                          showLabel={false}
                          placeholder={dateformat}
                          onChange={(value: any) =>
                            setDocDateValState((prevState: any) => {
                              if (value.trim() === "") {
                                return {
                                  ...prevState,
                                  DocDateVal1: value,
                                  IsInValidDocDateVal1: true,
                                  IsInValidDocDateVal2:
                                    docDateValState.showDocDateVal2 &&
                                    docDateValState.DocDateVal2 == ""
                                      ? true
                                      : false,
                                };
                              } else {
                                return {
                                  ...prevState,
                                  DocDateVal1: value,
                                  IsInValidDocDateVal1: false,
                                  IsInValidDocDateVal2:
                                    docDateValState.showDocDateVal2 &&
                                    docDateValState.DocDateVal2 == ""
                                      ? true
                                      : false,
                                };
                              }
                            })
                          }
                          onBlur={() => {
                            if (moment(docDateValState.DocDateVal1).isValid()) {
                              setDocDateValState((prevState: any) => {
                                return {
                                  ...prevState,
                                  IsInValidDocDateVal1: false,
                                  IsInValidDocDateVal2:
                                    docDateValState.showDocDateVal2 &&
                                    docDateValState.DocDateVal2 == ""
                                      ? true
                                      : false,
                                };
                              });
                            } else {
                              setDocDateValState((prevState: any) => {
                                return {
                                  ...prevState,
                                  DocDateVal1: "",
                                  IsInValidDocDateVal1: true,
                                  IsInValidDocDateVal2:
                                    docDateValState.showDocDateVal2 &&
                                    docDateValState.DocDateVal2 == ""
                                      ? true
                                      : false,
                                };
                              });
                            }
                          }}
                          isInvalid={docDateValState.IsInValidDocDateVal1}
                          value={docDateValState.DocDateVal1}
                        />
                      )}
                      {docDateValState.showDocDateVal2 && (
                        <Input
                          type='text'
                          showLabel={false}
                          placeholder={dateformat}
                          onChange={(value: any) =>
                            setDocDateValState((prevState: any) => {
                              if (value.trim() === "") {
                                return {
                                  ...prevState,
                                  DocDateVal2: value,
                                  IsInValidDocDateVal2: true,
                                  IsInValidDocDateVal1:
                                    docDateValState.showDocDateVal1 &&
                                    docDateValState.DocDateVal1 == ""
                                      ? true
                                      : false,
                                };
                              } else {
                                return {
                                  ...prevState,
                                  DocDateVal2: value,
                                  IsInValidDocDateVal2: false,
                                  IsInValidDocDateVal1:
                                    docDateValState.showDocDateVal1 &&
                                    docDateValState.DocDateVal1 == ""
                                      ? true
                                      : false,
                                };
                              }
                            })
                          }
                          onBlur={() => {
                            if (moment(docDateValState.DocDateVal2).isValid()) {
                              setDocDateValState((prevState: any) => {
                                return {
                                  ...prevState,
                                  IsInValidDocDateVal2: false,
                                  IsInValidDocDateVal1:
                                    docDateValState.showDocDateVal1 &&
                                    docDateValState.DocDateVal1 == ""
                                      ? true
                                      : false,
                                };
                              });
                            } else {
                              setDocDateValState((prevState: any) => {
                                return {
                                  ...prevState,
                                  DocDateVal2: "",
                                  IsInValidDocDateVal2: true,
                                  IsInValidDocDateVal1:
                                    docDateValState.showDocDateVal1 &&
                                    docDateValState.DocDateVal1 == ""
                                      ? true
                                      : false,
                                };
                              });
                            }
                          }}
                          isInvalid={docDateValState.IsInValidDocDateVal2}
                          value={docDateValState.DocDateVal2}
                        />
                      )}

                      {filterSettings?.filterBeans?.filter(
                        (data: any) =>
                          data.filterName == "CON_DUE_DATE" && data.isEnabled
                      ).length > 0 && (
                        <Filterdiv>
                          <Select
                            showLabel={true}
                            onChange={onDueDateChange}
                            placeholder={dateformat}
                            options={DefaultSet}
                            value={dueDateState}
                            labelText={t("CON_DUE_DATE")}
                          />
                        </Filterdiv>
                      )}

                      {dueDateValState.showDueDateVal1 && (
                        <Input
                          type='text'
                          showLabel={false}
                          placeholder={dateformat}
                          onChange={(value: any) =>
                            setDueDateValState((prevState: any) => {
                              if (value.trim() === "") {
                                return {
                                  ...prevState,
                                  DueDateVal1: value,
                                  IsInValidDueDateVal1: true,
                                  IsInValidDueDateVal2:
                                    dueDateValState.showDueDateVal2 &&
                                    dueDateValState.DueDateVal2 == ""
                                      ? true
                                      : false,
                                };
                              } else {
                                return {
                                  ...prevState,
                                  DueDateVal1: value,
                                  IsInValidDueDateVal1: false,
                                  IsInValidDueDateVal2:
                                    dueDateValState.showDueDateVal2 &&
                                    dueDateValState.DueDateVal2 == ""
                                      ? true
                                      : false,
                                };
                              }
                            })
                          }
                          onBlur={() => {
                            if (moment(dueDateValState.DueDateVal1).isValid()) {
                              setDueDateValState((prevState: any) => {
                                return {
                                  ...prevState,
                                  IsInValidDueDateVal1: false,
                                  IsInValidDueDateVal2:
                                    dueDateValState.showDueDateVal2 &&
                                    dueDateValState.DueDateVal2 == ""
                                      ? true
                                      : false,
                                };
                              });
                            } else {
                              setDueDateValState((prevState: any) => {
                                return {
                                  ...prevState,
                                  DueDateVal1: "",
                                  IsInValidDueDateVal1: true,
                                  IsInValidDueDateVal2:
                                    dueDateValState.showDueDateVal2 &&
                                    dueDateValState.DueDateVal2 == ""
                                      ? true
                                      : false,
                                };
                              });
                            }
                          }}
                          value={dueDateValState.DueDateVal1}
                          isInvalid={dueDateValState.IsInValidDueDateVal1}
                        />
                      )}
                      {dueDateValState.showDueDateVal2 && (
                        <Input
                          type='text'
                          showLabel={false}
                          placeholder={dateformat}
                          onChange={(value: any) =>
                            setDueDateValState((prevState: any) => {
                              if (value.trim() === "") {
                                return {
                                  ...prevState,
                                  DueDateVal2: value,
                                  IsInValidDueDateVal2: true,
                                  IsInValidDueDateVal1:
                                    dueDateValState.showDueDateVal1 &&
                                    dueDateValState.DueDateVal1 == ""
                                      ? true
                                      : false,
                                };
                              } else {
                                return {
                                  ...prevState,
                                  DueDateVal2: value,
                                  IsInValidDueDateVal2: false,
                                  IsInValidDueDateVal1:
                                    dueDateValState.showDueDateVal1 &&
                                    dueDateValState.DueDateVal1 == ""
                                      ? true
                                      : false,
                                };
                              }
                            })
                          }
                          onBlur={() => {
                            if (moment(dueDateValState.DueDateVal2).isValid()) {
                              setDueDateValState((prevState: any) => {
                                return {
                                  ...prevState,
                                  IsInValidDueDateVal2: false,
                                  IsInValidDueDateVal1:
                                    dueDateValState.showDueDateVal1 &&
                                    dueDateValState.DueDateVal1 == ""
                                      ? true
                                      : false,
                                };
                              });
                            } else {
                              setDueDateValState((prevState: any) => {
                                return {
                                  ...prevState,
                                  DueDateVal2: "",
                                  IsInValidDueDateVal2: true,
                                  IsInValidDueDateVal1:
                                    dueDateValState.showDueDateVal1 &&
                                    dueDateValState.DueDateVal1 == ""
                                      ? true
                                      : false,
                                };
                              });
                            }
                          }}
                          value={dueDateValState.DueDateVal2}
                          isInvalid={dueDateValState.IsInValidDueDateVal2}
                        />
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
                          disabled={!searchValidity}
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
