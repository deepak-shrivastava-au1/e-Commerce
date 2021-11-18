import React, { useState, useContext } from "react";
import CloseIcon from "@material-ui/icons/Close";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import altImage from "@images/awaited_image.png";
import { Mail, CartSVG, Info } from "@icons";
import Button from "@common/Button";
import { useMediaQuery } from "@material-ui/core";
import { breakpoints } from "../../constants/styled-components";
import styled from "styled-components";
import Units from "../common/Units";
import Quantity from "../common/Quantity";
import { WebSettingsContext } from "../../redux/Providers/WebsettingsProvider";
import { useTranslation } from "react-i18next";
import { DETAILS } from "@constants/Routes";
import { Link } from "react-router-dom";
import { useGetLoggedInUserInfo } from "@hooks";
import { useDispatch } from "react-redux";
import { addToCart } from "@actions/cart/addToCart";
import { addItemInShoppingList } from "@actions/shoppingList/addItemsToShoppingList";
import AddItemToCart from "@pages/Cart/ShoppingCart/AddItemToCart";
import AddItemToShoppingList from "@pages/shoppingList/AddItemToShoppingList";
import SendEnquiry from "./SendEnquiry";

const DrawerRight = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-around;
`;

const Drawer = styled.figure`
  width: 500px;
`;

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
  width: 100%;
  position: relative;
  height: 100%;
  max-height: 380px;
  object-fit: contain;
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
  cursor: pointer;
`;

const Price = styled.div`
  font-weight: var(--font-weight-bold);
  .price-old {
    font-weight: var(--font-weight-regular);
    opacity: var(--high-opacity);
  }
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

const ProductDetailsLink = styled.span`
  color: var(--white);
`;
interface IProps {
  discountPrice: string;
  actualPrice:string;
  discountPercentage:any;
  imageUrl: string;
  productID: string;
  productDescription: string;
  itemStandardPrice: string;
  closeDrawer: any;
  salesUnit: any;
  onAddItemToCartHandler: Function;
}

const DrawerContent = (props: IProps) => {
  const isMobile = useMediaQuery(`(max-width:${breakpoints.sm})`);
  const [showAddToCart, setShowAddToCart] = useState<boolean>(false);
  const webSettingsData: any = useContext(WebSettingsContext);
  const { t, i18n } = useTranslation();
  const [quantity, setQuantity] = useState<number>();
  const [unit, setUnit] = useState(props.salesUnit[0].value);
  const sessionId = useGetLoggedInUserInfo();
  const [enquryState, setEnquryState] = useState(false);
  const dispatch = useDispatch();

  const AddItemsToCart = (item_code: any, quantity: any, unit_code: any) => {
    const cartItems = {
      itemCode: item_code,
      unitCode: unit_code,
      itemQty: quantity,
    };

    dispatch(addToCart(sessionId?.sessionId, cartItems));
    props.closeDrawer();
    setShowAddToCart(true);
  };

  const addItemToShoppingListHandler = (
    itemCode: string,
    quantity: any,
    unit: any
  ) => {
    const itemDataToDispatch = [
      {
        itemCode: itemCode,
        unitCode: unit,
        quantity: quantity,
      },
    ];
    dispatch(addItemInShoppingList(sessionId?.sessionId, itemDataToDispatch));
    props.closeDrawer();
  };
  console.log("webSettingsData", webSettingsData);
  return (
    <div className="row">
      <DrawerRight className="col-md-12">
        <Drawer>
          <DrawerHeader className="p-3">
            Quick View {/* use class */}
            <span className="float-right" style={{ cursor: "pointer" }}>
              <CloseIcon
                onClick={props.closeDrawer}
                className="primary-icon-2 icon-lg"
              />
            </span>
          </DrawerHeader>
          {/* Mapping Products data here  */}
          <>
            <div>
              {/* <Discount>
                {" "}
                {props.discountPrice} {webSettingsData?.currencyCode}
              </Discount> */}
              <ImgDrawer
                src={props.imageUrl}
                onError={(e: any) => {
                  e.target.onerror = null;
                  e.target.src = altImage;
                }}
                alt=""
              />
              {/* <HeartIcon
                className="flyIn-addToList"
                onClick={() =>
                  addItemToShoppingListHandler(props.productID, quantity, unit)
                }
              >
                <FavoriteBorderIcon />
              </HeartIcon> */}
            </div>
            <DrawerCaption className="drawer-container">
              <div className="label">
                <p>{props.productID}</p>
              </div>

              <hr />
              <div className="label">
                {/* <h5>Product Description</h5> */}
                <div className="title">
                  <p>- {props.productDescription}</p>
                </div>
                {/* <p>- material polyethylene (HDPE)</p> */}
                <p></p>
                <hr />
              </div>
              <div className="display-flex">
                {" "}
                <Units
                  labelText={t("CON_SALES_UNIT")}
                  onChange={(selectedUnit: any) => {
                    setUnit(selectedUnit);
                  }}
                  options={props.salesUnit}
                  //  selected=salesUnit === unit
                  showLabel={true}
                />{" "}
                <Quantity
                  showLabel={true}
                  onChange={(changedQuantity: any) => {
                    setQuantity(parseInt(changedQuantity));
                  }}
                />
              </div>
          
              <Price className='mt-2'>
                  {webSettingsData?.allowDiscountDisplay ==
                  "*DISCOUNT_PRICE" ? (
                    <span className='price'>
                      {webSettingsData?.showCurrencySymbolBefore
                        ? webSettingsData?.currencyCode +
                          " " +
                          props.discountPrice
                        : props.discountPrice +
                          " " +
                          webSettingsData?.currencyCode}
                    </span>
                  ) : webSettingsData?.allowDiscountDisplay ==
                    "*ACTUAL_PRICE" ? (
                    <span className='price'>
                      {webSettingsData?.showCurrencySymbolBefore
                        ? webSettingsData?.currencyCode +
                          " " +
                          props.actualPrice
                        : props.actualPrice +
                          " " +
                          webSettingsData?.currencyCode}
                    </span>
                  ) : webSettingsData?.allowDiscountDisplay == "*ALL_PRICE" ||
                    webSettingsData?.allowDiscountDisplay == "*ALL" ? (
                    props.actualPrice && props.discountPrice ? (
                      <span>
                        <span className='price'>
                          {webSettingsData?.showCurrencySymbolBefore
                            ? webSettingsData?.currencyCode +
                              " " +
                              props.discountPrice
                            : props.discountPrice +
                              " " +
                              webSettingsData?.currencyCode}
                        </span>
                        <del
                          className='price-old'
                          style={{ paddingLeft: "5px" }}
                        >
                          {webSettingsData?.showCurrencySymbolBefore
                            ? webSettingsData?.currencyCode +
                              " " +
                              props.actualPrice
                            : props.actualPrice +
                              " " +
                              webSettingsData?.currencyCode}
                        </del>
                      </span>
                    ) : props.discountPrice ? (
                      <span className='price'>
                        {webSettingsData?.showCurrencySymbolBefore
                          ? webSettingsData?.currencyCode +
                            " " +
                            props.discountPrice
                          : props.discountPrice +
                            " " +
                            webSettingsData?.currencyCode}
                      </span>
                    ) : props.actualPrice ? (
                      <span className='price'>
                        {webSettingsData?.showCurrencySymbolBefore
                          ? webSettingsData?.currencyCode +
                            " " +
                            props.actualPrice
                          : props.actualPrice +
                            " " +
                            webSettingsData?.currencyCode}
                      </span>
                    ) : (
                      ""
                    )
                  ) : webSettingsData.allowDiscountDisplay == "*ALL" ? (
                    props.actualPrice &&
                    props.discountPrice &&
                    props.discountPercentage ? (
                      <span>
                        <span className='price'>
                          {webSettingsData?.showCurrencySymbolBefore
                            ? webSettingsData?.currencyCode +
                              " " +
                              props.discountPrice +
                              " " +
                              props.discountPercentage +
                              "%"
                            : props.discountPrice +
                              " " +
                              webSettingsData?.currencyCode +
                              " " +
                              props.discountPercentage +
                              "%"}
                        </span>
                        <del
                          className='price-old'
                          style={{ paddingLeft: "5px" }}
                        >
                          {webSettingsData?.showCurrencySymbolBefore
                            ? webSettingsData?.currencyCode +
                              " " +
                              props.actualPrice
                            : props.actualPrice +
                              " " +
                              webSettingsData?.currencyCode}
                        </del>
                      </span>
                    ) : props.actualPrice && props.discountPrice ? (
                      <span>
                        <span className='price'>
                          {webSettingsData?.showCurrencySymbolBefore
                            ? webSettingsData?.currencyCode +
                              " " +
                              props.discountPrice
                            : props.discountPrice +
                              " " +
                              webSettingsData?.currencyCode}
                        </span>
                        <del
                          className='price-old'
                          style={{ paddingLeft: "5px" }}
                        >
                          {webSettingsData?.showCurrencySymbolBefore
                            ? webSettingsData?.currencyCode +
                              " " +
                              props.actualPrice
                            : props.actualPrice +
                              " " +
                              webSettingsData?.currencyCode}
                        </del>
                      </span>
                    ) : props.discountPrice ? (
                      <span className='price'>
                        {webSettingsData?.showCurrencySymbolBefore
                          ? webSettingsData?.currencyCode +
                            " " +
                            props.discountPrice
                          : props.discountPrice +
                            " " +
                            webSettingsData?.currencyCode}
                      </span>
                    ) : props.actualPrice ? (
                      <span className='price'>
                        {webSettingsData?.showCurrencySymbolBefore
                          ? webSettingsData?.currencyCode +
                            " " +
                            props.actualPrice
                          : props.actualPrice +
                            " " +
                            webSettingsData?.currencyCode}
                      </span>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                </Price>
              {/* <div>
                <DrawerPrice className="price">
                  {props.discountPrice}&nbsp;
                  {webSettingsData?.currencyCode}
                </DrawerPrice>
                {props.itemStandardPrice ? (
                  <del
                    style={{ paddingTop: "3px", paddingLeft: "10px" }}
                    className="price-old"
                  >
                    {props.itemStandardPrice}&nbsp;
                    {webSettingsData?.currencyCode}
                  </del>
                ) : (
                  ""
                )}
              </div> */}
              <div style={{ justifyContent: "space-between" }} className="row">
                <Button
                  style={{
                    width: "45%",
                    marginTop: "8px",
                    paddingRight: "20px",
                  }}
                >
                  <Link
                    to={`${DETAILS}/${encodeURIComponent(props.productID)}`}
                  >
                    <Info className="icon" />{" "}
                    <ProductDetailsLink>
                      {t("CON_PRODUCT_DETAILS")}
                    </ProductDetailsLink>
                  </Link>
                </Button>

                <Button
                  onClick={() =>
                    AddItemsToCart(props.productID, quantity, unit)
                  }
                  style={{ width: "45%", marginTop: "8px" }}
                >
                  <CartSVG width="17px" className="icon" />{" "}
                  <span>{t("CON_ADD_TO_CART")}</span>
                </Button>
              </div>
            </DrawerCaption>
          </>
        </Drawer>
      </DrawerRight>
      <AddItemToCart status={showAddToCart} onClose={setShowAddToCart} />
      <AddItemToShoppingList />
    </div>
  );
};

export default DrawerContent;
