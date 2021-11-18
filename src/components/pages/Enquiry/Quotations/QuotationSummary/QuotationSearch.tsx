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
  quotationFilterDetails,
  quotationsummarySelector,
  quotationsummaryactions,
} from "@slices/Enquiry/Quotations/QuotationSummary";
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
  padding: 10px;
`;

export default function QuotationSearch() {
  const webSettingsData: any = useContext(WebSettingsContext);
  const { t, i18n } = useTranslation();
  const searchstate = useSelector(quotationsummarySelector);
  const [state, setState] = React.useState<any>({
    right: false,
  });

  const sessionId = useGetLoggedInUserInfo()?.sessionId;
  const dispatch = useDispatch();

  useEffect(() => {
    if (sessionId) {
      dispatch(quotationFilterDetails(sessionId));
    }
  }, [sessionId]);

  // const customerlist =
  //   searchstate?.quotationsummary?.searchFilterslist?.customerList?.filter(
  //     (data: any) =>
  //       typeof data.defaultCode == undefined ? "" : data.defaultCode
  //   );
  // const defaultcode =
  //   customerlist?.length > 0
  //     ? customerlist?.find((data: any) => data.defaultCode).defaultCode
  //     : "";

  const [quotationNoInputState, setQuotationNoInputState] =
    useState<string>("");
  const [customerState, setCustomerState] = useState<any>(
    webSettingsData?.defaultCustomerCode
  );
  const [productInputState, setProductInputState] = useState<any>("");

  useEffect(() => {
    setCustomerState(webSettingsData?.defaultCustomerCode);
  }, []);

  const filterSettings = searchstate?.quotationsummary?.searchFilterSettings;

  const onCustomerChange = (code: string) => {
    setCustomerState(code);
  };

  const onClearHandler = () => {
    dispatch(quotationsummaryactions.clearSearchFilter());
    setCustomerState(webSettingsData?.defaultCustomerCode);
    setQuotationNoInputState("");
    setProductInputState("");
    setState(false);
  };

  useEffect(() => {
    if (!searchstate?.quotationsummary?.isFilterApply) {
      onClearHandler();
    }
  }, [searchstate?.quotationsummary?.isFilterApply]);
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
      quotationsummaryactions.updateSearchFilter({
        customerSearch:
          filterSettings?.filterBeans?.filter(
            (data: any) => data.filterName == "CON_CUSTOMER" && data.isEnabled
          ).length > 0
            ? customerState
            : "",
        QuotationNumber: quotationNoInputState,
        ItemCode: productInputState,
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
                          data.filterName == "CON_QUOTATION_NUMBER" &&
                          data.isEnabled
                      ).length > 0 && (
                        <Filterdiv>
                          <Input
                            type='text'
                            showLabel={true}
                            labelText={t("CON_QUOTATION_NUMBER")}
                            onChange={(value: any) =>
                              setQuotationNoInputState(value)
                            }
                            value={quotationNoInputState}
                          />
                        </Filterdiv>
                      )}
                      {filterSettings?.filterBeans?.filter(
                        (data: any) =>
                          data.filterName == "CON_PRODUCT" && data.isEnabled
                      ).length > 0 && (
                        <Filterdiv>
                          <Input
                            type='text'
                            showLabel={true}
                            labelText={t("CON_PRODUCT")}
                            onChange={(value: any) =>
                              setProductInputState(value)
                            }
                            value={productInputState}
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
                            options={searchstate?.quotationsummary?.searchFilterslist?.customerList?.map(
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
