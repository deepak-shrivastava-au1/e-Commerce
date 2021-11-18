import React, { useContext } from "react";
import * as Constants from "../../../../constants/Constants";
import { BASE_URL_IMAGE } from "@routers/AppRoute";
import { WebSettingsContext } from "../../../../redux/Providers/WebsettingsProvider";
import altImage from "../../../../assets/images/awaited_image.png";

import DrawerModal from "../../../fragments/DrawerModal";
import styled from "styled-components";
import { useMediaQuery } from "@material-ui/core";
import { breakpoints } from "../../../../constants/styled-components";
import Button from "../../../common/Button";
import { useTranslation } from "react-i18next";
import { DETAILS } from "@constants/Routes";
import { Link } from "react-router-dom";
import { CATALOG } from "@constants/Routes";
import { useHistory } from "react-router-dom";

interface IProps {
  products: any;
  loading: boolean;
  hasErrors: boolean;
}

const ProductsOnSaleGrid = (props: IProps) => {
  const showPaginationComponent = useMediaQuery(
    `(min-width:${breakpoints.md})`
  );
  const isMobile = useMediaQuery(`(max-width:${breakpoints.sm})`);
  const webSettingsData: any = useContext(WebSettingsContext);

  const { t, i18n } = useTranslation();
  const history = useHistory();

  const viewAllClicked = () => {
    history.push(`${CATALOG}/HOME_CAT/`);
  };

  return (
    <div style={{ width: "100%" }} className=''>
      <Header>
        <p>{t("CON_PRODUCTS_SALE")}</p>
        <Button onClick={() => viewAllClicked()}>
          <span>{t("CON_VIEW_ALL")}</span>
        </Button>
      </Header>
      <GridContainer>
        {props.products?.map((product: any) => {
          return (
            <CardProductGrid key={product.code} className='card'>
              <Link to={`${DETAILS}/${encodeURIComponent(product?.code)}`}>
                <ImageWrapper>
                  <img
                    className='img-fluid product-img'
                    src={BASE_URL_IMAGE + product.imageUrl}
                    onError={(e: any) => {
                      e.target.onerror = null;
                      e.target.src = altImage;
                    }}
                  />
                </ImageWrapper>
              </Link>
              <InfoWrapper>
                <ProductCodeGroup>
                  <Link to={`${DETAILS}/${encodeURIComponent(product?.code)}`}>
                    <Code className='label'>{product.code}</Code>
                  </Link>
                  {!isMobile ? (
                    <DrawerModal
                      onAddItemToCartHandler={() => {}}
                      QuickViewPOS={true}
                      className='mobile-hide iconSecondaryColor'
                      discountPrice={product?.discountPrice}
                      imageUrl={BASE_URL_IMAGE + product.imageUrl}
                      productId={product?.code}
                      productDescription={product?.description}
                      itemStandardPrice={product?.actualPrice}
                      salesUnit={product?.salesUnitsDesc.map((address: any) => {
                        return {
                          label: address.salesUnit,
                          value: address.salesUnitDesc,
                        };
                      })}
                    />
                  ) : (
                    ""
                  )}
                </ProductCodeGroup>

                <div>
                  <Link to={`${DETAILS}/${encodeURIComponent(product?.code)}`}>
                    <Desc>{product.description}</Desc>
                  </Link>
                  <Price className='mt-2'>
                    {webSettingsData?.allowDiscountDisplay ==
                    "*DISCOUNT_PRICE" ? (
                      <span className='price'>
                        {webSettingsData?.showCurrencySymbolBefore
                          ? webSettingsData?.currencyCode +
                            " " +
                            product.discountPrice
                          : product.discountPrice +
                            " " +
                            webSettingsData?.currencyCode}
                      </span>
                    ) : webSettingsData?.allowDiscountDisplay ==
                      "*ACTUAL_PRICE" ? (
                      <span className='price'>
                        {webSettingsData?.showCurrencySymbolBefore
                          ? webSettingsData?.currencyCode +
                            " " +
                            product.actualPrice
                          : product.actualPrice +
                            " " +
                            webSettingsData?.currencyCode}
                      </span>
                    ) : webSettingsData?.allowDiscountDisplay ==
                      "*ALL_PRICE" ? (
                      product.actualPrice && product.discountPrice ? (
                        <span>
                          <span className='price'>
                            {webSettingsData?.showCurrencySymbolBefore
                              ? webSettingsData?.currencyCode +
                                " " +
                                product.discountPrice
                              : product.discountPrice +
                                " " +
                                webSettingsData?.currencyCode}
                          </span>
                          <del
                            className='price-old'
                            style={{ paddingLeft: "5px" }}
                          >
                            {webSettingsData?.showCurrencySymbolBefore
                              ? webSettingsData?.currencyCode +
                                " " +
                                product.actualPrice
                              : product.actualPrice +
                                " " +
                                webSettingsData?.currencyCode}
                          </del>
                        </span>
                      ) : product.discountPrice ? (
                        <span className='price'>
                          {webSettingsData?.showCurrencySymbolBefore
                            ? webSettingsData?.currencyCode +
                              " " +
                              product.discountPrice
                            : product.discountPrice +
                              " " +
                              webSettingsData?.currencyCode}
                        </span>
                      ) : product.actualPrice ? (
                        <span className='price'>
                          {webSettingsData?.showCurrencySymbolBefore
                            ? webSettingsData?.currencyCode +
                              " " +
                              product.actualPrice
                            : product.actualPrice +
                              " " +
                              webSettingsData?.currencyCode}
                        </span>
                      ) : (
                        ""
                      )
                    ) : webSettingsData?.allowDiscountDisplay == "*ALL" ? (
                      product.actualPrice &&
                      product.discountPrice &&
                      product.discountPercentage ? (
                        <span>
                          <span className='price'>
                            {webSettingsData?.showCurrencySymbolBefore
                              ? webSettingsData?.currencyCode +
                                " " +
                                product.discountPrice +
                                " " +
                                product.discountPercentage +
                                "%"
                              : product.discountPrice +
                                " " +
                                webSettingsData?.currencyCode +
                                " " +
                                product.discountPercentage +
                                "%"}
                          </span>
                          <del
                            className='price-old'
                            style={{ paddingLeft: "5px" }}
                          >
                            {webSettingsData?.showCurrencySymbolBefore
                              ? webSettingsData?.currencyCode +
                                " " +
                                product.actualPrice
                              : product.actualPrice +
                                " " +
                                webSettingsData?.currencyCode}
                          </del>
                        </span>
                      ) : product.actualPrice && product.discountPrice ? (
                        <span>
                          <span className='price'>
                            {webSettingsData?.showCurrencySymbolBefore
                              ? webSettingsData?.currencyCode +
                                " " +
                                product.discountPrice
                              : product.discountPrice +
                                " " +
                                webSettingsData?.currencyCode}
                          </span>
                          <del
                            className='price-old'
                            style={{ paddingLeft: "5px" }}
                          >
                            {webSettingsData?.showCurrencySymbolBefore
                              ? webSettingsData?.currencyCode +
                                " " +
                                product.actualPrice
                              : product.actualPrice +
                                " " +
                                webSettingsData?.currencyCode}
                          </del>
                        </span>
                      ) : product.discountPrice ? (
                        <span className='price'>
                          {webSettingsData?.showCurrencySymbolBefore
                            ? webSettingsData?.currencyCode +
                              " " +
                              product.discountPrice
                            : product.discountPrice +
                              " " +
                              webSettingsData?.currencyCode}
                        </span>
                      ) : product.actualPrice ? (
                        <span className='price'>
                          {webSettingsData?.showCurrencySymbolBefore
                            ? webSettingsData?.currencyCode +
                              " " +
                              product.actualPrice
                            : product.actualPrice +
                              " " +
                              webSettingsData?.currencyCode}
                        </span>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </Price>
                  <div className='mt-2'>
                    <span>
                      {t("CON_AVAILABLE")} :{product.availQty}
                    </span>
                  </div>
                </div>
              </InfoWrapper>
            </CardProductGrid>
          );
        })}
      </GridContainer>
    </div>
  );
};

export default ProductsOnSaleGrid;

const GridContainer = styled.div`
  display: grid;
  gap: 0px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  @media (min-width: 1450px) {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
  @media (max-width: 750px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 600px) {
    gap: 0px;
  }
`;

const Label = styled.a`
  font-size: var(--base-font-size);
  font-weight: calc(var(--base-font-size) + 2);
  color: var(--primary-color-2);
  opacity: var(--medium-opacity);
`;

const ButtonOverlay = styled.a`
  transition: 0.5s;
  opacity: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  padding: 5px 0;
  text-align: center;
  position: absolute;
  background: var(--gray-5);
  border: var(--thin-border) var(--primary-color-1);
  color: var(--primary-color-1);
  box-sizing: border-box;
  border-radius: var(--border-radius);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const CardProductGrid = styled.figure`
  margin-bottom: 1px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 8px;

  .row-img {
    height: 100px;
    width: 100px;
  }
`;

const Code = styled.a`
  color: var(--primary-color-2) !important;
  opacity: var(--medium-opacity);
  .label {
    color: var(--primary-color-2) !important;
    a {
      color: var(--primary-color-2) !important;
    }
  }
`;
const Desc = styled.a`
  color: var(--primary-color-2);
`;
const Price = styled.div`
  font-weight: var(--font-weight-bold);
  .price-old {
    font-weight: var(--font-weight-regular);
    opacity: var(--high-opacity);
  }
`;
const InfoWrapper = styled.figcaption`
  overflow: hidden;
  padding: 10px 20px;
  text-align: left;
`;

const ImageWrapper = styled.div`
  overflow: hidden;
  position: relative;
  border-radius: 0.2rem 0.2rem 0 0;

  object-fit: contain;
  @media (max-width: 600px) {
    max-height: 190px;
  }

  > img {
    padding: 10px;
    min-width: 100%;
    max-height: 240px;
    max-width: 100%;
    display: inline-block;
    object-fit: contain;
  }

  &:hover ${ButtonOverlay} {
    opacity: var(--high-opacity);
  }

  &:hover {
    transform: scale(1.05);
    transition: var(--transition05s);
  }
`;

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--primary-color-2);
  margin-left: 3px;
  font-size: 85%;

  > span {
    font-weight: var(--bold-font);
    font-size: var(--medium-font-size);
    color: var(--primary-color-1);
  }

  > del {
    color: var(--primary-color-2);
    margin-left: 10px;
    font-size: 85%;
  }
`;

const Description = styled.a`
  margin-bottom: 0;
  font-size: var(--base-font-size);
  line-height: 1.5;
`;

const Title = styled.p`
  text-align: left;
  font-size: calc(var(--base-font-size) + 10px);
  font-weight: var(--font-weight-bold);
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  > :not(:last-child) {
    margin-bottom: 9px;
  }
`;

const StockWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: var(--base-font-size);
  > .availablilty {
    color: #2f3c46;
    opacity: 0.8;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  > p {
    font-size: 24px;
    font-weight: var(--font-weight-bold);
    margin-bottom: 0px;
  }
  > Button {
    width: 90px;
    margin: 10px 0px;
    font-size: var(--base-font-size);
    font-weight: var(--font-weight-medium);
    text-transform: inherit;
    background-color: var(--white);
    color: var(--primary-color-1);
    border: var(--thicker-border) var(--primary-color-1);

    &:hover {
      color: var(--white);
    }
  }
`;

const ProductCodeGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;
