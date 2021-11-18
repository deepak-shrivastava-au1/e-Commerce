import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  fetchmostPopular,
  mostPopularSelector,
} from "../../../../redux/Slices/Promotions/mostPopular";
import PromotionCarousel from "./PromotionCarousel";

const MostPopular = () => {
  const dispatch = useDispatch();
  const state = useSelector(mostPopularSelector);

  useEffect(() => {
    dispatch(fetchmostPopular());
  }, [dispatch]);

  if (state.mostPopular?.length > 0) {
    return (
      <PromotionCarousel
        items={state.mostPopular}
        viewText=' Explore from our wide range of Most Popular Products'
        title='CON_MOST_POPULAR'
      />
    );
  } else {
    return <></>;
  }
};

export default MostPopular;
