import React, { FC, useState, useEffect } from "react";
import styled from "styled-components";
import Radio from "@common/Radio";
import Button from "@common/Button";
import { useTranslation } from "react-i18next";
import {
  Individual,
  WareHouse,
  LeftArrowCircle,
  CheckSVG,
  CheckCircleForModalSVG,
  CheckMarkSVG,
  CloseSVG,
} from "@icons";
import { respondTo } from "@utilities/styled-components";
import TimeLineContainer from "./AccountProgress";
import LoadingOverlay from "@common/LoadingOverlay";
import { useSelector, useDispatch } from "react-redux";
import { CountrySelectDropdown } from "./CountrySelectDropdown";
import {
  CreateNewAccount,
  createAccountSuccess,
  createAccountSelector,
} from "../../../redux/Slices/UserAccount/createNewAccount";
import {
  ValidateCustomerNewAccount,
  validateCustomerNewAccountSelector,
  validateCustomerNewAccountSuccess,
} from "../../../redux/Slices/UserAccount/validateCustomerNewAccount";
import StyledInput from "@common/StyledInput";
import { getAllCountriesSelector } from "../../../redux/Slices/UserAccount/getAllCountries";
import { getLocaleListSelector } from "../../../redux/Slices/UserAccount/getLocaleList";
import { getLaunguageCodesSelector } from "../../../redux/Slices/UserAccount/getLanguageCodes";
import {
  GetStateList,
  getStateListSelector,
  getStateListSuccess,
} from "../../../redux/Slices/UserAccount/getStateList";
import {
  GetCountyForSelectedStateAndCountry,
  getCountySelector,
  getCountySuccess,
} from "../../../redux/Slices/UserAccount/getCountyForState";
import Modal from "@common/Modal";

type AccountProps = {
  navigateToSignInPage: (arg: boolean) => void;
};

interface ValidationFlags {
  validName: boolean;
  validAddrs: boolean;
  validCity: boolean;
  validPost: boolean;
  validCountry: boolean;
  validContact: boolean;
  validPhone: boolean;
  validUserName: boolean;
  validUserId: boolean;
  validEmail: boolean;
  validCustomer: boolean;
}

const CreateAccount: FC<AccountProps> = ({ navigateToSignInPage }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const accountData = useSelector(createAccountSelector)?.createAccount;

  const [activeKey, setActiveKey] = useState(0);
  const [accountType, setAccountType] = useState("");
  const [customerType, setCustomerType] = useState("NEW");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedLocale, setSelectedLocale] = useState("");
  const [loader, setLoader] = useState<boolean>(false);
  const [basicInfoFlag, setBasicInfoFlag] = useState<boolean>(true);
  const [userInfoFlag, setUserInfoFlag] = useState<boolean>(true);
  const [errorAccountFailed, setErrorAccountFailed] = useState("");
  const [accountCreationFailed, setAccountCreationFailed] =
    useState<boolean>(false);
  const [name, setName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [language, setLanguage] = useState("Swedish");

  const [postcode, setPostCode] = useState("");
  const [vatRegistration, setVatRegistration] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fax, setFax] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");
  const [userId, setUserId] = useState("NS");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCounty, setSelectedCounty] = useState("");
  const localeList = useSelector(getLocaleListSelector)?.localeList;
  const countriesList = useSelector(getAllCountriesSelector)?.countriesList;
  const { languagesList } = useSelector(getLaunguageCodesSelector);
  const stateList = useSelector(getStateListSelector).statesList;
  const countiesList = useSelector(getCountySelector)?.countyList;
  const address1: string = "";
  const address2: string = "";

  const [accountValidationFlags, setAccountValidationFlags] =
    useState<ValidationFlags>({
      validName: true,
      validAddrs: true,
      validCity: true,
      validPost: true,
      validCountry: true,
      validContact: true,
      validPhone: true,
      validUserName: true,
      validUserId: true,
      validEmail: true,
      validCustomer: true,
    });

  const isValidCustomer = useSelector(
    validateCustomerNewAccountSelector
  )?.validCustomer;

  const updateSelectedLanguage = (code: string): void => {
    setLanguage(code);
    // console.log(code);
  };

  const handleBackButtonClick = (flag: boolean): void => {
    setActiveKey(0);
    navigateToSignInPage(true);
  };
  function validateEmail(email: string) {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return email.match(validRegex);
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    switch (e.target.id) {
      case "name":
        setName(e.target.value);
        break;
      case "contactperson":
        setContactPerson(e.target.value);
        break;
      case "addressline":
        setAddressLine(e.target.value);
        break;
      case "city":
        setCity(e.target.value);
        break;
      case "postcode":
        setPostCode(e.target.value);
        break;
      case "vatnumber":
        setVatRegistration(e.target.value);
        break;
      case "fax":
        setFax(e.target.value);
        break;
      case "customernumber":
        setCustomerNumber(e.target.value);
        break;
      case "userid":
        setUserId(e.target.value);
        break;
      case "username":
        setUserName(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        // console.log(validateEmail(email));
        break;
      case "phonenumber":
        setPhoneNumber(e.target.value);
        break;
    }
    if (
      userId.length > 0 &&
      userName.length > 0 &&
      email.length > 0 &&
      validateEmail(email)
    ) {
      setUserInfoFlag(false);
    }
    if (
      customerType === "OLD" &&
      accountValidationFlags["validCustomer"] &&
      customerNumber.length > 0
    ) {
      setBasicInfoFlag(false);
    }

    if (
      name.length > 0 &&
      addressLine.length > 0 &&
      city.length > 0 &&
      postcode.length > 0 &&
      (accountType === "COMPANY" ? contactPerson.length > 0 : true)
    ) {
      setBasicInfoFlag(false);
    }
  }

  useEffect(() => {
    if (accountData !== undefined && accountData[0] !== undefined)  {
      if (accountData[0]?.messageCode === 4500) {
        setLoader(false);
        setActiveKey(4);
        setAccountCreationFailed(false);
      } else if (accountData[0]?.messageCode == 4501) {
        setLoader(false);
        setAccountCreationFailed(true);
        setErrorAccountFailed("Invalid data.");
      } else if (accountData[0]?.messageCode == 4502) {
        setLoader(false);
        setAccountCreationFailed(true);
        setErrorAccountFailed("User already exist.");
      } 
      }else{
      setLoader(false);
      setAccountCreationFailed(false);
      setErrorAccountFailed("Network Error. Please try again later");
      }
   
  }, [accountData]);

  function handleBlur(e: React.ChangeEvent<HTMLInputElement>) {
    switch (e.target.id) {
      case "name":
        setAccountValidationFlags((prevState: ValidationFlags) => {
          const copiedState = { ...prevState };
          copiedState["validName"] = e.target.value.length > 0;
          return copiedState;
        });
        break;
      case "contactperson":
        setAccountValidationFlags((prevState: ValidationFlags) => {
          const copiedState = { ...prevState };
          copiedState["validContact"] = e.target.value.length > 0;
          return copiedState;
        });
        break;
      case "addressline":
        setAccountValidationFlags((prevState: ValidationFlags) => {
          const copiedState = { ...prevState };
          copiedState["validAddrs"] = e.target.value.length > 0;
          return copiedState;
        });
        break;
      case "city":
        setAccountValidationFlags((prevState: ValidationFlags) => {
          const copiedState = { ...prevState };
          copiedState["validCity"] = e.target.value.length > 0;
          return copiedState;
        });
        break;
      case "postcode":
        setAccountValidationFlags((prevState: ValidationFlags) => {
          const copiedState = { ...prevState };
          copiedState["validPost"] = e.target.value.length > 0;
          return copiedState;
        });
        break;
      case "customernumber":
        setAccountValidationFlags((prevState: ValidationFlags) => {
          const copiedState = { ...prevState };
          copiedState["validContact"] = e.target.value.length > 0;
          return copiedState;
        });
        break;
      case "userid":
        setAccountValidationFlags((prevState: ValidationFlags) => {
          const copiedState = { ...prevState };
          copiedState["validUserId"] = e.target.value.length > 0;
          return copiedState;
        });
        break;
      case "username":
        setAccountValidationFlags((prevState: ValidationFlags) => {
          const copiedState = { ...prevState };
          copiedState["validUserName"] = e.target.value.length > 0;
          return copiedState;
        });
        break;
      case "email":
        setAccountValidationFlags((prevState: ValidationFlags) => {
          const copiedState = { ...prevState };
          copiedState["validEmail"] = e.target.value.length > 0;
          return copiedState;
        });
        break;
      case "phonenumber":
        setAccountValidationFlags((prevState: ValidationFlags) => {
          const copiedState = { ...prevState };
          copiedState["validPhone"] = e.target.value.length > 0;
          return copiedState;
        });
        break;
    }
  }

  // Hook to initialize the an item validate details

  useEffect(() => {
    return () => {
      dispatch(validateCustomerNewAccountSuccess(undefined));
      dispatch(getStateListSuccess(undefined));
      dispatch(getCountySuccess(undefined));
      dispatch(createAccountSuccess(undefined));
      setSelectedCountry("");
      setSelectedState("");
      setSelectedCounty("");
      setActiveKey(0);
    };
  }, []);

  const getStateList = (country: string) => {
    // console.log("====" + country);
    dispatch(getStateListSuccess(undefined));
    dispatch(getCountySuccess(undefined));
    setSelectedCountry(country);
    //setLoader(true);
    dispatch(GetStateList(country));
  };

  const getCountiesList = (state: string) => {
    // console.log("====" + selectedCounty + "--" + state);
    dispatch(getCountySuccess(undefined));
    setSelectedState(state);
    //setLoader(true);
    dispatch(GetCountyForSelectedStateAndCountry(selectedCountry, state));
  };

  useEffect(() => {
    if(countiesList!== undefined && countiesList?.length>0){
      if(!selectedCounty){
        setSelectedCounty(countiesList[0]?.countyCode)
      }
    }
  }, [countiesList]);
  useEffect(() => {
    if(stateList!== undefined && stateList?.length>0){
      if(!selectedState){
        setSelectedState(stateList[0]?.stateCode)
      }
    }
  }, [stateList]);

  useEffect(() => {
    // console.log(getCountySelector);
    if(getCountySelector!== undefined && loader){
      setLoader(false)
    }
  }, [getCountySelector])
  useEffect(() => {
    if (isValidCustomer?.messageCode === 4100) {
      setLoader(false);
      setActiveKey(2);
    } else if (isValidCustomer?.messageCode === 4503) {
      setLoader(false);
      setAccountCreationFailed(true);
      setErrorAccountFailed("Invalid Customer.");
    }
    else if(isValidCustomer?.messageCode) {
      setLoader(false);
      setAccountCreationFailed(true);
      setErrorAccountFailed("Network Error.");
    }
  }, [isValidCustomer]);

  useEffect(() => {
    // console.log("localeList" + localeList);
  }, [localeList]);

  const handleCustomerSelection = (accountType: string) => {
    setAccountType(accountType);
    setTimeout(() => {
      setActiveKey(1);
    }, 2000);
  };

  const renderLocaleCodes = () => {
    if (localeList === undefined) return;
    return localeList?.map((localeCode: any) => (
      <option value={localeCode?.code}>{localeCode?.code}</option>
    ));
  };
  const renderCountriesList = () => {
    if (countriesList === undefined) return;
    return countriesList?.map((country: any) => (
      <option value={country?.code}>{country?.description}</option>
    ));
  };
  const renderStatesList = () => {
    // console.log("stateList" + stateList);
    if (stateList === undefined) return;
    return stateList?.map((state: any) => (
      <option value={state?.stateCode}>{state?.stateName}</option>
    ));
  };
  const renderCountiesList = () => {
    // console.log("CountyList" + countiesList);
    if (countiesList === undefined) return;
    return countiesList?.map((county: any) => (
      <option value={county?.countyCode}>{county?.countyDesc}</option>
    ));
  };
  // const renderLanguagesList = () => {
  //   if (languagesList === undefined) return;
  //   console.log(languagesList)
  //   return languagesList?.map((language: any) => (
  //     <option value={language?.code}>{language?.description}</option>
  //   ));
  // };

  // useEffect(() => {
  //   console.log(languagesList);
  // }, [languagesList]);

  const validateContactInfo = () => {
    if (customerType === "OLD") {
      setLoader(true);
      dispatch(ValidateCustomerNewAccount(customerNumber));
    } else {
      setActiveKey(2);
    }
  };
  const validateUserInfo = () => {
    setActiveKey(3);
  };
  const onSubmit = () => {
    setLoader(true);
    // setTimeout(() => {

    // }, 3000);
    dispatch(
      CreateNewAccount(
        accountType,
        name,
        addressLine,
        address1,
        address2,
        postcode,
        city,
        selectedState,
        selectedCountry,
        contactPerson,
        phoneNumber,
        fax,
        language,
        userId,
        userName,
        email,
        selectedLocale,
        vatRegistration,
        customerNumber,
        selectedCounty
      )
    );
  };

  return (
    <StyledContainer style={{ overflow: "auto", maxHeight : "400px"}}>
      <Modal
        isAlert
        icon
        title={"Error"}
        message={errorAccountFailed}
        isOpen={accountCreationFailed}
        hasCancelButton={false}
        onRequestClose={() => {
          setAccountCreationFailed(false);
        }}
        secondaryActionText={"ok"}
        onSecondaryButtonClick={() => {
          setAccountCreationFailed(false);
        }}
      />
      <Header>
        <TextStyleDark>
          <h2>{t("CON_CREATE_ACCOUNT")}</h2>
        </TextStyleDark>
        <div onClick={() => handleBackButtonClick(true)}>
        <CloseSVG className="primary-icon-2 icon-lg"/>
        </div>
      </Header>
      <div
        className="hr-b-2"
        style={{
          paddingBottom: "18px",
          marginLeft: "-30px",
          marginRight: "-30px",
        }}
      ></div>

      {activeKey !== 0 && activeKey < 4 ? (
        <div style={{ marginTop: "58px" }}>
          <TimeLineContainer>
            <TimeLineHeader>
              <div>
                <TimeLineContainer.Panel
                  for_={1}
                  activeKey={activeKey}
                  setActiveKey={setActiveKey}
                >
                  {activeKey === 1 ? "1" : <CheckSVG className="primary-icon-1"/>}
                </TimeLineContainer.Panel>

                <TimeLineContainer.Panel
                  for_={2}
                  activeKey={activeKey}
                  setActiveKey={setActiveKey}
                >
                  {activeKey === 2 || activeKey < 2 ? "2" : <CheckSVG className="primary-icon-1"/>}
                </TimeLineContainer.Panel>

                <TimeLineContainer.Panel
                  for_={3}
                  activeKey={activeKey}
                  setActiveKey={setActiveKey}
                >
                  {activeKey === 2 || activeKey < 3 ? "3" : <CheckSVG className="primary-icon-1"/>}
                </TimeLineContainer.Panel>
              </div>
            </TimeLineHeader>
          </TimeLineContainer>
        </div>
      ) : (
        <div></div>
      )}

      {activeKey === 0 && (
        <div>
          <h3 style={{ marginTop: "18px", marginLeft: "14px" }}>
            Select the type of account you desire:
          </h3>
          <AccountSelectionContainer>
            <AccountSelection
              onClick={() => handleCustomerSelection("COMPANY")}
              className="card"
              style={{
                backgroundColor:
                  accountType === "COMPANY"
                    ? "rgba(var(--primary-color-1-rgb), var(--low-opacity))"
                    : "",
              }}
            >
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  marginLeft: "115px",
                  alignItems: "right",
                  marginTop: "12px",
                }}
              >
                {accountType === "COMPANY" && <CheckMarkSVG className="primary-icon-1"/>}
              </div>
              <AccountType
                style={{
                  marginTop: "12px",
                }}
              >
                <WareHouse className="primary-icon-1"/>
                <h4 style={{ marginTop: "6px", textAlign: "center" }}>
                  Company account
                </h4>
              </AccountType>
            </AccountSelection>
            <AccountSelection
              onClick={() => handleCustomerSelection("PRIVATE")}
              className="card"
              style={{
                backgroundColor:
                  accountType === "PRIVATE"
                    ? "rgba(var(--primary-color-1-rgb), var(--low-opacity))"
                    : "",
              }}
            >
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  marginLeft: "115px",
                  alignItems: "right",
                  marginTop: "12px",
                }}
              >
                {accountType === "PRIVATE" && <CheckMarkSVG className="primary-icon-1"/>}
              </div>
              <AccountType
                style={{
                  marginTop: "12px",
                }}
              >
                <Individual className="primary-icon-1"/>
                <h4 style={{ marginTop: "-16px", textAlign: "center" }}>
                  Individual account
                </h4>
              </AccountType>
            </AccountSelection>
          </AccountSelectionContainer>
        </div>
      )}

      {activeKey === 1 && (
        <div>
          <h3 style={{ marginTop: "24px" }}>Enter customer details</h3>
          {accountType === "COMPANY" && (
            <CustomerSelection>
              <Radio
                onClick={() => setCustomerType("NEW")}
                labelText={t("CON_NEW_CUSTOMER")}
                checked={customerType === "NEW"}
              ></Radio>
              <Radio
                onClick={() => setCustomerType("OLD")}
                labelText={t("COH_CUSTOMER_NUMBER")}
                checked={customerType === "OLD"}
              ></Radio>
            </CustomerSelection>
          )}
          {customerType === "NEW" && (
            <Form>
              <div style={{ paddingTop: "24px" }}>
                <EditText>
                  <h4>
                    {t("COH_NAME")} <span style={{ color: "red" }}>*</span>
                  </h4>
                </EditText>
                <StyledInput
                  id="name"
                  type="text"
                  value={name}
                  onChange={handleChange}
                  placeholder="eg. John Derek"
                  onBlur={handleBlur}
                  validationErrorText="Please enter valid Name"
                  isInvalid={!accountValidationFlags["validName"]}
                />
              </div>
              {accountType === "COMPANY" && (
                <div style={{ paddingTop: "14px" }}>
                  <EditText style={{ paddingTop: "14px" }}>
                    <h4>
                      {t("CON_CONTACT_PERSON")}{" "}
                      <span style={{ color: "red" }}>*</span>
                    </h4>
                  </EditText>
                  <StyledInput
                    id="contactperson"
                    onChange={handleChange}
                    value={contactPerson}
                    type="text"
                    onBlur={handleBlur}
                    validationErrorText="Please enter valid Name"
                    isInvalid={!accountValidationFlags["validContact"]}
                  />
                </div>
              )}
              <div style={{ paddingTop: "14px" }}>
                <EditText style={{ paddingTop: "14px" }}>
                  <h4>
                    {t("CON_ADDRESS_LINES")}{" "}
                    <span style={{ color: "red" }}>*</span>
                  </h4>
                </EditText>
                <StyledInput
                  id="addressline"
                  type="text"
                  onChange={handleChange}
                  value={addressLine}
                  onBlur={handleBlur}
                  validationErrorText="Please enter your complete address"
                  isInvalid={!accountValidationFlags["validAddrs"]}
                />
              </div>
              <div style={{ paddingTop: "14px" }}>
                <EditText style={{ paddingTop: "14px" }}>
                  <h4>
                    {t("CON_POSTCITY")} <span style={{ color: "red" }}>*</span>
                  </h4>
                </EditText>
                <StyledInput
                  id="city"
                  type="text"
                  onChange={handleChange}
                  value={city}
                  onBlur={handleBlur}
                  validationErrorText="Please enter your city name"
                  isInvalid={!accountValidationFlags["validCity"]}
                />
              </div>
              <div style={{ paddingTop: "14px" }}>
                <EditText style={{ paddingTop: "14px" }}>
                  <h4>
                    {t("CON_POSTCODE")} <span style={{ color: "red" }}>*</span>
                  </h4>
                </EditText>
                <StyledInput
                  id="postcode"
                  type="text"
                  onChange={handleChange}
                  value={postcode}
                  onBlur={handleBlur}
                  validationErrorText="Please enter valid postcode"
                  isInvalid={!accountValidationFlags["validPost"]}
                />
              </div>
              {stateList?.length > 0 && (
                <div style={{ paddingTop: "14px" }}>
                  <EditText style={{ paddingTop: "14px" }}>
                    <h4>
                      {t("CON_STATE")} <span style={{ color: "red" }}>*</span>
                    </h4>
                  </EditText>

                  <select
                    style={{ marginTop: "4px", width: "100%" }}
                    onChange={(e) => getCountiesList(e.target.value)}
                    placeholder="Select Country"
                  >
                    {renderStatesList()}
                  </select>
                </div>
              )}
              <div style={{ paddingTop: "14px" }}>
                <EditText style={{ paddingTop: "14px" }}>
                  <h4>
                    {t("CON_COUNTRY")} <span style={{ color: "red" }}>*</span>
                  </h4>
                </EditText>
              </div>
              <select
                style={{ marginTop: "4px", width: "100%" }}
                value= {selectedCountry ?selectedCountry : "AUS"}
                onChange={(e) => getStateList(e.target.value)}
              >
                {renderCountriesList()}
              </select>

              {countiesList?.length > 0 && (
                <div style={{ paddingTop: "14px" }}>
                  <EditText style={{ paddingTop: "14px" }}>
                    <h4>
                      {t("CON_COUNTY")} <span style={{ color: "red" }}>*</span>
                    </h4>
                  </EditText>

                  <select
                    style={{ marginTop: "4px", width: "100%" }}
                    onChange={(e) => setSelectedCounty(e.target.value)}
                  >
                    {renderCountiesList()}
                  </select>
                </div>
              )}
              {accountType === "COMPANY" && (
                <div style={{ paddingTop: "14px" }}>
                  <EditText style={{ paddingTop: "14px" }}>
                    <h4>{t("CON_VAT_REGISTRATION_NUMBER")} </h4>
                  </EditText>
                  <StyledInput
                    id="vatnumber"
                    type="text"
                    onChange={handleChange}
                    value={vatRegistration}
                  />
                </div>
              )}
              <div style={{ paddingTop: "14px" }}>
                <EditText style={{ paddingTop: "14px" }}>
                  <h4>
                    {t("CON_PHONE_NUMBER")}{" "}
                    <span style={{ color: "red" }}>*</span>
                  </h4>
                </EditText>
                <div style={{ width: "100%" }}>
                  <StyledInput
                    id="phonenumber"
                    type="text"
                    onChange={handleChange}
                    value={phoneNumber}
                    onBlur={handleBlur}
                    validationErrorText="Please enter valid phonenumber"
                    isInvalid={!accountValidationFlags["validPhone"]}
                  />
                </div>
              </div>
              <div style={{ paddingTop: "14px" }}>
                <EditText style={{ paddingTop: "14px" }}>
                  <h4>{t("CON_FAX_NUMBER")}</h4>
                </EditText>
                <StyledInput
                  id="fax"
                  type="text"
                  onChange={handleChange}
                  value={fax}
                />
              </div>
              <div style={{ paddingTop: "14px" }}>
                <EditText style={{ paddingTop: "14px" }}>
                  <h4>
                    {t("COH_LANGUAGE")} <span style={{ color: "red" }}>*</span>
                  </h4>
                </EditText>
                <select
                  style={{ marginTop: "4px", width: "100%" }}
                  value={language}
                  onChange={(event) => setLanguage(event.target.value)}
                >
                  <option value={"English"}>{"English"}</option>
                  <option value={"Finnish"}>{"Finnish"}</option>
                  <option value={"Swedish"}>{"Swedish"}</option>
                </select>

                {/* <select
                  style={{ marginTop: "4px", width: "100%" }}
                  value={language}
                  onChange={(event) => setLanguage(event.target.value)}
                >
                 {renderLanguagesList()}
                </select> */}
              </div>
            </Form>
          )}
          {customerType === "OLD" && (
            <div style={{ paddingTop: "14px" }}>
              <EditText style={{ paddingTop: "14px" }}>
                <h4>
                  {t("COH_CUSTOMER_NUMBER")}{" "}
                  <span style={{ color: "red" }}>*</span>
                </h4>
              </EditText>
              <StyledInput
                id="customernumber"
                type="text"
                onChange={handleChange}
                value={customerNumber}
                onBlur={handleBlur}
                validationErrorText="Please enter valid customer number"
                isInvalid={!accountValidationFlags["validCustomer"]}
              />
            </div>
          )}

          <Button
            type="submit"
            variant="solid"
            onClick={() => validateContactInfo()}
            disabled={basicInfoFlag}
            style={{
              marginTop: "18px",
              marginBottom: "48px",
              width: "100%",
              background: basicInfoFlag
                ? "var(--gray-4)"
                : "var(--primary-color-1)",
            }}
          >
            <span>{t("CON_NEXT")}</span>
          </Button>
        </div>
      )}
      {activeKey === 2 && (
        <div>
          <h3 style={{ marginTop: "24px" }}>Enter web user details</h3>
          <div style={{ paddingTop: "14px" }}>
            <EditText style={{ paddingTop: "14px" }}>
              <h4>{t("CON_USER_ID")}</h4>
            </EditText>
            <StyledInput
              id="userid"
              type="text"
              onChange={handleChange}
              value={userId}
              onBlur={handleBlur}
              validationErrorText="Please enter valid userId"
              isInvalid={!accountValidationFlags["validUserId"]}
            />
          </div>
          <div style={{ paddingTop: "14px" }}>
            <EditText style={{ paddingTop: "14px" }}>
              <h4>{t("CON_NAME")}</h4>
            </EditText>
            <StyledInput
              id="username"
              type="text"
              onChange={handleChange}
              value={userName}
              onBlur={handleBlur}
              validationErrorText="Please enter valid userName"
              isInvalid={!accountValidationFlags["validUserName"]}
            />
          </div>
          <div style={{ paddingTop: "14px" }}>
            <EditText style={{ paddingTop: "14px" }}>
              <h4>{t("CON_EMAIL_ADDRESS")}</h4>
            </EditText>
            <StyledInput
              id="email"
              type="email"
              autoComplete="new-password"
              onChange={handleChange}
              value={email}
              onBlur={handleBlur}
              validationErrorText="Please enter valid emailId"
              isInvalid={!accountValidationFlags["validEmail"]}
            />
          </div>
          <div style={{ paddingTop: "14px" }}>
            <EditText style={{ paddingTop: "14px" }}>
              <h4>Locate (Optional)</h4>
            </EditText>
            <select
              style={{ marginTop: "4px", width: "100%" }}
              value={selectedLocale}
              onChange={(event) => setSelectedLocale(event.target.value)}
              placeholder="Default Location"
            >
              {renderLocaleCodes()}
            </select>

            <Button
              type="submit"
              variant="solid"
              onClick={() => validateUserInfo()}
              disabled={userInfoFlag}
              style={{
                marginTop: "18px",
                marginBottom: "48px",
                width: "100%",
                background: userInfoFlag
                  ? "var(--gray-4)"
                  : "var(--primary-color-1)",
              }}
            >
              <span>{t("CON_NEXT")} </span>
            </Button>
          </div>
        </div>
      )}
      {activeKey === 3 && (
        <div>
          <TextStyleDark style={{ marginTop: "24px" }}>
            <h3>Verify and submit your application</h3>
          </TextStyleDark>
          <TextStyleLight style={{ marginTop: "24px" }}>
            <h4>{t("CON_CUSTOMER")}</h4>
          </TextStyleLight>
          <TextStyleDark style={{ marginTop: "4px" }}>
            <h3>{name}</h3>
          </TextStyleDark>
          <TextStyleLight style={{ marginTop: "24px" }}>
            <h4>{t("COH_ADDRESS")} </h4>
          </TextStyleLight>
          <TextStyleDark style={{ marginTop: "4px" }}>
            <h3>{addressLine}</h3>
          </TextStyleDark>
          <TextStyleLight style={{ marginTop: "24px" }}>
            <h4>{t("CON_PHONE_NUMBER")} </h4>
          </TextStyleLight>
          <TextStyleDark style={{ marginTop: "4px" }}>
            <h3>{phoneNumber}</h3>
          </TextStyleDark>
          <TextStyleLight style={{ marginTop: "24px" }}>
            <h4>{t("COH_LANGUAGE")} </h4>
          </TextStyleLight>
          <TextStyleDark style={{ marginTop: "4px" }}>
            <h3>{language}</h3>
          </TextStyleDark>
          <TextStyleLight style={{ marginTop: "24px" }}>
            <h4>VAT Number</h4>
          </TextStyleLight>
          <TextStyleDark style={{ marginTop: "4px" }}>
            <h3>VAT {vatRegistration}</h3>
          </TextStyleDark>
          <TextStyleLight style={{ marginTop: "24px" }}>
            <h4>{t("CON_WEBUSER")}</h4>
          </TextStyleLight>
          <TextStyleDark style={{ marginTop: "4px" }}>
            <h3>{userName}</h3>
          </TextStyleDark>
          <TextStyleLight style={{ marginTop: "24px" }}>
            <h4>{t("CON_EMAIL_ADDRESS")}</h4>
          </TextStyleLight>
          <TextStyleDark style={{ marginTop: "4px" }}>
            <h3>{email}</h3>
          </TextStyleDark>

          <Button
            type="submit"
            variant="solid"
            onClick={() => onSubmit()}
            style={{
              marginTop: "18px",
              width: "100%",
              background: "var(--primary-color-1)",
            }}
          >
            <span>Submit</span>
          </Button>
        </div>
      )}
      {activeKey === 4 && (
        <ThankYouSection
          style={{
            paddingTop: "48px",
          }}
        >
          {/* <TimeLineContainer.Panel for_={1}>
            <CheckSVG />
          </TimeLineContainer.Panel> */}
          <TextStyleDark
            style={{
              marginTop: "8px",
            }}
          >
            <h2>{t("TXT_PAGE_TITLE_THANK_YOU")} !</h2>{" "}
          </TextStyleDark>
          <TextStyleLight
            style={{
              marginTop: "18px",
            }}
          >
            <h5>
              You have successfully submitted your application and someone from
              support team will contact you shortly.
            </h5>
          </TextStyleLight>

          <div
            onClick={() => handleBackButtonClick(true)}
            className="d-flex flex-row justify-content-left"
            style={{
              marginTop: "24px",
              justifyItems: "left",
              alignItems: "left",
              position: "absolute",
              bottom: 50,
            }}
          >
            <LeftArrowCircle className="primary-icon-1"></LeftArrowCircle>
            <TextStyleDark
              style={{
                color: "var(--primary-color-1)",
                marginLeft: "13px",
                marginTop: "1px",
              }}
            >
              <h3>Back to Login</h3>
            </TextStyleDark>
          </div>
        </ThankYouSection>
      )}
      <LoadingOverlay active={loader} />
    </StyledContainer>
  );
};

const StyledContainer = styled.section`
  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    margin-left: 30px;
    padding-top: 18px;
    position: absolute;
    top: 0;
  }
  top: 24px;
  background: var(--white);
  border-radius: var(--border-radius);
  padding: 10px 30px;
  width: 422px;
  min-height: calc(100vh - 40px);
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const AccountSelectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  margin-top: 20px;
`;

const AccountSelection = styled.div`
  width: 180px;
  height: 160px;
  margin: 10px;
`;

const AccountType = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CustomerSelection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const Form = styled.form`
  align-items: left;
  margin-top: 16px;
`;
const TextStyleLight = styled.section`
  font-weight: var(--font-weight-normal);
  color: var(--primary-color-3);
`;
const TextStyleDark = styled.section`
  font-weight: var(--font-weight-medium);
  color: var(--primary-color-2);
`;
const EditText = styled.text`
  font-weight: var(--font-weight-medium);
  text-transform: capitalize;
  color: var(--input-text-color);
  line-height: 21.79px;
`;

const ThankYouSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const TimeLineHeader = styled.div`
  display: flex;
  justify-content: space-between;

  ${respondTo.xs`
    flex-direction:column;
    >:last-child{
      display:flex;
      margin-top:10px;
      justify-content:flex-start;
    }
    `}

  ${respondTo.sm`
    flex-direction:row;
    >:last-child{
      display:block;
      top:0;
      right:0
      position:absolute;
      margin-top:-10px;
    }
  `}
`;

export default CreateAccount;
