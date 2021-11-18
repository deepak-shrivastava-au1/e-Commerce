import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  productsCompareListSelector,
  compareProducts,
} from "@slices/Products/productCompare";
import { useGetLoggedInUserInfo } from "@hooks";
import { useEffect } from "react";
import styled from "styled-components";
import { BASE_URL_IMAGE } from "@routers/AppRoute";
import Button from "@common/Button";
import { CartSVG, HeartSVG, Compare } from "@icons";
import { useTranslation } from "react-i18next";
import "./ProductCompare.scss";
import { Close } from "@icons";
import LoadingOverlay from "@common/LoadingOverlay";
import { useLocation, useParams } from "react-router-dom";
import { COMPARE, DETAILS, PRODUCTS } from "@constants/Routes";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@material-ui/core";
import { breakpoints } from "@constants/styled-components";
import { useHistory } from "react-router-dom";
import Units from "@common/Units";
import Quantity from "@common/Quantity";
import { addToCart } from "@actions/cart/addToCart";
import { addItemInShoppingList } from "@actions/shoppingList/addItemsToShoppingList";
import Modal_ from "@common/Modal";
import altImage from "../../assets/images/awaited_image.png";
import AddItemToCart from "@pages/Cart/ShoppingCart/AddItemToCart";
import AddItemToShoppingList from "@pages/shoppingList/AddItemToShoppingList";
import { addToCartSelector } from "@slices/cart/addToCart";
import { addToShoppingListSelector } from "@slices/shoppingList/addToShoppingList";
const CardProductCompare = styled.figure`
  margin-bottom: 1px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 8px;
  position: relative;
`;
const CompareImage = styled.img`
  height: 160px;
  width: auto;
`;
const ProductCompare = () => {
  const isMobile = useMediaQuery(`(max-width:${breakpoints.sm})`);
  const compareData = useSelector(productsCompareListSelector);
  const addedToCart = useSelector(addToCartSelector);
  const addedToList = useSelector(addToShoppingListSelector);
  const sessionId = useGetLoggedInUserInfo();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [loader, setLoader] = useState<boolean>(false);
  const [error, setError] = useState(0);
  const history = useHistory();
  let location = useLocation();
  var productCode = location.pathname.split("/");
  const [showAddToCart, setShowAddToCart] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [itemCodeArray, setItemCodeArray] = useState([
    productCode[2],
    productCode[3],
    `${productCode[4] ? productCode[4] : "NA"}`,
    `${productCode[5] ? productCode[5] : "NA"}`,
  ]);

  // console.log("itemCodeArray", itemCodeArray.length)
  // console.log("itemCodeArray", itemCodeArray[2])
  const [productList, setProductList] = useState(
    compareData.compareDetails?.map((item: any) => {
      const unit = item?.defaultSalesUnit;
      return {
        key: item?.code,
        quantity: 1,
        unit: unit,
      };
    })
  );

  console.log("compare Data is", itemCodeArray.filter((items:any) => items !== "NA"));
  console.log(compareData);
  console.log(productList);

  const quantityChangeHandler = (quantity: number, index: number) => {
    setProductList((prevState: any) => {
      const copyShowUnit = prevState ? [...prevState] : [{}];
      copyShowUnit[index] = { ...copyShowUnit[index], quantity: quantity };
      return copyShowUnit;
    });
  };
  const unitChangeHandler = (unit: string, index: number) => {
    setProductList((prevState: any) => {
      const copyShowUnit = prevState ? [...prevState] : [{}];
      copyShowUnit[index] = { ...copyShowUnit[index], unit: unit };
      return copyShowUnit;
    });
  };

  useEffect(() => {
    // if(itemCodeArray.length === 4){
    //   var newCodeList = itemCodeArray.pop()
    //   var newCodeList = itemCodeArray.pop()
    //   console.log("itemCodeArray2",itemCodeArray )
    // }
    if (itemCodeArray?.length > 1 && sessionId?.sessionId) {
      setLoader(true);
      dispatch(compareProducts(itemCodeArray.filter((items:any) => items !== "NA"), sessionId?.sessionId));
    }
  }, [sessionId?.sessionId, itemCodeArray, dispatch]);

  useEffect(() => {
    if (compareData.isCompleted) {
      setLoader(false);
    }
  }, [compareData.isCompleted]);

  useEffect(() => {
    setProductList(
      compareData.compareDetails?.map((item: any) => {
        const unit = item?.defaultSalesUnit;
        return {
          key: item?.code,
          quantity: 1,
          unit: unit,
        };
      })
    );
  }, [compareData.compareDetails]);

  const deleteCompareProduct = (itemCode: any) => {
    if (!isMobile && itemCodeArray.filter((items:any) => items !== "NA").length > 2) {
      let newArray = itemCodeArray.filter((item: any) => item !== itemCode);
      setItemCodeArray(newArray);

      history.push(
        `${COMPARE}/${newArray[0] ? "/" + newArray[0] : ""}${
          newArray[1] ? "/" + newArray[1] : ""
        }${newArray[2] ? "/" + newArray[2] : ""}${
          newArray[3] ? "/" + newArray[3] : ""
        }`
      );
    } else {
      // setIsOpen(true);
      // history.push(PRODUCTS);
      history.goBack()
      console.log("history", history)
    }
  };
  useEffect(() => {
    if (addedToCart.isCompleted) {
      setLoader(false);
    }
  }, [addedToCart.isCompleted]);

  const addItemToCartHandler = (itemCode: string, i: number) => {
    const itemDataToDispatch = {
      itemCode: itemCode,
      itemQty: productList[i]?.quantity,
      unitCode: productList[i]?.unit,
    };

    setLoader(true);
    dispatch(addToCart(sessionId?.sessionId, itemDataToDispatch));
    setShowAddToCart(true);
  };

  useEffect(() => {
    if (addedToList.isCompleted) {
      setLoader(false);
    }
  }, [addedToList.isCompleted]);

  const addItemToShoppingListHandler = (itemCode: string, i: number) => {
    const itemDataToDispatch = [
      {
        itemCode: itemCode,
        unitCode: productList[i]?.unit,
        quantity: productList[i]?.quantity,
      },
    ];
    setLoader(true);
    dispatch(addItemInShoppingList(sessionId?.sessionId, itemDataToDispatch));
  };
  const tableAttributeData = () => {
    let firstCol: any = [];
    compareData.compareDetails?.map((items: any) =>
      items?.itemAttributesList?.map((product: any) =>
        firstCol.push(product?.itemAttributeName)
      )
    );
    firstCol = firstCol.filter(function (item: any, pos: any) {
      return firstCol.indexOf(item) === pos;
    });
    return firstCol;
  };

  return (
    <React.Fragment>
      <LoadingOverlay active={loader} />
      {isMobile && <div className='pb-1'></div>}
      <CardProductCompare
        style={{ marginTop: `${isMobile ? "150px" : "100px"}` }}
        className='card ml-3 mr-3'
      >
        <div className='container-fluid'>
          <div className='row pl-0 pr-0'>
            <div className='col-lg-12 pl-0 pr-0'>
              {isMobile && (
                <div className='totalItemstoCompare pt-3 pb-3'>
                  <p>{t("CON_PRODUCT_COMPARE")}</p>
                </div>
              )}
              <div className='sticky-table'>
                <div className=''>
                  <table className='table table-striped compare_table'>
                    <thead>
                      <tr>
                        {!isMobile && (
                          <th
                            className='totalItemstoCompare align-middle'
                            scope='col'
                          >
                            <p>
                              Compare
                            </p>
                          </th>
                        )}
                        {compareData.compareDetails?.map((product: any) => {
                          return (
                            <th className=''>
                              <div className='d-flex flex-column pr-2 pl-2'>
                                <div className=''>
                                  <div
                                    onClick={() =>
                                      deleteCompareProduct(product?.code)
                                    }
                                    className='float-right compare_closeIcon'
                                  >
                                    <Close className='primary-icon-1' />
                                  </div>
                                </div>
                                <div>
                                  <div className='compareImage'>
                                    <CompareImage
                                      className='img-fluid mx-auto d-block'
                                      src={BASE_URL_IMAGE + product?.imageUrl}
                                      onError={(e: any) => {
                                        e.target.onerror = null;
                                        e.target.src = altImage;
                                      }}
                                      alt={altImage}
                                    />
                                  </div>
                                </div>
                                <div>
                                  <p className='compare_description'>
                                    {product?.description}
                                  </p>
                                  <p>
                                    {product?.currencyCode}
                                    {product?.actualPrice}
                                  </p>
                                </div>
                              </div>
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {!isMobile && <td>{t("COH_DESCRIPTION")}</td>}
                        {compareData.compareDetails?.map((product: any) => {
                          return (
                            <td className='colm'>
                              {isMobile && <p>{t("COH_DESCRIPTION")}</p>}
                              <p className='product-compare-details'>
                                <Link
                                  to={`${DETAILS}/${encodeURIComponent(
                                    product?.code
                                  )}`}
                                >
                                  {product?.description}
                                </Link>
                              </p>
                            </td>
                          );
                        })}
                      </tr>
                      <tr>
                        {!isMobile && <td>{t("COH_PRODUCT_CODE")}</td>}
                        {compareData.compareDetails?.map((product: any) => {
                          return (
                            <td className='colm'>
                              {isMobile && <p>{t("COH_PRODUCT_CODE")}</p>}
                              <p className='product-compare-details'>
                                <Link
                                  to={`${DETAILS}/${encodeURIComponent(
                                    product?.code
                                  )}`}
                                >
                                  {product?.code}
                                </Link>
                              </p>
                            </td>
                          );
                        })}
                      </tr>

                      <tr>
                        {!isMobile && <td>{t("CON_ALTERNATIVE")}</td>}
                        {compareData.compareDetails?.map((product: any) => {
                          return (
                            <td>
                              {isMobile && <p>{t("CON_ALTERNATIVE")}</p>}
                              <p className='product-compare-details'>
                                {product?.Alternative}
                              </p>
                            </td>
                          );
                        })}
                      </tr>
                      <tr>
                        {!isMobile && <td>{t("COH_ACTUAL_PRICE")}</td>}
                        {compareData.compareDetails?.map((product: any) => {
                          return (
                            <td>
                              {isMobile && <p>{t("COH_ACTUAL_PRICE")}</p>}
                              <p className='product-compare-details'>
                                {product?.actualPrice}
                              </p>
                            </td>
                          );
                        })}
                      </tr>

                      <tr>
                        {!isMobile && <td>{t("COH_DISCOUNT_PRICE")}</td>}
                        {compareData.compareDetails?.map((product: any) => {
                          return (
                            <td>
                              {isMobile && <p>{t("COH_DISCOUNT_PRICE")}</p>}
                              <p className='product-compare-details'>
                                {product?.discountPrice}
                              </p>
                            </td>
                          );
                        })}
                      </tr>

                      <tr>
                        {!isMobile && <td>{t("CON_DISCOUNT_%")}</td>}
                        {compareData.compareDetails?.map((product: any) => {
                          return (
                            <td>
                              {isMobile && <p>{t("CON_DISCOUNT_%")}</p>}
                              <p className='product-compare-details'>
                                {product?.discountPercentage}
                              </p>
                            </td>
                          );
                        })}
                      </tr>
                      <tr>
                        {!isMobile && <td>{t("CON_DEFAULT_SALES_UNIT")}</td>}
                        {compareData.compareDetails?.map((product: any) => {
                          return (
                            <td>
                              {isMobile && <p>{t("CON_DEFAULT_SALES_UNIT")}</p>}
                              <p className='product-compare-details'>
                                {product?.defaultSalesUnitDesc}
                              </p>
                            </td>
                          );
                        })}
                      </tr>

                      {tableAttributeData().map(
                        (firstCol: any, index: number) => (
                          <tr>
                            {!isMobile && <td>{firstCol}</td>}

                            {compareData.compareDetails?.map((items: any) => (
                              <>
                                {items?.itemAttributesList?.length && (
                                  <>
                                    {items.itemAttributesList?.map(
                                      (product: any, i: number) => (
                                        <>
                                          {console.log(
                                            "checking",
                                            firstCol,
                                            product?.itemAttributeName
                                          )}
                                          {firstCol ===
                                          product?.itemAttributeName ? (
                                            <td className='colm'>
                                              {isMobile && (
                                                <p>
                                                  {product?.itemAttributeName}
                                                </p>
                                              )}
                                              <p className='product-compare-details'>
                                                {product?.itemAttributeValue}
                                              </p>
                                            </td>
                                          ) : (
                                            ""
                                          )}
                                        </>
                                      )
                                    )}
                                  </>
                                )}
                              </>
                            ))}
                          </tr>
                        )
                      )}

                      <tr>
                        {!isMobile && <td></td>}
                        {compareData.compareDetails?.map(
                          (product: any, i: number) => {
                            return (
                              <td>
                                <div className={`${!isMobile ? "d-flex" : ""}`}>
                                  {product?.salesUnitsDesc && (
                                    <div>
                                      <Units
                                        labelText={t("CON_SALES_UNIT")}
                                        onChange={(selectedUnit: any) => {
                                          unitChangeHandler(selectedUnit, i);
                                        }}
                                        options={product?.salesUnitsDesc.map(
                                          (address: any) => {
                                            return {
                                              label: address.salesUnit,
                                              value: address.salesUnitDesc,
                                              selected:
                                                address.salesUnit ===
                                                product.defaultSalesUnit,
                                            };
                                          }
                                        )}
                                        showLabel={false}
                                      />
                                    </div>
                                  )}

                                  <div>
                                    <Quantity
                                      showLabel={false}
                                      quantity={productList[i]?.quantity}
                                      onChange={(e: any) => {
                                        quantityChangeHandler(e, i);
                                      }}
                                    />
                                  </div>
                                </div>
                              </td>
                            );
                          }
                        )}
                      </tr>

                      <tr>
                        {!isMobile && <td></td>}
                        {compareData.compareDetails?.map(
                          (product: any, i: number) => {
                            return (
                              <td>
                                <Button
                                  variant='solid'
                                  color='primary'
                                  style={{ width: "auto" }}
                                  disabled={!product?.isBuyingAllowed}
                                  onClick={() =>
                                    addItemToCartHandler(product.code, i)
                                  }
                                >
                                  <CartSVG
                                    className={`${
                                      isMobile
                                        ? "secondary-icon-2"
                                        : "secondary-icon-2 pb-1"
                                    }`}
                                  />
                                  &emsp;
                                  {!isMobile && (
                                    <span>{t("CON_ADD_TO_CART")}</span>
                                  )}
                                </Button>
                                <HeartSVG
                                  onClick={() => {
                                    addItemToShoppingListHandler(
                                      product?.code,
                                      i
                                    );
                                  }}
                                  className='iconSecondaryColor'
                                />
                              </td>
                            );
                          }
                        )}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardProductCompare>
      <Modal_
        isAlert
        title='Alert'
        message={t("Minimum 2 Products are needed to compare")}
        isOpen={isOpen}
        hasCancelButton={false}
        secondaryActionText={"ok"}
        onSecondaryButtonClick={() => {
          setIsOpen(false);
        }}
      />
      <AddItemToCart status={showAddToCart} onClose={setShowAddToCart} />
      <AddItemToShoppingList />
    </React.Fragment>
  );
};

export default ProductCompare;
