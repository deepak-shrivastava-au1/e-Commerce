import styled from "styled-components";
import "./_productDetails.scss";
import altImage from "../../../assets/images/awaited_image.png";
import { useLocation, useParams } from "react-router-dom";
import React, { useEffect, useState, useContext, useRef } from "react";
import { useMediaQuery } from "@material-ui/core";
import { breakpoints } from "@constants/styled-components";
import {
  fetchProductDetails,
  productsDetailsSelector,
  fetchProductUnits,
  CalculatePrice,
  priceDetailsSelector,
  getUpdatedPrice,
  productDetailsStates,
} from "@slices/Products/productDetails";
import {
  intitalizeLoader,
  productsSelector,
} from "@slices/Products/productSearch";
import { useSelector, useDispatch } from "react-redux";
import DrawerModal from "@fragments/DrawerModal";
import * as Constants from "@constants/Constants";
import { useGetLoggedInUserInfo } from "@hooks";
import { WebSettingsContext } from "../../../redux/Providers/WebsettingsProvider";
import Divider from "@material-ui/core/Divider";
import Units from "@common/Units";
import { useTranslation } from "react-i18next";
import Quantity from "@common/Quantity";
import Button from "../../common/Button";
import { Link } from "react-router-dom";
import LoadingOverlay from "@common/LoadingOverlay";
import {
  Mail,
  Info,
  CardHeartSVG,
  HeartFillSVG,
  PdfSVG,
  ExcelSVG,
} from "@icons";
import { CartSVG } from "@icons";

import { ArrowDownSVG, ArrowUpSVG } from "../../../assets/icons";
import Collapse from "@material-ui/core/Collapse";
import { addToCart } from "@actions/cart/addToCart";
import { fetchFilterDetails } from "@slices/getFilterDetails";
import { CATALOG, DETAILS } from "@constants/Routes";
import ProductMatrix from "@fragments/ProductMatrix";
import ProductDetailsImagesMobile from "@fragments/ProductDetailsImagesMobile";
import { addItemInShoppingList } from "@actions/shoppingList/addItemsToShoppingList";
import SendEnquiry from "@fragments/SendEnquiry";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import AddItemToCart from "@pages/Cart/ShoppingCart/AddItemToCart";
import Breadcrumb from "@fragments/Breadcrumb";
import AddItemToShoppingList from "@pages/shoppingList/AddItemToShoppingList";
import { BASE_URL_IMAGE } from "@routers/AppRoute";
import SmallProductImageScroller from "@fragments/SmallProductImageScroller";
import ScrollToTop from "@common/ScrollToTop";
import YouMayLike from "@pages/Promotions/Promotion/YouMayLike";
import { addToCartSelector } from "@slices/cart/addToCart";
import { addToShoppingListSelector } from "@slices/shoppingList/addToShoppingList";
import { RightSVG } from "@icons";
import YouMayLikeCarousel from "@pages/Promotions/Promotion/YouMayLikeCarousel";
import { useHistory } from "react-router-dom";
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
const SmallImageView = styled.img`
  height: 120px;
  width: 100%;
  padding-top: 15px;
  padding-left: 0px;
  border-radius: cal(var(--border-radius) + 4px);
  cursor: pointer;
`;
const LargeImageView = styled.img`
  height: 600px;
  width: 100%;
  margin-top: 0;
  padding-top: 15px;
  padding-left: 0px;
  border-radius: cal(var(--border-radius) + 4px);
  :hover {
    opacity: 0;
  }
`;
const ImageWrapper = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CatalogLink = styled.span`
  cursor: pointer;
  color: var(--primary-color-1);
`;
const DrawerEnquiry = styled.div`
  font-size: calc(var(--base-font-size) + 2);
  padding: 10px 0;
  opacity: var(--high-opacity);
  cursor: pointer;
  align-items: center;
`;
const AddToList = styled.span`
  color: var(--red);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
`;
const ProductImages = styled.div`
  margin-left: 0px;
  padding-left: 0px;
  padding-right: 0px;
  height: 600px;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  text-align: justify;
  position: relative;

  ::-webkit-scrollbar {
    width: 0; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }
`;

const Price = styled.div`
  font-size: calc(var(--base-font-size) + 10px);
  font-weight: var(--font-weight-bold);
  .price-old {
    font-size: calc(var(--base-font-size) + 6px);
    margin-left: 20px;
    font-weight: var(--font-weight-regular);
    opacity: var(--high-opacity);
  }
`;

const ProductDetails = () => {
  const productDetails = useSelector(productsDetailsSelector);
  const productStates = useSelector(productDetailsStates);
  const priceDetails = useSelector(priceDetailsSelector);
  const addedToCart = useSelector(addToCartSelector);
  const addedToList = useSelector(addToShoppingListSelector);
  const isMobile = useMediaQuery(`(max-width:${breakpoints.sm})`);
  const sessionId = useGetLoggedInUserInfo();
  const webSettingsData: any = useContext(WebSettingsContext);
  const [Specification, OpenSpecification] = useState(true);
  const [Warehouse, OpenWarehouse] = useState(true);
  const [Documents, OpenDocuments] = useState(true);
  const [Catalog, OpenCatalog] = useState(true);
  const [Overview, OpenOverview] = useState(true);
  const [unit, setUnit] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [enquryState, setEnquryState] = useState(false);
  const [showAddToCart, setShowAddToCart] = useState<boolean>(false);
  let location = useLocation();
  var productCode = location.pathname.split(DETAILS + "/")[1];
  const dispatch = useDispatch();
  const [largeImageUrl, setLargeImageUrl] = useState("");
  const { t, i18n } = useTranslation();
  const [background, setBackground] = useState({
    backgroundImage: `url(${largeImageUrl})`,
    backgroundPosition: "0% 0%",
  });
  const [product, setProduct] = useState("");
  const [attribute, setAttribute] = useState("");
  const [matrixItemCode, setMatrixItemCode] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [error, setError] = useState(0);
  const history = useHistory();

  console.log("solrItems", productDetails);
  useEffect(() => {
    if (
      productDetails?.isMatrixBaseItem &&
      productDetails?.matrixItemDetailList
    ) {
      setMatrixItemCode(
        productDetails.matrixItemDetailList[0]?.childMatrixList[0]
          ?.itemMatrixCode
      );
    }
  }, [productDetails]);
  const selectProduct = (val: any) => {
    setProduct(val);
    setDisabled(false);
  };
  const selectAttribute = (val: any) => {
    setAttribute(val);
    productDetails.matrixItemDetailList[0]?.childMatrixList?.map(
      (items: any) => {
        if (
          items.verticalTemplateName === product &&
          items.columnTemplateName === val
        ) {
          setMatrixItemCode(items.itemMatrixCode);
        }
      }
    );
    setDisabled(false);
  };

  useEffect(() => {
    if (productDetails?.resourceBeanList) {
      setLargeImageUrl(
        BASE_URL_IMAGE + productDetails?.resourceBeanList[1]?.listOfRT[0]
      );
      setUnit(
        productDetails?.salesUnit
          ? productDetails?.salesUnit
          : productDetails?.defaultSalesUnit
      );
    }
  }, [productDetails]);

  useEffect(() => {
    dispatch({
      type: getUpdatedPrice,
      payload: "",
    });
  }, [dispatch]);

  const LargeImage = (url: string) => {
    setLargeImageUrl(url);
    console.log(url);
  };

  useEffect(() => {
    setLoader(true);
    dispatch(fetchProductDetails(productCode, sessionId?.sessionId));
  }, []);

  useEffect(() => {
    setLoader(true);
    dispatch(fetchFilterDetails(sessionId?.sessionId));
  }, [dispatch, sessionId?.sessionId]);

  const onChangeUnit = (value: any) => {
    setUnit(value);
    setLoader(true);
    dispatch(fetchProductUnits(productCode, sessionId?.sessionId, value));
  };

  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const changeQuantity = (quantity: number) => {
    setQuantity(quantity);
    if (quantity > 0) {
      setLoader(true);
      dispatch(
        CalculatePrice(
          productDetails.itemCode,
          sessionId?.sessionId,
          unit,
          webSettingsData?.currencyCode,

          date,
          quantity
        )
      );
    }
  };

  useEffect(() => {
    if (addedToCart.isCompleted) {
      setLoader(false);
    }
  }, [addedToCart.isCompleted]);

  const addItemToCartHandler = () => {
    if (productDetails?.matrixTable) {
      const itemDataToDispatch = {
        itemCode: matrixItemCode,
        itemQty: quantity,
        unitCode: unit,
      };
      setLoader(true);
      dispatch(addToCart(sessionId?.sessionId, itemDataToDispatch));
    } else {
      const itemDataToDispatch = {
        itemCode: productDetails.itemCode,
        itemQty: quantity,
        unitCode: unit,
      };

      setLoader(true);
      dispatch(addToCart(sessionId?.sessionId, itemDataToDispatch));
    }
    setDisabled(true);
    setShowAddToCart(true);
  };

  useEffect(() => {
    if (addedToList.isCompleted) {
      setLoader(false);
    }
  }, [addedToList.isCompleted]);

  const addItemToShoppingListHandler = () => {
    if (productDetails?.matrixTable) {
      const itemDataToDispatch = [
        {
          itemCode: matrixItemCode,
          quantity: quantity,
          unitCode: unit,
        },
      ];
      setLoader(true);
      dispatch(addItemInShoppingList(sessionId, itemDataToDispatch));
    } else {
      const itemDataToDispatch = [
        {
          itemCode: productDetails.itemCode,
          quantity: quantity,
          unitCode: unit,
        },
      ];
      setLoader(true);
      dispatch(addItemInShoppingList(sessionId, itemDataToDispatch));
    }
  };

  const handleMouseMove = (e: any) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setBackground((prevState) => ({
      ...prevState,
      backgroundImage: `url(${largeImageUrl})`,
      backgroundPosition: `${x}% ${y}%`,
    }));
  };

  const documentDetails = () => {
    return productDetails.resourceBeanList?.filter((items: any) => {
      return (
        (items.resourceType === "TEXT_DOC" ||
          items.resourceType === "PDF" ||
          items.resourceType === "BROCHURE") &&
        items.resourceListDesc[0]
      );
    });
  };
  useEffect(() => {
    if (productStates.isCompleted) {
      setLoader(false);
    }
  }, [productStates.isCompleted]);

  console.log("documentDetails", productDetails);
  const OpenCatalogPage = (catalogueCode: any, elementCode: any) => {
    history.push(`${CATALOG}/${catalogueCode}/${elementCode}`);
  };
  return (
    <React.Fragment>
      <LoadingOverlay active={loader} />
      <ScrollToTop />
      <div style={{ marginTop: `${isMobile ? "143px" : "84px"}` }}></div>
      <AddItemToCart status={showAddToCart} onClose={setShowAddToCart} />
      <AddItemToShoppingList />
      <CardProductGrid className="card mt-1 r-m-l r-m-r r-m-t">
        <div className="container-fluid p-16">
          <div className="row">
            {!isMobile && (
              <div className="col-lg-6 pr-2">
                <div className="row pt-2">
                  <ProductImages className="col-sm-2 small-image-container">
                    <SmallProductImageScroller
                      setLargeImageUrl={LargeImage}
                      productDetails={productDetails}
                    />
                  </ProductImages>

                  <ImageWrapper className="col-sm-10 pr-0">
                    {productDetails.isShowAttentionImage && (
                      <img
                        className="inquiryImage"
                        src={BASE_URL_IMAGE + productDetails.attentionImageURL}
                        alt={""}
                      />
                    )}

                    <figure className="zoom-image" style={background}>
                      <LargeImageView
                        onMouseMove={handleMouseMove}
                        src={BASE_URL_IMAGE + largeImageUrl}
                        onError={(e: any) => {
                          e.target.onerror = null;
                          e.target.src = altImage;
                        }}
                      />
                    </figure>
                  </ImageWrapper>
                </div>
              </div>
            )}

            {/* Right Section */}
            <div className="col-lg-6 pt-4 pl-2">
              <section>
                <label className="Item-Code">{productDetails.itemCode}</label>
                <h2 className="mt-3 DescriptionDetail">
                  {productDetails.itemDesc}
                </h2>
                {isMobile && (
                  <ProductDetailsImagesMobile productDetails={productDetails} />
                )}
                <p className="mt-4">
                  {t("CON_AVAILABLE")} :
                  <b className="available">
                    {productDetails.availabilityOfItem}
                  </b>
                </p>
                <p className="mt-4">
                  {t("CON_PRODUCT_GROUP")} :
                  <b className="available">{productDetails.itemGroup}</b>
                </p>
                {!productDetails.isShowPrice && (
                  <Price className="mt-5">
                    {webSettingsData?.allowDiscountDisplay ==
                    "*DISCOUNT_PRICE" ? (
                      <span className="price">
                        {webSettingsData?.showCurrencySymbolBefore
                          ? webSettingsData?.currencyCode +
                            " " +
                            productDetails.discountPrice
                          : productDetails.discountPrice +
                            " " +
                            webSettingsData?.currencyCode}
                      </span>
                    ) : webSettingsData?.allowDiscountDisplay ==
                      "*ACTUAL_PRICE" ? (
                      <span className="price">
                        {webSettingsData?.showCurrencySymbolBefore
                          ? webSettingsData?.currencyCode +
                            " " +
                            productDetails.actualPrice
                          : productDetails.actualPrice +
                            " " +
                            webSettingsData?.currencyCode}
                      </span>
                    ) : webSettingsData?.allowDiscountDisplay ==
                      "*ALL_PRICE" ? (
                      productDetails.actualPrice &&
                      productDetails.discountPrice ? (
                        <span>
                          <span className="price">
                            {webSettingsData?.showCurrencySymbolBefore
                              ? webSettingsData?.currencyCode +
                                " " +
                                productDetails.discountPrice
                              : productDetails.discountPrice +
                                " " +
                                webSettingsData?.currencyCode}
                          </span>
                          <del
                            className="price-old"
                            style={{ paddingLeft: "5px" }}
                          >
                            {webSettingsData?.showCurrencySymbolBefore
                              ? webSettingsData?.currencyCode +
                                " " +
                                productDetails.actualPrice
                              : productDetails.actualPrice +
                                " " +
                                webSettingsData?.currencyCode}
                          </del>
                        </span>
                      ) : productDetails.discountPrice ? (
                        <span className="price">
                          {webSettingsData?.showCurrencySymbolBefore
                            ? webSettingsData?.currencyCode +
                              " " +
                              productDetails.discountPrice
                            : productDetails.discountPrice +
                              " " +
                              webSettingsData?.currencyCode}
                        </span>
                      ) : productDetails.actualPrice ? (
                        <span className="price">
                          {webSettingsData?.showCurrencySymbolBefore
                            ? webSettingsData?.currencyCode +
                              " " +
                              productDetails.actualPrice
                            : productDetails.actualPrice +
                              " " +
                              webSettingsData?.currencyCode}
                        </span>
                      ) : (
                        ""
                      )
                    ) : webSettingsData?.allowDiscountDisplay == "*ALL" ? (
                      productDetails.actualPrice &&
                      productDetails.discountPrice &&
                      productDetails.discountPercentage ? (
                        <span>
                          <span className='price'>
                            {webSettingsData?.showCurrencySymbolBefore
                              ? webSettingsData?.currencyCode +
                                " " +
                                productDetails.discountPrice +
                                " " +
                                productDetails.discountPercentage +
                                "%"
                              : productDetails.discountPrice +
                                " " +
                                webSettingsData?.currencyCode +
                                " " +
                                productDetails.discountPercentage +
                                "%"}
                          </span>
                          <del
                            className='price-old'
                            style={{ paddingLeft: "5px" }}
                          >
                            {webSettingsData?.showCurrencySymbolBefore
                              ? webSettingsData?.currencyCode +
                                " " +
                                productDetails.actualPrice
                              : productDetails.actualPrice +
                                " " +
                                webSettingsData?.currencyCode}
                          </del>
                        </span>
                      ) : productDetails.actualPrice &&
                        productDetails.discountPrice ? (
                        <span>
                          <span className='price'>
                            {webSettingsData?.showCurrencySymbolBefore
                              ? webSettingsData?.currencyCode +
                                " " +
                                productDetails.discountPrice
                              : productDetails.discountPrice +
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
                                productDetails.actualPrice
                              : productDetails.actualPrice +
                                " " +
                                webSettingsData?.currencyCode}
                          </del>
                        </span>
                      ) : productDetails.discountPrice ? (
                        <span className='price'>
                          {webSettingsData?.showCurrencySymbolBefore
                            ? webSettingsData?.currencyCode +
                              " " +
                              productDetails.discountPrice
                            : productDetails.discountPrice +
                              " " +
                              webSettingsData?.currencyCode}
                        </span>
                      ) : productDetails.actualPrice ? (
                        <span className='price'>
                          {webSettingsData?.showCurrencySymbolBefore
                            ? webSettingsData?.currencyCode +
                              " " +
                              productDetails.actualPrice
                            : productDetails.actualPrice +
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
                )}

                <div className="title mt-4">
                  <p>- {productDetails.itemDesc}</p>
                </div>
              </section>
              <Divider className="mt-4" />
              <section>
                {productDetails?.isMatrixBaseItem &&
                  productDetails?.matrixItemDetailList && (
                    <div>
                      <ProductMatrix
                        options={productDetails?.unitCodesDesc?.map(
                          (address: any) => {
                            return {
                              label: address.salesUnit,
                              value: address.salesUnitDesc,
                              selected: address.salesUnit,
                            };
                          }
                        )}
                        productDetails={productDetails}
                        selectProduct={selectProduct}
                        selectAttribute={selectAttribute}
                        product={product}
                        attribute={attribute}
                      />
                    </div>
                  )}
                {/* units and Quantity */}
                <div className="row">
                  <div className="col-sm-6 zero-left-padding">
                    <div className="display-flex mt-4">
                      <Units
                        labelText={t("CON_SALES_UNIT")}
                        options={productDetails?.unitCodesDesc?.map(
                          (address: any) => {
                            return {
                              label: address.salesUnit,
                              value: address.salesUnitDesc,
                              selected: address.salesUnit,
                            };
                          }
                        )}
                        onChange={onChangeUnit}
                        showLabel={true}
                        labelBold={true}
                      />
                      {console.log("productDetails123", productDetails)}
                      {!productDetails.showPriceCalculation && (
                        <DrawerModal
                          productDetails={productDetails}
                          onAddItemToCartHandler={addItemToCartHandler}
                          actualPrice={productDetails.actualPrice}
                          priceCalculator={true}
                          className="iconSecondaryColor"
                          discountPrice={productDetails?.discountPrice}
                          imageUrl={largeImageUrl}
                          productId={productDetails?.itemCode}
                          productDescription={productDetails?.itemDesc}
                          itemStandardPrice={productDetails?.itemStandardPrice}
                          salesUnit={productDetails?.unitCodesDesc?.map(
                            (address: any) => {
                              return {
                                label: address.salesUnit,
                                value: address.salesUnitDesc,
                                selected: address.salesUnit,
                              };
                            }
                          )}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-8 zero-left-padding">
                    <div className="display-flex mt-3">
                      <Quantity
                        labelBold={true}
                        showLabel={true}
                        onChange={(quantity: any) => {
                          changeQuantity(quantity);
                        }}
                      />
                      <Button
                        className="mt-4"
                        onClick={() => addItemToCartHandler()}
                        variant="solid"
                        color="primary"
                        style={{
                          width: "100%",
                          height: "45px",
                          marginTop: "20px",
                          marginLeft: "20px",
                        }}
                        disabled={
                          !productDetails?.isBuyAllowed ||
                          !webSettingsData?.buyEnabledForUser
                        }
                      >
                        <CartSVG className="secondary-icon-2 icon-lg" />
                        &nbsp; <span>{t("CON_ADD_TO_CART")}</span>
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-8 zero-left-padding">
                    <div className="display-flex mt-2">
                      <AddToList
                        onClick={() => addItemToShoppingListHandler()}
                        className="mt-2"
                      >
                        <span className="mt-4">
                          <HeartFillSVG className="mt-1 secondary-icon-1" />
                          {t("CON_ADD_TO_LIST")}
                        </span>
                      </AddToList>
                      {productDetails?.isSendEnquiryAllowed && (
                        <DrawerEnquiry className="ml-3">
                          <SendEnquiry status={enquryState} />
                          <span
                            onClick={() =>
                              setEnquryState((prevState: boolean) => !prevState)
                            }
                          >
                            <Mail />
                            &nbsp;<span>Send Enquiry</span>
                          </span>
                        </DrawerEnquiry>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </CardProductGrid>

      {/* Overview */}

      <Collapse in={true} timeout="auto" unmountOnExit>
        <CardProductGrid className="card mt-2 r-m-l r-m-r">
          <div className="container-fluid pl-0 pr-0">
            <div className="row">
              <div
                onClick={() => OpenOverview((prevState: any) => !prevState)}
                className="col-lg-12 p-4"
              >
                <h3 className="heading-details float-left">
                  {t("CON_OVERVIEW")}
                </h3>
                <span className="float-right">
                  {Overview ? (
                    <ArrowDownSVG className="primary-icon-2 icon-md" />
                  ) : (
                    <ArrowUpSVG className="primary-icon-2 icon-md" />
                  )}
                </span>
              </div>
            </div>
            <Collapse in={Overview} timeout="auto" unmountOnExit>
              <Divider />
              
              <div className="row">
                <div className="col-lg-12 pt-5 pb-5">
                  <div>
                    <p dangerouslySetInnerHTML={ {__html: productDetails?.itemWebText} }></p>
                  </div>
                  <br />
                  <div>
                    <p  dangerouslySetInnerHTML={ {__html: productDetails?.extendedItemDescription} }></p>
                  </div>
                </div>
              </div>
            </Collapse>
          </div>
        </CardProductGrid>
      </Collapse>

      {/* Specification */}

      <Collapse in={true} timeout="auto" unmountOnExit>
        <CardProductGrid className="card mt-2 r-m-l r-m-r">
          <div className="container-fluid pl-0 pr-0">
            <div className="row">
              <div
                onClick={() =>
                  OpenSpecification((prevState: any) => !prevState)
                }
                className="col-lg-12 p-4"
              >
                <h3 className="heading-details float-left">
                  {t("CON_SPECIFICATIONS")}
                </h3>
                <span className="float-right">
                  {Specification ? (
                    <ArrowDownSVG className="primary-icon-2 icon-md" />
                  ) : (
                    <ArrowUpSVG className="primary-icon-2 icon-md" />
                  )}
                </span>
              </div>
            </div>
            <Collapse in={Specification} timeout="auto" unmountOnExit>
              <Divider />

              <div className="row mt-3  pb-5">
                {productDetails?.attributeList?.map((item: any) => {
                  return (
                    <div className="col-lg-3 pl-3">
                      <div className="mt-3">
                        <label className="specificationHead">
                          {item.itemAttributeName}
                        </label>
                        <br />
                        <b className="specificationValue">
                          {item.itemAttributeValue}
                        </b>
                      </div>
                    </div>
                  );
                })}
                {productDetails?.commodityCode && (
                  <div className="col-lg-3 pl-3">
                    <div className="mt-3">
                      <label className="specificationHead">
                        {t("CON_COMMODITY_CODE")}
                      </label>
                      <br />
                      <b className="specificationValue">
                        {productDetails.commodityCode}
                      </b>
                    </div>
                  </div>
                )}
                {productDetails.showProductGrossWeight && (
                  <div className="col-lg-3 pl-3">
                    <div className="mt-3">
                      <label className="specificationHead">
                        {t("CON_GROSS_WEIGHT")}
                      </label>
                      <br />
                      <b className="specificationValue">
                        {productDetails.grossWeight}
                      </b>
                    </div>
                  </div>
                )}
                {productDetails.category1Description && (
                  <div className='col-lg-3 pl-3'>
                    <div className='mt-3'>
                      <label className='specificationHead'>
                        {t("COH_CATEGORY1")}
                      </label>
                      <br />
                      <b className='specificationValue'>
                        {productDetails.category1Description}
                      </b>
                    </div>
                  </div>
                )}
                {productDetails.category2Description && (
                  <div className='col-lg-3 pl-3'>
                    <div className='mt-3'>
                      <label className='specificationHead'>
                        {t("COH_CATEGORY2")}
                      </label>
                      <br />
                      <b className='specificationValue'>
                        {productDetails.category2Description}
                      </b>
                    </div>
                  </div>
                )}
                {productDetails.category3Description && (
                  <div className='col-lg-3 pl-3'>
                    <div className='mt-3'>
                      <label className='specificationHead'>
                        {t("COH_CATEGORY3")}
                      </label>
                      <br />
                      <b className='specificationValue'>
                        {productDetails.category3Description}
                      </b>
                    </div>
                  </div>
                )}
                {productDetails.category4Description && (
                  <div className="col-lg-3 pl-3">
                    <div className="mt-3">
                      <label className="specificationHead">
                        {t("COH_CATEGORY4")}
                      </label>
                      <br />
                      <b className="specificationValue">
                        {productDetails.category4Description}
                      </b>
                    </div>
                  </div>
                )}
                {productDetails.category5Description && (
                  <div className='col-lg-3 pl-3'>
                    <div className='mt-3'>
                      <label className='specificationHead'>
                        {t("COH_CATEGORY5")}
                      </label>
                      <br />
                      <b className='specificationValue'>
                        {productDetails.category5Description}
                      </b>
                    </div>
                  </div>
                )}
                {productDetails.category6Description && (
                  <div className='col-lg-3 pl-3'>
                    <div className='mt-3'>
                      <label className='specificationHead'>
                        {t("COH_CATEGORY6")}
                      </label>
                      <br />
                      <b className='specificationValue'>
                        {productDetails.category6Description}
                      </b>
                    </div>
                  </div>
                )}
                {productDetails.showProductNetVolume && (
                  <div className='col-lg-3 pl-3'>
                    <div className='mt-3'>
                      <label className='specificationHead'>
                        {t("CON_NET_VOLUME")}
                      </label>
                      <br />
                      <b className='specificationValue'>
                        {productDetails.netVolume}
                      </b>
                    </div>
                  </div>
                )}

                {productDetails.showProductLength && (
                  <div className='col-lg-3 pl-3'>
                    <div className='mt-3'>
                      <label className='specificationHead'>
                        {t("COH_LENGTH")}
                      </label>
                      <br />
                      <b className='specificationValue'>
                        {productDetails.length}
                      </b>
                    </div>
                  </div>
                )}

                {productDetails.showGrossVolume && (
                  <div className="col-lg-3 pl-3">
                    <div className="mt-3">
                      <label className="specificationHead">
                        {t("COH_GROSS_VOLUME")}
                      </label>
                      <br />
                      <b className="specificationValue">
                        {productDetails.grossVolume}
                      </b>
                    </div>
                  </div>
                )}
                {productDetails.showProductHeight && (
                  <div className="col-lg-3 pl-3">
                    <div className="mt-3">
                      <label className="specificationHead">
                        {t("COH_HEIGHT")}
                      </label>
                      <br />
                      <b className="specificationValue">
                        {productDetails.height}
                      </b>
                    </div>
                  </div>
                )}

                <div className="col-lg-3 pl-3">
                  <div className="mt-3">
                    <label className="specificationHead">
                      {productDetails.userDefinedNumericField1Description}
                    </label>
                    <br />
                    <b className="specificationValue">
                      {productDetails.userDefinedNumericField1}
                    </b>
                  </div>
                </div>
                {productDetails.showProductNetWeight && (
                  <div className="col-lg-3 pl-3">
                    <div className="mt-3">
                      <label className="specificationHead">
                        {t("COH_NET_WEIGHT")}
                      </label>
                      <br />
                      <b className="specificationValue">
                        {productDetails.netWeight}
                      </b>
                    </div>
                  </div>
                )}
                {productDetails.showProductWidth && (
                  <div className="col-lg-3 pl-3">
                    <div className="mt-3">
                      <label className="specificationHead">
                        {t("COH_WIDTH")}
                      </label>
                      <br />
                      <b className="specificationValue">
                        {productDetails.width}
                      </b>
                    </div>
                  </div>
                )}
              </div>
            </Collapse>
          </div>
        </CardProductGrid>
      </Collapse>

      {/* Documents */}

      <Collapse in={true} timeout="auto" unmountOnExit>
        <CardProductGrid className="card mt-2 r-m-l r-m-r">
          <div className="container-fluid pl-0 pr-0">
            <div className="row">
              <div
                onClick={() => OpenDocuments((prevState: any) => !prevState)}
                className="col-lg-12 p-4"
              >
                <h3 className="heading-details float-left">Documents</h3>
                <span className="float-right">
                  {Documents ? (
                    <ArrowDownSVG className="primary-icon-2 icon-md" />
                  ) : (
                    <ArrowUpSVG className="primary-icon-2 icon-md" />
                  )}
                </span>
              </div>
            </div>
            <Collapse in={Documents} timeout="auto" unmountOnExit>
              <Divider />

              <div className="row mt-3 document-row">
                {documentDetails()?.map((document: any) => (
                  <div className=" pl-4 mobileDoc">
                    <div className="document-details">
                      <span>
                        {document.resourceType === "TEXT_DOC" && (
                          <PdfSVG
                            className="documentIcon primary-icon-1"
                            width="50px"
                          />
                        )}
                      </span>
                      <span>
                        {document.resourceType === "BROCHURE" && (
                          <ExcelSVG
                            className="documentIcon primary-icon-1"
                            width="50px"
                          />
                        )}
                      </span>
                      <span>
                        {document.resourceType === "PDF" && (
                          <PdfSVG
                            className="documentIcon primary-icon-1"
                            width="50px"
                          />
                        )}
                      </span>

                      <br />
                      <a href={Constants.BASE_URL + document.listOfRT[0]}>
                        <label>{document.resourceListDesc[0]}</label>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </Collapse>
          </div>
        </CardProductGrid>
      </Collapse>

      {/* Warehouse Details */}

      <Collapse in={true} timeout="auto" unmountOnExit>
        {productDetails.isWarehouseDetailsShown && (
          <CardProductGrid className="card mt-2 r-m-l r-m-r">
            <div className="container-fluid pl-0 pr-0">
              <div className="row">
                <div
                  onClick={() => OpenWarehouse((prevState: any) => !prevState)}
                  className="col-lg-12 p-4"
                >
                  <h3 className="heading-details float-left">
                    {t("CON_WAREHOUSE_DETAILS")}
                  </h3>
                  <span className="float-right">
                    {Warehouse ? (
                      <ArrowDownSVG className="primary-icon-2 icon-md" />
                    ) : (
                      <ArrowUpSVG className="primary-icon-2 icon-md" />
                    )}
                  </span>
                </div>
              </div>

              <Collapse in={Warehouse} timeout="auto" unmountOnExit>
                <Divider />
                {productDetails.warehouseBeanList?.map((data: any) => {
                  return (
                    <>
                      <div className="row mt-3  pb-5">
                        <div className="col-lg-2 pl-4">
                          <div className="mt-3 ">
                            <label className="specificationHead">
                              {t("CON_WAREHOUSE_CODE")}
                            </label>
                            <br />
                            <b className="specificationValue">
                              {data.wareHouseCode}
                            </b>
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div className="mt-3 ml-5">
                            <label className="specificationHead">
                              {t("COH_DESCRIPTION")}
                            </label>
                            <br />
                            <b className="specificationValue">
                              {data.description}
                            </b>
                          </div>
                        </div>
                        <div className="col-lg-2">
                          <div className="mt-3 ml-5">
                            <label className="specificationHead">
                              {t("COH_STOCK_ON_HAND")} (EACH)
                            </label>
                            <br />
                            <b className="specificationValue">{data.onHand}</b>
                          </div>
                        </div>
                        <div className="col-lg-2">
                          <div className="mt-3 ml-5">
                            <label className="specificationHead">
                              {t("COH_AVAILABLE")} (EACH)
                            </label>
                            <br />
                            <b className="specificationValue">
                              {data.available}
                            </b>
                          </div>
                        </div>
                        <div className="col-lg-2">
                          <div className="mt-3 ml-5">
                            <label className="specificationHead">
                              {t("CON_AVAILABLE_DATE")}
                            </label>
                            <br />
                            <b className="specificationValue">
                              {data.availabilityDate}
                            </b>
                          </div>
                        </div>
                      </div>
                      <Divider />
                    </>
                  );
                })}
              </Collapse>
            </div>
          </CardProductGrid>
        )}
      </Collapse>

      {/* Catalog */}

      <Collapse in={true} timeout="auto" unmountOnExit>
        <CardProductGrid className="card mt-2 r-m-l r-m-r r-m-b">
          <div className="container-fluid pl-0 pr-0">
            <div className="row">
              <div
                onClick={() => OpenCatalog((prevState: any) => !prevState)}
                className="col-lg-12 p-4"
              >
                <h3 className="heading-details float-left">
                  {t("TXT_PAGE_TITLE_CATALOG")}
                </h3>
                <span className="float-right">
                  {Catalog ? (
                    <ArrowDownSVG className="primary-icon-2 icon-md" />
                  ) : (
                    <ArrowUpSVG className="primary-icon-2 icon-md" />
                  )}
                </span>
              </div>
            </div>
            <Collapse in={Catalog} timeout="auto" unmountOnExit>
              <Divider />
              <div className="row">
                <div className="col-lg-12">
                  {productDetails.catalogueBeanList?.map((catelog: any) => {
                    const newValue = catelog.subCatalogueBeanList[0];
                    return (
                      <>
                        <p>
                          <span>
                            {newValue && (
                              <CatalogLink
                                onClick={() =>
                                  OpenCatalogPage(
                                    newValue.catalogueCode,
                                    newValue.elementCode
                                  )
                                }
                              >
                                {newValue?.description}

                                <RightSVG className="primary-icon-1 icon-md" />
                              </CatalogLink>
                            )}
                          </span>

                          <span className="catalog-links">
                            {newValue?.subCatalogueBeanList[0] && (
                              <CatalogLink
                                onClick={() =>
                                  OpenCatalogPage(
                                    newValue.subCatalogueBeanList[0]?.catalogueCode,
                                    newValue.subCatalogueBeanList[0]?.elementCode
                                  )
                                }
                              >
                                {newValue?.subCatalogueBeanList[0]?.description}

                                <RightSVG className="primary-icon-1 icon-md" />
                              </CatalogLink>
                            )}
                          </span>

                          <span>
                            {newValue?.subCatalogueBeanList[0]
                              ?.subCatalogueBeanList[0] && (
                              <CatalogLink
                                onClick={() =>
                                  OpenCatalogPage(
                                    newValue.subCatalogueBeanList[0]
                                    ?.subCatalogueBeanList[0]?.catalogueCode,
                                    newValue.subCatalogueBeanList[0]
                                    ?.subCatalogueBeanList[0]?.elementCode
                                  )
                                }
                                className="catalog-links"
                              >
                                {
                                  newValue?.subCatalogueBeanList[0]
                                    ?.subCatalogueBeanList[0]?.description
                                }
                                <RightSVG className="primary-icon-1 icon-md" />
                              </CatalogLink>
                            )}
                          </span>

                          <span>
                            {newValue?.subCatalogueBeanList[0]
                              ?.subCatalogueBeanList[0]
                              ?.subCatalogueBeanList[0] && (
                              <CatalogLink
                                onClick={() =>
                                  OpenCatalogPage(
                                    newValue?.subCatalogueBeanList[0]
                                    ?.subCatalogueBeanList[0]
                                    ?.subCatalogueBeanList[0]?.catalogueCode,
                                    newValue?.subCatalogueBeanList[0]
                                    ?.subCatalogueBeanList[0]
                                    ?.subCatalogueBeanList[0]?.elementCode
                                  )
                                }
                                className="catalog-links"
                              >
                                {
                                  newValue?.subCatalogueBeanList[0]
                                    ?.subCatalogueBeanList[0]
                                    ?.subCatalogueBeanList[0]?.description
                                }
                                <RightSVG className="primary-icon-1 icon-md" />
                              </CatalogLink>
                            )}
                          </span>

                          <span>
                            {newValue?.subCatalogueBeanList[0]
                              ?.subCatalogueBeanList[0]?.subCatalogueBeanList[0]
                              ?.subCatalogueBeanList[0] && (
                              <CatalogLink
                                onClick={() =>
                                  OpenCatalogPage(
                                    newValue?.subCatalogueBeanList[0]
                                    ?.subCatalogueBeanList[0]
                                    ?.subCatalogueBeanList[0]
                                    ?.subCatalogueBeanList[0]?.catalogueCode,
                                    newValue?.subCatalogueBeanList[0]
                                    ?.subCatalogueBeanList[0]
                                    ?.subCatalogueBeanList[0]
                                    ?.subCatalogueBeanList[0]?.elementCode
                                  )
                                }
                                className="catalog-links"
                              >
                                {" "}
                                {
                                  newValue?.subCatalogueBeanList[0]
                                    ?.subCatalogueBeanList[0]
                                    ?.subCatalogueBeanList[0]
                                    ?.subCatalogueBeanList[0]?.description
                                }
                                <RightSVG className="primary-icon-1 icon-md" />
                              </CatalogLink>
                            )}
                          </span>
                        </p>
                      </>
                    );
                  })}
                </div>
              </div>
            </Collapse>
          </div>
        </CardProductGrid>
      </Collapse>
      {productDetails?.componentBeans?.length > 0 ? (
        <YouMayLikeCarousel
          items={productDetails.componentBeans}
          title="COH_COMPONENT"
        />
      ) : (
        ""
      )}
      <YouMayLike page="ProductDetails" itemCode={productCode} />
    </React.Fragment>
  );
};

export default ProductDetails;
