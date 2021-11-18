import React, { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  youMayLikeSelector,
  fetchyouMayLike,
} from "@slices/Promotions/youMayLike";
import { useGetLoggedInUserInfo } from "@hooks";

import PromotionCarousel from "./PromotionCarousel";
import YouMayLikeCarousel from "./YouMayLikeCarousel";

const YouMayLike = (props: any) => {
  const dispatch = useDispatch();
  const sessionId = useGetLoggedInUserInfo();
  const state = useSelector(youMayLikeSelector);

  useEffect(() => {
    dispatch(
      fetchyouMayLike(
        sessionId?.sessionId,
        props.page,
        props.orderNum ? props.orderNum : "",
        props.itemCode ? props.itemCode : ""
      )
    );
  }, [dispatch]);

  return (
    <>
      {state.youMayLike?.productList?.length > 0 ? (
        <YouMayLikeCarousel
          items={state.youMayLikethis}
          title='CON_YOU_MAY_LIKE_THIS'
        />
      ) : (
        ""
      )}
      {state.youMayLike?.realtedItemsList?.length > 0 ? (
        <YouMayLikeCarousel
          items={state.relatedItems}
          title='CON_RELATEDITEMS'
        />
      ) : (
        ""
      )}

      {state.youMayLike?.crossSellProductList?.length > 0 ? (
        <YouMayLikeCarousel
          items={state.youDontWantToMiss}
          title='CON_YOU_DONT_WANT_TO_MISS'
        />
      ) : (
        ""
      )}
    </>
  );
};

export default YouMayLike;
