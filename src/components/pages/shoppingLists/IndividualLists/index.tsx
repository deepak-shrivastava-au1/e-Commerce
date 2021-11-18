import Button from "@common/Button";
import {
  AddSVG,
  CartSVG,
  SubmitRequest,
  Badge as BadgeSVG,
  TrashForModalSVG,
  NoData,
  Close,
  RefreshSaveSVG,
  PreviousArrow,
  RightSVG,
  LeftSVG,
} from "@icons";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { ShoppingListsContext } from "../CtxProvider";
import {
  fetchGetShoppingListLineDetails,
  getShoppingListLineDetailsSuccess,
  initializeShoppingListLineDetailsLoader,
  shoppingListLineDetailsSelector,
} from "@slices/shoppingLists/getShoppingListLineDetails";
import { useSelector } from "react-redux";
import { alignCenter, respondTo } from "@utilities/styled-components";
import { BASE_URL_IMAGE } from "@routers/AppRoute";
import altImage from "@images/awaited_image.png";
import { Link } from "react-router-dom";
import { DETAILS } from "@constants/Routes";
import Modal from "@common/Modal";
import LoadingOverlay from "@common/LoadingOverlay";
import { cssVar, rgba } from "polished";
import Quantity from "@common/Quantity";
import Select from "@common/Select";
import {
  fetchSaveShoppingListLines,
  initializeSaveShoppingListLinesLoader,
  saveShoppingListLinesSelector,
} from "@slices/shoppingLists/SaveShoppingListLines";
import ProductSearch from "./ProductSearch";
import {
  deleteShoppingListLinesSelector,
  fetchDeleteShoppingListLines,
  initializeDeleteShoppingListLinesLoader,
} from "@slices/shoppingLists/deleteShoppingListLines";
import { addToCart } from "@actions/cart/addToCart";
import AddItemToCart from "@pages/Cart/ShoppingCart/AddItemToCart";
import { fetchwebSettings } from "@slices/webSettings";
import ShoppingListsPDF from "../Exports/PDF";
import ShoppingListsExcel from "../Exports/Excel";
import clsx from "clsx";
import ScrollToTop from "@common/ScrollToTop";
import { getproductsSuccess } from "@slices/Products/productSearch";
import { addToCartSelector } from "@slices/cart/addToCart";
import {
  cartSelector,
  initializeCartLoader,
  setLoading,
} from "@slices/cart/getTemporaryOrderData";
import { setMessageCode } from "@slices/shoppingLists/getShoppingListSearchDetails";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 24px;
  width: 100%;

  ${respondTo.xs`
    margin-left:0;
  `}

  ${respondTo.sm`
    margin-left:0px;
  `}

  .exports_container {
    display: flex;
    justify-content: flex-end;
  }
  .head_title {
    font-size: calc(var(--base-font-size) - 2px);
    color: var(--primary-color-3);
  }
`;
const TitleHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${respondTo.xs`
    padding:10px;
  `}

  ${respondTo.sm`
   padding:0;
  `}
`;
const Title = styled.div`
  display: flex;
  color: var(--primary-color-2);
  align-items: center;

  .list_id {
    font-size: calc(var(--base-font-size) + 10px);
    font-weight: var(--font-weight-bold);
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  margin-top: 17px;

  ${respondTo.xs`
    padding:10px;
  `}

  ${respondTo.sm`
   padding:0;
  `}

  .title {
    font-weight: var(--font-weight-bold);
    font-size: calc(var(--base-font-size) + 12px);
  }
`;
const CardRow = styled.div`
  .plus,
  .minus {
    padding: 0;
  }
  ${respondTo.xs`
    >:not(:last-child){
      margin-bottom:8px;
    }
  `}

  ${respondTo.sm`
    >:not(:last-child){
      margin-bottom:0;
    }
  `}
`;
const ItemDetails = styled.span`
  display: flex;

  ${respondTo.sm`
    width: 30%;
  `}
  .brand {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-left: 8px;
    /* padding: 5px; */

    &__code {
      font-size: calc(var(--base-font-size) - 2px);
      color: var(--primary-color-3);
    }

    &__name {
      text-transform: uppercase;
      /* width */
    }

    &__price {
      margin-top: 4px;
      font-weight: var(--font-weight-medium);
    }

    &__actions {
      display: flex;
      font-size: calc(var(--base-font-size) - 2px);
      margin-top: 12px;

      &__delete {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
`;
const ImageWrapper = styled.div`
  ${alignCenter}
  padding:5px;
  width: 60px;
  height: 60px;
  border: var(--thin-border) var(--form-base-color);
  border-radius: var(--border-radius);

  > img {
    object-fit: cover;
    width: 100%;
  }
`;
const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  > :not(:last-child) {
    margin-right: 21px;
  }

  ${respondTo.xs`
    margin-top:9px;
    justify-content: flex-start;
  `}

  ${respondTo.sm`
    margin-top:0;
    justify-content: center;
  `}
`;
const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;

  > :not(:last-child) {
    margin-bottom: 6px;
  }

  .box {
    display: flex;
    align-items: center;
  }

  label {
    font-size: calc(var(--base-font-size) + 2px);
    font-weight: var(--font-weight-medium);
    color: var(--primary-color-2);
    line-height: 24px;
  }

  .label {
    color: var(--primary-color-4);
    font-size: calc(var(--base-font-size) - 2px);
  }
  .value {
    margin-left: 5px;
  }

  .edit_svg {
    position: absolute;
    left: 0;
    margin-left: 60%;
  }
`;
const Badge = styled.span`
  display: flex;
  align-items: center;
  border-radius: 22px;
  background-color: var(--white);
  line-height: 16.34px;
  padding: 4px 8px;
  color: var(--primary-color-3);
  margin-left: 6px;
  font-size: calc(var(--base-font-size) - 2px);
`;
const PaginationContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  ${respondTo.xs`
    padding:10px;
  `}

  ${respondTo.sm`
   padding:0;
  `}

  >:not(:last-child) {
    margin-right: 3px;
  }

  .default {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 32px;
    height: 32px;
    background-color: var(--white);
    border-radius: var(--border-radius);
    margin-left: 8px;
    line-height: 32px;
    border: 1px solid var(--gray-4);
  }
  .disable {
    opacity: var(--low-opacity);
    pointer-events: none;
  }
  .icon-color {
    stroke: var(--primary-icon-4);
    fill: var(--primary-icon-4);
    width: 25px;
  }
`;

function IndividualLists() {
  const { t, dispatch, isMobile, userInfo, webSettings } =
    useContext(ShoppingListsContext);

  const query: any = useParams();

  const { messageCode } = useSelector(addToCartSelector);

  const [shoppingLineDetails, setShoppingLineDetails] = useState<
    Array<{
      discountPrice: string;
      discountPercentage: string;
      imageURL: string;
      deleteDialogStatus: boolean;
      editStatus: { quantity: boolean; unit: boolean };
      lineNumber: string;
      salesUnitsDesc: Array<{ salesUnit: string; salesUnitDesc: string }>;
      description: string;
      actualPrice: string;
      isBuyingAllowed: boolean;
      code: string;
      updatedUnit: string;
      updatedQuantity: number;
    }>
  >([]);

  const [toggleProductSearchDrawer, setToggleProductSearchDrawer] =
    useState(false);

  const { loading: isSaveShoppingListLoading } = useSelector(
    saveShoppingListLinesSelector
  );

  const { loading: isDeleteShoppingListLinesLoding } = useSelector(
    deleteShoppingListLinesSelector
  );

  const {
    data: shoppingListLineDetails,
    loading: isShoppingListLineDetailsLoading,
  } = useSelector(shoppingListLineDetailsSelector);

  const [addToCartStatus, setAddToCartStatus] = useState(false);

  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    dispatch(fetchwebSettings(userInfo?.userName, userInfo?.sessionId));

    return () => {
      dispatch(getproductsSuccess([]));
    };
  }, []);

  // Hook to revert loading state to falsy upon failure on adding item to cart
  useEffect(() => {
    if (messageCode !== 0 || messageCode !== null) {
      dispatch(setLoading(false));
    }
  }, [messageCode]);

  useEffect(() => {
    // check if list ID exist in href path
    if (query?.listid) {
      dispatch(initializeShoppingListLineDetailsLoader());
      dispatch(
        fetchGetShoppingListLineDetails(userInfo?.sessionId, {
          ListId: query?.listid,
          ListOwnerCode: userInfo?.userID,
          PageNo: pageNo,
        })
      );
    } else if (userInfo?.userID) {
      // if(webSettings?.defaultShoppingListId.length===0){
      //   history.push(SHOPPINGLISTS)
      // }
      dispatch(initializeShoppingListLineDetailsLoader());

      dispatch(
        fetchGetShoppingListLineDetails(userInfo?.sessionId, {
          ListId: webSettings?.defaultShoppingListId,
          ListOwnerCode: userInfo?.userID,
          PageNo: pageNo,
        })
      );
    }
  }, [pageNo, userInfo?.userID, webSettings?.defaultShoppingListId]);

  useEffect(() => {
    if (shoppingListLineDetails?.length === 0) {
      setShoppingLineDetails([]);
    }
    if (shoppingListLineDetails?.listOfLine?.length > 0) {
      setShoppingLineDetails(() => {
        return shoppingListLineDetails.listOfLine.map((line: any) => {
          return {
            code: line?.code,
            actualPrice: line?.actualPrice,
            description: line?.description,
            isBuyingAllowed: line?.isBuyingAllowed,
            editStatus: { quantity: false, unit: false },
            updatedUnit: line?.defaultSalesUnit,
            discountPrice: line?.discountPrice,
            discountPercentage: line?.discountPercentage,
            updatedQuantity: line?.quantity,
            imageURL: line?.imageURL,
            lineNumber: line?.lineNumber,
            salesUnitsDesc: line?.salesUnitsDesc,
          };
        });
      });
    }
  }, [shoppingListLineDetails]);

  const listId = query?.listid
    ? query?.listid
    : webSettings?.defaultShoppingListId;

  return (
    <MainContainer>
      <ScrollToTop />

      <AddItemToCart status={addToCartStatus} onClose={setAddToCartStatus} />

      <LoadingOverlay
        active={
          isShoppingListLineDetailsLoading ||
          isSaveShoppingListLoading ||
          isDeleteShoppingListLinesLoding
        }
      />

      <TitleHeader>
        <Title>
          <p className='list_id'>{listId}</p>
          {listId === webSettings?.defaultShoppingListId ? (
            <Badge>
              {" "}
              <BadgeSVG width='15px' height='15px' /> {t("COH_DEFAULT_ADDRESS")}{" "}
            </Badge>
          ) : null}
        </Title>

        <div className='exports_container'>
          {webSettings?.showPdfIcon &&
          shoppingListLineDetails?.listOfLine?.length > 0 ? (
            <ShoppingListsPDF {...{ shoppingListLineDetails }} />
          ) : null}
          {webSettings?.showExcelIcon &&
          shoppingListLineDetails?.listOfLine?.length > 0 ? (
            <ShoppingListsExcel {...{ shoppingListLineDetails }} />
          ) : null}
          {/* {webSettings?.showXmlIcon ? <XmlSVG className="primary-icon-2 icon-lg" style={{ marginLeft: '21px' }} /> : null} */}
        </div>
      </TitleHeader>

      <Header>
        <Button
          variant='solid'
          color='critical'
          onClick={() => setToggleProductSearchDrawer(true)}
        >
          <AddSVG width='1.3em' height='1.3em' className='icon' />{" "}
          <span> {t("CON_ADD_PRODUCTS")} </span>
        </Button>
        <PaginationContainer>
          {/* First page */}
          <a
            className={clsx("default", {
              disable:
                pageNo > 1
                  ? false
                  : true ||
                    !shoppingListLineDetails?.moreRecords ||
                    pageNo === 1,
            })}
            title={t("CON_FIRST_PAGE")}
            onClick={() => setPageNo(1)}
          >
            <PreviousArrow className='icon-color' />
          </a>
          {/* Previous page */}
          <a
            className={clsx("default", {
              disable:
                pageNo > 1
                  ? false
                  : true ||
                    !shoppingListLineDetails?.moreRecords ||
                    pageNo === 1,
            })}
            onClick={() => setPageNo((prevState) => prevState - 1)}
            title={t("CON_PREVIOUS_PAGE")}
          >
            <LeftSVG className='icon-color' />
          </a>

          {/* Next Page */}
          <a
            className={clsx("default", {
              disable: !shoppingListLineDetails?.moreRecords,
            })}
            onClick={() => setPageNo((prevState) => prevState + 1)}
            title={t("CON_NEXT")}
          >
            <RightSVG className='icon-color' />
          </a>
        </PaginationContainer>
      </Header>

      {/* Toggle drawer for product search */}

      <ProductSearch
        listId={listId}
        status={toggleProductSearchDrawer}
        handleStatus={setToggleProductSearchDrawer}
      />

      <div className='card-table'>
        {/* Shopping List Head */}
        <div className='card-thead'>
          <div className='row'>
            <div className='col head_title'>
              {t("TXT_PAGE_TITLE_PRODUCT_DETAIL")}
            </div>
            <div className='col head_title'>
              {t("CON_PRICE")} ({webSettings?.currencyCode})
            </div>
            <div className='col head_title'>{t("CON_QUANTITY")}</div>
            <div className='col head_title d-flex flex-row justify-content-center'>
              {t("CON_ACTION")}
            </div>
          </div>
        </div>
        {/* Shopping List Body */}
        <div className='card-tbody'>
          {/* Render if no shopping list exist for current list ID */}
          {shoppingLineDetails?.length === 0 ? (
            <div className='d-flex flex-column justify-content-center align-items-center mt-10'>
              <NoData className='primary-icon-1' />
              <span>{t("CON_NO_DATA_FOUND")}</span>
            </div>
          ) : null}
          {/* Render if shopping list does exist for current list ID */}
          {shoppingLineDetails.map((line, i: number) => (
            <CardRow
              className='row p-l-5'
              key={`${line?.code}${i}${line?.lineNumber}`}
            >
              <ItemDetails className='col'>
                <div className='d-flex'>
                  {/* Item Image */}
                  <ImageWrapper>
                    <img
                      src={`${BASE_URL_IMAGE}${line?.imageURL}`}
                      alt='cartItemImg'
                      onError={(e: any) => {
                        e.target.onerror = null;
                        e.target.src = altImage;
                      }}
                    />
                  </ImageWrapper>
                  {/* Item Details */}
                  <div className='brand'>
                    {/* Item Name */}
                    <Link
                      to={`${DETAILS}/${line?.code}`}
                      style={{ color: "inherit" }}
                    >
                      <span className='brand__name'>{line?.description}</span>
                    </Link>
                    {/* Item Code */}
                    <p className='brand__code'>{line?.code}</p>
                    {/* Item Actions */}
                    <div className='brand__actions'>
                      <Modal
                        isAlert
                        icon={<TrashForModalSVG className='primary-icon-1' />}
                        title={`Want to Delete ?`}
                        message='Are you sure you want to delete this ?'
                        isOpen={line?.deleteDialogStatus}
                        onRequestClose={() => {
                          setShoppingLineDetails((prevState) => {
                            const copiedArr = [...prevState];
                            copiedArr[i].deleteDialogStatus = false;
                            return copiedArr;
                          });
                        }}
                        onSecondaryButtonClick={() => {
                          dispatch(initializeDeleteShoppingListLinesLoader());
                          dispatch(
                            fetchDeleteShoppingListLines(userInfo?.sessionId, {
                              ListId: listId,
                              ListOwnerCode: userInfo?.userID,
                              lineToDelete: [
                                {
                                  itemCode: shoppingLineDetails[i].code,
                                  quantity:
                                    shoppingLineDetails[i].updatedQuantity,
                                },
                              ],
                            })
                          );

                          setTimeout(() => {
                            setShoppingLineDetails((prevState) => {
                              const copiedArr = [...prevState];
                              copiedArr[i].deleteDialogStatus = false;
                              return copiedArr;
                            });
                          }, 300);
                        }}
                        secondaryActionText={t("CON_DELETE")}
                      />
                      {/* Delete Action */}
                      <span
                        className='brand__actions__delete'
                        onClick={() => {
                          setShoppingLineDetails((prevState) => {
                            const copiedArr = [...prevState];
                            copiedArr[i].deleteDialogStatus = true;
                            return copiedArr;
                          });
                        }}
                      >
                        {t("CON_DELETE")}
                      </span>
                    </div>
                  </div>
                </div>
              </ItemDetails>
              <div className='col'>
                {isMobile && (
                  <label className='label-text'>{t("CON_PRICE")}</label>
                )}
                <PriceContainer>
                  <div className='box'>
                    <span className='label'>{t("COH_ACTUAL_PRICE")}</span>
                    <span className='value'>
                      {webSettings?.allowDiscountDisplay == "*ALL" ||
                      webSettings?.allowDiscountDisplay == "*ALL_PRICE" ||
                      webSettings?.allowDiscountDisplay == "*ACTUAL_PRICE"
                        ? line?.actualPrice
                        : ""}
                    </span>
                  </div>
                  <div className='box'>
                    <span className='label'>{t("COH_DISCOUNT_PRICE")}</span>
                    <span className='value'>
                      {webSettings?.allowDiscountDisplay == "*ALL" ||
                      webSettings?.allowDiscountDisplay == "*ALL_PRICE" ||
                      webSettings?.allowDiscountDisplay == "*DISCOUNT_PRICE"
                        ? line?.discountPrice
                        : " "}
                    </span>
                  </div>
                  <div className='box'>
                    <span className='label'>{t("CON_DISCOUNT_%")}</span>
                    <span className='value'>
                      {webSettings?.allowDiscountDisplay == "*ALL"
                        ? line?.discountPercentage
                        : ""}
                    </span>
                  </div>
                </PriceContainer>
              </div>
              <div className='col'>
                <PriceContainer>
                  <div className='box'>
                    {isMobile ? null : (
                      <span className='label'>{t("CON_QUANTITY")}</span>
                    )}
                    <Quantity
                      quantity={Number(line?.updatedQuantity)}
                      isInvalid={
                        shoppingLineDetails?.[i]["updatedQuantity"] === 0
                      }
                      showLabel={isMobile}
                      onChange={(quantity: any) => {
                        setShoppingLineDetails((prevState) => {
                          const serverQuantity = Number(
                            shoppingListLineDetails?.listOfLine[i]?.quantity
                          );

                          const copiedArr = [...prevState];
                          if (quantity !== serverQuantity) {
                            copiedArr[i].editStatus.quantity = true;
                          } else {
                            copiedArr[i].editStatus.quantity = false;
                          }
                          copiedArr[i].updatedQuantity = quantity;
                          return copiedArr;
                        });
                      }}
                      style={{ marginLeft: isMobile ? "0" : "8px" }}
                    />
                  </div>
                  <div className='box'>
                    {isMobile ? null : (
                      <span className='label'>{t("CON_UNIT")}</span>
                    )}
                    <Select
                      className='select_unit'
                      labelText='Unit'
                      showLabel={isMobile}
                      value={shoppingLineDetails?.[i]["updatedUnit"]}
                      options={line?.salesUnitsDesc?.map((sale) => {
                        return {
                          label: sale.salesUnit,
                          value: sale.salesUnitDesc,
                        };
                      })}
                      onChange={(value) => {
                        setShoppingLineDetails((prevState) => {
                          const copiedArr = [...prevState];
                          if (
                            value !==
                            shoppingListLineDetails?.listOfLine[i]
                              ?.defaultSalesUnit
                          ) {
                            copiedArr[i].editStatus.unit = true;
                          } else {
                            copiedArr[i].editStatus.unit = false;
                          }
                          copiedArr[i].updatedUnit = value;
                          return copiedArr;
                        });
                      }}
                      style={{ marginLeft: isMobile ? "0" : "31px" }}
                    />
                  </div>
                </PriceContainer>
              </div>
              <div className='col'>
                <div className='flex-container'>
                  {shoppingLineDetails[i].editStatus.quantity ||
                  shoppingLineDetails[i].editStatus.unit ? (
                    <span
                      title={t("CON_SAVE")}
                      style={{
                        position: "absolute",
                        left: "10%",
                        top: "24%",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        dispatch(initializeSaveShoppingListLinesLoader());
                        dispatch(
                          fetchSaveShoppingListLines(
                            userInfo?.sessionId,
                            userInfo?.userID,
                            [
                              {
                                listId: listId,
                                code: line.code,
                                salesUnitCode: line.updatedUnit,
                                quantity: line.updatedQuantity,
                                lineNumber: line.lineNumber,
                                deliveryDate: "",
                              },
                            ]
                          )
                        );
                      }}
                    >
                      <RefreshSaveSVG className='primary-icon-2' />
                    </span>
                  ) : null}
                  <ActionContainer>
                    <Button
                      iconOnly
                      title={
                        line?.editStatus.quantity || line?.editStatus.unit
                          ? "First save the current item"
                          : line?.isBuyingAllowed
                          ? t("CON_ADD_TO_CART")
                          : t("MSG_BUY_NOT_ALLOWED")
                      }
                      disabled={
                        !line?.isBuyingAllowed ||
                        line?.editStatus.quantity ||
                        line?.editStatus.unit
                      }
                      style={{
                        background: `${rgba(cssVar(`--primary-color-1`), 0.1)}`,
                      }}
                      onClick={() => {
                        setAddToCartStatus(true);

                        if (Number(line.updatedQuantity) !== 0) {
                          dispatch(initializeCartLoader());
                        }

                        dispatch(
                          addToCart(userInfo?.sessionId, {
                            itemCode: line.code,
                            itemQty: Number(line.updatedQuantity),
                            unitCode: line.updatedUnit,
                          })
                        );
                      }}
                    >
                      <CartSVG className='primary-icon-1' />
                    </Button>
                  </ActionContainer>
                </div>
              </div>
            </CardRow>
          ))}
        </div>
      </div>
    </MainContainer>
  );
}

export default IndividualLists;
