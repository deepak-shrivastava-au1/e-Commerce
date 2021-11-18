import { Fragment, useState, useEffect } from "react";
import Breadcrumb from "@fragments/Breadcrumb";
import LeftNevigation from "../Enquiry/Order/OrderHistory/LeftNevigation";
import { useMediaQuery } from "@material-ui/core";
import styled from "styled-components";
import Button from "@common/Button";
import { breakpoints } from "@constants/styled-components";
import StyledInput from "@common/StyledInput";
import { useTranslation } from "react-i18next";
import {GetWebUserDetails, getWebUserSelector } from "@slices/UserAccount/getWebUserDetails";
import { PhoneIcon, EmailIcon } from "@icons";
import { userSelector } from "@slices/UserAccount/userSlice";

import { useSelector, useDispatch } from "react-redux";
import Address from "../../../../src/assets/branding/Address";
import {
  sendEmailSelector,
  SendMailEnquiry,
} from "../../../redux/Slices/UserAccount/sendEmail";

import Modal from "@common/Modal";
import LoadingOverlay from "@common/LoadingOverlay";

function ContactUs() {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(`(min-width:${breakpoints.md})`);
  const { t } = useTranslation();
  const [subject, setSubject] = useState("");
  const [body, setbody] = useState("");
  const [email, setEmail] = useState("");
  const [errorHeader, setErrorHeader] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState<boolean>(false);
  const webUserData = useSelector(getWebUserSelector)?.webUser;
  const sendEmailData = useSelector(sendEmailSelector)?.sendEmail;
  const userInfo = useSelector(userSelector)?.user?.user?.data;

  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    dispatch(GetWebUserDetails(userInfo?.sessionId));
  }, [dispatch]);

  const sendEmail = () => {
    setLoader(true);
    dispatch(
      SendMailEnquiry(email, "", subject, body, "", "", true, true, false)
    );
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.id === "subject") {
      setSubject(e.target.value);
    }
    if (e.target.id === "body") {
      setbody(e.target.value);
    }
  }
  useEffect(() => {
    if (webUserData?.userEmail) {
      setEmail(webUserData?.userEmail);
    }
  }, [webUserData]);
  useEffect(() => {
    // console.log("sendEmailData " + sendEmailData);
    if (sendEmailData?.messageCode === 4100) {
      setLoader(false);
    }else{   // need to handle other error codes
      setLoader(false);
    }
  }, [sendEmailData]);

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
      <div className="content-area contact-us-form">
        <Breadcrumb />
        <Container>
          {isMobile && <LeftNevigation />}
          <AccountSection className="custom-section">
            {/* <BoldText style={{ paddingLeft: "18px" }}>
              <h2>How may we help you ?</h2>
            </BoldText> */}
            <div className="row">
              <div className="col-lg-12">
                <div className="card-table">
                  <div className="card-tbody">
                    <div className="row">
                      {/* <div className="col-lg-12"></div>
              <BoldText style={{ marginLeft: "14px", marginTop: "2px" }}>
                <h2>Get in touch !</h2>
              </BoldText>
              <div className="col-lg-10">
                <TextStyleLight style={{ marginTop: "2px" }}>
                  <h4>Contact us or submit your request</h4>
                </TextStyleLight>
              </div> */}
                      <div className="col-lg-10" style={{ marginTop: "18px" }}>
                        <TextStyleLight>
                          <h4>{t("CON_ADDRESS")}</h4>
                        </TextStyleLight>
                      </div>
                      <div className="col-lg-5">
                        <MediumText style={{ marginTop: "2px" }}>
                          <h4>
                            102, Building 10, Street no 4,Bangalore, Karnataka,
                            India
                          </h4>
                        </MediumText>
                      </div>
                      <div className="col-lg-10" style={{ marginTop: "30px" }}>
                        <PhoneIcon className="icon icon-md" />
                        <MediumText style={{ marginLeft: "6px" }}>
                          000- 123 456 7890
                        </MediumText>
                        <div className="col-lg-10">
                          <TextStyleLight
                            style={{ marginLeft: "20px", marginTop: "-8px" }}
                          >
                            Available from 9 am-9 pm
                          </TextStyleLight>
                        </div>
                      </div>

                      <div className="col-lg-10" style={{ marginTop: "30px" }}>
                        <EmailIcon className="icon icon-md" />
                        <MediumText style={{ marginLeft: "6px" }}>
                          {email}
                        </MediumText>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row ">
                      <div className="col-lg-10">
                        <BoldText style={{ paddingTop: "24px" }}>
                          <h3>{t("CON_COMPOSE_EMAIL")}</h3>
                        </BoldText>
                      </div>
                    </div>
                    <hr
                      style={{
                        marginTop: "24px",
                        marginLeft: "-20px",
                        marginRight: "-20px",
                      }}
                    />
                    <div className="row ">
                      <div className="col-lg-10" style={{ marginTop: "24px" }}>
                        <EditText>
                          <h4>{t("CON_EMAIL")}</h4>
                        </EditText>
                        <StyledInput
                          disabled={true}
                          onChange={handleChange}
                          id=""
                          type=""
                          placeholder={email}
                          validationErrorText="Please enter valid password"
                          isInvalid={false}
                          style={{ maxWidth: "500px", marginTop: "10px" }}
                        />
                      </div>
                    </div>
                    <div className="row ">
                      <div className="col-lg-10">
                        <EditText>
                          <h4>{t("CON_SUBJECT")}</h4>
                        </EditText>
                        <StyledInput
                          onChange={handleChange}
                          id="subject"
                          type="text"
                          validationErrorText="Please enter valid password"
                          isInvalid={false}
                          style={{ maxWidth: "500px", marginTop: "10px" }}
                        />
                      </div>
                    </div>
                    <div className="row ">
                      <div className="col-lg-10">
                        {/* <EditText style={{ paddingTop: "24px" }}>
                          <h4>Details</h4>
                        </EditText> */}
                        <StyledInput
                          onChange={handleChange}
                          id="body"
                          type="textarea"
                          validationErrorText="Please enter valid password"
                          isInvalid={false}
                          style={{
                            alignContent: "top",
                            maxWidth: "500px",
                            marginTop: "10px",
                            height: "180px",
                          }}
                        />
                      </div>
                    </div>
                    <div className="row ">
                      <div className="col-lg-7">
                        <Button
                          className="float-right"
                          disabled={
                            subject.length === 0 ||
                            body.length === 0 ||
                            email.length === 0
                          }
                          type="submit"
                          variant="solid"
                          onClick={() => sendEmail()}
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                            justifyItems: "center",
                            marginTop: "18px",
                            width: "30%",
                            background: "var(--primary-icon-1)",
                          }}
                        >
                          <span>{t("CON_SEND_EMAIL")} </span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
  padding: 0px;
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
const TextStyleLight = styled.section`
  font-weight: var(--font-weight-normal);
  color: var(--primary-color-3);
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default ContactUs;
