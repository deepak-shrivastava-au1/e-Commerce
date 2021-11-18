import React, { useContext, useState, useEffect } from "react";
import { WebSettingsContext } from "../../../../redux/Providers/WebsettingsProvider";
import { BASE_URL_IMAGE } from "@routers/AppRoute";
import altImage from "../../../../assets/images/awaited_image.png";
import { CartSVG, List, Compare } from "../../../../assets/icons";
import DrawerModal from "../../../fragments/DrawerModal";
import Button from "../../../common/Button";
import styled from "styled-components";
import { ListContainer } from "../../../fragments/GridContainer";
import Units from "../../../common/Units";
import Quantity from "../../../common/Quantity";
import { useGetLoggedInUserInfo } from "@hooks";
import { useTranslation } from "react-i18next";
import { DETAILS } from "@constants/Routes";
import { Link } from "react-router-dom";

const ButtonOverlay = styled.a`
  transition: var(--transition05s);
  opacity: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  padding: 5px 0;
  text-align: center;
  position: absolute;
  background: grey;
  border: var(--thin-border) var(--primary-color-1);
  color: var(--primary-color-1);
  box-sizing: border-box;
  border-radius: var(--border-radius);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const Price = styled.div``;

const CardProductGrid = styled.div`
  height: 180px;
  margin-bottom: 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 0px;

  .row-img {
    height: 180px;
    width: 240px;
  }
`;

const InfoWrapper = styled.div`
  overflow: hidden;
  padding: 10px 20px;
  text-align: left;
  margin-left: 0px;
  width: 45%;
`;
const ActionWrapper = styled.figcaption`
  overflow: hidden;
  padding: 10px 20px;
  text-align: left;
  margin-left: 0px;
  width: 35%;

  select {
    min-width: 95px;
    height: 32px;
  }
  .mt-2 {
    .plus,
    .minus {
      padding: 0px;
    }
  }
`;

const ImageWrapper = styled.div`
  overflow: hidden;
  position: relative;
  border-radius: var(--border-radius);
  min-height: 100%;
  max-height: 100%;
  object-fit: contain;
  @media (max-width: 550px) {
    min-height: 180px;
    max-height: 180px;
  }

  > img {
    height: 190px;
    width: 260px;
    padding-top: 0px;
    padding-bottom: 0px;
    max-width: 100%;
    max-height: 100%;
    display: inline-block;
    object-fit: contain;
    background: none;
  }

  &:hover ${ButtonOverlay} {
    opacity: var(--high-opacity);
  }

  &:hover {
    box-shadow: 0 4px 15px rgba(153, 153, 153, 0.3); //mixin
    -webkit-box-shadow: 0 4px 15px rgba(var(--primary-color-3), 0.3);
    transition: var(--transition05s);
  }
`;
const Code = styled.a`
  color: var(--primary-color-2) !important;
  opacity: var(--medium-opacity);
  .label {
    color: var(--primary-color-2) !important;
    a {
      color: var(--primary-color-2) !important;
    }
  }
`;
const Desc = styled.a`
  color: var(--primary-color-2);
`;

interface IProps {
  listView: boolean;
  products: any;
  productList: any;
  loading: boolean;
  hasErrors: boolean;
  onAddToCartHandler: Function;
  onAddItemToList: Function;
  onQuantityChangeHandler: Function;
  onUnitChangeHandler: Function;
  showAddToCart: boolean;
}
const ProductList = (props: IProps) => {
  const webSettingsData: any = useContext(WebSettingsContext);
  const [products, setProducts] = useState(props.products);
  const sessionId = useGetLoggedInUserInfo();

  const { t, i18n } = useTranslation();

  useEffect(() => {
    setProducts(props.products);
  }, [props.products]);

  return (
    <div className='container'>
      <ListContainer className='row'>
        {products?.map((product: any, index: number) => {
          return (
            <CardProductGrid className='card '>
              <Link to={`${DETAILS}/${encodeURIComponent(product?.code)}`}>
                <ImageWrapper>
                  {/* <span className='badge'> {'New'}</span> */}
                  <img
                    src={BASE_URL_IMAGE + product.imageUrl}
                    onError={(e: any) => {
                      e.target.onerror = null;
                      e.target.src = altImage;
                    }}
                  />
                </ImageWrapper>
              </Link>

              <InfoWrapper className='mt-1 drawer-container'>
                {/* class "label" is gloabel here */}
                <Link to={`${DETAILS}/${encodeURIComponent(product?.code)}`}>
                  <Code className='label'>{product.code}</Code>
                </Link>

                <div className='mt-3'>
                  <Link to={`${DETAILS}/${encodeURIComponent(product?.code)}`}>
                    <Desc>{product?.description}</Desc>
                  </Link>

                  <Price className='mt-2'>
                    {webSettingsData.allowDiscountDisplay ==
                    "*DISCOUNT_PRICE" ? (
                      <span className='price'>
                        {webSettingsData?.showCurrencySymbolBefore
                          ? webSettingsData?.currencyCode +
                            " " +
                            product.discountPrice
                          : product.discountPrice +
                            " " +
                            webSettingsData?.currencyCode}
                      </span>
                    ) : webSettingsData.allowDiscountDisplay ==
                      "*ACTUAL_PRICE" ? (
                      <span className='price'>
                        {webSettingsData?.showCurrencySymbolBefore
                          ? webSettingsData?.currencyCode +
                            " " +
                            product.actualPrice
                          : product.actualPrice +
                            " " +
                            webSettingsData?.currencyCode}
                      </span>
                    ) : webSettingsData.allowDiscountDisplay == "*ALL_PRICE" ? (
                      product.actualPrice && product.discountPrice ? (
                        <span>
                          <span className='price'>
                            {webSettingsData?.showCurrencySymbolBefore
                              ? webSettingsData?.currencyCode +
                                " " +
                                product.discountPrice
                              : product.discountPrice +
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
                                product.actualPrice
                              : product.actualPrice +
                                " " +
                                webSettingsData?.currencyCode}
                          </del>
                        </span>
                      ) : product.discountPrice ? (
                        <span className='price'>
                          {webSettingsData?.showCurrencySymbolBefore
                            ? webSettingsData?.currencyCode +
                              " " +
                              product.discountPrice
                            : product.discountPrice +
                              " " +
                              webSettingsData?.currencyCode}
                        </span>
                      ) : product.actualPrice ? (
                        <span className='price'>
                          {webSettingsData?.showCurrencySymbolBefore
                            ? webSettingsData?.currencyCode +
                              " " +
                              product.actualPrice
                            : product.actualPrice +
                              " " +
                              webSettingsData?.currencyCode}
                        </span>
                      ) : (
                        ""
                      )
                    ) : webSettingsData.allowDiscountDisplay == "*ALL" ? (
                      product.actualPrice &&
                      product.discountPrice &&
                      product.discountPercentage ? (
                        <span>
                          <span className='price'>
                            {webSettingsData?.showCurrencySymbolBefore
                              ? webSettingsData?.currencyCode +
                                " " +
                                product.discountPrice +
                                " " +
                                product.discountPercentage +
                                "%"
                              : product.discountPrice +
                                " " +
                                webSettingsData?.currencyCode +
                                " " +
                                product.discountPercentage +
                                "%"}
                          </span>
                          <del
                            className='price-old'
                            style={{ paddingLeft: "5px" }}
                          >
                            {webSettingsData?.showCurrencySymbolBefore
                              ? webSettingsData?.currencyCode +
                                " " +
                                product.actualPrice
                              : product.actualPrice +
                                " " +
                                webSettingsData?.currencyCode}
                          </del>
                        </span>
                      ) : product.actualPrice && product.discountPrice ? (
                        <span>
                          <span className='price'>
                            {webSettingsData?.showCurrencySymbolBefore
                              ? webSettingsData?.currencyCode +
                                " " +
                                product.discountPrice
                              : product.discountPrice +
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
                                product.actualPrice
                              : product.actualPrice +
                                " " +
                                webSettingsData?.currencyCode}
                          </del>
                        </span>
                      ) : product.discountPrice ? (
                        <span className='price'>
                          {webSettingsData?.showCurrencySymbolBefore
                            ? webSettingsData?.currencyCode +
                              " " +
                              product.discountPrice
                            : product.discountPrice +
                              " " +
                              webSettingsData?.currencyCode}
                        </span>
                      ) : product.actualPrice ? (
                        <span className='price'>
                          {webSettingsData?.showCurrencySymbolBefore
                            ? webSettingsData?.currencyCode +
                              " " +
                              product.actualPrice
                            : product.actualPrice +
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
                  <div className='mt-3'>
                    <div>
                      {product?.available && (
                        <span className='mt-2'>
                          {t("CON_AVAILABLE")} :{product?.salesUnits?.length}
                        </span>
                      )}
                    </div>
                    {/* <span className="mt-2">Available :10</span> */}
                    {/* <del className='price-old'>
                      {product.discountPrice * 1.2}€/ pc
                    </del> */}
                  </div>
                </div>
                <div className='display-flex mt-2'>
                  <button
                    className='listAction'
                    onClick={() => {
                      props.onAddItemToList(
                        sessionId,
                        product?.code,
                        props.productList[index]?.quantity,
                        props.productList[index]?.unit
                      );
                    }}
                  >
                    <List className='iconSecondaryColorList' /> Add To List
                  </button>

                  <DrawerModal
                    ListView={true}
                    className=''
                    discountPrice={product?.discountPrice}
                    imageUrl={BASE_URL_IMAGE + product.imageUrl}
                    productId={product?.code}
                    productDescription={product?.description}
                    itemStandardPrice={product?.itemStandardPrice}
                    salesUnit={product?.salesUnitsDesc.map((address: any) => {
                      return {
                        label: address.salesUnit,
                        value: address.salesUnitDesc,
                      };
                    })}
                    onAddItemToCartHandler={props.onAddToCartHandler}
                  />
                </div>
              </InfoWrapper>
              <ActionWrapper className='mt-1'>
                <div className='display-flex'>
                  {" "}
                  <Units
                    labelText={t("CON_SALES_UNIT")}
                    options={product?.salesUnitsDesc.map((address: any) => {
                      return {
                        label: address.salesUnit,
                        value: address.salesUnitDesc,
                        selected:
                          address.salesUnit === props.productList[index]?.unit,
                      };
                    })}
                    showLabel={true}
                    onChange={(selectedUnit: any) => {
                      props.onUnitChangeHandler(
                        product?.code,
                        selectedUnit,
                        index
                      );
                    }}
                  />{" "}
                  <Quantity
                    showLabel={true}
                    quantity={props.productList[index]?.quantity}
                    onChange={(quantity: any) => {
                      props.onQuantityChangeHandler(parseInt(quantity), index);
                    }}
                  />
                </div>
                <Button
                  variant='solid'
                  color='primary'
                  style={{ width: "100%", marginTop: "30px" }}
                  onClick={() => {
                    props.onAddToCartHandler(
                      sessionId,
                      product?.code,
                      props.productList[index]?.quantity,
                      props.productList[index]?.unit
                    );
                  }}
                  disabled={
                    !product.isBuyingAllowed ||
                    !webSettingsData?.buyEnabledForUser
                  }
                >
                  <CartSVG className='secondary-icon-2 icon-md' />{" "}
                  <span>{t("CON_ADD_TO_CART")}</span>
                </Button>
              </ActionWrapper>
            </CardProductGrid>
          );
        })}
      </ListContainer>
    </div>
  );
};

export default ProductList;
