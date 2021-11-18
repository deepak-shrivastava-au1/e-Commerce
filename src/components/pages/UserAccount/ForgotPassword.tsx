import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { breakpoints } from "@constants/styled-components";
import { useMediaQuery } from "@material-ui/core";
import Modal from "@common/Modal";

import { useForm } from "react-hook-form";
import Button from "@common/Button";
import LoadingOverlay from "@common/LoadingOverlay";
import {
  GetForgotPassword,
  forgotPasswordSelector,forgotPasswordSuccess,
} from "../../../redux/Slices/UserAccount/getForgotPassword";

export const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { handleSubmit } = useForm();
  const [userId, setUserId] = useState<string>();
  const [forgotPassFailed, setForgotPassFailed] = useState<boolean>(false);
  const [errorForgotPass, setErrorForgotPass] = useState("");
  const [loader, setLoader] = useState<boolean>(false);
  const [isGetPasswordClicked, setIsGetPasswordClicked] =
    useState<boolean>(false);

  const response = useSelector(forgotPasswordSelector)?.forgotPassword;

  const onSubmit = (event: React.FormEvent<HTMLInputElement>) => {
    //console.log("Submit" + ":" + username + ":" + password);
    if (userId === undefined || userId.length ===0) {
      setForgotPassFailed(true)
      setErrorForgotPass("Enter valid UserId")
    } else {
      setLoader(true);
      validateEmail(userId)
        ? dispatch(GetForgotPassword("", userId))
        : dispatch(GetForgotPassword(userId, ""));
    }
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.id === "userid") {
      setUserId(e.target.value);
    }
  }
  function validateEmail(emailAdress: string) {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailAdress.match(regexEmail)) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    if (response?.messageCode === 4100) {
      setLoader(false);
      setIsGetPasswordClicked(true);
    }
    else if (response?.messageCode === 4104) {
      setLoader(false);
      setForgotPassFailed(true)
      setErrorForgotPass("Invalid User ID")
    }
    else if (response?.messageCode === 4105) {
      setLoader(false);
      setForgotPassFailed(true)
      setErrorForgotPass("Invalid E-mail address")
    } 
    return ()=> {dispatch(forgotPasswordSuccess(undefined))} 
  }, [response]);
  return (
    <div>
        <Modal
        isAlert
        icon
        title={"Error"}
        message={errorForgotPass}
        isOpen={forgotPassFailed}
        hasCancelButton={false}
        onRequestClose={() => {
          setForgotPassFailed(false);
        }}
        secondaryActionText={"ok"}
        onSecondaryButtonClick={() => {
          setForgotPassFailed(false);
        }}
      />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h2>{t("CON_FORGOT_PASSWORD")}</h2>

        {isGetPasswordClicked && (
          <TextStyleLight
            style={{
              marginTop: "18px",
            }}
          >
            <h3>Hi {userId},</h3>
            <h3
              style={{
                marginTop: "24px",
              }}
            >
              We just sent you an email reminding you of your user ID and
              password.
            </h3>
          </TextStyleLight>
        )}
        {!isGetPasswordClicked && (
          <div>
            <TextStyleLight
              style={{
                marginTop: "16px",
              }}
            >
              <h5>
                If you have forgotten your password, fill in either your user ID
                or your e-mail address below and press the Submit request
                button.
              </h5>
            </TextStyleLight>
            <div style={{ paddingTop: "24px" }}>
              <EditText>
                <h4>Registered User ID/Email ID</h4>
              </EditText>
              <StyledInput
                id="userid"
                type="text"
                onChange={handleChange}
                placeholder="eg. John Derek"
              />
            </div>
            <Button
              type="submit"
              variant="solid"
              style={{ marginTop: "18px", width: "100%" }}
            >
              <span>Get Password</span>
              {/* {loading && <img width="16px" src={loaderGif} alt="loading..." />} */}
            </Button>
          </div>
        )}
      </Form>
      <LoadingOverlay active={loader} />
    </div>
  );
};

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
const TextStyleLight = styled.section`
  font-weight: var(--font-weight-normal);
  color: var(--primary-color-3);
`;

const EditText = styled.text`
  font-weight: var(--font-weight-medium);
  text-transform: capitalize;
  color: var(--input-text-color);
  line-height: 21.79px;
`;

const StyledInput = styled.input`
  align-items: center;
  padding: 0 0;
  width: 100%;
  margin-top: 2px;
  background: var(--white);
  font-size: calc(var(--base-font-size) + 2px);
  border: var(--thin-border) var(--form-base-color);
  box-sizing: border-box;
  border-radius: var(--border-radius);
  height: 40px;
  padding: 0 1rem;
  transition: all 0.2s ease-in;
  @media (max-width: 768px) {
    height: 48px;
  }
`;

export default ForgotPassword;
