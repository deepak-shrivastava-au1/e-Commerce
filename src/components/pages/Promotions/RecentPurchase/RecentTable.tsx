import { useState, Fragment, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  recentPurchaseSelector,
  fetchrecentPurchase,
  recentPurchaseactions,
} from "@slices/Promotions/recentPurchase";
import { useTranslation } from "react-i18next";
import {
  ArrowUpSVG,
  ArrowDownSVG,
  CartSVG,
  HeartSVG,
  Mail,
  LeftSVG,
  RightSVG,
  PreviousArrow,
} from "@icons";
import { useGetLoggedInUserInfo } from "@hooks";
import Button from "@common/Button";
import styled from "styled-components";
import "./RecentPurchases.scss";
import LoadingOverlay from "@common/LoadingOverlay";
import { WebSettingsContext } from "@providers/WebsettingsProvider";
import { addItemInShoppingList } from "@actions/shoppingList/addItemsToShoppingList";
import { addToCart } from "@actions/cart/addToCart";
import altImage from "@images/awaited_image.png";
import { BASE_URL_IMAGE } from "@routers/AppRoute";
import { alignCenter, respondTo } from "@utilities/styled-components";
import RecentAddCartLineItem from "./RecentAddCartLineItem";
import NoData from "@common/NoData";
import SendEnquiry from "@fragments/SendEnquiry";
import Units from "@common/Units";
import Quantity from "@common/Quantity";
import AddItemToCart from "@pages/Cart/ShoppingCart/AddItemToCart";
import AddItemToShoppingList from "@pages/shoppingList/AddItemToShoppingList";
import { DETAILS } from "@constants/Routes";
import { Link } from "react-router-dom";

const RecentTable = (props: any) => {
  const { t, i18n } = useTranslation();
  const webSettings: any = useContext(WebSettingsContext);

  const sessionId = useGetLoggedInUserInfo()?.sessionId;
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const [addToCartStatus, setAddToCartStatus] = useState<boolean>(false);
  const [isEnquiryDrawerOpen, setIsEnquiryDrawerOpen] =
    useState<boolean>(false);
  const [enquiryDetails, setEnquiryDetails] = useState<string>("");
  const [showEnquiryWindow, setShowEnquiryWindow] = useState<Array<boolean>>(
    []
  );

  const [productSort, setProductSort] = useState(
    <a onClick={() => fetchASCsortorder("Product")}>
      <ArrowDownSVG className='primary-icon-2 icon-md'></ArrowDownSVG>
    </a>
  );
  const [descriptionSort, setDescriptionSort] = useState(
    <a onClick={() => fetchDESCsortorder("Description")}>
      <ArrowUpSVG className='primary-icon-2 icon-md'></ArrowUpSVG>
    </a>
  );

  const [sortcolumn, setSortColumn] = useState({
    SortColumn: "TotalAmount",
    orderBy: "DESC",
  });
  const [showAddCart, setShowAddCart] = useState<Array<boolean>>([]);
  const [deleteDialogStatus, setDeleteDialogStatus] = useState<boolean>(false);

  const onEnquiryClick = (index: number) => {
    setShowEnquiryWindow((prevState: Array<boolean>) => {
      const copiedArr: any = [];
      copiedArr[index] = !copiedArr[index];
      return copiedArr;
    });
    setIsEnquiryDrawerOpen((prevState) => !prevState);
  };

  function fetchASCsortorder(type: string) {
    if (type == "Product") {
      setProductSort(
        <a onClick={() => fetchDESCsortorder("Product")}>
          <ArrowUpSVG fill={`var(--primary-icon-2)`}></ArrowUpSVG>
        </a>
      );
      setSortColumn({ SortColumn: "Product", orderBy: "ASC" });
    } else if (type == "Description") {
      setDescriptionSort(
        <a onClick={() => fetchDESCsortorder("Description")}>
          <ArrowUpSVG fill={`var(--primary-icon-2)`}></ArrowUpSVG>
        </a>
      );
      setSortColumn({ SortColumn: "Description", orderBy: "ASC" });
    }
  }

  function fetchDESCsortorder(type: string) {
    if (type == "Product") {
      setProductSort(
        <a onClick={() => fetchASCsortorder("Product")}>
          <ArrowDownSVG className='primary-icon-2 icon-md'></ArrowDownSVG>
        </a>
      );
      setSortColumn({ SortColumn: "Product", orderBy: "DESC" });
    } else if (type == "Description") {
      setDescriptionSort(
        <a onClick={() => fetchASCsortorder("Description")}>
          <ArrowDownSVG className='primary-icon-2 icon-md'></ArrowDownSVG>
        </a>
      );
      setSortColumn({ SortColumn: "Description", orderBy: "DESC" });
    }
  }

  const AddItemsToCart = (listItems: any) => {
    const cartItems = {
      itemCode: listItems.item_code,
      unitCode: listItems.unit_code,
      itemQty: listItems.quantity,
    };

    dispatch(addToCart(sessionId, cartItems));
    setAddToCartStatus(true);
  };

  const AddItemsToList = (listItems: any) => {
    const AddItemsToListDetails1 = [
      {
        itemCode: listItems.item_code,
        unitCode: listItems.unit_code,
        quantity: listItems.quantity,
      },
    ];
    dispatch(addItemInShoppingList(sessionId, AddItemsToListDetails1));
  };
  const recentState = useSelector(recentPurchaseSelector);

  const [itemList, setItemList] = useState(
    recentState?.recentItems[0]?.recordSet
  );
  const searchFilters = recentState?.searchFilters;
  const loading = recentState?.loading;

  const handleNextPage = () => {
    let prevstate = pageNumber;
    const currentpage = prevstate + 1;
    setPageNumber(currentpage);
  };

  const quantityChangeHandler = (quantity: number, index: number) => {
    setItemList((prevState: any) => {
      const copyPrevState = prevState ? [...prevState] : [{}];
      copyPrevState[index] = {
        ...copyPrevState[index],
        quantity: quantity,
      };

      return copyPrevState;
    });
  };

  const unitChangeHandler = (unit: string, index: number) => {
    setItemList((prevState: any) => {
      const copyPrevState = prevState ? [...prevState] : [{}];
      copyPrevState[index] = { ...copyPrevState[index], unit: unit };

      return copyPrevState;
    });
  };

  const handlePrevPage = () => {
    let prevstate = pageNumber;
    const currentpage = prevstate - 1;
    setPageNumber(currentpage);
  };

  const handleFirstPage = () => {
    setPageNumber(1);
  };
  const sendEnquiryRecent = (items: any) => {
    setEnquiryDetails(
      `Product : ${items.item_code}\nDescription : ${items.description}\n  NetStore user's email id : ${webSettings?.userEmail}`
    );
    setIsEnquiryDrawerOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (sessionId) {
      dispatch(recentPurchaseactions.intitalizeLoader());
      if (recentState?.isFilterApply) {
        dispatch(
          fetchrecentPurchase(
            sessionId,
            sortcolumn.orderBy,
            sortcolumn.SortColumn,
            pageNumber,
            true,
            searchFilters.Customer,
            searchFilters.Status,
            searchFilters.orderTypeSearch,
            searchFilters.RequestTextSearch
          )
        );
      } else {
        dispatch(
          fetchrecentPurchase(
            sessionId,
            sortcolumn.orderBy,
            sortcolumn.SortColumn,
            pageNumber
          )
        );
      }
    }
  }, [sessionId, sortcolumn, recentState?.searchFilters, pageNumber]);

  useEffect(() => {
    setItemList(recentState?.recentItems[0]?.recordSet);
  }, [recentState]);

  return (
    <Fragment>
      <AddItemToCart status={addToCartStatus} onClose={setAddToCartStatus} />
      <AddItemToShoppingList />
      <SendEnquiry
        status={isEnquiryDrawerOpen}
        email={webSettings?.userEmail}
        details={enquiryDetails}
        subject='NetStore Item Enquiry'
      />
      <ListContainer>
        <PaginationContainer>
          {itemList?.length > 0 && (
            <div className='custom-pagination'>
              <a
                onClick={handleFirstPage}
                className={`default ${pageNumber == 1 ? "disable" : ""}`}
              >
                <PreviousArrow className='icon-color' />
              </a>
              <a
                onClick={handlePrevPage}
                className={`default ${pageNumber == 1 ? "disable" : "default"}`}
              >
                <LeftSVG className='icon-color' />
              </a>
              <a
                onClick={handleNextPage}
                className={`default ${
                  !recentState?.recentItems[0]?.moreRecords ? "disable" : ""
                }`}
              >
                <RightSVG className='icon-color' />
              </a>
            </div>
          )}
        </PaginationContainer>
        <div className='recent-purchase-table'>
          <div className='card-table'>
            <div className='card-thead'>
              <div className='row'>
                <div className='col'>
                  <div className='d-flex'>
                    <div className='col-title'>{t("CON_PRODUCT")}</div>
                    {/* <div className='col-sort'>{productSort}</div> */}
                  </div>
                </div>
                <div className='col col-w-2'>
                  <div className='d-flex justify-content-center'>
                    <div className='col-title'> {t("COH_PRICE")} (SEK)</div>
                  </div>
                </div>

                <div className='col col-w-3'>
                  <div className='d-flex'>
                    <div className='col-title'>{t("COH_QUANTITY")}</div>
                  </div>
                </div>

                <div className='col col-w-4'>
                  <div className='d-flex'>
                    <div className='col-title'> {t("COH_TOTAL_AMOUNT")}</div>
                  </div>
                </div>
                <div className='col col-w-5'>
                  <div className='d-flex'>
                    <div className='col-title'> {t("CON_AVAILABLE")}</div>
                  </div>
                </div>
                <div className='col col-w-6'>
                  <div className='d-flex'>
                    <div className='col-title'>{t("COH_UNIT")}</div>
                  </div>
                </div>
                <div className='col col-w-7'>
                  <div className='d-flex'>
                    <div className='col-title'>{t("COH_QUANTITY")}</div>
                  </div>
                </div>
                <div className='col col-w-8'>
                  <div className='d-flex'>
                    <div className='col-title'></div>
                  </div>
                </div>
              </div>
            </div>
            <div className='card-tbody'>
              {recentState?.recentItems[0]?.recordSet?.length == 0 && (
                <NoData />
              )}
              {recentState?.recentItems[0]?.recordSet == null
                ? ""
                : itemList?.map((items: any, index: number) => {
                    return (
                      <Fragment>
                        <div key={index} className='card-table'>
                          <div className='card-tbody'>
                            <div className='row'>
                              <div className='col align-self-start'>
                                <div className='flex-container'>
                                  <div className='d-flex'>
                                    <div>
                                      <ImageWrapper>
                                        <img
                                          src={`${BASE_URL_IMAGE}${items.imageUrl}`}
                                          alt='orderImg'
                                          onError={(e: any) => {
                                            e.target.onerror = null;
                                            e.target.src = altImage;
                                          }}
                                        />
                                      </ImageWrapper>
                                    </div>
                                    <div className='flex-md-fill'>
                                      <div className='d-flex flex-column'>
                                        <div>
                                          <Link
                                            to={`${DETAILS}/${encodeURIComponent(
                                              items?.item_code
                                            )}`}
                                          >
                                            {" "}
                                            {items.item_code}
                                          </Link>
                                        </div>
                                        <div>
                                          <Link
                                            to={`${DETAILS}/${encodeURIComponent(
                                              items?.item_code
                                            )}`}
                                          >
                                            {" "}
                                            {items.description}
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='col col-w-2 align-self-start'>
                                <div className='flex-container'>
                                  <table className='table-fit-content'>
                                    <tr>
                                      <td className='text-md-right text-sm-left cust-label'>
                                        {t("COH_ACTUAL_PRICE")}
                                      </td>
                                      <td>
                                        {webSettings?.allowDiscountDisplay ==
                                          "*ALL" ||
                                        webSettings?.allowDiscountDisplay ==
                                          "*ALL_PRICE" ||
                                        webSettings?.allowDiscountDisplay ==
                                          "*ACTUAL_PRICE"
                                          ? items.actualPrice
                                          : ""}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className='text-md-right text-sm-left cust-label'>
                                        {t("COH_DISCOUNT_PRICE")}
                                      </td>
                                      <td>
                                        {webSettings?.allowDiscountDisplay ==
                                          "*ALL" ||
                                        webSettings?.allowDiscountDisplay ==
                                          "*ALL_PRICE" ||
                                        webSettings?.allowDiscountDisplay ==
                                          "*DISCOUNT_PRICE"
                                          ? items.discountPrice
                                          : " "}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className='text-md-right text-sm-left cust-label'>
                                        {t("CON_DISCOUNT_%")}
                                      </td>
                                      <td>
                                        {webSettings?.allowDiscountDisplay ==
                                        "*ALL"
                                          ? items.discountPercentage
                                          : ""}
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                              </div>

                              <div className='col col-w-3 align-self-start'>
                                <div className='flex-container'>
                                  <div className='label text-md-right text-sm-left cust-label'>
                                    {t("COH_QUANTITY")}
                                  </div>
                                  {items.totalQuantity}
                                </div>
                              </div>
                              <div className='col order-value-position col-w-4 align-self-start'>
                                <div className='flex-container'>
                                  <div className='label text-md-right text-sm-left cust-label'>
                                    {t("COH_TOTAL_AMOUNT")}
                                  </div>
                                  {items.totalAmount}
                                </div>
                              </div>
                              <div className='col col-w-5 align-self-start'>
                                <div className='flex-container'>
                                  <div className='label text-md-right text-sm-left cust-label'>
                                    {t("CON_AVAILABLE")}
                                  </div>
                                  {items.availabilityOfItem}
                                </div>
                              </div>
                              <div className='col col-w-6 align-self-start'>
                                <div className='flex-container'>
                                  <div className='label text-md-right text-sm-left cust-label'>
                                    {t("COH_UNIT")}
                                  </div>
                                  <div className='recent-purchase-units'>
                                    <Units
                                      labelText=''
                                      options={items?.salesUnitsDesc?.map(
                                        (address: any) => {
                                          return {
                                            label: address.salesUnit,
                                            value: address.salesUnitDesc,
                                            selected:
                                              address.salesUnit ===
                                              items.unitCode,
                                          };
                                        }
                                      )}
                                      showLabel={false}
                                      onChange={(selectedUnit: any) => {
                                        unitChangeHandler(selectedUnit, index);
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className='col col-w-7 align-self-start'>
                                <div className='flex-container'>
                                  <div className='label text-md-right text-sm-left cust-label'>
                                    {t("COH_QUANTITY")}
                                  </div>
                                  <div className='ml-auto recent-purchase-units'>
                                    <Quantity
                                      showLabel={false}
                                      quantity={0}
                                      onChange={(quantity: any) => {
                                        quantityChangeHandler(
                                          parseInt(quantity),
                                          index
                                        );
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className='col col-w-8 align-self-start'>
                                <div className='flex-container recent-buttons'>
                                  <div className='label text-md-right text-sm-left cust-label'></div>
                                  <span>
                                    <Button
                                      variant='outlined'
                                      color='primary'
                                      disabled={
                                        !items.isBuyingAllowed ||
                                        !webSettings.buyEnabledForUser
                                      }
                                      onClick={() => AddItemsToCart(items)}
                                    >
                                      <CartSVG className='primary-icon-1 icon-md' />{" "}
                                    </Button>
                                    <Button
                                      variant='outlined'
                                      color='primary'
                                      onClick={() => AddItemsToList(items)}
                                    >
                                      <HeartSVG className='primary-icon-1 icon-md' />{" "}
                                    </Button>
                                    <Button
                                      variant='outlined'
                                      color='primary'
                                      onClick={() => onEnquiryClick(index)}
                                    >
                                      <Mail className='primary-icon-1 icon-md' />{" "}
                                      {showEnquiryWindow[index] && (
                                        <SendEnquiry
                                          status={isEnquiryDrawerOpen}
                                          email={webSettings?.userEmail}
                                          details={`Product : ${items.item_code}\nDescription : ${items.description}\nNetStore user's email id : ${webSettings.userEmail}`}
                                          subject='NetStore Item Enquiry'
                                        />
                                      )}
                                    </Button>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Fragment>
                    );
                  })}
            </div>
          </div>
        </div>
      </ListContainer>

      <LoadingOverlay active={loading} />
    </Fragment>
  );
};

export default RecentTable;

const ListContainer = styled.div`
  width: 100%;
`;

const PaginationContainer = styled.div`
  float: right;
  margin-top: -55px;
  padding: 0px 0px;
`;

const ImageWrapper = styled.div`
  ${alignCenter}
  padding:5px;
  width: 60px;
  height: 60px;
  border: var(--thin-border) var(--form-base-color);
  border-radius: var(--border-radius);
  margin-right: 10px;

  > img {
    object-fit: cover;
    width: 100%;
  }
`;
