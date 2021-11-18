import React, { FC, useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../../../assets/icons/logo_icon.png";
import divider from "../../../assets/icons/divider_line.png";
import english_flag from "../../../assets/icons/flag_english.png";
import finland_flag from "../../../assets/icons/flag_finland.png";
import swedan_flag from "../../../assets/icons/flag_sweden.png";
import backbutton from "../../../assets/icons/left_arrow.png";
import { useTranslation } from "react-i18next";
import { CountrySelectDropdown } from "./CountrySelectDropdown";
import { useSelector, useDispatch } from "react-redux";
import { breakpoints } from "@constants/styled-components";
import { useMediaQuery } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import {
  ValidateLoggedUser,
  userSelector,
} from "../../../redux/Slices/UserAccount/userSlice";
import { useForm } from "react-hook-form";
import { webSettingsSelector } from "../../../redux/Slices/webSettings";
import { LeftArrowCircle } from "@icons";
import Button from "@common/Button";
import LoadingOverlay from "@common/LoadingOverlay";
import { ForgotPassword } from "./ForgotPassword";
import StyledInput from "@common/StyledInput";
import Modal from "@common/Modal";

type LoginProps = {
  fromSplash: boolean;
  launchCreateAccountScreen: (arg: boolean) => void;
};

export const LoginPage: FC<LoginProps> = ({
  fromSplash,
  launchCreateAccountScreen,
}) => {
  const isMobile = useMediaQuery(`(max-width:${breakpoints.sm})`);
  const history = useHistory();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const { register, errors, handleSubmit } = useForm();
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isSplashScreenShown, setSplashScreenShown] = useState<boolean>(false);
  const [languageCode, setLanguageCode] = useState<string>("");
  const [flagImage, setFlagImage] = useState(english_flag);
  const { user, loading, hasErrors } = useSelector(userSelector);
  const [loader, setLoader] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const [invalidCredentials, setInvalidCredentials] = useState<boolean>(false);
  const [validUserName, setValidUserName] = useState<boolean>(true);
  const [validPassword, setvalidPassword] = useState<boolean>(true);
  const [showForgotPasswordScreen, setShowForgotPasswordScreen] =
    useState<boolean>(false);

  const { getwebSettingsSuccess, getwebSettingsFailed } =
    useSelector(webSettingsSelector);

  const onSubmit = (event: React.FormEvent<HTMLInputElement>) => {
    //console.log("Submit" + ":" + username + ":" + password);
    if (username === undefined) {
      setValidUserName(false);
    } else if (password === undefined) {
      setvalidPassword(false);
    } else {
      setLoader(true);
      dispatch(
        ValidateLoggedUser(
          username,
          password,
          languageCode ? languageCode : "EN"
        )
      );
    }
  };

  useEffect(() => {
    // if (user?.user?.data?.isAuthenticated && !fromSplash) {
    //   history.go(0);
    // }
    if (username !== undefined && password !== undefined) {
      if (user?.user?.data?.errorCode === 4205) {
        setErrorMessage(t("MSG_USER_INACTIVE"));
        setInvalidCredentials(true);
        setLoader(false);
      }
      if (user?.user?.data?.errorCode === 4207) {
        setErrorMessage(t("MSG_INCORRECT_USERID_PASSWORD"));
        setInvalidCredentials(true);
        setLoader(false);
      }
      if (user?.user?.data?.errorCode === 4602) {
        setErrorMessage(t("MSG_USER_WARNING"));
        setInvalidCredentials(true);
        setLoader(false);
      }
      if (user?.user?.data?.errorCode === 4603) {
        setErrorMessage(t("MSG_USER_INACTIVATE"));
        setInvalidCredentials(true);
        setLoader(false);
      }
      if (user?.user?.status === 204) {
        console.log("Login error");
      }
      if (user?.user?.data?.errorCode === 0) {
        setErrorMessage(t("MSG_INCORRECT_USERID_PASSWORD"));
        setInvalidCredentials(true);
        setLoader(false);
      }
    }
  }, [user]);

  useEffect(() => {
    if (languageCode === "") {
      setLoader(true);
      i18n.changeLanguage("en");
      setTimeout(() => {
        setLoader(false);
      }, 1000);
    }
  }, [languageCode]);

  const updateSelectedLanguage = (code: string): void => {
    setLanguageCode(code);
    console.log(code);
    switch (code) {
      case "EN":
        setFlagImage(english_flag);
        break;
      case "FI":
        setFlagImage(finland_flag);
        break;
      case "SV":
        setFlagImage(swedan_flag);
        break;
      default:
        setFlagImage(english_flag);
        break;
    }
  };

  const hideSplash = (event: React.FormEvent<HTMLInputElement>) => {
    setSplashScreenShown(true);
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.id === "username") {
      setUsername(e.target.value);
      setValidUserName(true);
    } else {
      setPassword(e.target.value);
      setvalidPassword(true);
    }
  }

  function handleBackButtonClick() {
    setSplashScreenShown(false);
    if (showForgotPasswordScreen) {
      setShowForgotPasswordScreen(false);
    }
  }

  return (
    <StyledContainer className={`${isSplashScreenShown ? "login-container" : ""}`}>
      {isSplashScreenShown ? (
        <div
          className="d-block d-md-none mb-5"
          onClick={() => handleBackButtonClick()}
        >
          <img src={backbutton} alt="" />
        </div>
      ) : null}

      <ContentHeader
        style={{
          marginTop: "32px",
          marginLeft: "23px",
          justifyContent: isMobile && !isSplashScreenShown ? "center" : "left",
        }}
      >
        <img width="130px" height="40px" src={logo} alt="" />
        <img style={{ marginLeft: "12px" }} src={divider} alt="" />
        <img style={{ marginLeft: "12px" }} src={flagImage} alt="" />
        <CountrySelectDropdown
          selectedLanguageCode={languageCode}
          updateSelectedLanguage={updateSelectedLanguage}
        />
      </ContentHeader>
      {showForgotPasswordScreen && (
        <div>
          <ForgotPassword></ForgotPassword>

          <div
            onClick={() => setShowForgotPasswordScreen(false)}
            className="d-flex flex-row justify-content-left"
            style={{
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
        </div>
      )}
      {!showForgotPasswordScreen && (
        <div>
          {!isSplashScreenShown && isMobile && (
            <Form onSubmit={handleSubmit(hideSplash)}>
              <CustomText
                className="d-flex flex-row justify-content-center"
                style={{ marginTop: "25px" }}
              >
                A milestone in the Netstore transformation journey
              </CustomText>
              <Button
                variant="solid"
                style={{ marginTop: "25px", width: "100%" }}
              >
                {t("CON_SIGN_IN")}
              </Button>
              <div
                className="d-flex flex-row justify-content-center"
                style={{
                  paddingLeft: "1px",
                  paddingRight: "0px",
                  marginTop: "5px",
                }}
              >
                {t("CON_NEW_USER")}?{" "}
                <a href="javascript:void(0)" className="ml-1">
                  <TextStyle onClick={() => launchCreateAccountScreen(true)}>
                    {t("CON_CREATE_ACCOUNT")}
                  </TextStyle>
                </a>
              </div>
            </Form>
          )}

          <Form
            className={`d-none d-md-block ${
              isSplashScreenShown ? "d-block h-full" : "d-none"
            }`}
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* <WelcomeText>
              <h2>Welcome Back!</h2>
            </WelcomeText> */}
            <LoginText>
              <h3>{t("CON_LOGIN_MSG")}</h3>
            </LoginText>
            <div style={{ paddingTop: "24px" }}>
              <EditText>
                {" "}
                <h4>{t("COH_NAME")}</h4>
              </EditText>
              <StyledInput
                onChange={handleChange}
                id="username"
                type="text"
                placeholder="eg. John Derek"
                validationErrorText="Please enter valid Name"
                isInvalid={!validUserName}
              />
            </div>
            <div style={{ paddingTop: "24px" }}>
              <EditText style={{ paddingTop: "24px" }}>
                {" "}
                <h4>{t("CON_PASSWORD")}</h4>
              </EditText>
              <StyledInput
                onChange={handleChange}
                id="password"
                type="password"
                placeholder={t("CON_PASSWORD")}
                validationErrorText="Please enter valid password"
                isInvalid={!validPassword}
              />
            </div>
            {/* <i>{eye}</i> */}
            <TextStyle
              className="text-right"
              style={{ marginTop: "16px" }}
              onClick={() => setShowForgotPasswordScreen(true)}
            >
              {" "}
              {t("CON_FORGOT_PASSWORD")}
            </TextStyle>
            <Button
              // color="primary"
              type="submit"
              variant="solid"
              style={{ marginTop: "18px", width: "100%" }}
            >
              <span>{t("CON_SIGN_IN")}</span>
              {/* {loading && <img width="16px" src={loaderGif} alt="loading..." />} */}
            </Button>
            {invalidCredentials && (
              <Modal
                isAlert
                icon
                title={"Error"}
                message={errorMessage}
                isOpen={invalidCredentials}
                hasCancelButton={false}
                onRequestClose={() => {
                  setInvalidCredentials(false);
                }}
                secondaryActionText={"ok"}
                onSecondaryButtonClick={() => {
                  setInvalidCredentials(false);
                }}
              />
            )}
            {!isMobile && (
              <div
                className="d-flex flex-row"
                style={{
                  paddingLeft: "1px",
                  paddingRight: "0px",
                  marginTop: "5px",
                }}
              >
                <h4>{t("CON_NEW_USER")}?</h4>
                <TextStyle style={{ marginLeft: "8px" }}>
                  <h4 onClick={() => launchCreateAccountScreen(true)}>
                    {t("CON_CREATE_ACCOUNT")}
                  </h4>
                </TextStyle>
              </div>
            )}
          </Form>
          <LoadingOverlay active={loader} />
        </div>
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled.section`
  @media (max-width: 768px) {
    justify-items: center;
    justify-content: center;
    align-items: center;
    top: 54px;
    width: 100%;
    height: auto;
  }
  top: 24px;
  background: var(--white);
  border-radius: var(--border-radius);
  padding: 10px 15px 40px 15px;
  width: 422px;
  height: calc(100vh - 40px);
`;

const Form = styled.form`
  align-items: left;
  margin-left: 36px;
  margin-right: 36px;
  margin-top: 56px;
  @media (max-width: 768px) {
    margin-left: 14px;
    margin-right: 14px;
  }
`;

const ContentHeader = styled.div`
  display: flex;
  align-items: center;
`;

const TextStyle = styled.section`
  font-weight: var(--font-weight-medium);
  color: var(--primary-color-1);
  cursor: pointer;
`;

const WelcomeText = styled.text`
  font-weight: var(--font-weight-bold);
  font-size: calc(var(--base-font-size) + 8px);
  padding: 25px 0 0 0;
  line-height: 32.68px;
`;

const LoginText = styled.text`
  font-weight: var(--font-weight-medium);
  font-size: calc(var(--base-font-size) + 4px);
  margin-top: 10px;
  color: var(--primary-color-3);
  padding: 10px 0 0 0;
  line-height: 24.51px;
`;

const EditText = styled.text`
  font-weight: var(--font-weight-medium);
  text-transform: capitalize;
  color: var(--input-text-color);
  line-height: 21.79px;
`;
const CustomText = styled.text`
  font-weight: var(--font-weight-medium);
  line-height: 27.24px;
  font-size: calc(var(--base-font-size) + 6px);
  justify-content: center;
  align-items: center;
  justify-items: center;
`;

const TextStyleDark = styled.section`
  font-weight: var(--font-weight-medium);
  color: var(--primary-color-2);
`;

// const StyledInput = styled.input`
//   align-items: center;
//   padding: 0 0;
//   width: 100%;
//   margin-top: 2px;
//   background: var(--white);
//   font-size: calc(var(--base-font-size) + 2px);
//   border: var(--thin-border) var(--form-base-color);
//   box-sizing: border-box;
//   border-radius: var(--border-radius);
//   height: 40px;
//   padding: 0 1rem;
//   transition: all 0.2s ease-in;
//   @media (max-width: 768px) {
//     height: 48px;
//   }
// `;

export default LoginPage;
