import React, { useState, useEffect } from "react";
import styled from "styled-components";
import splash from "../../../assets/branding/splash.svg";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Button from "@common/Button";
import LoadingOverlay from "@common/LoadingOverlay";
import {
  ResetPassword,
  resetPasswordSelector,
  resetPasswordSuccess,
} from "../../../redux/Slices/UserAccount/resetPassword";
import { useParams } from 'react-router-dom';
import { CheckCircleForModalSVG } from "@icons";
import Modal from "@common/Modal";

export const PasswordReset = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { handleSubmit } = useForm();
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [responseHeader, setResponseHeader] = useState<string>("");
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  const [errorOccured, setErrorOccured] = useState<boolean>(false);

  const [isSubmitRequestClicked, setIsSubmitRequestClicked] =
    useState<boolean>(false);
  const params = useParams()
  const response = useSelector(resetPasswordSelector)?.resetpassword;

  const onSubmit = (event: React.FormEvent<HTMLInputElement>) => {
    //console.log("Submit" + ":" + username + ":" + password);
    dispatch(ResetPassword(newPassword, confirmPassword, token))
    setLoader(true)
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.id === "newpassword") {
      setNewPassword(e.target.value);
    }
    if (e.target.id === "confirmpassword") {
      setConfirmPassword(e.target.value);
    }
  }


  useEffect(() => {
    let token =  JSON.stringify(params)
    setToken(JSON.parse(token)?.token)
  }, [params])
  
  useEffect(() => {
    console.log(response);
    if (response?.messageCode === 6000) {
      setLoader(false);
      setIsSubmitRequestClicked(true);
      setErrorOccured(true)
      setResponseHeader("Success")
      setResponseMessage("Your password changed. kindly login to continue.")
    }
    if (response?.messageCode === 6001) {
      setLoader(false);
      setIsSubmitRequestClicked(true);
      setErrorOccured(true)
      setResponseHeader("Error")
      setResponseMessage("token expired.")
    }
    if (response?.messageCode === 6003) {
      setLoader(false);
      setIsSubmitRequestClicked(true);
      setErrorOccured(true)
      setResponseHeader("Error")
      setResponseMessage("new password and confirm password should be same.")
    }
    
    return () => {
      dispatch(resetPasswordSuccess(undefined));
    };
  }, [response]);
  return (
    <Container>
      <StyledContainer>
      <Modal
        isAlert
        icon={
          <div className="icon-fail">
            <CheckCircleForModalSVG className="icon" />
          </div>
        }
        title={responseHeader}
        message={responseMessage}
        isOpen={errorOccured}
        hasCancelButton={false}
        onRequestClose={() => {setErrorOccured(false)}}
        secondaryActionText={"ok"}
        onSecondaryButtonClick={() => {setErrorOccured(false)}}
      />
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h2>{t("CON_PASSWORD_RESET")}!</h2>

          <TextStyleDark>
            <h2
              style={{
                marginTop: "24px",
              }}
            >
              Please enter and confirm your new password.
            </h2>
          </TextStyleDark>
            <div>
              <div style={{ paddingTop: "24px" }}>
                <EditText>
                  <h4>New Password</h4>
                </EditText>
                <StyledInput
                  id="newpassword"
                  type="password"
                  onChange={handleChange}
                />
              </div>
              <div style={{ paddingTop: "24px" }}>
                <EditText>
                  <h4>Confirm Password</h4>
                </EditText>
                <StyledInput
                  id="confirmpassword"
                  type="password"
                  onChange={handleChange}
                />
              </div>
              <Button
                type="submit"
                variant="solid"
                style={{ marginTop: "18px", width: "100%" }}
              >
                <span>Submit Request</span>
                {/* {loading && <img width="16px" src={loaderGif} alt="loading..." />} */}
              </Button>
            </div>
        </Form>
        <LoadingOverlay active={loader} />
      </StyledContainer>
    </Container>
  );
};
const Container = styled.section`
  display: flex;
  background-image: url(${splash});
  justify-content: flex-end;
  align-items: center;
  padding: 0px 20px 20px 20px;
  width: 100%;
  height: 100%;
  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  /* z-index: -1; */
  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    padding: 0;
  }
`;
const StyledContainer = styled.section`
  @media (max-width: 768px) {
    top: 0px;
    width: 100%;
  }
  top: 24px;
  background: var(--white);
  border-radius: var(--border-radius);
  padding: 0px 15px;
  width: 422px;
  justify-items: center;
  justify-content: center;
  align-items: center;
  height: calc(100% - 20px);
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

export default PasswordReset;
