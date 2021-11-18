import React, { useState, useContext, useEffect } from "react";
import CloseIcon from "@material-ui/icons/Close";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import altImage from "@images/awaited_image.png";
import { Mail, CartSVG, Info, CalculateSVG, HeartSVG } from "@icons";
import Button from "@common/Button";
import { useMediaQuery } from "@material-ui/core";
import { breakpoints } from "../../constants/styled-components";
import styled from "styled-components";
import Units from "../common/Units";
import Quantity from "../common/Quantity";
import { WebSettingsContext } from "../../redux/Providers/WebsettingsProvider";
import { useTranslation } from "react-i18next";
import Divider from "@material-ui/core/Divider";
import SingleDatePicker from "@common/SingleDatePicker";
import { addItemInShoppingList } from "@actions/shoppingList/addItemsToShoppingList";
import { addToCart } from "@actions/cart/addToCart";
import moment, { Moment } from "moment";
import { useGetLoggedInUserInfo } from "@hooks";
import {
  fetchProductDetails,
  productsDetailsSelector,
  fetchProductUnits,
  CalculatePrice,
  priceDetailsSelector,
  getUpdatedPrice,
} from "@slices/Products/productDetails";
import { CalendarSVG } from "@icons";
import { useDispatch, useSelector } from "react-redux";
import { GetFilterDetailsSelector } from "@slices/getFilterDetails";

const DrawerRight = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-around;
`;

const Drawer = styled.figure``;

const DrawerHeader = styled.h3`
  padding: 10px 0px 5px 5px;
  font-weight: var(--font-weight-medium);
`;

const Discount = styled.span`
  background: var(--secondary-color);
  color: var(--white);
  margin-top: 15%;
  margin-left: 5%;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  padding: 0px 10px;
  border-radius: var(--border-radius);
`;

const ImgDrawer = styled.img`
  width: auto;
  position: relative;
  height: 100px;
  max-height: 380px;
  object-fit: contain;
  border-radius: var(--border-radius);
`;

const HeartIcon = styled.span`
  border: var(--thin-border) var(--gray-1);
  background: var(--white);
  padding: 15px;
  border-radius: 50%;
  position: absolute;
  float: right;
  margin-top: 68%;
  margin-left: -15%;
  color: rgba(var(--primary-color-2-rgb), var(--medium-opacity));
`;

const DrawerPrice = styled.span`
  font-size: calc(var(--base-font-size) + 2px);
  font-weight: var(--font-weight-bold);
  color: var(--primary-color-2);
`;

const DrawerEnquiry = styled.div`
  font-size: calc(var(--base-font-size) + 2);
  padding: 10px 0;
  opacity: var(--high-opacity);
  cursor: pointer;
  align-items: center;
`;

const DrawerCaption = styled.figcaption`
  padding: 20px;
`;

interface IProps {
  productDetails:any;
  actualPrice: any;
  discountPrice: string;
  imageUrl: string;
  productID: string;
  productDescription: string;
  itemStandardPrice: string;
  closeDrawer: any;
  salesUnit: any;
  onAddItemToCartHandler: Function;
}

const PriceCalculator = (props: IProps) => {
  const isMobile = useMediaQuery(`(max-width:${breakpoints.sm})`);
  const priceDetails = useSelector(priceDetailsSelector);
  console.log("priceDetails", priceDetails)
  const webSettingsData: any = useContext(WebSettingsContext);
  const [unit, setUnit] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [currency, setCurrency] = useState(webSettingsData?.currencyCode);
  const [deliveryDate, setDeliveryDate] = useState<{
    day: Moment;
    focused: boolean;
  }>({
    day: moment(),
    focused: false,
  });
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const sessionId = useGetLoggedInUserInfo();
  const GetFilterDetailsData = useSelector(GetFilterDetailsSelector);

  const AddItemsToCart = (item_code: any, quantity: any, unit_code: any) => {
    const cartItems = {
      itemCode: item_code,
      unitCode: unit_code,
      itemQty: quantity,
    };

    dispatch(addToCart(sessionId?.sessionId, cartItems));
  };

  const AddItemsToList = (item_code: any, quantity: any, unit_code: any) => {
    const AddItemsToListDetails1 = [
      {
        itemCode: item_code,
        unitCode: unit_code,
        quantity: quantity,
      },
    ];
    dispatch(
      addItemInShoppingList(sessionId?.sessionId, AddItemsToListDetails1)
    );
  };

  useEffect(() => {
    if (props.salesUnit?.length) {
      setUnit(props.salesUnit[0]?.value);
    }
  }, [props.salesUnit]);

  useEffect(() => {
    dispatch({
      type: getUpdatedPrice,
      payload: "",
    });
  }, [dispatch]);
  const onDateChange = () => {};

  const onChangeUnit = (value: any) => {
    let newItemCode = encodeURIComponent(props.productID);
    setUnit(value);
    console.log("encode", newItemCode, props.productID)
    dispatch(fetchProductUnits(newItemCode, sessionId?.sessionId, value));
  };

  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  const changeQuantity = (quantity: number) => {
    setQuantity(quantity);
    if (quantity >= 0) {
      dispatch(
        CalculatePrice(
          props.productID,
          sessionId?.sessionId,
          unit,
          currency,
          date,
          quantity
        )
      );
      console.log("price is");
      console.log(priceDetails);
    }
  };

  const calculatePrice = () => {
    if (quantity >= 0) {
      dispatch(
        CalculatePrice(
          props.productID,
          sessionId?.sessionId,
          unit,
          currency,
          date,
          quantity
        )
      );
    }
  };

  return (
    <div className='container-fluid p-0 price-calculator'>
      <DrawerRight>
        <Drawer className='mobileWidth'>
          <div className='row'>
            <DrawerHeader className='p-4 col-md-12'>
              {t("CON_PRICE_CALCULATION")}
              <span className='float-right' style={{ cursor: "pointer" }}>
                <CloseIcon
                  onClick={props.closeDrawer}
                  className='primary-icon-2 icon-lg'
                />
              </span>
            </DrawerHeader>
          </div>
          <Divider />
          {/* Mapping Products data here  */}
          <div className='row pt-3 pb-3'>
            <div className='col-md-3'>
              <ImgDrawer
                src={props.imageUrl}
                onError={(e: any) => {
                  e.target.onerror = null;
                  e.target.src = altImage;
                }}
                alt=''
              />
            </div>
            <div className='col-md-9 img-des'>
              <div className='label pb-2'>
                <a href='#'>{props.productID}</a>
              </div>
              <div className='title pb-2'>
                <h4>- {props.productDescription}</h4>
              </div>
              <div>
                <DrawerPrice className=''>
                  <span className='price-on-calculator'>
                    {priceDetails ? (
                      <span>{priceDetails[0].price}</span>
                    ) : (
                      <span>{props.discountPrice}</span>
                    )}
                  </span>
                  &nbsp;
                  {currency}
                </DrawerPrice>
                {props.itemStandardPrice ? (
                  <del className='price-old pt-1 pl-2'>
                    {props.itemStandardPrice}&nbsp;
                    {webSettingsData?.currencyCode}
                  </del>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <Divider />
          <div className='row'>
            <div className='col-md-12'>
              <div className='row pt-1 p-0 justify-content-between'>
                <h4 className='pt-3 heading-details'>
                  {t("CON_PRICE_CALCULATION")}
                </h4>
              </div>
              <div className='row pt-2 p-0'>
                <div className='col-sm-7 p-0'>
                  <Units
                    labelText={t("CON_SALES_UNIT")}
                    options={props.salesUnit}
                    showLabel={true}
                    labelBold={true}
                    onChange={onChangeUnit}
                  />
                </div>
                <div className='col-sm-5 p-0'>
                  <Quantity
                    labelBold={true}
                    showLabel={true}
                    onChange={(quantity: any) => {
                      changeQuantity(quantity);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='row pb-2'>
            <div className='col-lg-7 p-3 datePicker'>
              {/* <CalendarSVG className="primary-icon-3" /> */}
              <SingleDatePicker
                numberOfMonths={1}
                placeholder={webSettingsData?.defaultDateFormat}
                date={deliveryDate.day}
                focused={deliveryDate.focused}
                onDateChange={onDateChange}
                onFocusChange={({ focused }) => {
                  setDeliveryDate((prevState: any) => {
                    return { ...prevState, focused: focused };
                  });
                }}
                id='calculate_price_date'
                showLabel={true}
              />
            </div>
            <div className='currency-code col-lg-5 pt-3'>
              <label>{t("COH_CURRENCY")}</label>
              <br />
              {console.log("currency", GetFilterDetailsData?.currencyList)}
              <select onChange={(e: any) => setCurrency(e.target.value)}>
                {GetFilterDetailsData?.currencyList?.map((code: any) => {
                  return <option value={code.code}>{code.code}</option>;
                })}
              </select>
            </div>
          </div>
          <Divider />
          <div className='row pt-2 pb-2'>
            <div className='col-md-6'>
              <Button
                onClick={calculatePrice}
                style={{ width: "100%", marginTop: "8px" }}
              >
                <CalculateSVG width='20px' className='icon float-right' />
                &nbsp; <span>{t("CON_CALCULATE")}</span>
              </Button>
            </div>
          </div>
          <Divider />
          <div className='row pt-2 pb-2'>
            <div className='col-md-6'>
              <label className='labelText pb-0'>
                {t("CON_PRICE")} / {t("COH_UNIT")}:
              </label>
              <br />
              <span className='price-productDetails pt-0'>
                {priceDetails ? (
                  <span>
                    {priceDetails[0].price} / {priceDetails[0].unit}
                  </span>
                ) : (
                  ""
                )}
              </span>
            </div>
            <div className='col-md-6'>
              <label className='labelText pb-0'>{t("CON_GROSS_VALUE")}</label>
              <br />
              <span className='price-productDetails pt-0'>
                {priceDetails ? <span>{priceDetails[0].grossValue}</span> : ""}
              </span>
            </div>
          </div>
          <Divider />
          <Divider />
          <div className='row pt-3 pb-3'>
            <div className='col-md-6'>
              <label className='labelText pb-0'>
                {t("CON_DISCOUNT_AMOUNT")}:
              </label>
              <br />
              <span className='price-productDetails pt-0'>
                {priceDetails ? (
                  <span>
                    {priceDetails[0].discountAmount} (
                    {priceDetails[0].discountPercent})
                  </span>
                ) : (
                  ""
                )}
              </span>
            </div>
            <div className='col-md-6'>
              {webSettingsData?.showOrderLineValueInclVAT ? (
                <label className='labelText pb-0'>
                  {t("CON_TOTAL_INCLUDING_VAT")}:{" "}
                </label>
              ) : (
                <label className='labelText pb-0'>
                  {t("CON_TOTAL_EXCLUDING_VAT")}:{" "}
                </label>
              )}
              <br />
              <span className='price-productDetails pt-0'>
                {priceDetails ? <span>{priceDetails[0].netValue}</span> : ""}
              </span>
            </div>
          </div>
          <Divider />
          {/* <div className='row pt-2 pb-2'>
            <div className='col-md-4'>
              <Button
                onClick={calculatePrice}
                style={{ width: "100%", marginTop: "8px" }}
              >
                <CalculateSVG width='20px' className='icon' />
                &nbsp; <span>{t("CON_CALCULATE")}</span>
              </Button>
            </div>

            <div className='col-md-5'>
              <Button
                onClick={() => AddItemsToCart(props.productID, quantity, unit)}
                style={{ width: "100%", marginTop: "8px" }}
              >
                <CartSVG width='17px' className='icon' />{" "}
                <span>{t("CON_ADD_TO_CART")}</span>
              </Button>
            </div>
            <div className='col-md-3'>
              <Button
                variant='outlined'
                color='primary'
                style={{ marginTop: "8px" }}
                onClick={() => AddItemsToList(props.productID, quantity, unit)}
              >
                <HeartSVG className='primary-icon-1 icon-lg' />{" "}
              </Button>
            </div>
          </div> */}
          <Divider />
        </Drawer>
      </DrawerRight>
    </div>
  );
};

export default PriceCalculator;
