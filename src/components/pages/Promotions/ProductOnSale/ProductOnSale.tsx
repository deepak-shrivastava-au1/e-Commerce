import React, { useContext } from 'react';
import { useMediaQuery } from '@material-ui/core';
import { breakpoints } from '../../../../constants/styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import LoadingOverlay from '@common/LoadingOverlay';

import ProductsOnSaleGrid from './ProductsOnSaleGrid';
import { WebSettingsContext } from '@providers/WebsettingsProvider';
import {
  productsOnSaleSelector,
  fetchproductsOnSale,
  intitalizeLoader,
} from '@slices/Promotions/productsOnSale';

const ProductOnSale = () => {
  const dispatch = useDispatch();
  const state = useSelector(productsOnSaleSelector);
  const loading = state.loading;

  const webSettingsData: any = useContext(WebSettingsContext);

  const isMobile = useMediaQuery(`(min-width:${breakpoints.sm})`);
  useEffect(() => {
    dispatch(intitalizeLoader());
    dispatch(fetchproductsOnSale(webSettingsData?.languageCode));
  }, [dispatch]);

  return (
    <section className='section-content padding-y prod-on-sale-position'>
      <div className='container'>
        <div className='row'>
          <ProductsOnSaleGrid
            products={state?.productsOnSale}
            loading={false}
            hasErrors={false}
          />
        </div>
      </div>
      <LoadingOverlay active={loading} />
    </section>
  );
};

export default ProductOnSale;
