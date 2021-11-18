import { useContext, useState } from "react";
import { WebSettingsContext } from "../../../../redux/Providers/WebsettingsProvider";
import Slider from "react-slick";
import { CartSVG, HeartSVG, Compare } from "@icons";
import { BASE_URL_IMAGE } from "@routers/AppRoute";
import altImage from "../../../../assets/images/banner_image.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import '../../../../scss/components/_carousel.scss';
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import { useMediaQuery } from "@material-ui/core";
import { breakpoints } from "../../../../constants/styled-components";
import { useTranslation } from "react-i18next";
import { DETAILS } from "@constants/Routes";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useGetLoggedInUserInfo } from "@hooks";
import DrawerModal from "@fragments/DrawerModal";
import Button from "@common/Button";
import Units from "../../../common/Units";
import Quantity from "../../../common/Quantity";
import { addToCart } from "@actions/cart/addToCart";
import { addItemInShoppingList } from "@actions/shoppingList/addItemsToShoppingList";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpdatedParamsPromotion } from "@slices/Promotions/youMayLike";

const PreviousBtn = (props: any) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowBackIos style={{ fontSize: "30px" }} />
    </div>
  );
};
const NextBtn = (props: any) => {
  const { className, onClick } = props;

  return (
    <div className={className} onClick={onClick}>
      <ArrowForwardIos style={{ fontSize: "30px" }} />
    </div>
  );
};

interface IProps {
  title: string;
  items: any;
}

const YouMayLikeCarousel = (props: IProps) => {
  const { t, i18n } = useTranslation();
  const webSettingsData: any = useContext(WebSettingsContext);
  const isMobile = useMediaQuery(`(max-width:${breakpoints.sm})`);
  let slidesToDisplay = 4;
  let slidesToScrl = 3;
  if (isMobile) {
    slidesToDisplay = 2;
    slidesToScrl = 2;
  }

  return (
    <Carousel className='BootstrapMulti'>
      <h2>
        {props.title === "COH_COMPONENT"
          ? t(props.title) + " " + t("CON_PRODUCT")
          : t(props.title)}
      </h2>
      <div className='promo-slider' style={{ width: "100%" }}>
        <Slider
          prevArrow={<PreviousBtn />}
          nextArrow={<NextBtn />}
          slidesToShow={slidesToDisplay}
          slidesToScroll={slidesToScrl}
          infinite={false}
        >
          {props.items.map((item: any, index: any) => (
            <Card
              key={index}
              index={index}
              item={item}
              webSettingsData={webSettingsData}
              title={props.title}
            />
          ))}
        </Slider>
      </div>
    </Carousel>
  );
};

const Card = (props: any) => {
  const dispatch = useDispatch();
  const webSettingsData: any = useContext(WebSettingsContext);
  const sessionId = useGetLoggedInUserInfo();
  const [showUnit, setShowUnit] = useState(false);
  const [quantity, setQuantity] = useState(props?.item?.quanity);
  const [salesUnit, setSalesUnit] = useState(
    props?.item?.unitCode ? props.item.unitCode : props?.item?.defaultSalesUnit
  );

  const [showAddToCart, setShowAddToCart] = useState<boolean>(false);
  const { t, i18n } = useTranslation();

  const isMobile = useMediaQuery(`(max-width:${breakpoints.sm})`);
  const showUnits = () => {
    setShowUnit((prevState: any) => {
      // const copyShowUnit = prevState ? [...prevState] : [1];
      const copyShowUnit = true;
      return copyShowUnit;
    });
  };

  const addItemToCartHandler = (
    sessionId: any,
    itemCode: string,
    quantity: number,
    unit: string
  ) => {
    const itemDataToDispatch = {
      itemCode: itemCode,
      itemQty: quantity,
      unitCode: unit,
    };

    dispatch(addToCart(sessionId?.sessionId, itemDataToDispatch));
    setShowAddToCart(true);
  };

  const addItemToShoppingListHandler = (
    sessionId: any,
    itemCode: string,
    quantity: number,
    unit: string
  ) => {
    const itemDataToDispatch = [
      {
        itemCode: itemCode,
        unitCode: unit,
        quantity: quantity,
      },
    ];
    dispatch(addItemInShoppingList(sessionId?.sessionId, itemDataToDispatch));
  };

  const hideUnits = () => {
    setShowUnit((prevState: any) => {
      //const copyShowUnit = prevState ? [...prevState] : [1];
      const copyShowUnit = false;
      return copyShowUnit;
    });
  };

  const quantityChangeHandler = (quantity: number) => {
    setQuantity((prevState: any) => {
      return quantity;
    });
  };
  const unitChangeHandler = (unit: string) => {
    if (props.title !== "COH_COMPONENT") {
      dispatch(
        fetchUpdatedParamsPromotion(
          props.item?.code,
          sessionId.sessionId,
          unit,
          props.index,
          props.title
        )
      );
    }
    setSalesUnit((prevState: any) => {
      return unit;
    });
  };
  return (
    <CardProductGrid className='card'>
      <Link
        to={`${DETAILS}/${encodeURIComponent(
          props.item?.code ? props.item?.code : props.item?.componentCode
        )}`}
      >
        <ImageWrapper>
          {/* <span className='badge'> {'New'}</span> */}

          <img
            className='img-fluid'
            src={BASE_URL_IMAGE + props.item?.imageUrl}
            onError={(e: any) => {
              e.target.onerror = null;
              e.target.src = altImage;
            }}
            alt={altImage}
          />
        </ImageWrapper>
      </Link>
      <InfoWrapper onMouseLeave={() => hideUnits()}>
        {/* class "label" is gloabel here */}

        <div>
          <ProductCode>
            <Link
              to={`${DETAILS}/${encodeURIComponent(
                props.item?.code ? props.item?.code : props.item?.componentCode
              )}`}
            >
              <Code className='label'>
                {props.item?.code
                  ? props.item?.code
                  : props.item?.componentCode}
              </Code>
            </Link>
            <Icons>
              <HeartSVG
                className='icon-lg primary-icon-2'
                onClick={() =>
                  addItemToShoppingListHandler(
                    sessionId,
                    props.item?.code,
                    props.item?.quantity,
                    props.item?.unit
                  )
                }
              />
              {!isMobile ? (
                <DrawerModal
                  GridView={true}
                  className='icon-lg primary-icon-2'
                  discountPrice={props.item?.discountPrice}
                  imageUrl={
                    BASE_URL_IMAGE + props.item.imageUrl
                      ? BASE_URL_IMAGE + props.item.imageUrl
                      : altImage
                  }
                  productId={
                    props.item?.code
                      ? props.item?.code
                      : props.item?.componentCode
                  }
                  productDescription={
                    props.item?.componentName
                      ? props.item?.componentName
                      : props.item?.description
                  }
                  itemStandardPrice={props.item?.actualPrice}
                  // salesUnit={product.salesUnitsDesc}
                  salesUnit={props.item?.salesUnitsDesc?.map((address: any) => {
                    return {
                      label: address.salesUnit,
                      value: address.salesUnitDesc,
                    };
                  })}
                  onAddItemToCartHandler={props.onAddToCartHandler}
                />
              ) : (
                ""
              )}
            </Icons>
          </ProductCode>
          <div style={{ minHeight: "40px" }}>
            <Link
              to={`${DETAILS}/${encodeURIComponent(
                props.item?.code ? props.item?.code : props.item?.componentCode
              )}`}
            >
              <Desc>
                {props.item?.description
                  ? props.item?.description
                  : props.item?.componentName}
              </Desc>
            </Link>
          </div>
          <Price className='mt-2'>
            {webSettingsData.allowDiscountDisplay == "*DISCOUNT_PRICE" ? (
              <span className='price'>
                {webSettingsData?.showCurrencySymbolBefore
                  ? webSettingsData?.currencyCode +
                    " " +
                    props.item?.discountPrice
                  : props.item?.discountPrice +
                    " " +
                    webSettingsData?.currencyCode}
              </span>
            ) : webSettingsData.allowDiscountDisplay == "*ACTUAL_PRICE" ? (
              <span className='price'>
                {webSettingsData?.showCurrencySymbolBefore
                  ? webSettingsData?.currencyCode +
                    " " +
                    props.item?.actualPrice
                  : props.item?.actualPrice +
                    " " +
                    webSettingsData?.currencyCode}
              </span>
            ) : webSettingsData.allowDiscountDisplay == "*ALL_PRICE" ? (
              props.item?.actualPrice && props.item?.discountPrice ? (
                <span>
                  <span className='price'>
                    {webSettingsData?.showCurrencySymbolBefore
                      ? webSettingsData?.currencyCode +
                        " " +
                        props.item?.discountPrice
                      : props.item?.discountPrice +
                        " " +
                        webSettingsData?.currencyCode}
                  </span>
                  <del className='price-old' style={{ paddingLeft: "5px" }}>
                    {webSettingsData?.showCurrencySymbolBefore
                      ? webSettingsData?.currencyCode +
                        " " +
                        props.item?.actualPrice
                      : props.item?.actualPrice +
                        " " +
                        webSettingsData?.currencyCode}
                  </del>
                </span>
              ) : props.item?.discountPrice ? (
                <span className='price'>
                  {webSettingsData?.showCurrencySymbolBefore
                    ? webSettingsData?.currencyCode +
                      " " +
                      props.item?.discountPrice
                    : props.item?.discountPrice +
                      " " +
                      webSettingsData?.currencyCode}
                </span>
              ) : props.item?.actualPrice ? (
                <span className='price'>
                  {webSettingsData?.showCurrencySymbolBefore
                    ? webSettingsData?.currencyCode +
                      " " +
                      props.item?.actualPrice
                    : props.item?.actualPrice +
                      " " +
                      webSettingsData?.currencyCode}
                </span>
              ) : (
                ""
              )
            ) : webSettingsData.allowDiscountDisplay == "*ALL" ? (
              props.item?.actualPrice &&
              props.item?.discountPrice &&
              props.item?.discountPercentage ? (
                <span>
                  <span className='price'>
                    {webSettingsData?.showCurrencySymbolBefore
                      ? webSettingsData?.currencyCode +
                        " " +
                        props.item?.discountPrice +
                        " " +
                        props.item?.discountPercentage +
                        "%"
                      : props.item?.discountPrice +
                        " " +
                        webSettingsData?.currencyCode +
                        " " +
                        props.item?.discountPercentage +
                        "%"}
                  </span>
                  <del className='price-old' style={{ paddingLeft: "5px" }}>
                    {webSettingsData?.showCurrencySymbolBefore
                      ? webSettingsData?.currencyCode +
                        " " +
                        props.item?.actualPrice
                      : props.item?.actualPrice +
                        " " +
                        webSettingsData?.currencyCode}
                  </del>
                </span>
              ) : props.item?.actualPrice && props.item?.discountPrice ? (
                <span>
                  <span className='price'>
                    {webSettingsData?.showCurrencySymbolBefore
                      ? webSettingsData?.currencyCode +
                        " " +
                        props.item?.discountPrice
                      : props.item?.discountPrice +
                        " " +
                        webSettingsData?.currencyCode}
                  </span>
                  <del className='price-old' style={{ paddingLeft: "5px" }}>
                    {webSettingsData?.showCurrencySymbolBefore
                      ? webSettingsData?.currencyCode +
                        " " +
                        props.item?.actualPrice
                      : props.item?.actualPrice +
                        " " +
                        webSettingsData?.currencyCode}
                  </del>
                </span>
              ) : props.item?.discountPrice ? (
                <span className='price'>
                  {webSettingsData?.showCurrencySymbolBefore
                    ? webSettingsData?.currencyCode +
                      " " +
                      props.item?.discountPrice
                    : props.item?.discountPrice +
                      " " +
                      webSettingsData?.currencyCode}
                </span>
              ) : props.item?.actualPrice ? (
                <span className='price'>
                  {webSettingsData?.showCurrencySymbolBefore
                    ? webSettingsData?.currencyCode +
                      " " +
                      props.item?.actualPrice
                    : props.item?.actualPrice +
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
            {showUnit ? (
              <div className='display-flex'>
                {" "}
                <Units
                  labelText={t("CON_SALES_UNIT")}
                  onChange={(selectedUnit: any) => {
                    unitChangeHandler(selectedUnit);
                  }}
                  options={
                    props.title == "COH_COMPONENT"
                      ? props.item.unitCodesDesc?.map((address: any) => {
                          return {
                            label: address.salesUnit,
                            value: address.salesUnitDesc,
                            selected: address.salesUnit === salesUnit,
                          };
                        })
                      : props.item?.salesUnitsDesc?.map((address: any) => {
                          return {
                            label: address.salesUnit,
                            value: address.salesUnitDesc,
                            selected: address.salesUnit === salesUnit,
                          };
                        })
                  }
                  showLabel={false}
                />{" "}
                <Quantity
                  showLabel={false}
                  quantity={quantity}
                  onChange={(quantity: any) => {
                    quantityChangeHandler(parseInt(quantity));
                  }}
                />
              </div>
            ) : (
              <div>
                {props.item?.availQty !== null && (
                  <span>
                    {t("CON_AVAILABLE")} : {props.item?.availQty}
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
                  unitChangeHandler(selectedUnit);
                }}
                options={
                  props.title == "COH_COMPONENT"
                    ? props.item.unitCodesDesc?.map((address: any) => {
                        return {
                          label: address.salesUnit,
                          value: address.salesUnitDesc,
                          selected: address.salesUnit === salesUnit,
                        };
                      })
                    : props.item?.salesUnitsDesc?.map((address: any) => {
                        return {
                          label: address.salesUnit,
                          value: address.salesUnitDesc,
                          selected: address.salesUnit === salesUnit,
                        };
                      })
                }
                showLabel={false}
              />
              <Quantity
                showLabel={false}
                quantity={quantity}
                onChange={(quantity: any) => {
                  quantityChangeHandler(parseInt(quantity));
                }}
              />
            </div>
          ) : (
            ""
          )}

          <Button
            variant='solid'
            color='primary'
            onMouseEnter={() => showUnits()}
            style={{ width: "100%", marginTop: "8px" }}
            onClick={() => {
              addItemToCartHandler(
                sessionId,
                props.item?.code ? props.item?.code : props.item?.componentCode,
                quantity,
                salesUnit
              );
            }}
            disabled={
              !props.item?.isBuyingAllowed ||
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
};

export default YouMayLikeCarousel;

const Carousel = styled.div`
  background: none;
  margin: 0px;
  padding: 0px;
  .slick-slide {
    padding: 5px 3px;
  }
  .BootstrapMulti {
  }
  > h2 {
    font-size: calc(var(--base-font-size) + 6px);
    padding-left: 0px;
  }
  .slick-track {
    margin-left: 0px;
    margin-right: 0px;
  }
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
  .plus,
  .minus {
    padding: 0px;
  }

  .col-md-12 {
    padding-right: 5px;
  }
  & select {
    height: 32px;
    min-width: 90px;
  }
`;

const ImageWrapper = styled.div`
  overflow: hidden;
  position: relative;
  border-radius: var(--border-radius);

  object-fit: contain;
  @media (max-width: 550px) {
    min-height: 190px;
    max-height: 190px;
  }

  > img {
    padding-top: 0px;
    min-width: 100%;
    min-height: 240px;
    max-height: 240px;
    max-width: 280px;
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
const Icons = styled.div`
  display: flex;
  width: 60px;
  cursor: pointer;
  justify-content: space-between;
  opacity: var(--medium-opacity);
`;
const ProductCode = styled.div`
  display: flex;
  justify-content: space-between;
`;
