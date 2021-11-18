import React, { FC, Component, useEffect, useState } from "react";
import styled,{css} from "styled-components";
import logo from "../../../assets/icons/logo_icon.png";
import { useHistory } from "react-router-dom";
import { useGetLoggedInUserInfo } from "@hooks";
import checkCircle from "../../../assets/icons/check_circle.png";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCustomerList,
  getcustomerListSelector,
} from "../../../redux/Slices/UserAccount/getCustomersList";
import { fetchwebSettings } from '@slices/webSettings'
import {
  ChangeDefaultCustomer,
  changeCustomerSelector,
} from "../../../redux/Slices/UserAccount/changeDefaultCustomer";
import {SELECTED_CUSTOMER} from '../../../redux/Slices/UserAccount/selectedCustomerReducer';
import loaderGif from "../../../assets/icons/loadinfo.gif";
import { userSelector } from "@slices/UserAccount/userSlice";

type SelectCustomerProps = {
  CustomerSelection: () => void;
};
export const SelectCustomer: FC<SelectCustomerProps> = ({
  CustomerSelection,
}) => {
  const history = useHistory();
  const userData = useGetLoggedInUserInfo();
  const [loader, setLoader] = useState<boolean>(false);
  const userInfo = useSelector(userSelector)?.user?.user?.data;
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [changedType, setChangedType] = useState("session");
  const dispatch = useDispatch();
  const customerSelectorData = useSelector(
    changeCustomerSelector
  )?.changeCustomer;


  const { customersList, loading, hasErrors } = useSelector(
    getcustomerListSelector
  );

  const [customerListArray, setCustomerListArray] = useState<any>();
  const [userName, setUserName] = useState<any>();
  useEffect(() => {
    dispatch(fetchCustomerList());
  }, [dispatch]);

  useEffect(() => {

    if(customerSelectorData?.messageCode === 4250 ){
      dispatch(fetchwebSettings(userInfo?.userName, userInfo?.sessionId))
    } 
  }, [])

  useEffect(() => {
    setCustomerListArray((PrevState: any) => {
      const arr = customersList?.map((customer: any) => false);
      return arr;
    });
  }, [customersList]);

  // useEffect(() => {
  //   //console.log(customerListArray)
  // }, [customerListArray]);


  useEffect(() => {
    if (selectedCustomer){
      console.log(selectedCustomer)
      dispatch(ChangeDefaultCustomer(selectedCustomer, changedType));
      setLoader(true);
    }
  
  }, [selectedCustomer])

  

  function handleCustomerSelection(index: any) {
    setSelectedCustomer(customersList[index]?.code)
    // dispatch({
    //   type: SELECTED_CUSTOMER,
    //   payload: customersList[index],
    // });
    setCustomerListArray((prevState: any) => {
      const copiedArr = prevState.map((item: any) => false);
      copiedArr[index] = true;
      return copiedArr;
    });
    setTimeout(() => {
      history.push('/')
      CustomerSelection()
     }, 2000);
    
  }
  useEffect(() => {
    if(userData?.userName){
      setUserName(userData?.userName);
    }
    // console.log(userData);
  }, [userData]);

  

  const renderCustomers = () => {
    try{
      if (loading || hasErrors || customersList.length === 0)
      return <img className="loader-gif" src={loaderGif} style={{margin: '100px'}} alt="loading..." />;
    return customersList.map((customer: any, index: any) => (
      <InputWrapper
        key={index}
        onClick={() => {
          handleCustomerSelection(index);
        }}
        style={{ backgroundColor: customerListArray[index] ? "rgba(var(--primary-color-1-rgb), var(--low-opacity))" : "" }}
      >
        <InputText customerListIndex = {customerListArray[index]}
        >
          {customer.name}
        </InputText>
        {customerListArray[index] && <CircleImg src={checkCircle} alt="" />}
      </InputWrapper>
    ));
    }catch(e){
    }
  };

  return (
    <StyledContainer style= {{overflow: 'auto'}}>
      <img
        style={{ marginBottom: "20px", marginTop: "10px" }}
        width="110px"
        height="40px"
        src={logo}
        alt=""
      />
      <TextStyle style={{ marginBottom: "40px" }}>
       <h2> Hi {userName}, Please select customer</h2>
      </TextStyle>
      {renderCustomers()}
    </StyledContainer>
  );
}

const StyledContainer = styled.section`
  @media (max-width: 768px) {
    justify-items: center;
    justify-content: center;
    align-items: center;
    height: 455px;
    top: 54px;
    background: var(--white);
    padding: 10px 20px;
    width: 100%;
  }
  top: 24px;
  background: var(--white);
  border-radius: var(--border-radius);
  padding: 10px 30px;
  width: 422px;
  min-height: calc(100vh - 40px);
`;

const TextStyle = styled.section`
  font-weight: var(--font-weight-medium);
`;

const InputWrapper = styled.button`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background: var(--white);
  box-sizing: border-box;
  height: 40px;
  margin : 10px;
  align-items: center;
  border: var(--thin-border) var(--primary-color-3); 
  border-radius:  var(--border-radius);
`;
const InputText:any = styled.text`${({customerListIndex}:any)=>
css`
  font-weight:${customerListIndex ?  "var(--font-weight-medium)"  : "var(--font-weight-regular)"};
`
}`

const CircleImg = styled.img`
width :16px;
height : 16px;
float: right ;
justify-content: right;
`;

export default SelectCustomer;
