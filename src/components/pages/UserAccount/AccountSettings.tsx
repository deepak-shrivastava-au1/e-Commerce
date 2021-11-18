import { Fragment, useState, useEffect } from "react";
import Breadcrumb from "@fragments/Breadcrumb";
import LeftNevigation from "../Enquiry/Order/OrderHistory/LeftNevigation";
import { useMediaQuery } from "@material-ui/core";
import styled from "styled-components";
import Button from "@common/Button";
import { breakpoints } from "@constants/styled-components";
import StyledInput from "@common/StyledInput";
import { useTranslation } from "react-i18next";
import { getLocaleListSelector } from "../../../redux/Slices/UserAccount/getLocaleList";
import { webSettingsSelector } from "../../../redux/Slices/webSettings";
import { userSelector } from "../../../redux/Slices/UserAccount/userSlice";
import { GetLocaleList } from "../../../redux/Slices/UserAccount/getLocaleList";
import { GetWebUserDetails ,getWebUserSelector} from "../../../redux/Slices/UserAccount/getWebUserDetails";
import { useSelector, useDispatch } from "react-redux";
import { CheckMarkSVG, EditIcon, ExpandMore } from "@icons";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import {
  changePasswordSelector,
  ChangeUserPassword,
} from "../../../redux/Slices/UserAccount/changePassword";
import {
  editUserSelector,
  EditUserDetails,
} from "../../../redux/Slices/UserAccount/editUser";
import Modal from "@common/Modal";
import LoadingOverlay from "@common/LoadingOverlay";
import { cartSelector } from "@slices/cart/getTemporaryOrderData";
import { setDefaultLocale } from "react-datepicker";

function AccountSettings() {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(`(min-width:${breakpoints.md})`);
  const { t, i18n } = useTranslation();
  const localeList = useSelector(getLocaleListSelector)?.localeList;
  const [selectedLocale, setSelectedLocale] = useState("ar_AE");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const webSettingData = useSelector(webSettingsSelector)?.webSettings;
  const webUserData = useSelector(getWebUserSelector)?.webUser
  const userInfo = useSelector(userSelector)?.user?.user?.data;
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [errorHeader, setErrorHeader] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState<boolean>(false);
  const editUserData = useSelector(editUserSelector)?.editUser;
  const changePasswordData = useSelector(
    changePasswordSelector
  )?.changePassword;
  const [loader, setLoader] = useState<boolean>(false);
  const [editUserClicked, setEditUserClicked] = useState<boolean>(false);

  const cartItemsData = useSelector(cartSelector)?.cartItems;

  const onSubmit = () => {};
  const enableEditUserData = () => {
    setEditUserClicked(true);
  };
  const changePassword = () => {
    if (
      oldPassword.length === 0 ||
      newPassword.length === 0 ||
      confirmPassword.length === 0
    ) {
      setErrorHeader("Invalid Input");
      setErrorMessage("Enter valid password");
      setShowError(true);
    } else {
      setLoader(true);
      dispatch(ChangeUserPassword(oldPassword, newPassword, confirmPassword));
    }
  };
  const editUserDetails = () => {
    setLoader(true);
    dispatch(EditUserDetails(userName, email, selectedLocale));
  };
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.id === "username") {
      setUserName(e.target.value);
    } else if (e.target.id === "email") {
      setEmail(e.target.value);
    } else if (e.target.id === "oldpass") {
      setOldPassword(e.target.value);
    } else if (e.target.id === "newpass") {
      setNewPassword(e.target.value);
    } else if (e.target.id === "confirmpass") {
      setConfirmPassword(e.target.value);
    }
  }
  const renderLocaleCodes = () => {
    if (localeList === undefined || localeList?.length < 1) return;
    return localeList?.map((localeCode: any) => (
      <option value={localeCode?.code}>{localeCode?.code}</option>
    ));
  };

  // useEffect(() => {
  //   setLoader(true);
  //   setTimeout(() => {
  //     setLoader(false);
  //    }, 2000);
  // }, [])

  useEffect(() => {
    dispatch(GetLocaleList());
  }, [dispatch]);
  useEffect(() => {
    dispatch(GetWebUserDetails(userInfo?.sessionId));
  }, [dispatch]);

  // useEffect(() => {
  //   console.log("localeList" + JSON.stringify(localeList));
  // }, [localeList]);

  useEffect(() => {
    if (webUserData?.userName) {
      setUserName(webUserData?.userName);
    }
    if (webUserData?.userEmail) {
      setEmail(webUserData?.userEmail);
    }
  }, [webUserData]);
  useEffect(() => {
    if (webSettingData?.localeCode) {
      setSelectedLocale(webSettingData?.localeCode);
    }
  }, [webSettingData]);

  useEffect(() => {
    // console.log(editUserData);
    if (editUserData?.messageCode === 4600) {
      setLoader(false);
    } else {
      setLoader(false);
    }
  }, [editUserData]);

  useEffect(() => {
    // console.log(changePasswordData);
    if (changePasswordData?.messageCode === 6000) {
      setLoader(false);
    } else if (changePasswordData?.messageCode === 6002) {
      setLoader(false);
      setErrorHeader("Error");
      setErrorMessage("Old password is not matching");
      setShowError(true);
    } else {
      setLoader(false);
    }
  }, [changePasswordData]);

  // useEffect(() => {
    // console.log(
    //   cartItemsData?.invoiceAddress?.address1 +
    //     cartItemsData?.invoiceAddress?.address2 +
    //     cartItemsData?.invoiceAddress?.address3 +
    //     cartItemsData?.invoiceAddress?.address4
    // );
    // console.log(cartItemsData?.billingAddress?.address1);
  // }, [cartItemsData]);

  return (
    <Fragment>
      <Modal
        isAlert
        icon
        title={errorHeader}
        message={errorMessage}
        isOpen={showError}
        hasCancelButton={false}
        onRequestClose={() => {
          setShowError(false);
        }}
        secondaryActionText={"ok"}
        onSecondaryButtonClick={() => {
          setShowError(false);
        }}
      />
      <div className="content-area">
        <Breadcrumb />
        <Container>
          {isMobile && <LeftNevigation />}
          <AccountSection>
            <div className="row">
              <div className="col-lg-12">
                <Accordion className="custom-accordian">
                  <AccordionSummary
                    expandIcon={
                      <ExpandMore className="primary-icon-3 icon-md" />
                    }
                  >
                    <h3>{t("CON_USER")}</h3>
                  </AccordionSummary>
                  <AccordionDetails style={{paddingBottom: "24px", paddingLeft: "14px"}}>
                    <div className="d-flex flex-column  w-100">
                      <div className="row" style={{ marginTop: "15px" }}>
                        <div className="col-lg-12">
                          {" "}
                          <TextContainer>
                            <h5>{t("CON_USER")}</h5>
                            <MediumText>
                              <h4>Madhu</h4>
                            </MediumText>
                          </TextContainer>
                          <div className="float-right">
                            {!editUserClicked && (
                              <div
                                className="d-flex row"
                                onClick={enableEditUserData}
                                style={{
                                  marginTop: "5px",
                                  marginRight: "36px",
                                }}
                              >
                                <EditIcon />
                                <MediumText style={{ marginLeft: "8px" }}>
                                  <h4>{t("CON_EDIT_USER")}</h4>
                                </MediumText>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="row" style={{ marginTop: "15px" }}>
                        <div className="col-lg-10">
                          <EditText>
                            <h4>{t("COH_NAME")}</h4>
                          </EditText>
                          <StyledInput
                            disabled={!editUserClicked}
                            onChange={handleChange}
                            id="username"
                            type="text"
                            value={userName}
                            placeholder="eg. John Derek"
                            validationErrorText="Please enter valid Name"
                            isInvalid={false}
                            style={{ maxWidth: "500px" }}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-10">
                          {" "}
                          <EditText style={{ paddingTop: "24px" }}>
                            <h4>{t("CON_EMAIL")}</h4>
                          </EditText>
                          <StyledInput
                            disabled={!editUserClicked}
                            onChange={handleChange}
                            id="email"
                            type="email"
                            value={email}
                            placeholder={"John.derek@iptor.com"}
                            validationErrorText="Please enter valid password"
                            isInvalid={false}
                            style={{ maxWidth: "500px" }}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-10">
                          <EditText style={{ paddingTop: "14px" }}>
                            <h4>{t("CON_LOCALE")}</h4>
                          </EditText>
                          <select
                            disabled={!editUserClicked}
                            style={{
                              marginTop: "4px",
                              width: "100%",
                              maxWidth: "500px",
                            }}
                            value={selectedLocale}
                            onChange={(event) =>
                              setSelectedLocale(event.target.value)
                            }
                            placeholder="Default Location"
                          >
                            {renderLocaleCodes()}
                          </select>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-10">
                          {editUserClicked && (
                            <Button
                              type="submit"
                              variant="solid"
                              onClick={() => editUserDetails()}
                              style={{
                                alignItems: "center",
                                justifyContent: "center",
                                justifyItems: "center",
                                marginTop: "18px",
                                width: "30%",
                                background: "var(--secondary-color)",
                              }}
                            >
                              <span>{t("CON_EDIT_USER")} </span>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
            </div>


            <div className="row">
              <div className="col-lg-12">
                <Accordion className="custom-accordian">
                  <AccordionSummary
                    expandIcon={
                      <ExpandMore className="primary-icon-3 icon-md" />
                    }
                  >
                   <h3>{t("CON_CHANGE_PASSWORD")}</h3>
                  </AccordionSummary>
                  <AccordionDetails style={{paddingBottom: "24px", paddingLeft: "14px"}}>
                    <div className="d-flex flex-column  w-100">
                     

                      <div className="row" style={{ marginTop: "15px" }}>
                        <div className="col-lg-10">
                        <EditText style={{ paddingTop: "24px" }}>
                              <h4>{t("CON_OLD_PASSWORD")}</h4>
                            </EditText>
                            <StyledInput
                              onChange={handleChange}
                              id="oldpass"
                              type="password"
                              validationErrorText="Please enter valid password"
                              isInvalid={false}
                              placeholder="**********"
                              style={{ maxWidth: "500px", marginTop:"10px"  }}
                            />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-10">
                        <EditText style={{ paddingTop: "24px" }}>
                              <h4>{t("CON_NEW_PASSWORD")}</h4>
                            </EditText>
                            <StyledInput
                              onChange={handleChange}
                              id="newpass"
                              type="password"
                              validationErrorText="Please enter valid password"
                              isInvalid={false}
                              placeholder="**********"
                              style={{ maxWidth: "500px", marginTop:"10px" }}
                            />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-10">
                        <EditText style={{ paddingTop: "24px" }}>
                              <h4>{t("CON_CONFIRM_NEW_PASSWORD")}</h4>
                            </EditText>
                            <StyledInput
                              onChange={handleChange}
                              id="confirmpass"
                              type="password"
                              validationErrorText="Please enter valid password"
                              isInvalid={false}
                              placeholder="**********"
                              style={{ maxWidth: "500px", marginTop:"10px"  }}
                            />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-10">
                        <Button
                          type="submit"
                          variant="solid"
                          onClick={() => changePassword()}
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                            justifyItems: "center",
                            marginTop: "18px",
                            width: "30%",
                            background: "var(--secondary-color)",
                          }}
                        >
                          <span>{t("CON_CHANGE_PASSWORD")} </span>
                        </Button>
                        </div>
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="card-table">
                  <div className="card-tbody">
                    <div className="row">
                      <div className="col-lg-12">
                        <BoldText>
                          <h3 style={{ marginTop: "2px", marginLeft: "16px" }}>
                            {t("COH_ADDRESS")}
                          </h3>
                        </BoldText>

                        <div
                          className="hr-b-1"
                          style={{
                            paddingBottom: "18px",
                            marginLeft: "-30px",
                            marginRight: "-30px",
                          }}
                        ></div>
                        <MediumText >
                          <h4 style={{ paddingTop: "16px" ,  paddingLeft: "16px"}}>  {t("COH_ADDRESS")}</h4>
                        </MediumText>
                        <div className="row" style={{ paddingBottom: "26px", paddingLeft: "14px" }}>
                          <div className="col-lg-4 col-md-6" >
                            <AddressSelection className="card" >
                              <AddressTitle >
                                <MediumText>
                                  <h3 style={{ paddingLeft: "6px" }}>
                                    {t("COH_ADDRESS")}
                                  </h3>
                                </MediumText>
                                <CheckMarkSVG className="primary-icon-1" />
                              </AddressTitle>

                              <h3 style={{ margin: "5px"}}>
                                {cartItemsData?.billingAddress?.address1 +
                                  " " +
                                  cartItemsData?.billingAddress?.address2 +
                                  cartItemsData?.billingAddress?.address3 +
                                  " " +
                                  cartItemsData?.billingAddress?.address4 +
                                  " "}
                              </h3>
                            </AddressSelection>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <AddressSelection className="card">
                              <AddressTitle>
                                <MediumText>
                                  <h3 style={{ paddingLeft: "6px" }}>
                                    {t("CON_DELIVERY_ADDRESS")}
                                  </h3>
                                </MediumText>
                                <CheckMarkSVG className="primary-icon-1" />
                              </AddressTitle>

                              <h3 style={{ margin: "5px" }}>
                                {cartItemsData?.customerDeliveryAddressList?.map(
                                  (address: any) =>
                                    address?.address1 +
                                    " " +
                                    address?.address2 +
                                    address?.address3 +
                                    " " +
                                    address?.address4
                                )}
                              </h3>
                            </AddressSelection>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <AddressSelection className="card">
                              <AddressTitle>
                                <MediumText>
                                  <h3 style={{ paddingLeft: "6px" }}>
                                   {t("CON_INVOICE_ADDRESS")}
                                  </h3>
                                </MediumText>
                                <CheckMarkSVG className="primary-icon-1" />
                              </AddressTitle>

                              <h3 style={{ margin: "5px" }}>
                                {cartItemsData?.invoiceAddress?.address1 +
                                  " " +
                                  cartItemsData?.invoiceAddress?.address2 +
                                  cartItemsData?.invoiceAddress?.address3 +
                                  " " +
                                  cartItemsData?.invoiceAddress?.address4 +
                                  " "}
                              </h3>
                            </AddressSelection>
                          </div>
                        </div>

                        <MediumText>
                          <h3 style={{ paddingLeft: "16px" }}>{t("CON_PAYMENT_METHOD")}</h3>
                        </MediumText>
                        <h3 style={{ paddingLeft: "16px" }}>
                          {t("CON_DEFAULT_PAYMENT_METHOD")} {"is "}
                          <BoldText>{webSettingData?.paymentMethod}</BoldText>.
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <Accordion className="custom-accordian">
              <AccordionSummary
                expandIcon={<ExpandMore className="primary-icon-3 icon-md" />}
              >
                  
              </AccordionSummary>
              <AccordionDetails>
                <div className="card-table">
                  <div className="card-tbody">
                    <div className="row">
                      <div className="col">
                        <div onClick={onSubmit}>
                          <div style={{ paddingTop: "24px" }}>
                           
                          </div>
                          <div style={{ paddingTop: "24px" }}>
                            
                          </div>
                          <div style={{ paddingTop: "24px" }}>
                           
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion> */}
          </AccountSection>
        </Container>
      </div>
      <LoadingOverlay active={loader} />
    </Fragment>
  );
}

const Container = styled.aside`
  display: flex;
  width: 100%;
`;

const AccountSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0 0px 0 24px;
  flex-grow: 1;
  > :not(:last-child) {
    margin-bottom: 14px;
  }
`;
const BoldText = styled.text`
  font-weight: var(--font-weight-bold);
`;
const MediumText = styled.text`
  font-weight: var(--font-weight-medium);
`;

const EditText = styled.text`
  font-weight: var(--font-weight-medium);
  text-transform: capitalize;
  color: var(--input-text-color);
  line-height: 21.79px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const AddressTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px;
`;

const AddressSelection = styled.div`
  min-height: 130px;
`;
export default AccountSettings;
