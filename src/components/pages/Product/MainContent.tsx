import React, { useState, useEffect, useContext } from "react";
import ProductsGrid from "./ProductsGrid";
import ProductList from "./ProductList";
import { useMediaQuery } from "@material-ui/core";
import { breakpoints } from "@constants/styled-components";
import { addToCart } from "@actions/cart/addToCart";
import { addItemInShoppingList } from "@actions/shoppingList/addItemsToShoppingList";
import { useDispatch, useSelector } from "react-redux";
import AddItemToCart from "@pages/Cart/ShoppingCart/AddItemToCart";
import AddItemToShoppingList from "@pages/shoppingList/AddItemToShoppingList";
import {
  fetchProducts,
  filterProducts,
  CurrentSearchString,
  FetchFilterValues,
  fetchUpdatedParams,
} from "@slices/Products/productSearch";
import { filterChipsSelector } from "@slices/Products/filterChipsReducer";
import { useGetLoggedInUserInfo } from "@hooks";
import { WebSettingsContext } from "@providers/WebsettingsProvider";
import ProductSortContainer from "./ProductSortContainer";
import FilterChips from "@fragments/FilterChips";
import {
  filterCatalog,
  fetchCatalogProducts,
  catalogSelector,
  fetchUpdatedParamsCatalog,
} from "@slices/Catalog/getCatalogData";
import LoadingOverlay from "@common/LoadingOverlay";
interface IProps {
  compareItems: any;
  totalItems: number;
  products: any;
  loading: boolean;
  hasErrors: boolean;
  pageNo: number;
  setPage: Function;
  onFilterChange: Function;
  updateCompareListItems: Function;
  catalog: boolean;
  bannerImage: any;
  catalogDetails: any;
  catId: any;
  elementId: any;
  setshowFilter: Function;
  setListView: any;
  listView: any;
  updateDataValue: Function;
}

const MainContent = (props: IProps) => {
  const dispatch = useDispatch();
  const [showAddToCart, setShowAddToCart] = useState<boolean>(false);
  const isMobile = useMediaQuery(`(max-width:${breakpoints.sm})`);
  const [scrollPage, setScrollPage] = useState<number>(1);
  const palletData = useSelector(filterChipsSelector);
  const filterValues = useSelector(FetchFilterValues);
  const sessionId = useGetLoggedInUserInfo();
  const webSettingsData: any = useContext(WebSettingsContext);
  var searchString = useSelector(CurrentSearchString);
  const [loader, setLoader] = useState(false);
  const showPaginationComponent = useMediaQuery(
    `(min-width:${breakpoints.md})`
  );
  useEffect(() => {
    if (searchString.isCompleted) {
      setLoader(false);
    }
  }, [searchString.isCompleted]);

  const [productList, setProductList] = useState(
    props.products?.map((item: any) => {
      const firstsalesUnit = item?.salesUnitsDesc[0];
      const unit = props.catalog
        ? firstsalesUnit?.salesUnit
        : item?.itemUnitCode;
      return {
        key: !props.catalog ? item?.solrItemCode : item?.code,
        quantity: 1,
        unit: unit,
      };
    })
  );

  const quantityChangeHandler = (quantity: number, index: number) => {
    setProductList((prevState: any) => {
      const copyShowUnit = prevState ? [...prevState] : [{}];
      copyShowUnit[index] = { ...copyShowUnit[index], quantity: quantity };
      return copyShowUnit;
    });
  };
  const unitChangeHandler = (
    itemCode: string,
    unit: string,
    index: number,
    isCatalog: boolean
  ) => {
    setProductList((prevState: any) => {
      const copyShowUnit = prevState ? [...prevState] : [{}];
      copyShowUnit[index] = { ...copyShowUnit[index], unit: unit };
      return copyShowUnit;
    });

    if (!isCatalog) {
      dispatch(fetchUpdatedParams(itemCode, sessionId?.sessionId, unit, index));
    } else {
      dispatch(
        fetchUpdatedParamsCatalog(itemCode, sessionId?.sessionId, unit, index)
      );
    }
  };

  useEffect(() => {
    setProductList(
      props.products?.map((item: any) => {
        const firstsalesUnit = item?.salesUnitsDesc[0];
        const unit = props.catalog
          ? firstsalesUnit?.salesUnit
          : item?.itemUnitCode;
        return {
          key: !props.catalog ? item?.solrItemCode : item?.code,
          quantity: 1,
          unit: unit,
        };
      })
    );
  }, []);

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

    dispatch(addToCart(sessionId, itemDataToDispatch));
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

  const handleScroll = () => {
    setScrollPage((prevState:any) => prevState + 1);
    console.log("currentpage", scrollPage);
    let userScrollHeight = window.innerHeight + window.scrollY;
    let windowBottomHeight = document.documentElement.offsetHeight;

    if (userScrollHeight === windowBottomHeight) {
      if (palletData.length > 0) {
        // props.setPage((prevState: any) => prevState + 1);
        setLoader(true);
        dispatch(
          filterProducts(
            filterValues,
            sessionId?.sessionId,
            scrollPage,
            webSettingsData?.languageCode,
            searchString.string
          )
        );
      } else if (palletData.length <= 0) {
        // setScrollPage((prevState: any) => prevState + 1);
        setLoader(true);
        dispatch(
          fetchProducts(
            searchString.string,
            scrollPage,
            webSettingsData?.languageCode
          )
        );
      }
    }
  };

  useEffect(() => {
    if (!isMobile) {
      window.addEventListener("scroll", handleScroll); // attaching scroll event listener

      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <React.Fragment>
      <LoadingOverlay active={loader} />
      <div className="container-fluid pr-0 pl-0">
        <div className="row">
          <div className="col-lg-12 pr-0 pl-0">
            <ProductSortContainer
              setListView={props.setListView}
              listView={props.listView}
              compareItems={props.compareItems}
              bannerImage={props.bannerImage}
              catalog={props.catalog}
              catId={props.catId}
              elementId={props.elementId}
              setshowFilter={props.setshowFilter}
            />
            {showPaginationComponent && (
              <FilterChips
                products={props.products}
                pageNo={props.pageNo}
                onFilterChange={props.onFilterChange}
                totalItems={props.totalItems}
                catalogDetails={props.catalogDetails}
                elementId={props.elementId}
                catalog={props.catalog}
                updateDataValue={props.updateDataValue}
              />
            )}
          </div>
        </div>
        {console.log("listView", props.listView)}
        <div className="row ">
          <div className="col-lg-12 pr-0 pl-0">
            {props.listView ? (
              <ProductList
                compareItems={props.compareItems}
                updateCompareListItems={props.updateCompareListItems}
                productList={productList}
                totalItems={props.totalItems}
                setListView={props.setListView}
                listView={props.listView}
                products={props.products}
                loading={props.loading}
                hasErrors={props.hasErrors}
                onAddToCartHandler={addItemToCartHandler}
                onAddItemToList={addItemToShoppingListHandler}
                onQuantityChangeHandler={quantityChangeHandler}
                onUnitChangeHandler={unitChangeHandler}
                showAddToCart={showAddToCart}
                catalog={props.catalog}
              />
            ) : (
              <ProductsGrid
                compareItems={props.compareItems}
                updateCompareListItems={props.updateCompareListItems}
                productList={productList}
                totalItems={props.totalItems}
                setListView={props.setListView}
                listView={props.listView}
                products={props.products}
                loading={props.loading}
                hasErrors={props.hasErrors}
                onAddToCartHandler={addItemToCartHandler}
                onAddItemToList={addItemToShoppingListHandler}
                onQuantityChangeHandler={quantityChangeHandler}
                onUnitChangeHandler={unitChangeHandler}
                showAddToCart={showAddToCart}
                catalog={props.catalog}
              />
            )}
            <AddItemToCart status={showAddToCart} onClose={setShowAddToCart} />
            <AddItemToShoppingList />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MainContent;
