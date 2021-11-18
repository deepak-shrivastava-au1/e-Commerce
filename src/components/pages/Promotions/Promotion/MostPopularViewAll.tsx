import React, { useState, useEffect, useContext } from "react";
import ProductsGrid from "./ProductsGrid";
import ProductList from "./ProductList";
import { useMediaQuery } from "@material-ui/core";
import styled from "styled-components";
import { breakpoints } from "@constants/styled-components";
import ListView from "../../../../assets/icons/ListView";
import GridView from "../../../../assets/icons/GridView";
import { addToCart } from "@actions/cart/addToCart";
import { addItemInShoppingList } from "@actions/shoppingList/addItemsToShoppingList";
import { useDispatch, useSelector } from "react-redux";
import AddItemToCart from "@pages/Cart/ShoppingCart/AddItemToCart";
import LoadingOverlay from "@common/LoadingOverlay";
import AddItemToShoppingList from "@pages/shoppingList/AddItemToShoppingList";
import {
  fetchmostPopularViewAll,
  mostPopularSelector,
  intitalizeLoader,
  fetchUpdatedParams,
} from "@slices/Promotions/mostPopular";

import { useGetLoggedInUserInfo } from "@hooks";
import { WebSettingsContext } from "@providers/WebsettingsProvider";

interface IProps {
  products: any;
  loading: boolean;
  hasErrors: boolean;
}

const MostPopularViewAll = (props: IProps) => {
  const dispatch = useDispatch();
  const [showAddToCart, setShowAddToCart] = useState<boolean>(false);
  const isMobile = useMediaQuery(`(max-width:${breakpoints.sm})`);
  const [listView, setListView] = useState(false);

  const sessionId = useGetLoggedInUserInfo();
  const webSettingsData: any = useContext(WebSettingsContext);
  const products = useSelector(mostPopularSelector);
  const loading = products.loading;

  const [productList, setProductList] = useState(
    products?.mostPopularViewAll?.map((item: any) => {
      const unit = item?.salesUnit ? item.salesUnit : item?.defaultSalesUnit;
      return {
        key: item?.code,
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
  const unitChangeHandler = (itemCode: string, unit: string, index: number) => {
    setProductList((prevState: any) => {
      const copyShowUnit = prevState ? [...prevState] : [{}];
      copyShowUnit[index] = { ...copyShowUnit[index], unit: unit };
      return copyShowUnit;
    });
    dispatch(fetchUpdatedParams(itemCode, sessionId?.sessionId, unit, index));
  };

  useEffect(() => {
    setProductList(
      products?.mostPopularViewAll?.map((item: any) => {
        const unit = item?.salesUnit ? item.salesUnit : item?.defaultSalesUnit;
        return {
          key: item?.code,
          quantity: 0,
          unit: unit,
        };
      })
    );
  }, [products]);

  useEffect(() => {
    dispatch(intitalizeLoader());
    dispatch(fetchmostPopularViewAll());
  }, [dispatch]);

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

  return (
    <React.Fragment>
      <Content>
        <div className='content-area'>
          <div className='row'>
            <div className='col-lg-12 pr-0 pl-0 r-m-t'>
              <ViewContainer className='pr-2'>
                {!isMobile && (
                  <>
                    <div
                      onClick={() => {
                        setListView(true);
                      }}
                      style={{ cursor: "pointer" }}
                      className={!listView ? "GridIcon" : "ListIcon"}
                    >
                      <ListView className='primary-icon-2' />
                    </div>
                    <div
                      onClick={() => {
                        setListView(false);
                      }}
                      style={{ cursor: "pointer" }}
                      className={listView ? "GridIcon" : "ListIcon"}
                    >
                      <GridView className='primary-icon-2' />
                    </div>
                  </>
                )}
              </ViewContainer>
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-12 pr-0 pl-0'>
              {listView ? (
                <ProductList
                  productList={productList}
                  listView={listView}
                  products={products?.mostPopularViewAll}
                  loading={props.loading}
                  hasErrors={props.hasErrors}
                  onAddToCartHandler={addItemToCartHandler}
                  onAddItemToList={addItemToShoppingListHandler}
                  onQuantityChangeHandler={quantityChangeHandler}
                  onUnitChangeHandler={unitChangeHandler}
                  showAddToCart={showAddToCart}
                />
              ) : (
                <ProductsGrid
                  productList={productList}
                  listView={listView}
                  products={products?.mostPopularViewAll}
                  loading={props.loading}
                  hasErrors={props.hasErrors}
                  onAddToCartHandler={addItemToCartHandler}
                  onAddItemToList={addItemToShoppingListHandler}
                  onQuantityChangeHandler={quantityChangeHandler}
                  onUnitChangeHandler={unitChangeHandler}
                  showAddToCart={showAddToCart}
                />
              )}
              <AddItemToCart
                status={showAddToCart}
                onClose={setShowAddToCart}
              />
              <AddItemToShoppingList />
            </div>
          </div>
        </div>
      </Content>
      <LoadingOverlay active={loading} />
    </React.Fragment>
  );
};

export default MostPopularViewAll;

const Content = styled.div`
  margin-top: 50px;
  min-height: 80vh;
  @media (max-width: 550px) {
    margin-top: 112px;
  }
`;

const ViewContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-bottom: 10px;
`;
