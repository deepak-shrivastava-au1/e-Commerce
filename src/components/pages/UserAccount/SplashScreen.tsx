import React, { Component, useEffect, useState } from "react";
import styled from "styled-components";
import splash from "../../../assets/branding/iptorBranding.jpg";
import mobileSplash from "../../../assets/branding/iptorBranding.jpg";
import MediaQuery from "react-responsive";
import LoginPage from "./LoginPage";
import CreateAccount from "./CreateAccount";
import SelectCustomer from "./SelectCustomer";
import ForcePasswordChange from "./ForcePasswordChange";
import { userSelector } from "../../../redux/Slices/UserAccount/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { GetAllCountries } from "../../../redux/Slices/UserAccount/getAllCountries";
import { GetLocaleList } from "../../../redux/Slices/UserAccount/getLocaleList";

interface IScreenStatus {
  login: boolean;
  selectUser: boolean;
  forgotPasword: boolean;
  createAccount: boolean;
  forcePassword: boolean;
}

function SplashScreen() {
  const history = useHistory();
  const dispatch = useDispatch();
  const userData = useSelector(userSelector)?.user?.user?.data;
  const { user} = useSelector(userSelector);
  const isForceCustomer = userData?.isForceSelectCustomer;
  const isAuthenticated = userData?.isAuthenticated;
  const isForcePassword = userData?.isForcePasswordChange;

  const [screenStatus, setScreenStatus] = useState<IScreenStatus>({
    login: true,
    selectUser: false,
    forgotPasword: false,
    createAccount: false,
    forcePassword: false,
  });
  const launchCreateAccountScreen = (show: boolean): void => {
    setScreenStatus((prevState: IScreenStatus) => {
      const copiedState = { ...prevState }; //Copying old state to avoid mutating the original state
      copiedState["login"] = false;
      copiedState["createAccount"] = show;
      return copiedState;
    });
    dispatch(GetAllCountries());
    dispatch(GetLocaleList());
  };

  const forcePasswordChanged = (): void => {
    setScreenStatus((prevState: IScreenStatus) => {
      const copiedState = { ...prevState }; //Copying old state to avoid mutating the original state
      copiedState["login"] = true;
      copiedState["forcePassword"] = false;
      return copiedState;
    });
  };
  const CustomerSelection = (): void => {
  };
  const navigateToSignInPage = (show: boolean): void => {
    setScreenStatus((prevState: IScreenStatus) => {
      const copiedState = { ...prevState }; //Copying old state to avoid mutating the original state
      copiedState["login"] = show;
      copiedState["createAccount"] = false;
      return copiedState;
    });
  };
  useEffect(() => {
    if (isAuthenticated) {
      setScreenStatus((prevState: IScreenStatus) => {
        const copiedState = { ...prevState }; //Copying old state to avoid mutating the original state
        copiedState["login"] = false;
        if(!isForceCustomer){
          history.push("home");
        }else{
          copiedState["selectUser"] = true;
        }       
        return copiedState;
      });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if(isForcePassword) {
    setScreenStatus((prevState: IScreenStatus) => {
      const copiedState = { ...prevState }; //Copying old state to avoid mutating the original state
      copiedState["login"] = false;
      if(isForcePassword){
        copiedState["forcePassword"] = true;
      }
     
      // console.log("forcePassword "+  copiedState["forcePassword"])
      // console.log(screenStatus["forcePassword"] + "--isForcePassword--"+isForcePassword)
      return copiedState;
    });
  }
  }, [isForcePassword]);
 

  return (
    <Container>
      <MediaQuery query='(min-device-width: 768px)'>
        <Wrapper>
          <MileStoneText>
            <h2 style={{ lineHeight: "30px" }}>
              {" "}
              A milestone in the Iptor E-commerce transformation journey
            </h2>
          </MileStoneText>
          <VersionText>
            Iptor E-commerce is the key platform for turning your business into
            an omnichannel sales platform through the power of the web.
          </VersionText>
        </Wrapper>
      </MediaQuery>
      {screenStatus["login"] && (
        <LoginPage
          launchCreateAccountScreen={launchCreateAccountScreen}
          fromSplash={true}
        />
      )}
      {screenStatus["selectUser"] && <SelectCustomer CustomerSelection={CustomerSelection} />}
      {screenStatus["forcePassword"] && <ForcePasswordChange forcePasswordChanged={forcePasswordChanged}/>}

      {screenStatus["createAccount"] && (
        <CreateAccount navigateToSignInPage={navigateToSignInPage} />
      )}
    </Container>
  );
}
const Container = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px 20px 20px;
  width: 100%;
  min-height: 100vh;
  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${splash});
  position: absolute;
  /* z-index: -1; */
  @media (max-width: 768px) {
    background-image: url(${mobileSplash});
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    padding: 0;
    background-size: 100vh;
  }
`;

const MileStoneText = styled.section`
  font-weight: var(--font-weight-bold);
  line-height: 48px;
  color: var(--white);
  padding: 166px 0 0 0;
`;

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.section`
  display: flex;
  margin-left: 80px;
  flex-direction: column;
  justify-items: center;
  justify-content: center;
  align-items: flex-end;
  width: 500px;
`;

const VersionText = styled.section`
  color: var(--white);
  padding: 5px 0 0 0;
  line-height: 19px;
`;
export default SplashScreen;
