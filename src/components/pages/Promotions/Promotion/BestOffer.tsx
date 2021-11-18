import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  bestOfferSelector,
  fetchbestOffer,
} from '@slices/Promotions/bestOffer';

import PromotionCarousel from './PromotionCarousel';

const BestOffer = () => {
  const dispatch = useDispatch();
  const state = useSelector(bestOfferSelector);

  useEffect(() => {
    dispatch(fetchbestOffer());
  }, [dispatch]);

  if (state.bestOffer?.length > 0) {
    return (
      <PromotionCarousel
        items={state.bestOffer}
        viewText=' Explore from our wide range of Best Offer'
        title='CON_BEST_OFFERS'
      />
    );
  } else {
    return <></>;
  }
};

export default BestOffer;
