import { DrawerContent } from '@pages/Cart/ShoppingCart/TermsAndCondn'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Drawer from '@material-ui/core/Drawer';
import { Close, NoData, SearchIcon, AddSVG } from '@icons';
import { cssVar } from 'polished';
import { RequestSubmitCtx } from '../CtxProvider';
import Input from '@common/Input';
import styled from 'styled-components'
import { fetchProducts, getproductsSuccess, intitalizeLoader, productsSelector, stopLoader } from '@slices/Products/productSearch';
import { useSelector } from 'react-redux';
import { alignCenter, respondTo } from '@utilities/styled-components';
import { BASE_URL_IMAGE } from '@routers/AppRoute';
import altImage from '@images/awaited_image.png';
import { Link } from 'react-router-dom';
import { DETAILS } from '@constants/Routes';
import Button from '@common/Button';
import LoadingOverlay from '@common/LoadingOverlay';
import { fetchAddItemsToList, initializeAddItemsToListLoader } from '@slices/shoppingLists/addItemsToList'

const DrawerBody = styled.div`
  padding: 30px 20px;
  overflow: auto;
`
const InputSearch = styled.div`
  position:relative;
  display: flex;
  align-items: center;

  >svg{
    position:absolute;
    right: 0;
    top:18%;
    margin-right:8px;
    cursor: pointer;
  }
`
const CardRow = styled.div`

`
const ItemDetails = styled.span`
  display: flex;

  ${respondTo.sm`
    width: 30%;
  `}
  .brand{

    display:flex;
    flex-direction:column;
    width:100%;
    margin-left: 8px;
    justify-content: space-around;

    &__name{
      text-transform: uppercase;
      /* width */
    }

    &__desc{
    color:var(--primary-color-3);
    font-size:calc(var(--base-font-size) - 2px);
    }

    &__price{
      margin-top:4px;
      font-weight:var(--font-weight-medium);
    }

    &__actions{

      display: flex;
      font-size:calc(var(--base-font-size) - 2px);
      margin-top:12px;

      &__delete{
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
`
const ImageWrapper = styled.div`
  ${alignCenter}
  padding:5px;
  width:60px;
  height:60px;
  border:var(--thin-border) var(--form-base-color);
  border-radius:var(--border-radius);

  >img{
    object-fit: cover;
    width:100%;
  }
`

export default function ProductSearch({
  status,
  handleStatus,
}: {
  status: boolean
  handleStatus: React.Dispatch<React.SetStateAction<boolean>>
}) {

  const { t, dispatch, isMobile, productsList, webSettings, setProductsList,filterData } = useContext(RequestSubmitCtx);

  const { products, loading } = useSelector(productsSelector);

  const [isSearching, setIsSearching] = useState(false)

  const [query, setQuery] = useState("");

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    dispatch(stopLoader())

    handleStatus(open);
  };

  const handleSearch = () => {

    const safe__query = query.trim();

    setIsSearching(true)

    dispatch(intitalizeLoader())

    dispatch(fetchProducts(safe__query, 1, webSettings?.languageCode))
  }

  useEffect(() => {
    dispatch(stopLoader())

    return () => {
      setIsSearching(false)
      dispatch(stopLoader())
    }
  }, [])

  return (
    <>
      <Drawer
        anchor={'right'}
        open={status}
        onClose={() => {
          setIsSearching(false)
          dispatch(stopLoader())
          handleStatus(false);
        }}
      >
        <LoadingOverlay active={loading} />

        <DrawerContent style={{ width: !isMobile ? "600px" : "100vw" }}>
          <div className="header">
            <p className='title'>{t('CON_ADD_PRODUCTS')}</p>
            <Close
              width='15px'
              height="15px"
              className="primary-icon-3"
              onClick={toggleDrawer(false)}
            />
          </div>
          <DrawerBody>
            <InputSearch>
              <Input
                showLabel={false}
                spellCheck={false}
                placeholder={t('CON_SEARCH')}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    handleSearch()
                  }
                }}
                onChange={(value) => setQuery(value)}
                labelText="Search Product"
              />
              <SearchIcon
                onClick={handleSearch}
              />
            </InputSearch>

            {/* Search Result Table */}
            <div className="card-table">
              {/* Shopping List Head */}
              <div className="card-thead">
                <div className="row">
                  <div className="col head_title">
                    {t('CON_ITEM')}
                  </div>
                  <div className="col head_title">{t('CON_PRICE')}({webSettings?.currencyCode})</div>
                  <div className="col head_title">{t('CON_UNIT')}</div>
                  <div className="col head_title" style={{ maxWidth: "112px" }}></div>
                </div>
              </div>
              {/* Shopping List Body */}
              <div className="card-tbody">
                {/* Render if no shopping list exist for current list ID */}
                {
                  products?.messageCode === 111 && isSearching ?
                    <div className="d-flex flex-column justify-content-center align-items-center mt-10">
                      <NoData className="primary-icon-1" />
                      <span>{t('CON_NO_DATA_FOUND')}</span>
                    </div>
                    : null
                }
                {
                  products?.solrItemSearchListBean?.map((product: any, i: number) => (
                    <CardRow className="row" key={`${i}${product?.solrItemCode}`}>
                      <ItemDetails className="col">
                        <div className="d-flex">
                          {/* Item Image */}
                          <ImageWrapper>
                            <img
                              src={`${BASE_URL_IMAGE}${product?.imageUrl}`}
                              alt="cartItemImg"
                              onError={(e: any) => {
                                e.target.onerror = null;
                                e.target.src = altImage;
                              }}
                            />
                          </ImageWrapper>
                          {/* Item Details */}
                          <div className="brand">
                            {/* Item Name */}
                            <Link to={`${DETAILS}/${product?.solrItemCode}`} style={{ color: "inherit" }}>
                              <span className="brand__name">{product?.solrItemCode}</span>
                            </Link>
                            <span className="brand__desc">{product?.itemDescription}</span>
                          </div>
                        </div>
                      </ItemDetails>
                      <div className="col">
                        <div className="flex-container">
                          {product?.actualPrice}
                        </div>
                      </div>
                      <div className="col">
                        <div className="flex-container">
                          {product?.itemUnitCode}
                        </div>
                      </div>
                      <div className="col" style={{ maxWidth: "112px" }}>
                        <div className="flex-container">
                          <Button
                            onClick={() => {
                              setProductsList(prevState => {
                                const copiedState = [...prevState];
                                copiedState.push({
                                  code: product?.solrItemCode,
                                  itemNumberOfDecimalsAllowed:[0],
                                  restricted:'',
                                  desc: "",
                                  quantity: 1,
                                  Line:productsList.length+10,
                                  requestType: filterData?.submitRequestType?.[0].code,
                                  unit: product?.salesUnitsDesc?.map((unit: any) => { return { label: unit?.salesUnitDesc, value: unit?.salesUnit } }),
                                  defaultUnit:product?.itemUnitCode,
                                  productDesc:product?.itemDescription,
                                  requestTypeDesc:filterData?.submitRequestType?.[0].description
                                })
                                return copiedState
                              })

                              handleStatus(false)
                            }}
                          >
                            <AddSVG className="icon" />
                            {t('CON_ADD')}
                          </Button>
                        </div>
                      </div>
                    </CardRow>
                  ))
                }
              </div>
            </div>
          </DrawerBody>
        </DrawerContent>

      </Drawer>
    </>
  )
}
