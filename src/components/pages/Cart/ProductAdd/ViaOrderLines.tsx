import Input from '@common/Input'
import Select from '@common/Select'
import SingleDatePicker from '@common/SingleDatePicker'
import { UserCartContext } from '@providers/UserCartCtxProvider'
import moment, { Moment } from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { fetchGetItemValidateDetails } from '@slices/cart/getItemValidateDetails'
import Quantity from '@common/Quantity'
import { AddSVG, CartDeleteSVG, CartSVG } from '@icons'
import Button from '@common/Button'
import { useSelector } from 'react-redux'
import { fetchValidateItemsDetails, getValidateItemDetailsSuccess, initializeValidateItemDetailsLoader, setShouldCallValidateItemsAPI } from '@slices/cart/getValidateItemDetails'
import LoadingOverlay from '@common/LoadingOverlay'
import { addToCartSelector } from '@slices/cart/addToCart'
import { cssVar } from 'polished'
import { cartSelector, setLoading } from '@slices/cart/getTemporaryOrderData'


interface Props {
  productAddList: Array<{ id: any, itemCode: string, dateFocus: boolean, quantity: number, defaultUnit: string, units: Array<{ label: string, value: string }>, deliveryDate: Moment, shippingMarks: string }>
  setproductAddList: React.Dispatch<React.SetStateAction<{
    id: any;
    itemCode: string;
    dateFocus: boolean;
    quantity: number;
    defaultUnit: string,
    units: Array<{ label: string, value: string }>;
    deliveryDate: Moment;
    shippingMarks: string;
  }[]>>,
  invalidProductList: Array<{ itemId: string, quantity: number }>,
  setInvalidProductList: React.Dispatch<React.SetStateAction<{
    itemId: string;
    quantity: number;
  }[]>>
  defaultMethod: "via_line" | "via_copy_and_paste"
  validateItemsLoader: any
  validatedItemsDetails: any,
  setAddToCartStatus: any
}

const CardBodyParent = styled.div`
.card-tbody .row {
  padding-right:0;
  padding-left:0;
  margin:0;
}

.card-thead .row {
  padding-right:0;
  padding-left:0;
  margin:0;
}

`
const ErrorText = styled.p`
  position:absolute;
  top:0;
  left:0;
  margin-left:10px;
  color: red; 
  font-weight: bold; 
  font-size: 9px;
  /* margin-top:-15px; */
 /*  z-index:9999; */
`

function ViaOrderLines(props: Props) {

  const {
    productAddList,
    setproductAddList,
    setInvalidProductList,
    invalidProductList,
    validateItemsLoader,
    setAddToCartStatus,
    validatedItemsDetails } = props;

  const { dispatch, sessionId, t, webSettings }: any = useContext(UserCartContext);

  const { messageCode } = useSelector(addToCartSelector);

  const AfterValidationErrorLine = ({ index }: { index: number }) => {

    if (!validatedItemsDetails || !validatedItemsDetails[index]) {
      return <></>
    }
    if (validatedItemsDetails?.[index]?.isDeliveryDateError) {
      return <ErrorText> {t('MSG_INVALID_DATE')} </ErrorText>
    } else if (validatedItemsDetails?.[index]?.isItemCodeError) {
      return <ErrorText> {t('MSG_ACCESS_DENIED_ITEM')} </ErrorText>
    } else if (validatedItemsDetails?.[index]?.isUnitCodeError) {
      return <ErrorText> invalid Unit Code </ErrorText>
    } else if (!validatedItemsDetails?.[index]?.isBuyAllowed) {
      return <ErrorText> Buy not allowed </ErrorText>
    } else {
      return <></>
    }
  }

  const titleList = [
    'COH_ITEM',
    'COH_QUANTITY',
    'COH_UNIT',
    'COH_REQUESTED_DELIVERY_DATE',
    'CON_SHIPMENT_MARKING',
    ''
  ]

  // Hook to revert loading state to falsy upon dismount
  useEffect(() => {
    return () => {
      dispatch(setLoading(false))
    }
  }, [])

  // Hook to revert loading state to falsy upon failure on adding item to cart
  useEffect(() => {
    if(messageCode!==0 || messageCode!==null ){
      dispatch(setLoading(false))
    }
  }, [messageCode])

  return (
    <>
      <CardBodyParent>
        <div className="card-table" style={{ marginLeft: "50px" }}>
          <div className="card-thead">
            <div className="row">
              {
                titleList.map((title, i) => (
                  <div className="col" key={`${title}${i}`}>
                    <div className="d-flex">
                      <div className="col-title">{t(title)}</div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
          <div className="card-tbody">
            {
              productAddList.map(((row, index) => (
                <>
                  <div className="row" key={row.id} style={{ position: "relative" }}>
                    {<AfterValidationErrorLine {...{ index }} />}
                    {/* Product code */}
                    <div className="col">
                      <div className="flex-container" style={{ width: "100%" }}>
                        <Input
                          value={row.itemCode}
                          onChange={(value) => {
                            setproductAddList(prevState => {
                              const copiedArr = [...prevState];
                              copiedArr[index].itemCode = value;
                              return copiedArr;
                            })
                          }}
                          onBlur={() => {
                            if (!productAddList[index]?.itemCode.length) {

                              setInvalidProductList(prevState => {
                                const copiedArr = [...prevState];
                                return copiedArr.filter(item => item.itemId !== row.id)
                              })
                            }
                            if (productAddList[index]?.itemCode) {
                              dispatch(fetchGetItemValidateDetails(sessionId, index, row.id, row.itemCode, 'CART'))
                            }
                          }}
                          validationErrorText={t('MSG_ACCESS_DENIED_ITEM')}
                          isInvalid={invalidProductList.filter(product => product.itemId === row.id)?.length > 0}
                        />
                      </div>
                    </div>
                    {/* Quantity */}
                    <div className="col" >
                      <div className="flex-container" style={{ width: "100%" }}>
                        <Quantity
                          showLabel={false}
                          isInvalid={parseInt(`${row.quantity}`)===0}
                          quantity={row.quantity}
                          onChange={(value: any) => {
                            setproductAddList(prevState => {
                              const copiedArr = [...prevState];
                              copiedArr[index].quantity = value;
                              return copiedArr;
                            })
                          }}
                        />
                      </div>
                    </div>
                    {/* Unit */}
                    <div className="col" >
                      <div className="flex-container" style={{ width: "100%" }}>
                        <Select
                          value={row.defaultUnit}
                          options={row.units}
                          onChange={(value: any) => {
                            setproductAddList(prevState => {
                              const copiedArr = [...prevState];
                              copiedArr[index].defaultUnit = value;
                              return copiedArr;
                            })
                          }}
                        />
                      </div>
                    </div>
                    {/* Delivery Date */}
                    <div className="col" style={{ overflow: "visible" }}>
                      <div className="flex-container" style={{ width: "100%" }}>
                        <SingleDatePicker

                          readOnly
                          numberOfMonths={1}
                          date={row.deliveryDate}
                          placeholder="m/d/YY"
                          onDateChange={(date) => {
                            setproductAddList((prevState: any) => {
                              const copiedArr = [...prevState];
                              copiedArr[index].deliveryDate = date;
                              return copiedArr;
                            })
                          }}
                          focused={row.dateFocus}
                          onFocusChange={({ focused }) => {
                            setproductAddList(prevState => {
                              const copiedArr = [...prevState];
                              copiedArr[index].dateFocus = focused;
                              return copiedArr;
                            })
                          }}
                          id={row.id}
                        />
                      </div>
                    </div>
                    {/* Shipment marking */}
                    <div className="col" >
                      <div className="flex-container" style={{ width: "100%" }}>
                        <Input
                          value={row.shippingMarks}
                          onChange={(value) => {
                            setproductAddList(prevState => {
                              const copiedArr = [...prevState];
                              copiedArr[index].shippingMarks = value;
                              return copiedArr;
                            })
                          }}
                        />
                      </div>
                    </div>
                    {/* Delete Button */}
                    <div className="col d-flex justify-content-center">
                      <Button
                        iconOnly
                        color="neutral"
                        variant="outlined"
                        title={t('CON_DELETE')}
                        onClick={() => {

                          const v_=validatedItemsDetails?.filter((_:any,i:number)=>i!==index)

                          dispatch(setShouldCallValidateItemsAPI(false));

                          dispatch(getValidateItemDetailsSuccess(v_))

                          setInvalidProductList(prevState => {
                            const copiedArr = [...prevState];
                            return copiedArr.filter(item => item.itemId !== row.id)
                          })

                          setproductAddList(prevState => {
                            const copiedArr = [...prevState];
                            return copiedArr.filter(item => item.id !== row.id)
                          })
                        }}
                        style={{ border: "0" }}
                      >
                        <u style={{
                          marginLeft: "7px",
                          color: `${cssVar('--primary-color-4')}`,
                          fontWeight: Number(cssVar('--font-weight-regular')),
                          fontSize:`${cssVar('--base-font-size')}`
                        }}
                        >{t('CON_DELETE')}</u>
                      </Button>
                      {/* </div> */}
                    </div>
                  </div>
                </>
              )))
            }

          </div>

          <div className="action_button">
            {/* Add to Cart button */}
            <Button
              onClick={() => {

                dispatch(initializeValidateItemDetailsLoader());

                const itemDataToDispatch = productAddList.map(product => {
                  return {
                    itemCode: product.itemCode,
                    unitCode: product.defaultUnit,
                    page: "CART",
                    shipmentMark: product.shippingMarks,
                    deliveryDate: product.deliveryDate?.format(webSettings?.defaultDateFormat.toUpperCase())
                  }
                })
                dispatch(setShouldCallValidateItemsAPI(true));

                dispatch(setLoading(true))

                dispatch(fetchValidateItemsDetails(sessionId, itemDataToDispatch))

                setAddToCartStatus(true)
              }}
              disabled={invalidProductList?.length > 0 || !productAddList.length || !productAddList}
              style={{ marginRight: "10px" }}
            >
              <CartSVG className="secondary-icon-2 icon-lg" />
              <span style={{ marginLeft: "9px" }}>{t('CON_ADD_TO_CART')}</span>
            </Button>
            {/* Add More Button */}
            <Button
              variant="outlined"
              color="neutral"
              onClick={() => {
                setproductAddList(prevState => {
                  const copiedArr = [...prevState];
                  copiedArr.push({
                    id: `${Date.now()}`,
                    itemCode: '',
                    dateFocus: false,
                    deliveryDate: moment(),
                    quantity: 0,
                    shippingMarks: "",
                    defaultUnit: '',
                    units: [{ label: '', value: '' }]
                  })
                  return copiedArr;
                })
              }}
            >
              <AddSVG className="icon" />
              <span>{t('CON_ADDMORE')}</span>
            </Button>

            <LoadingOverlay active={validateItemsLoader} />
          </div>
        </div>
      </CardBodyParent>
    </>
  )
}

export default ViaOrderLines
