import React, { useEffect, useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import { rgba, cssVar } from "polished";
import loaderGif from "../../../assets/icons/loadinfo.gif";
import { userSelector } from "../../../redux/Slices/UserAccount/userSlice";
import LoginPage from "../../pages/UserAccount/LoginPage";
import CreateAccount from "../../pages/UserAccount/CreateAccount";
import {
  SHOPPINGLISTS,
  CHANGECUSTOMER,
  ORDERHISTORY,
  DEFAULTSHOPPINGLISTS,
  SIGNIN,
  TRANSACTIONS,
  QUOTATION,
  INVOICE,
  ACCOUNTSETTINGS,
  CONTACTUS,
  REQUEST,
} from "@constants/Routes";
import { Link, useHistory } from "react-router-dom";
import { useGetLoggedInUserInfo } from "@hooks";
import { useTranslation } from "react-i18next";
import {
  fetchCustomerList,
  getcustomerListSelector,
} from "../../../redux/Slices/UserAccount/getCustomersList";
import {
  fetchgetAllMenuData,
  getAllMenuDataSelector,
} from "@slices/getAllMenu";
import { selectedCustomerSelector } from "@slices/UserAccount/selectedCustomerReducer";
import { webSettingsSelector } from "@slices/webSettings";
import { GetAllCountries } from "@slices/UserAccount/getAllCountries";
import { GetLocaleList } from "@slices/UserAccount/getLocaleList";
import SelectCustomer from "./SelectCustomer";
import ForcePasswordChange from "./ForcePasswordChange";
import {
  ProfileSVG,
  Settings,
  Requisite,
  ShoppingList,
  DollarSign,
  Csv,
  Invoice,
  History,
  SubmitRequest,
  HelpCircle,
  SignOut,
  Product,
} from "@icons";
import AnonymousLogin from "./AnonymousLogin";
import { LogoutUser } from "@slices/UserAccount/logout";

interface IScreenStatus {
  login: boolean;
  selectUser: boolean;
  forgotPasword: boolean;
  createAccount: boolean;
  forcePassword: boolean;
  default: boolean;
}

export default function ProfileMenu() {
  const dispatch = useDispatch();
  const userInfo = useSelector(userSelector)?.user?.user?.data;
  const webSettingData = useSelector(webSettingsSelector)?.webSettings;
  const isForceCustomer = userInfo?.isForceSelectCustomer;
  const isForcePassword = userInfo?.isForcePasswordChange;

  const { t } = useTranslation();

  const userData = useGetLoggedInUserInfo();
  const [userName, setUserName] = useState<any>();
  // const [showSelectCustomerScreen, setShowSelectCustomerScreen] =
    useState<boolean>(true);
  const [sessionId, setSessionId] = useState<any>();

  const history = useHistory();
  const [screenStatus, setScreenStatus] = useState<IScreenStatus>({
    login: false,
    selectUser: false,
    forgotPasword: false,
    createAccount: false,
    forcePassword: false,
    default: true,
  });

  const launchCreateAccountScreen = (show: boolean): void => {
    setScreenStatus((prevState: IScreenStatus) => {
      const copiedState = { ...prevState }; //Copying old state to avoid mutating the original state
      copiedState["login"] = false;
      copiedState["createAccount"] = show;
      copiedState["default"] = false;
      return copiedState;
    });
    dispatch(GetAllCountries());
    dispatch(GetLocaleList());
  };
  const CustomerSelection = (): void => {
    history.go(0);
    // setShowSelectCustomerScreen(false);
    handleClose();
  };

  const forcePasswordChanged = (): void => {
    setScreenStatus((prevState: IScreenStatus) => {
      const copiedState = { ...prevState }; //Copying old state to avoid mutating the original state
      copiedState["login"] = true;
      copiedState["forcePassword"] = false;
      return copiedState;
    });
  };

  const navigateToSignInPage = (show: boolean): void => {
    setScreenStatus((prevState: IScreenStatus) => {
      const copiedState = { ...prevState }; //Copying old state to avoid mutating the original state
      copiedState["login"] = show;
      copiedState["createAccount"] = false;
      copiedState["default"] = false;
      return copiedState;
    });
  };
  // const customerData = useSelector(selectedCustomerSelector)?.customer
  //   ?.customer;

  var menuList: any[] = [];

  // console.log("isForceCustomer" + isForceCustomer);

  useEffect(() => {
    if (isForcePassword) {
      setScreenStatus((prevState: IScreenStatus) => {
        const copiedState = { ...prevState }; //Copying old state to avoid mutating the original state
        copiedState["login"] = false;
        copiedState["forcePassword"] = true;
        // console.log("forcePassword "+  copiedState["forcePassword"])
        // console.log(screenStatus["forcePassword"] + "--isForcePassword--"+isForcePassword)
        return copiedState;
      });
    }
  }, [isForcePassword]);

  useEffect(() => {
    if (userInfo?.isAuthenticated) {
      setUserName(userInfo?.userName);
      setSessionId(userInfo?.sessionId);
      if(!isForceCustomer){
        handleClose();
      }
     
    }
  }, [userInfo]);

  useEffect(() => {
    if (isForceCustomer) {
      setScreenStatus((prevState: IScreenStatus) => {
        const copiedState = { ...prevState }; //Copying old state to avoid mutating the original state
        copiedState["login"] = false;
        copiedState["selectUser"] = true;
        copiedState["default"] = false;
        return copiedState;
      });
    }
    // handleClose();
  }, [isForceCustomer]);

  useEffect(() => {
    dispatch(fetchgetAllMenuData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCustomerList());
  }, [dispatch]);

  //   useEffect(() => {
  //    if(getAllMenuData.lengh >0){
  //     console.log(getAllMenuData);
  //    }
  // }, [getAllMenuData]);

  const [anchorEl, setAnchorEl] =
    React.useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    if (!userInfo?.isAuthenticated &&!screenStatus["createAccount"] ) {
      setScreenStatus((prevState: IScreenStatus) => {
        const copiedState = { ...prevState }; //Copying old state to avoid mutating the original state
        copiedState["login"] = false;
        copiedState["default"] = true;
        copiedState["forcePassword"] = false;
        copiedState["selectUser"] = false;
        copiedState["forgotPasword"] = false;
        return copiedState;
      });
    }
  };

  const handleSignout = () => {
    handleClose();
    dispatch(LogoutUser(userInfo?.userID, sessionId));
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // console.log(getAllMenuData);

  // const RenderMenuItems = () => {
  //   return getAllMenuData
  //     .filter((getAllMenuData: any) => getAllMenuData.showInMenu)
  //     .map((menuitem: any, index: any) => (
  //       <PopoverContent>
  //         <MenuTitle>
  //           <Settings stroke={"var(--primary-color-1)"}></Settings>
  //           <CommonText style={{ marginLeft: '10px' }} onClick={handleClose}>
  //             {menuitem.name === 'CON_ORDER' ? (
  //               <Link to={ORDERHISTORY}>{menuitem.name}</Link>
  //             ) : (
  //               menuitem.name
  //             )}
  //           </CommonText>
  //         </MenuTitle>
  //         <MenuDescription>Password, Preferences</MenuDescription>
  //       </PopoverContent>
  //     ));
  // };
  return (
    <div>
      <Button onClick={handleClick} className="widget-header icontext">
        <div className="text mobile-hide">
          {userInfo?.isAuthenticated && webSettingData?.defaultCustomerName ? (
            <span className="text-muted">
              {webSettingData?.defaultCustomerName}{" "}
            </span>
          ) : null}
          <div>
            {userData?.userName ? (
              <a href="#">{userData.userName}</a>
            ) : (
              <a href="#">NetStore User</a>
            )}
          </div>
        </div>
        <a href="#" className="icon">
          <i>
            <ProfileSVG className="secondary-icon-2 icon-lg" />
          </i>
        </a>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {userInfo?.isAuthenticated && (
          <PopoverContainer className="custom-popover">
            <PopoverHeaderContainer>
              <PopoverHeader>
                <span className="mute-text">Customer No.</span>
                <span className="mute-text">Customer Name</span>
                <span className="mute-text"></span>
                <span className="mute-text"></span>
                <span></span>
              </PopoverHeader>
              <PopoverHeader>
                <PopoverContentColor>
                  {" "}
                  {webSettingData?.defaultCustomerCode ? (
                    <span className="desc-text">
                      {webSettingData?.defaultCustomerCode}{" "}
                    </span>
                  ) : null}{" "}
                </PopoverContentColor>
                <PopoverContentColor>
                  {webSettingData?.defaultCustomerName ? (
                    <span className="desc-text">
                      {webSettingData?.defaultCustomerName}{" "}
                    </span>
                  ) : null}
                </PopoverContentColor>
                <PopoverContentColor
                  className="desc-text"
                  onClick={() => handleClose()}
                  style={{ color: "var(--primary-color-1)" }}
                >
                  <Link to={CHANGECUSTOMER}>
                    <CommonText className="m-l-10">
                      {t("CON_CHANGE")}
                    </CommonText>
                  </Link>
                </PopoverContentColor>
              </PopoverHeader>
            </PopoverHeaderContainer>
            <PopoverContentContainer>
              <PopoverContent onClick={() => handleClose()}>
                <Link to={ACCOUNTSETTINGS}>
                  <MenuTitle>
                    <Settings className="primary-icon-1 icon-md"></Settings>
                    <CommonText className="m-l-10">
                      {t("CON_EDIT_ACCOUNT")}
                    </CommonText>
                  </MenuTitle>
                </Link>
              </PopoverContent>
              <PopoverContent onClick={() => handleClose()}>
                <MenuTitle>
                  <ShoppingList className="primary-icon-1 icon-md"></ShoppingList>
                  <CommonText className="m-l-10">
                    <Link to={SHOPPINGLISTS}>{t("CON_MY_LIST")}</Link>
                  </CommonText>
                </MenuTitle>
                {/* <MenuDescription>Create list, lists information</MenuDescription> */}
              </PopoverContent>

              <PopoverContent onClick={() => handleClose()}>
                <MenuTitle>
                  <Requisite className="primary-icon-1 icon-md"></Requisite>
                  <Link to={ORDERHISTORY}>
                    <CommonText className="m-l-10">{t("CON_ORDER")}</CommonText>
                  </Link>
                </MenuTitle>
              </PopoverContent>
              <PopoverContent>
                <MenuTitle>
                  <Invoice className="primary-icon-1 icon-md"></Invoice>
                  <Link to={INVOICE}>
                    <CommonText className="m-l-10">
                      {t("CON_INVOICE")}
                    </CommonText>
                  </Link>
                </MenuTitle>
              </PopoverContent>
              <PopoverContent>
                <MenuTitle>
                  <Csv className="primary-icon-1 icon-md"></Csv>
                  <Link to={QUOTATION}>
                    <CommonText className="m-l-10">
                      {t("CON_QUOTATION")}
                    </CommonText>
                  </Link>
                </MenuTitle>
              </PopoverContent>
              <PopoverContent>
                <MenuTitle>
                  <SubmitRequest className="primary-icon-1 icon-md"></SubmitRequest>
                  <Link to={REQUEST}>
                    <CommonText className="m-l-10">
                      {t("CON_BP_REQUEST")}
                    </CommonText>
                  </Link>
                </MenuTitle>
              </PopoverContent>
              <PopoverContent onClick={() => handleClose()}>
                <MenuTitle>
                  <DollarSign className="primary-icon-1 icon-md"></DollarSign>

                  <Link to={TRANSACTIONS}>
                    <CommonText className="m-l-10">
                      {t("CON_TRANSACTIONS")}
                    </CommonText>
                  </Link>
                </MenuTitle>
              </PopoverContent>
              <PopoverContent onClick={() => handleClose()}>
                <MenuTitle>
                  <HelpCircle className="primary-icon-1 icon-md"></HelpCircle>

                  <Link to={CONTACTUS}>
                    <CommonText className="m-l-10">
                      {t("CON_CONTACT_US")}
                    </CommonText>
                  </Link>
                </MenuTitle>
              </PopoverContent>
              <PopoverContent
                onClick={() => handleSignout()}
                style={{ cursor: "pointer" }}
              >
                <MenuTitle>
                  <SignOut className="primary-icon-1 icon-md"></SignOut>
                  <CommonText style={{ marginLeft: "10px" }}>
                    {t("CON_SIGN_OUT")}
                  </CommonText>
                </MenuTitle>
              </PopoverContent>
            </PopoverContentContainer>
          </PopoverContainer>
        )}
        {!userInfo?.isAuthenticated && (
          <div>
            {screenStatus["default"] && (
              <AnonymousLogin
                navigateToSignInPage={navigateToSignInPage}
                launchCreateAccountScreen={launchCreateAccountScreen}
              />
            )}

            {screenStatus["login"] && (
              <LoginPage
                launchCreateAccountScreen={launchCreateAccountScreen}
                fromSplash={true}
              />
            )}
            {screenStatus["selectUser"] && (
                  <SelectCustomer CustomerSelection={CustomerSelection} />
            )}
            {screenStatus["forcePassword"] && (
              <ForcePasswordChange
                forcePasswordChanged={forcePasswordChanged}
              />
            )}

            {screenStatus["createAccount"] && (
              <CreateAccount navigateToSignInPage={navigateToSignInPage} />
            )}
          </div>
        )}
      </Popover>
    </div>
  );
}

const PopoverContainer = styled.div`
  background: var(--white);
  border: var(--thin-border) ${rgba(cssVar(`--border-color`), 0.5)};
  overflow: auto;
`;

const PopoverHeaderContainer = styled.div`
  padding: 12px 11px;
  border-bottom: var(--thin-border) ${rgba(cssVar(`--border-color`), 0.5)};
`;

const PopoverHeader = styled.div`
  display: flex;
  margin: 3px;
  justify-content: space-between;
`;

const PopoverContentContainer = styled.div`
  padding: 0px 15px;
`;

const PopoverContentColor = styled.text`
  color: var(--primary-color-2);
  font-weight: var(--font-weight-medium);
`;

const PopoverContent = styled.div`
  line-height: 54px;
  display: flex;
  justify-content: space-between;
  border-bottom: var(--thin-border) ${rgba(cssVar(`--border-color`), 0.5)};
`;

const MenuTitle = styled.div``;
const MenuDescription = styled.div`
  font-size: calc(var(--base-font-size) -2px);
  color: var(--primary-color-4);
`;

const CommonText = styled.text`
  font-weight: var(--font-weight-medium);
  color: var(--primary-color-1);
`;

const StyledContainer = styled.section`
  @media (max-width: 768px) {
    padding: 10px 20px;
    width: 100%;
    height: 100%;
  }
  top: 24px;
  background: var(--white);
  border-radius: var(--border-radius);
  padding: 10px 30px;
  width: 400px;
  height: 500px;
  margin-right: 100px;
  display: flex;
  flex-direction: column;
`;
