import React, { useEffect } from "react";
import { BASE_URL_IMAGE } from "@routers/AppRoute";
import { useContext } from "react";
import altImage from "../../../assets/images/awaited_image.png";
import { CartSVG, HeartSVG, Compare } from "@icons";
import DrawerModal from "@fragments/DrawerModal";
import Button from "@common/Button";
import styled from "styled-components";
import { WebSettingsContext } from "../../../redux/Providers/WebsettingsProvider";
import { useMediaQuery } from "@material-ui/core";
import { breakpoints } from "@constants/styled-components";
import GridContainer from "@fragments/GridContainer";
import { useState } from "react";
import Units from "../../common/Units";
import Quantity from "../../common/Quantity";
import { useGetLoggedInUserInfo } from "@hooks";
import { intitalizeLoader } from "@slices/Products/productSearch";
import { useTranslation } from "react-i18next";
import { DETAILS } from "@constants/Routes";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const Label = styled.a`
  font-size: var(--base-font-size);
  font-weight: var(--font-weight-medium);
  color: var(--primary-color-2);
  opacity: var(--medium-opacity);
`;

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
  background-color: var(--primary-color-2);
  border: var(--thin-border) var(--primary-color-1);
  color: var(--primary-color-1);
  box-sizing: border-box;
  border-radius: var(--border-radius);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const CardProductGrid = styled.figure`
  height: 440px;
  margin-bottom: 1px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 8px;

  .row-img {
    height: 100px;
    width: 100px;
  }
`;

const InfoWrapper = styled.figcaption`
  overflow: hidden;
  padding: 10px 20px;
  text-align: left;
`;

const Price = styled.div`
  font-weight: var(--font-weight-bold);
  .price-old {
    font-weight: var(--font-weight-regular);
    opacity: var(--high-opacity);
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

const ImageWrapper = styled.div`
  overflow: hidden;
  position: relative;
  border-radius: var(--border-radius);

  object-fit: contain;
  @media (max-width: 550px) {
    min-height: 140px;
    max-height: 140px;
  }

  > img {
    padding: 10px;
    min-width: 100%;
    max-height: 240px;
    max-width: 100%;
    display: inline-block;
    object-fit: contain;
  }

  &:hover ${ButtonOverlay} {
    opacity: var(--high-opacity);
  }

  &:hover {
    transform: scale(1.05);
    transition: var(--transition05s);
  }
`;

const UnitQuantityContiner = styled.div`
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

interface IProps {
  compareItems: any;
  totalItems: number;
  setListView: Function;
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
  updateCompareListItems: Function;
  catalog: boolean;
}

const ProductsGrid = (props: IProps) => {
  const webSettingsData: any = useContext(WebSettingsContext);
  const isMobile = useMediaQuery(`(max-width:${breakpoints.sm})`);
  const [showUnit, setShowUnit] = useState(
    props.products?.map((item: any) => false)
  );
  const [products, setProducts] = useState(props.products);
  const sessionId = useGetLoggedInUserInfo();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    setProducts(props.products);
  }, [props.products]);

  const showUnits = (index: number) => {
    setShowUnit((prevState: any) => {
      const copyShowUnit = prevState ? [...prevState] : [1];
      copyShowUnit[index] = true;
      return copyShowUnit;
    });
  };
  const hideUnits = (index: number) => {
    setShowUnit((prevState: any) => {
      const copyShowUnit = prevState ? [...prevState] : [1];
      copyShowUnit[index] = false;
      return copyShowUnit;
    });
  };
  console.log("deepakkk2", products);
  return (
    <GridContainer>
      {products?.map((product: any, index: number) => {
        return (
          <CardProductGrid className='card pl-0 pr-0'>
            <Link
              to={`${DETAILS}/${encodeURIComponent(
                props.catalog ? product?.code : product?.solrItemCode
              )}`}
            >
              <ImageWrapper>
                {/* <span className='badge'> {'New'}</span> */}

                <img
                  className='img-fluid'
                  src={BASE_URL_IMAGE + product.imageUrl}
                  onError={(e: any) => {
                    e.target.onerror = null;
                    e.target.src = altImage;
                  }}
                />
              </ImageWrapper>
            </Link>
            <InfoWrapper onMouseLeave={() => hideUnits(index)}>
              {/* class "label" is gloabel here */}

              <div className='container-fluid'>
                <div className='row pl-0'>
                  <div className='col-sm-5 pl-0'>
                    <Code className='label'>
                      {product?.code ? product.code : product?.solrItemCode}
                    </Code>
                  </div>
                  <div className='gridActionIcons col-sm-7 pr-0 mr-0'>
                    <div className='IconWrapper d-flex '>
                      <HeartSVG
                        className='iconSecondaryColor'
                        onClick={() =>
                          props.onAddItemToList(
                            sessionId,
                            props.catalog
                              ? product?.code
                              : product?.solrItemCode,
                            props.productList[index]?.quantity,
                            props.productList[index]?.unit
                          )
                        }
                      />
                      <Compare
                        onClick={() =>
                          props.updateCompareListItems(
                            props.catalog
                              ? product?.code
                              : product?.solrItemCode
                          )
                        }
                        className='iconSecondaryColor'
                      />
                      {console.log("Mobile", product)}
                      {!isMobile && (
                        <DrawerModal
                          GridView={true}
                          className='iconSecondaryColor'
                          discountPrice={product?.discountPrice}
                          actualPrice={product?.actualPrice}
                          discountPercentage={product?.discountPercentage}
                          imageUrl={
                            BASE_URL_IMAGE + product.imageUrl
                              ? BASE_URL_IMAGE + product.imageUrl
                              : altImage
                          }
                          productId={
                            props.catalog
                              ? product?.code
                              : product?.solrItemCode
                          }
                          productDescription={
                            props.catalog
                              ? product?.description
                              : product?.itemDescription
                          }
                          itemStandardPrice={product?.itemStandardPrice}
                          // salesUnit={product.salesUnitsDesc}
                          salesUnit={product?.salesUnitsDesc.map(
                            (address: any) => {
                              return {
                                label: address.salesUnit,
                                value: address.salesUnitDesc,
                              };
                            }
                          )}
                          onAddItemToCartHandler={props.onAddToCartHandler}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <Link
                    to={`${DETAILS}/${encodeURIComponent(
                      props.catalog ? product?.code : product?.solrItemCode
                    )}`}
                  >
                    <Desc>
                      {props.catalog
                        ? product?.description
                        : product?.itemDescription}
                    </Desc>
                  </Link>
                </div>
                <Price className='mt-2'>
                  {webSettingsData.allowDiscountDisplay == "*DISCOUNT_PRICE" ? (
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
                <UnitQuantityContiner className='mt-2'>
                  {showUnit && showUnit[index] ? (
                    <div className='display-flex'>
                      {" "}
                      <Units
                        labelText={t("CON_SALES_UNIT")}
                        onChange={(selectedUnit: any) => {
                          props.onUnitChangeHandler(
                            props.catalog
                              ? product?.code
                              : product?.solrItemCode,
                            selectedUnit,
                            index,
                            props.catalog
                          );
                        }}
                        options={product?.salesUnitsDesc.map((address: any) => {
                          return {
                            label: address.salesUnit,
                            value: address.salesUnitDesc,
                            selected:
                              address.salesUnit ===
                              props.productList[index]?.unit,
                          };
                        })}
                        showLabel={false}
                      />{" "}
                      <Quantity
                        showLabel={false}
                        quantity={props.productList[index]?.quantity}
                        onChange={(quantity: any) => {
                          props.onQuantityChangeHandler(
                            parseInt(quantity),
                            index
                          );
                        }}
                      />
                    </div>
                  ) : (
                    <div>
                      {product?.available && (
                        <span>
                          {t("CON_AVAILABLE")} :{product?.salesUnits?.length}
                        </span>
                      )}
                    </div>
                  )}
                </UnitQuantityContiner>
                {isMobile ? (
                  <div>
                    <Units
                      labelText={t("CON_SALES_UNIT")}
                      onChange={(selectedUnit: any) => {
                        props.onUnitChangeHandler(
                          props.catalog ? product?.code : product?.solrItemCode,
                          selectedUnit,
                          index,
                          props.catalog
                        );
                      }}
                      options={product?.salesUnitsDesc.map((address: any) => {
                        return {
                          label: address.salesUnit,
                          value: address.salesUnitDesc,
                          selected:
                            address.salesUnit ===
                            props.productList[index]?.unit,
                        };
                      })}
                      showLabel={false}
                    />
                    <Quantity
                      showLabel={false}
                      quantity={props.productList[index]?.quantity}
                      onChange={(quantity: any) => {
                        props.onQuantityChangeHandler(
                          parseInt(quantity),
                          index
                        );
                      }}
                    />{" "}
                  </div>
                ) : (
                  " "
                )}
                <Button
                  variant='solid'
                  color='primary'
                  onMouseEnter={() => showUnits(index)}
                  style={{ width: "100%", marginTop: "8px" }}
                  onClick={() => {
                    props.onAddToCartHandler(
                      sessionId,
                      props.catalog ? product?.code : product?.solrItemCode,
                      props.productList[index]?.quantity,
                      props.productList[index]?.unit
                    );
                  }}
                  disabled={
                    !product.isBuyingAllowed ||
                    !webSettingsData?.buyEnabledForUser
                  }
                >
                  <CartSVG className='secondary-icon-2 icon-lg' />{" "}
                  <span>{t("CON_ADD_TO_CART")}</span>
                </Button>
              </div>
            </InfoWrapper>
          </CardProductGrid>
        );
      })}
    </GridContainer>
  );
};

export default ProductsGrid;
