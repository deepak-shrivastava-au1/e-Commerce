import React, {FC,useState, useEffect} from 'react'
import {
    changePasswordSelector,
    ChangeUserPassword,
  } from "../../../redux/Slices/UserAccount/changePassword";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Button from "@common/Button";
import StyledInput from "@common/StyledInput";
import LoadingOverlay from "@common/LoadingOverlay";
import Modal from "@common/Modal";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import {SIGNIN } from "@constants/Routes";
import { userSelector } from "@slices/UserAccount/userSlice";


type props = {
  forcePasswordChanged: () => void;
};
export const ForcePasswordChange : FC<props> = ({forcePasswordChanged}) =>  {
    const dispatch = useDispatch();
    const history = useHistory();
    const userInfo = useSelector(userSelector)?.user?.user?.data;
    const [userId, setUserId] = useState<any>();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const changePasswordData = useSelector(changePasswordSelector)?.changePassword;
    const [errorHeader, setErrorHeader] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showError, setShowError] = useState<boolean>(false);
    const [passwordChangeSuccess, setPasswordChangeSuccess] = useState<boolean>(false);
    const [loader, setLoader] = useState<boolean>(false);
    const { t } = useTranslation();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.id === "oldpass") {
          setOldPassword(e.target.value);
        } else if (e.target.id === "newpass") {
          setNewPassword(e.target.value);
        } else if (e.target.id === "confirmpass") {
          setConfirmPassword(e.target.value);
        }
      }

      useEffect(() => {
        if (userInfo?.userID) {
          setUserId(userInfo?.userID);
        }
      }, [userInfo]);

      useEffect(() => {
        // console.log(changePasswordData);
        if (changePasswordData?.messageCode === 6000 ) {
          setLoader(false);
          setPasswordChangeSuccess(true)
        } 
        else if (changePasswordData?.messageCode === 5000) {
          setLoader(false);
          setErrorHeader("Error");
          setErrorMessage(t("Network issue. Kindly try after some time"));
          setShowError(true);
        }else if (changePasswordData?.messageCode === 6002) {
          setLoader(false);
          setErrorHeader("Error");
          setErrorMessage(t("MSG_OLD_PASSWORD_NOT_CORRECT"));
          setShowError(true);
        }
        else if (changePasswordData?.messageCode === 6006) {
          setLoader(false);
          setErrorHeader("Error");
          setErrorMessage(t("MSG_NEW_PASSWORD_MATCHING_OLD_PASSWORD_USE_DIFFERENT"));
          setShowError(true);
        } else {
          setLoader(false);
        }
      }, [changePasswordData]);

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
          dispatch(ChangeUserPassword(oldPassword, newPassword, confirmPassword, userId));
        }
      };

    return (
        <StyledContainer>
        <div className="row">
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
      <Modal
        isAlert
        icon
        title={t("CON_PSW_CHANGE_SUCCESSFUL")}
        message={t("MSG_LOGIN_NEW_CREDENTIALS")}
        isOpen={passwordChangeSuccess}
        hasCancelButton={false}
        onRequestClose={() => {
          forcePasswordChanged()
        }}
        secondaryActionText={"ok"}
        onSecondaryButtonClick={() => {
          forcePasswordChanged()
        }}
      />



        <div className="col-lg-12">
             <HeaderText> <h3>{t("CON_CHANGE_PASSWORD")}</h3></HeaderText>

             <h4 style={{color:"var(--red)", marginTop: "18px"}}>{t("TXT_CF_001")}</h4>
            
              <div className="d-flex flex-column  w-100">
               
                <div className="row" style={{ marginTop: "25px" }}>
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
                    disabled={( oldPassword.length === 0 ||
                      newPassword.length === 0 ||
                      confirmPassword.length === 0 || newPassword !== confirmPassword)}
                    onClick={() => changePassword()}
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      justifyItems: "center",
                      marginTop: "18px",
                      background: "var(--secondary-color)",
                    }}
                  >
                    <span>{t("CON_CHANGE_PASSWORD")} </span>
                  </Button>
                  </div>
                </div>
              </div>
        </div>
        <LoadingOverlay active={loader} />
      </div>
      </StyledContainer>
    )
}

const StyledContainer = styled.section`
  @media (max-width: 768px) {
    justify-items: center;
    justify-content: center;
    align-items: center;
    height: 455px;
    top: 54px;
    width: 100%;
  }
  top: 24px;
  background: var(--white);
  border-radius: var(--border-radius);
  padding: 10px 15px;
  width: 422px;
  min-height: calc(100vh - 40px);
`;
const HeaderText = styled.text`
  font-weight: var(--font-weight-bold);
  font-size: calc(var(--base-font-size) + 8px);
  padding: 25px 0 0 0;
  line-height: 32.68px;
`;
const EditText = styled.text`
  font-weight: var(--font-weight-medium);
  text-transform: capitalize;
  color: var(--input-text-color);
  line-height: 21.79px;
`;
export default ForcePasswordChange
