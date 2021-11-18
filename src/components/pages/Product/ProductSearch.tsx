import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import MainContent from "./MainContent";
import SidebarFilter from "./SidebarFilter";
import { useMediaQuery } from "@material-ui/core";
import { breakpoints } from "@constants/styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import loaderGif from "../../../assets/icons/loadinfo.gif";
import { useGetLoggedInUserInfo } from "@hooks";
import {
  filterChipsSelector,
  FILTER_SELECTED,
  UPDATE_CHIPS,
} from "@slices/Products/filterChipsReducer";
import {
  filter_Values,
  productsSelector,
  productItemsSelector,
} from "@slices/Products/productSearch";
import {
  CurrentSearchString,
  FetchFilterValues,
  filterProducts,
} from "@slices/Products/productSearch";

import { fetchProducts, currentString } from "@slices/Products/productSearch";
import styled from "styled-components";
import LoadingOverlay from "@common/LoadingOverlay";
import { WebSettingsContext } from "@providers/WebsettingsProvider";
import Breadcrumb from "@fragments/Breadcrumb";
import Modal_ from "@common/Modal";
import { useTranslation } from "react-i18next";
import {
  filterCatalog,
  catalogSelector,
  fetchCatalogProducts,
  catalogProductsSelector,
} from "@slices/Catalog/getCatalogData";
import CatalogCarousel from "@fragments/CatalogCarousel";
import NoData from "@common/NoData";
const AbsoluteWrapper = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;
  height: 100vh;
`;
const NoRecord = styled.div`
  margin-top: 8%;
  padding-top: 2%;
  padding-bottom: 8.7%;
  background-color: var(--white);
`;

const NoRecordCatalog = styled.div`
  background-color: var(--white);
`;
const Pallet = styled.span`
  color: var(--primary-color-1);
`;
const SearchTextWrapper = styled.span`
  padding-left: 5%;
`;
interface IProps {
  catalogDetails: any;
  catalog: boolean;
  catId: any;
  elementId: any;
}
const ProductSearch = (props: IProps) => {
  const dispatch: any = useDispatch();
  const state = useSelector(productsSelector);
  const searchItems = useSelector(productItemsSelector);

  const catalogDetails = useSelector(catalogSelector);
  const { t, i18n } = useTranslation();
  const location: any = useLocation();
  // let { searchString } = location.state ? location.state : '';
  var searchString = useSelector(CurrentSearchString);
  const webSettingsData: any = useContext(WebSettingsContext);
  const [page, setPage] = useState<number>(1);
  const [newState, setNewState] = useState(state);
  const [searchProducts, setSearchProducts] = useState(searchItems.searchItems);
  const isMobile = useMediaQuery(`(min-width:${breakpoints.sm})`);
  const palletData = useSelector(filterChipsSelector);
  var filterValues = useSelector(FetchFilterValues);
  const sessionId = useGetLoggedInUserInfo()?.sessionId;
  const [isOpen, setIsOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  // const compareItems = useSelector(productsCompareItemsSelector)?.compareItems;
  const [compareItems, setCompareItems] = useState([]);
  const [elementId, setElementId] = useState("");
  const [showFilter, setshowFilter] = useState(false);
  const catalogProductData = useSelector(catalogProductsSelector);
  const [productTotalCount, setProductTotalCount] = useState(10);
  const [listView, setListView] = useState(false);
  // const [catalogProductData, setCatalogProductData] = useState(
  //   catalogProductDetails
  // );

  useEffect(() => {
    if (catalogDetails.isCompleted) {
      setLoader(false);
    }
  }, [catalogDetails.isCompleted]);

  const updateCompareListItems = (item_id: any) => {
    if (
      compareItems.find((id: any) => {
        return id === item_id;
      }) === item_id
    ) {
      return;
    } else {
      const itemList: any = [...compareItems, item_id];
      if (isMobile && compareItems?.length < 4) {
        setCompareItems(itemList);
      } else if (!isMobile && compareItems?.length < 2) {
        setCompareItems(itemList);
      } else if (!isMobile) {
        setIsOpen(true);
      } else if (isMobile) {
        setIsOpen(true);
      }
    }
  };

  // useEffect(() => {
  //   dispatch({
  //     type: filter_Values,
  //     payload: {},
  //   });
  // }, [dispatch]);

  // useEffect(() => {
  //   if (!searchString.string) {
  //     setLoader(true)
  //     dispatch(
  //       fetchProducts(searchString?.string, 1, webSettingsData?.languageCode)
  //     );
  //   }
  // }, [dispatch, searchString?.string, webSettingsData?.languageCode]);

  useEffect(() => {
    setNewState(state);
  }, [state]);

  useEffect(() => {
    setSearchProducts(searchItems.searchItems);
  }, [searchItems]);

  const filterChangeHandler = (
    value: any,
    index: number,
    code: any,
    category: any,
    filterColumn: any,
    isSideFilter: boolean
  ) => {
    if (palletData?.find((item: any) => item.code === code)) {
      const newPalletData = [...palletData];
      dispatch({
        type: UPDATE_CHIPS,
        payload: newPalletData.filter((item) => item.code !== code),
      });
      if (filterValues.hasOwnProperty(category)) {
        filterValues = {
          ...filterValues,
          [`${category}`]: filterValues[`${category}`].filter(
            (key: any) => key.filterCode !== code
          ),
        };
      } else {
        filterValues = Object.keys(filterValues)
          .filter((key: any) => key !== category)
          .reduce((obj: any, key: any) => {
            obj[key] = filterValues[key];
            return obj;
          }, {});
      }

      dispatch({
        type: filter_Values,
        payload: filterValues,
      });
      if (palletData.length !== 1) {
        setPage(1);
        if (props.catalog) {
          setLoader(true);
          dispatch(
            filterCatalog(
              filterValues,
              sessionId,
              1,
              "ID",
              props.catId,
              props.elementId
            )
          );
        } else {
          setLoader(true);
          dispatch(
            filterProducts(
              filterValues,
              sessionId,
              1,
              webSettingsData.languageCode,
              searchString.string
            )
          );
        }
      } else {
        setPage(1);
        if (props.catalog) {
          setLoader(true);
          dispatch(fetchCatalogProducts(props.catId, 1, props.elementId));
        } else {
          setLoader(true);
          console.log("deepak2==>")
          dispatch(
            fetchProducts(searchString?.string, 1, webSettingsData.languageCode)
          );
        }

        dispatch({
          type: filterValues,
          payload: {},
        });
        /* dispatch({
          type:currentString,
          payload:''
        })*/
      }
    }

    // else part
    else if (isSideFilter) {
      const newArray: any = [
        ...palletData,
        {
          id: index,
          data: value,
          code: code,
          filterColumn: filterColumn,
          category: category,
        },
      ];
      // setFilterSelected(newArray);
      dispatch({
        type: FILTER_SELECTED,
        payload: newArray,
      });

      if (filterValues?.hasOwnProperty(category)) {
        var newVal = {
          ...filterValues,
          [`${category}`]: [
            ...filterValues[`${category}`],
            {
              filterColumn: `${filterColumn}`,
              filterCode: `${code}`,
              filterDesc: `${value}`,
            },
          ],
        };

        dispatch({
          type: filter_Values,
          payload: newVal,
        });
        setPage(1);
        if(props.catalog){
          console.log("Catalog=================>4", props.catalog);
          setLoader(true);
          dispatch(
            filterCatalog(
              newVal,
              sessionId,
              1,
              "ID",
              props.catId,
              props.elementId
            )
          );
        }
        else {
          setLoader(true);
          console.log("Catalog=================>3", props.catalog);
          dispatch(
            filterProducts(
              newVal,
              sessionId,
              1,
              webSettingsData.languageCode,
              searchString.string
            )
          );
        }
      }
       
      else {
        dispatch({
          type: filter_Values,
          payload: {
            ...filterValues,
            [`${category}`]: [
              {
                filterColumn: `${filterColumn}`,
                filterCode: `${code}`,
                filterDesc: `${value}`,
              },
            ],
          },
        });
        setPage(1);
        if (props.catalog) {
          console.log("Catalog=================>1", props.catalog);
          setLoader(true);
          dispatch(
            filterCatalog(
              {
                ...filterValues,
                [`${category}`]: [
                  {
                    filterColumn: `${filterColumn}`,
                    filterCode: `${code}`,
                    filterDesc: `${value}`,
                  },
                ],
              },
              sessionId,
              1,
              "ID",
              props.catId,
              props.elementId
            )
          );
        } else {
          console.log("Catalog=================>2", props.catalog);
          setLoader(true);
          dispatch(
            filterProducts(
              {
                ...filterValues,
                [`${category}`]: [
                  {
                    filterColumn: `${filterColumn}`,
                    filterCode: `${code}`,
                    filterDesc: `${value}`,
                  },
                ],
              },
              sessionId,
              1,
              webSettingsData.languageCode,
              searchString.string
            )
          );
        }
      }
    }
  };

  useEffect(() => {
    let totalItems = 10;
    if (props.catalog) {
      totalItems = props.catalogDetails?.totalRecordsFound;
    } else {
      totalItems = newState?.products?.solrItemSearchListBean
        ? newState?.products?.solrItemSearchListBean?.length
        : 0;
    }
    setProductTotalCount(totalItems);
  }, [
    props.catalogDetails?.totalRecordsFound,
    newState?.products?.totalRecordsFound,
  ]);

  const updateDataValue = (inputQuery: any, page: number) => {
    setPage(page);
    if (palletData.length) {
      if (props.catalog) {
        setLoader(true);
        dispatch(
          filterCatalog(
            filterValues,
            sessionId.sessionId,
            page,
            "ID",
            props.catId,
            props.elementId
          )
        );
      } else {
        setLoader(true);
        dispatch(
          filterProducts(
            filterValues,
            sessionId.sessionId,
            page,
            webSettingsData.languageCode,
            searchString.string
          )
        );
      }
    } else {
      if (props.catalog) {
        setLoader(true);
        dispatch(fetchCatalogProducts(props.catId, page, props.elementId));
      } else {
        setLoader(true);
        console.log("deepak1")
        dispatch(fetchProducts(inputQuery, page, webSettingsData.languageCode));
      }
    }
  };

  useEffect(() => {
    if (catalogDetails.isCompleted) {
      setLoader(false);
    }
  }, [catalogDetails.isCompleted]);

  useEffect(() => {
    if (state.isCompleted) {
      setLoader(false);
    }
  }, [state.isCompleted]);
  
  console.log("state", state)
  return (
    <div className="product-search-warp">
      {props.catalog && (
        <section className="catalog-carousel">
          <CatalogCarousel catId={props.catId} />
        </section>
      )}
      <div className="content-area">
        <LoadingOverlay active={loader} />
        <section className="section-content padding-y">
          {props.catalog || productTotalCount > 0 ? (
            <div className="container">
              <div className="row pr-0 pl-0">
                <>
                  {isMobile && (
                    <div className="col-lg-3 pr-0 pl-0">
                      <SidebarFilter
                        catalogDetails={props.catalogDetails}
                        catId={props.catId}
                        onFilterChange={filterChangeHandler}
                        filterData={
                          props.catalog
                            ? props.catalogDetails?.searchFilterList
                            : newState?.products?.filtersList
                        }
                      />
                    </div>
                  )}
                  {showFilter && (
                    <AbsoluteWrapper style={{ marginTop: "90px" }}>
                      <SidebarFilter
                        setshowFilter={setshowFilter}
                        showFilter={showFilter}
                        catalogDetails={props.catalogDetails}
                        catId={props.catId}
                        onFilterChange={filterChangeHandler}
                        filterData={
                          props.catalog
                            ? props.catalogDetails?.searchFilterList
                            : newState?.products?.filtersList
                        }
                      />
                    </AbsoluteWrapper>
                  )}
                </>

                <div
                  className={`${
                    isMobile ? "col-lg-9 pr-0 pl-0" : "col-lg-12 pr-0 pl-0"
                  }`}
                >
                  {productTotalCount > 0 ? (
                    <MainContent
                      setListView={setListView}
                      listView={listView}
                      compareItems={compareItems}
                      updateCompareListItems={updateCompareListItems}
                      totalItems={
                        props.catalog
                          ? props.catalogDetails?.totalRecordsFound
                          : newState?.products?.totalRecordsFound
                      }
                      products={
                        props.catalog ? catalogProductData : searchProducts
                      }
                      bannerImage={
                        props.catalog ? props.catalogDetails.imageUrl : null
                      }
                      loading={state.loading}
                      hasErrors={state.hasErrors}
                      pageNo={page}
                      setPage={setPage}
                      updateDataValue={updateDataValue}
                      onFilterChange={filterChangeHandler}
                      catalog={props.catalog}
                      catalogDetails={props.catalogDetails}
                      elementId={props.elementId}
                      catId={props.catId}
                      setshowFilter={setshowFilter}
                    />
                  ) : (
                    <NoRecordCatalog>
                      {productTotalCount < 1 ? <NoData /> : ""}
                    </NoRecordCatalog>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <>
              {console.log("productTotalCount", productTotalCount)}
              {state.isCompleted && productTotalCount < 1 ? (
                <NoRecord>
                  {!props.catalog && (
                    <SearchTextWrapper>
                      {props.catalog
                        ? props.catalogDetails?.totalRecordsFound
                        : newState?.products?.totalRecordsFound}{" "}
                      Product Search : &nbsp;
                      <Pallet>{`"${searchString?.string}"`}</Pallet>
                    </SearchTextWrapper>
                  )}
                  <NoData />
                </NoRecord>
              ) : null}
            </>
          )}
        </section>
        <Modal_
          isAlert
          title="Alert"
          message={t(
            `${
              !isMobile
                ? "Maximum 2 Products are needed to compare"
                : "Maximum 4 Products are needed to compare"
            }`
          )}
          isOpen={isOpen}
          hasCancelButton={false}
          secondaryActionText={"ok"}
          onSecondaryButtonClick={() => {
            setIsOpen(false);
          }}
        />
      </div>
    </div>
  );
};

export default ProductSearch;
