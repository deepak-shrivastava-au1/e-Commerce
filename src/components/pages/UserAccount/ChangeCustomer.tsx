import React, { Fragment, useState, useEffect } from "react";

import LeftNevigation from "@pages/Enquiry/Order/OrderHistory/LeftNevigation";
import Breadcrumb from "@fragments/Breadcrumb";
import { useMediaQuery } from "@material-ui/core";
import { breakpoints } from "@constants/styled-components";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import Radio from "@common/Radio";
import Button from "@common/Button";
import LoadingOverlay from "@common/LoadingOverlay";
import {
  fetchCustomerList,
  getcustomerListSelector,
} from "../../../redux/Slices/UserAccount/getCustomersList";
import {
  ChangeDefaultCustomer,
  changeCustomerSelector,
} from "../../../redux/Slices/UserAccount/changeDefaultCustomer";
import { useHistory } from "react-router-dom";
import { REDUX_PERSIST_KEY } from "@constants/Constants";
import {SIGNIN } from "@constants/Routes";

import Modal from "@common/Modal";
import NoData from "@common/NoData";
import { ArrowUpSVG, ArrowDownSVG, SearchIcon, Badge, InfoIcon } from "@icons";

function ChangeCustomer() {
  const isMobile = useMediaQuery(`(min-width:${breakpoints.md})`);
  const { t } = useTranslation();
  const [customerListArray, setCustomerListArray] = useState<
    Array<{ code: string; sessionType: string; name: string; address1: string }>
  >([]);
  const [searchText, setSearchText] = useState("");
  const [loader, setLoader] = useState<boolean>(false);
  const [defaultCustomerChange, setDefaultCustomerChange] =
    useState<boolean>(false);
  const dispatch = useDispatch();
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [changedType, setChangedType] = useState("session");
  const [customerName, setCustomerName] = useState("");
  const [customerCode, setCustomerCode] = useState("");
  const [customerAddr1, setCustomerAddr1] = useState("");
  const [customerIndex, setCustomerIndex] = useState(Number);
  const history = useHistory();
  const { customersList, loading, hasErrors } = useSelector(
    getcustomerListSelector
  );
  function handleCustomerSelction(index: any) {
    setCustomerIndex(index);
    setSelectedCustomer(customersList[index]?.code);
    // console.log(customersList[index]?.code)
  }
  const customerSelectorData = useSelector(
    changeCustomerSelector
  )?.changeCustomer;

  const searchFilter = () => {
    dispatch(fetchCustomerList("ASC", "CustomerCode",searchText));
  };
  const handleKeyPress = (target: any) => {
    // I'm guessing you have value stored in state
    if (target.charCode === 13) {
      dispatch(fetchCustomerList("ASC", "CustomerCode",searchText));
    }
  };
  const changeDefaultCustomer = () => {
    setLoader(true);
    if (selectedCustomer)
      dispatch(ChangeDefaultCustomer(selectedCustomer, changedType));
  };
  const reloadCustomersList = (param1: string, param2: string) => {
    dispatch(fetchCustomerList(param1, param2));
  };

  useEffect(() => {
      dispatch(fetchCustomerList())
  }, [dispatch])
  
  useEffect(() => {
    if (customersList && customersList?.length > 0) {
      setCustomerListArray(() => {
        return customersList.map((customer: any) => {
          if (customer?.defaultCustomer) {
            setCustomerName(customer?.name);
            setCustomerCode(customer?.code);
            setCustomerAddr1(customer?.address1);
          }
          return {
            sessionType: customer?.defaultCustomer ? "default" : "session",
            code: customer?.code,
            name: customer?.name,
            address1: customer?.address1,
          };
        });
      });
    }
  }, [customersList]);

  useEffect(() => {
    if (customersList && customersList?.length > 0) {
        return customersList.map((customer: any) => {
          if (customer?.defaultCustomer) {
            setCustomerName(customer?.name);
            setCustomerCode(customer?.code);
            setCustomerAddr1(customer?.address1);
          }
      });
    }
  }, [customersList]);
 
  // console.log("-----" + JSON.stringify(customerListArray));
  useEffect(() => {
    if (loader && customerSelectorData?.messageCode) {
      setLoader(false);
      switch (customerSelectorData?.messageCode) {
        case 4250:
          {
            if (changedType === "default") {
              setDefaultCustomerChange(true);
            } else {
              setCustomerName(customerListArray?.[customerIndex]?.name);
              setCustomerCode(customerListArray?.[customerIndex]?.code);
              setCustomerAddr1(customerListArray?.[customerIndex]?.address1);
              history.go(0)
            }
          }
          break;
          default:{

          }
          break;
      }
    }
  }, [customerSelectorData]);
  const [customer, setCustomer] = useState(
    <a onClick={() => renderCustomersDscOrder("customer")}>
      <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
    </a>
  );
  const [name, setName] = useState(
    <a onClick={() => renderCustomersDscOrder("name")}>
      <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
    </a>
  );
  const [address, setAddress] = useState(
    <a onClick={() => renderCustomersDscOrder("address")}>
      <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
    </a>
  );

  function renderCustomersAscOrder(type: string) {
    if (type == "customer") {
      setCustomer(
        <a onClick={() => renderCustomersDscOrder("customer")}>
          <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
        </a>
      );
      reloadCustomersList("ASC", "CustomerCode");
    } else if (type == "name") {
      setName(
        <a onClick={() => renderCustomersDscOrder("name")}>
          <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
        </a>
      );
      reloadCustomersList("ASC", "CustomerName");
    } else if (type == "address") {
      setAddress(
        <a onClick={() => renderCustomersDscOrder("address")}>
          <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
        </a>
      );
      reloadCustomersList("ASC", "CustomerAdd");
    }
  }
  function renderCustomersDscOrder(type: string) {
    if (type == "customer") {
      setCustomer(
        <a onClick={() => renderCustomersAscOrder("customer")}>
          <ArrowDownSVG className="primary-icon-2"></ArrowDownSVG>
        </a>
      );
      reloadCustomersList("DESC", "CustomerCode");
    } else if (type == "name") {
      setName(
        <a onClick={() => renderCustomersAscOrder("name")}>
          <ArrowDownSVG className="primary-icon-2"></ArrowDownSVG>
        </a>
      );
      reloadCustomersList("DESC", "CustomerName");
    } else if (type == "address") {
      setAddress(
        <a onClick={() => renderCustomersAscOrder("address")}>
          <ArrowDownSVG className="primary-icon-2"></ArrowDownSVG>
        </a>
      );
      reloadCustomersList("DESC", "CustomerAdd");
    }
  }

  const onInputChange = (event: any) => {
    setSearchText(event.target.value);
  };

  const renderCustomers = () => {
    if (!customerListArray || !customersList) {
      return <NoData />;
    }
    return customerListArray.map((customer: any, index: any) => (
      <div
        className="card-table"
        key={index}
        onClick={() => {
          // handleCustomerSelction(index)
        }}
      >
        <div className="card-tbody">
          <div
            className="row"
            style={{ paddingLeft: "22px", paddingRight: "22px" }}
          >
            <Radio onClick={() => handleCustomerSelction(index)} />
            {customersList[index]?.defaultCustomer && <Badge />}

            <div className="col">
              <div className="flex-container">
                <div className="label">
                  <strong>#CUSTOMER</strong>
                </div>
                <h5>{customer?.code}</h5>
              </div>
            </div>
            <div className="col">
              <div className="flex-container">
                <div className="label">
                  <strong>NAME</strong>
                </div>
                <h5>{customer?.name}</h5>
              </div>
            </div>
            <div className="col" style={{maxWidth:"120px", paddingRight: "12px"}}>
              <div className="flex-container">
                <div className="label">
                  <strong>ADDRESS</strong>
                </div >
                <h5 >{customer?.address1}</h5>
              </div>
            </div>
            <select
              style={{ marginTop: "4px", marginLeft: "4px", width: "26%" }}
              value={customerListArray?.[index]?.sessionType}
              onChange={(event) => {
                setCustomerListArray((prevState) => {
                  const copiedArr = [...prevState];
                  return copiedArr.map((customer, i) => {
                    if (i === index) {
                      setChangedType(event.target.value);
                      return { ...customer, sessionType: event.target.value };
                    } else {
                      setChangedType("session"
                      ? "default"
                      : "session");
                      return {
                        ...customer,
                        sessionType:
                          event.target.value === "session"
                            ? "default"
                            : "session",
                      };
                    }
                  });
                });
              }}
            >
              <option value={"session"}>{t("CON_FOR_THIS_SESSION")}</option>
              <option value={"default"}>{t("CON_AS_DEFAULT_CUSTOMER")}</option>
            </select>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <Fragment>
      <Modal
        isAlert
        icon
        title={""}
        message={t("MSG_LOGIN_AFTER_CHANGE_CUSTOMER")}
        isOpen={defaultCustomerChange}
        hasCancelButton={false}
        onRequestClose={() => {
          setDefaultCustomerChange(false);
          dispatch({ type: "SIGNOUT" });
          history.push(SIGNIN);
        }}
        secondaryActionText={"ok"}
        onSecondaryButtonClick={() => {
          setDefaultCustomerChange(false);
          dispatch({ type: "SIGNOUT" });
          history.push(SIGNIN);
        }}
      />
      <div className="content-area">
        <Breadcrumb />
        <Container>
          {isMobile && <LeftNevigation />}
          <CustomerSelectionSection>
            {/* <CustomerText>
              <h2>{t("COH_CHANGE_CUSTOMER")}</h2>
            </CustomerText>
            
           <AlertContainer>
            <div className="d-flex flex-row" style={{marginLeft: "6px"}} >
              <InfoIcon></InfoIcon>
              <h4 style={{ marginLeft: "6px",  marginTop: "1px",color: "#08A0F7" }}>
                <CustomText> Important:</CustomText>
              </h4>
              <h5 style={{ marginTop: "2px", color: "#3387B7" }}>
                Several customers are connected to your user profile. Select
                customer to use.
              </h5>
            </div>
            </AlertContainer> */}

            <div className="card-table" style= {{overflow: 'auto'}}>
              <div className="card-tbody">
                <div className="row">
                  <div className="col">
                    <div className="flex-container">
                      <div className="label"></div>
                      <h5>{customerCode}</h5>
                      <CustomText>
                        <h4>{customerName}</h4>
                      </CustomText>
                    </div>
                  </div>
                  <div className="col">
                    <div className="flex-container">
                      <div className="label"></div>
                      <h5>{t("COH_ADDRESS")}</h5>
                      <CustomText>
                        <h4>{customerAddr1}</h4>
                      </CustomText>
                    </div>
                  </div>
                </div>
              </div>
            </div>
           
            <SearchContainer className="d-flex flex-row" style={{ width: "500px" }}>
              <input
                type="text"
                className='border-0'
                style={{ width: "500px" }}
                placeholder={t("COH_CUSTOMER_NUMBER")+","+t("CON_NAME")+","+t("CON_ADDRESS")}
                value={searchText}
                onKeyPress={(e: any) => handleKeyPress(e)}
                onChange={(event) => onInputChange(event)}
              />
              <span className="icon" onClick={searchFilter}><SearchIcon/></span>

</SearchContainer>
             {/* <SearchSVG className="secondary-icon-2" /> */}

            <div className="card-table" style={{ width: "80%" }}>
              <div className="card-thead">
                <div className="row">
                  <div className="col">
                    <div className="d-flex">
                      <div className="col-title"> #{t("COH_CUSTOMER")}</div>
                      <div className="col-sort">{customer}</div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="d-flex">
                      <div className="col-title">{t("CON_NAME")}</div>
                      <div className="col-sort">{name}</div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="d-flex">
                      <div className="col-title"> {t("CON_ADDRESS")}</div>
                      <div className="col-sort">{address}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {renderCustomers()}

            <Button
              className="ml-auto"
              type="submit"
              variant="solid"
              disabled={!customersList || !selectedCustomer}
              onClick={() => changeDefaultCustomer()}
              style={{
                alignItems: "center",
                justifyContent: "center",
                justifyItems: "center",
                marginTop: "18px",
                marginBottom: "48px",
                width: "30%",
                background: "var(--secondary-color)",
              }}
            >
              <span>{t("COH_CHANGE_CUSTOMER")} </span>
            </Button>
          </CustomerSelectionSection>
        </Container>
      </div>
      <LoadingOverlay active={loader} />
    </Fragment>
  );
}

const Container = styled.aside`
  display: flex;
`;
const CustomerSelectionSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0 0px 0 24px;
  flex-grow: 1;
  > :not(:last-child) {
    margin-bottom: 14px;
  }
`;
const CustomerText = styled.text`
  font-weight: var(--font-weight-bold);
  padding: 1px 0 0 0;
  line-height: 32.68px;
`;

const CustomText = styled.text`
  font-weight: var(--font-weight-medium);
`;
const AlertContainer = styled.div`
    align-items: center;
    justify-content: center;
    align-items: center;
    background: #E1F2FC;
    border: var(--thin-border) #08A0F7 ;
    border-radius: var(--border-radius);
    height : 45px;
`;
const SearchContainer = styled.div`
    align-items: center;
    justify-content: center;
    align-items: center;
    background: #FFFFFF;
    border: var(--thin-border) #B6C4CE ;
    border-radius: var(--border-radius);
    height : 50px;
`;
 

export default ChangeCustomer;
