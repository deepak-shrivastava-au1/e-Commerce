import React, { useContext, useEffect, useState } from 'react'
import SingleDatePicker from "@common/SingleDatePicker"
import Quantity from '@common/Quantity'
import altImage from '@images/awaited_image.png';
import { ClickAwayListener, useMediaQuery } from "@material-ui/core"
import Modal from "@common/Modal"
import { initializeCartLoader } from '@slices/cart/getTemporaryOrderData'
import styled from 'styled-components'
import { alignCenter, respondTo } from '@utilities/styled-components'
import {
  EditSVG,
  TrashForModalSVG,
  RefreshSaveSVG
} from "@icons"
import { rgba, cssVar } from "polished"
import moment, { Moment } from 'moment'
import { WebSettingsContext } from '@providers/WebsettingsProvider'
import { IuserWebSettings } from "@interfaces/userWebSettings"
import { fetchUpdateLineInCart, fetchDeleteLineFromCart } from '@slices/cart/getTemporaryOrderData'
import { breakpoints } from '@constants/styled-components';
import { UserCartContext } from '@providers/UserCartCtxProvider';
import Input from '@common/Input';
import Button from '@common/Button';
import LoadingOverlay from '@common/LoadingOverlay';
import Select from '@common/Select';
import { BASE_URL_IMAGE } from "@routers/AppRoute"
import { DETAILS } from '@constants/Routes';
import { Link } from 'react-router-dom';

const CartItemRow = styled.div`
  display: flex;
  padding:30px 0;
  position:relative;

  ${respondTo.xs`
    flex-direction:column;

    >:not(:last-child){
      margin-bottom:16px;
    }
    background-color:var(--white);
    padding:30px 16px;
  `}

  ${respondTo.sm`
    flex-direction:row;
    align-items: center;
    padding:34px 0;

    >:not(:last-child){
      margin-bottom:0px;
    }
  `}
`
const CartItemRowDetails = styled.span`
  display: flex;

  ${respondTo.sm`
    width: 30%;
  `}
  .brand{

    display:flex;
    flex-direction:column;
    width:100%;
    margin-left: 8px;
    /* padding: 5px; */

    &__name{
      text-transform: uppercase;
      /* width */
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

      &__remarks{
        cursor: pointer;
        margin-left: 19px;
        text-decoration: underline;
      }
    }
  }
`
const CartItemRowDelivery = styled.span`
  display: flex;
  /* width:15%; */
  font-weight: var(--font-weight-medium);
  justify-content: center;

  ${respondTo.xs`
    .date_with_edit{
      display: flex;
      align-items: center;
      margin-top:8px;
    }
    .edit_svg{
    margin-left:7px;
    cursor:pointer;
    }
    flex-direction:column;
  `}

  ${respondTo.md`
  .edit_svg{
    margin-left:5px;
    cursor:pointer;
     margin-top:0; 
    }
    flex-direction:row;
    align-items: center;
  `}
`
const CartItemQuantity = styled.span`
  display: flex;
  width:25%;

  ${respondTo.md`
    justify-content: center;    
  `}
`
const CartItemUnits = styled.span`
  display: flex;
  position:relative;
  align-items:center;   

  ${respondTo.xs`
    flex-grow:0;
    width:max-content;
  `}

  ${respondTo.sm`  
    justify-content: center;
    width:3%;
    flex-grow: 1;
  `}

  >select{
    width: 75%;
  }

  .refreshSVG{
    position:absolute;
    right:0;
    margin-right:-16px;
    cursor: pointer;

    ${respondTo.xs`
      margin-right:-35px;
    `}

    ${respondTo.sm`
      margin-right:-28px;
    `}
  }
`
const CartItemAmount = styled.span`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  font-weight: var(--font-weight-medium);
  color:var(--primary-color-2);

  ${respondTo.xs`
    flex-direction:column;

    .label-text{
      margin-bottom:8px;
    }
  `}

  ${respondTo.md`
    flex-direction:row;
    .label-text{
      margin-bottom:0px;
    }
  `}
`
const AddRemarks = styled.div`
  display:flex;
  align-items: center;
  width:100%;
  background-color: ${rgba(cssVar(`--primary-color-4`), 0.1)};
  padding:15px;

  >span{
    flex-grow:1;
    ${respondTo.sm`
      padding:10px;
    `}
    }

  ${respondTo.xs`
    flex-direction:column;
    margin-top:0px !important;
  `}

  ${respondTo.sm`
    flex-direction:row;
    margin-top:0px;
    height:100px;
  `}

  .update_btn{
    width: 100%; 

    ${respondTo.sm`
      margin-top: 10px;
    `}
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
const ErrorLine = styled.p`
  font-weight:var(--font-weight-bold);
  font-size:calc(var(--base-font-size) - 3px);
  position:absolute;
  left:0;
  top:0;
  color:var(--red)
`
const ErrorLineTwo = styled.p`
font-weight:var(--font-weight-bold);
font-size:calc(var(--base-font-size) - 3px);
position:absolute;
left:0;
top:15px;
color:var(--red)
`


function CartItem({ order, i, RemarkAddIndexList, handleRemarkIndexList }: any) {

  const {
    data: userCartData,
    FormattedCurrency,
    sessionId,
    loading,
    dispatch,
    setRecalculatedCartData,
    t }: any = useContext(UserCartContext);

  const webSettingsData: IuserWebSettings | null = useContext(WebSettingsContext);

  const [switchCalendar, setSwitchCalendar] = useState<Array<{
    status: boolean,
    focused: boolean,
    selectedDay: Moment,
    refreshPrice: { updatedUnit: string, updatedQuantity: number, status: boolean },
    remarks: { shipmentRemarks: string, lineText: string }
  }>>()

  const isMobile = useMediaQuery(`(max-width:${breakpoints.sm})`);

  const [deleteDialogStatus, setDeleteDialogStatus] = useState<boolean>(false);

  useEffect(() => {

    if (typeof userCartData !== "undefined" && userCartData !== null && Object.keys(userCartData).length !== 1) {

      setRecalculatedCartData(() => {
        return Object.values(userCartData?.orderLines).map((order: any) => {
          return {
            lineNumber: order.ivOrderLine.lineNumber,
            quantity: order.ivOrderLine.orderedQuantity,
            deliveryDate: ''
          }
        })
      })

      setSwitchCalendar(() => {

        return Object.values(userCartData?.orderLines).map((order: any, i: number) => {

          return {
            status: false,
            focused: false,
            selectedDay: moment(order.ivEnteredValues.Date, webSettingsData?.defaultDateFormat.toUpperCase()),
            refreshPrice: { updatedQuantity: order.ivOrderLine.orderedQuantity, status: false, updatedUnit: order.ivEnteredValues.Unit, },
            remarks: { shipmentRemarks: order.ivEnteredValues.ShipmentMark, lineText: order.ivEnteredValues.Text }
          }
        })
      })
    }
  }, [userCartData])


  const handleQuantityChange = (updateStatus: { type: 'quantity' | 'unit' | 'date', value: string | number | Moment | null | any }, i: number) => {

    const { type, value } = updateStatus;

    setSwitchCalendar((prevState: any) => {
      const copiedArr = [...prevState];

      if (type === 'quantity' && value !== copiedArr[i]["refreshPrice"]["updatedQuantity"]) {
        copiedArr[i]["refreshPrice"]["updatedQuantity"] = value;
        copiedArr[i]["refreshPrice"]["status"] = true;
      } else if (type === 'unit' && value !== copiedArr[i]["refreshPrice"]["updatedUnit"]) {
        copiedArr[i]["refreshPrice"]["updatedUnit"] = value;
        copiedArr[i]["refreshPrice"]["status"] = true;
      } else if (type === 'date') {
        copiedArr[i]["selectedDay"] = moment(value, 'M-D-YY');
        copiedArr[i]["refreshPrice"]["status"] = true;
        copiedArr[i]["status"] = false
      }

      return copiedArr;
    })
  }

  return (
    <>
      <CartItemRow key={`${order.ivOrderLine.itemCode}${i}`}>
        <ErrorLine> {order.ivOrderLine?.lineSalesRestMsg} </ErrorLine>
        { order.ivOrderLine?.fullQtyNotAvailableWarning?.length>0 ? <ErrorLineTwo>{order.ivOrderLine?.fullQtyNotAvailableWarning}</ErrorLineTwo> : null}
        {/* Item */}
        <CartItemRowDetails>
          {/* Item Image */}
          <ImageWrapper>
            <img
              src={`${BASE_URL_IMAGE}${order.ivOrderLine.imageUrl}`}
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
            <Link to={`${DETAILS}/${order.ivItem.code}`} style={{ color: "inherit" }}>
              <span className="brand__name">{order.ivOrderLine.itemDescription}</span>
            </Link>
            {/* Item Price */}
            <span className="brand__price">{FormattedCurrency(order.ivOrderLine.price)} </span>
            {/* Item Actions */}
            <div className="brand__actions">
              {/* Delete Action */}
              <span
                className="brand__actions__delete"
                onClick={() => setDeleteDialogStatus(true)}
              >
                {t('CON_DELETE')}
              </span>
              <Modal
                isAlert
                icon={<TrashForModalSVG className="primary-icon-1" />}
                title="Want to Delete ?"
                message="Are you sure you want to delete this ?"
                isOpen={deleteDialogStatus}
                onRequestClose={() => setDeleteDialogStatus(false)}
                onSecondaryButtonClick={() => {

                  dispatch(initializeCartLoader())

                  dispatch(fetchDeleteLineFromCart(
                    {
                      sessionId: sessionId,
                      lineNumber: order.ivOrderLine.lineNumber,
                      temporaryOrderNumber: order.ivOrderLine.temporaryOrderNumber
                    }))

                  setTimeout(() => {
                    setDeleteDialogStatus(false)
                  }, 1000);
                }}
                secondaryActionText={t('CON_DELETE')}
              />
              {/* Add Remarks Action */}
              <span className="brand__actions__remarks" onClick={() => handleRemarkIndexList(i)}>
                Add Remarks
              </span>
            </div>
          </div>
        </CartItemRowDetails>
        {/* Delivery Date */}
        <ClickAwayListener
          onClickAway={() => setSwitchCalendar((prevState: any) => {
            const copiedArr = [...prevState];
            copiedArr[i]["status"] = false
            return copiedArr;
          })}
        >
          <CartItemRowDelivery>

            {isMobile && <label className="label-text">{t('CON_DELIVERY_DATE')}</label>}

            {!switchCalendar?.[i]["status"]
              ? <div className="date_with_edit">
                <span>{switchCalendar?.[i]["selectedDay"]?.format("MM/DD/YY")}{order?.ivOrderLine?.isLateDispatch ? `(Late)` : null}</span>
                <span title={t('CON_EDIT')}>
                  <EditSVG
                    className="edit_svg primary-icon-4"
                    fill="none"
                    onClick={() => setSwitchCalendar((prevState: any) => {
                      const copiedArr = [...prevState];

                      copiedArr[i]["status"] = true
                      return copiedArr;
                    })}
                  />
                </span>
              </div>
              :
              <SingleDatePicker
                readOnly
                numberOfMonths={1}
                date={switchCalendar?.[i]["selectedDay"]}
                onDateChange={(day) => {
                  handleQuantityChange({ type: "date", value: day }, i)
                }}
                focused={switchCalendar?.[i]["focused"]}
                onFocusChange={({ focused }) => setSwitchCalendar((prevState: any) => {
                  const copiedArr = [...prevState];

                  copiedArr[i]["focused"] = focused
                  if (!focused) {
                    copiedArr[i]["status"] = false
                  }
                  return copiedArr;
                })}
                id={`${order.itemCode}${i}`}
              />
            }
          </CartItemRowDelivery>
        </ClickAwayListener>
        {/* Quantity */}
        <CartItemQuantity>
          <Quantity
            quantity={switchCalendar?.[i]["refreshPrice"]["updatedQuantity"]}
            isInvalid={switchCalendar?.[i]["refreshPrice"]["updatedQuantity"] === 0 || Number(switchCalendar?.[i]["refreshPrice"]["updatedQuantity"]) > Number(webSettingsData?.maxQuantity)}
            showLabel={!isMobile ? false : true}
            onChange={(quantity: any) => {
              handleQuantityChange({ type: "quantity", value: parseInt(quantity) }, i)
            }}
          />
        </CartItemQuantity>
        {/* Units */}
        <CartItemUnits>
          <Select
            className="select_unit"
            labelText="Unit"
            showLabel={!isMobile ? false : true}
            value={switchCalendar?.[i]["refreshPrice"]["updatedUnit"]}
            options={order.ivItem?.salesUnits.map((sale: any) => { return { label: sale, value: sale } })}
            onChange={(value) => {
              handleQuantityChange({ type: "unit", value: value }, i)
            }}
          />
          {
            // __ && to make sure current quantity set by use is not 0
            (switchCalendar?.[i]["refreshPrice"]["status"] && switchCalendar?.[i]["refreshPrice"]["updatedQuantity"] !== 0)
              ?
              <span
                title={t('CON_UPDATE')}
                className="refreshSVG"
              >
                <RefreshSaveSVG
                  width="29px"
                  height="29px"
                  className="primary-icon-2"
                  onClick={() => {
                    if (sessionId) {
                      dispatch(initializeCartLoader())
                      dispatch(fetchUpdateLineInCart(
                        {
                          sessionId: sessionId,
                          temporaryOrderNumber: order.ivOrderLine.temporaryOrderNumber,
                          lineNumber: order.ivOrderLine.lineNumber,
                          itemQuantity: switchCalendar?.[i]["refreshPrice"]["updatedQuantity"],
                          unitCode: switchCalendar?.[i]["refreshPrice"]["updatedUnit"],
                          deliveryDate:switchCalendar?.[i]["selectedDay"]?.format(webSettingsData?.defaultDateFormat.toUpperCase())
                        }))
                    }
                  }}
                />
              </span>
              :
              null
          }
        </CartItemUnits>
        {/* Amount */}
        <CartItemAmount>
          {isMobile && <label className="label-text">{t('CON_DELIVERY_DATE')}</label>}
          {!webSettingsData?.showOrderLineValueInclVAT ? FormattedCurrency(order.ivOrderLine.lineNetVal) : FormattedCurrency(order.ivOrderLine.lineVal)}
        </CartItemAmount>
      </CartItemRow>

      {RemarkAddIndexList[i] &&
        <AddRemarks>
          <span className="w-100">
            <Input
              labelText="Shipping Marking"
              showLabel={true}
              value={switchCalendar?.[i]["remarks"]["shipmentRemarks"]}
              style={{ background: 'white' }}
              onChange={(value) => {
                setSwitchCalendar((prevState: any) => {
                  const copiedArr = [...prevState];
                  copiedArr[i]["remarks"]["shipmentRemarks"] = value;
                  return copiedArr;
                })
              }}
            />
          </span>
          <span className="w-100">
            <Input
              labelText="Remarks"
              showLabel={true}
              style={{ background: 'white' }}
              value={switchCalendar?.[i]["remarks"]["lineText"]}
              onChange={(value) => {

                setSwitchCalendar((prevState: any) => {
                  const copiedArr = [...prevState];
                  copiedArr[i]["remarks"]["lineText"] = value;
                  return copiedArr;
                })
              }}
            />
          </span>
          <span>
            <Button
              variant="solid"
              className="update_btn"
              onClick={() => {
                dispatch(initializeCartLoader());

                dispatch(fetchUpdateLineInCart({
                  sessionId: sessionId,
                  lineNumber: order.ivOrderLine.lineNumber,
                  lineText: switchCalendar?.[i]["remarks"]["lineText"],
                  shipmentMark: switchCalendar?.[i]["remarks"]["shipmentRemarks"],
                  temporaryOrderNumber: order.ivOrderLine.temporaryOrderNumber,
                  itemQuantity: switchCalendar?.[i]["refreshPrice"]["updatedQuantity"],
                  unitCode: switchCalendar?.[i]["refreshPrice"]["updatedUnit"],
                  deliveryDate: switchCalendar?.[i]["selectedDay"]?.format(webSettingsData?.defaultDateFormat.toUpperCase())
                }))
              }}
            >
              Update
            </Button>
          </span>
        </AddRemarks>
      }

      <LoadingOverlay active={loading} />
    </>
  )
}

export default React.memo(CartItem)