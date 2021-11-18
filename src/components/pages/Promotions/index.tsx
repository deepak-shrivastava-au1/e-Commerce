import { Fragment } from "react";
import { respondTo } from "@utilities/styled-components";
import React, { useState, useContext } from "react";
import styled from "styled-components";
import Banner from "./Banner/Banner";
import BestOffer from "./Promotion/BestOffer";
import ProductOnSale from "./ProductOnSale/ProductOnSale";
import MostPopular from "./Promotion/MostPopular";
import DisclaimerText from "./Header/DisclaimerText";
import { WebSettingsContext } from "@providers/WebsettingsProvider";

interface Props {}

function HomePage(props: Props) {
  const webSettingsData: any = useContext(WebSettingsContext);
  const {} = props;

  return (
    <div>
      <DisclaimerText />
      <section>
        <div className='promotional-area'>
          <Banner />
        </div>
      </section>
      {webSettingsData?.showPromotionalItems ? (
        <div className='row'>
          <div className='col-lg-12'>
            <div className='best-offer-position'>
              <BestOffer />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className='row'>
        <div className='col-lg-12'>
          <ProductOnSale />
        </div>
      </div>
      {webSettingsData?.showMostPopularItems ? (
        <div className='row'>
          <div className='col-lg-12 most-popu-position'>
            <MostPopular />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default HomePage;
