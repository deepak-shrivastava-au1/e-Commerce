import { useContext, useEffect, useState } from 'react'
import Button from '@common/Button'
import { cssVar, rgba } from 'polished'
import styled from 'styled-components'
import moment, { Moment } from 'moment'
import { UserCartContext } from '@providers/UserCartCtxProvider'
import LoadingOverlay from '@common/LoadingOverlay'
import { ArrowLeft, CloseSVG, CopySVG } from '@icons'
import { Link, useLocation } from 'react-router-dom'
import ViaOrderLines from './ViaOrderLines'
import ViaCopyPaste from './ViaCopyPaste'
import { getItemValidateDetailsSuccess, ItemValidateDetailsSelector, setItemId, setQuantity, setRow } from '@slices/cart/getItemValidateDetails'
import { useSelector } from 'react-redux'
import ScrollToTop from '@common/ScrollToTop'
import { getValidateItemDetailsSuccess, setValidateItemsMessageCode, validateItemDetailsSelector } from '@slices/cart/getValidateItemDetails'
import { setAddCartItemStatus, setLoading } from '@slices/cart/getTemporaryOrderData'
import { addToCart } from '@actions/cart/addToCart'
import Modal from '@common/Modal'
import AddItemToCart from '../ShoppingCart/AddItemToCart'
import { orderhistorydetailSelector } from '@slices/Enquiry/Order/orderHistoryDetail'
import { CART } from '@constants/Routes'

const Card = styled.div`
  display:flex;
  flex-direction:column;
  border-radius: var(--border-radius);
  background-color: var(--white);
`

const Header = styled.div`
  display:flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
`
const MainHeader = styled.div`
  font-weight: var(--font-weight-bold);
  font-size:calc(var(--base-font-size) + 4px);
  padding:24px;
  border-bottom:var(--thin-border) ${rgba(cssVar(`--primary-color-4`), 0.2)};
`
const Content = styled.div`
  padding:24px;

  .formatting_title{
    font-weight: var(--font-weight-bold);
  }
  .value_delimiter{
    display:flex;
    align-items: center;
    color:var(--primary-color-4);
    margin-bottom:24px;

    &_title{
      margin-right: 10px;
    }
  }

  .delivery_date_format{
    font-weight:var(--font-weight-bold);
  }

  .form-group{
    margin-bottom:0;
  }

  .action_button{
    display:flex;
    justify-content: flex-end;
  }
`

function Index() {

  const location = useLocation();

  const referrer = new URLSearchParams(location?.search).get('referal');

  const { setDefaultScreen, dispatch, loading, t, sessionId, webSettings, data: userCart, addCartItemStatus }: any = useContext(UserCartContext);

  const [productAddList, setproductAddList] = useState<Array<{ id: any, itemCode: string, dateFocus: boolean, defaultUnit: string, units: Array<{ label: string, value: string }>, quantity: number, deliveryDate: Moment, shippingMarks: string }>>([])

  const [defaultMethod, setDefaultMethod] = useState<"via_line" | "via_copy_and_paste">("via_line")

  const [valueLimiter, setValueLimiter] = useState(',');

  const [orderLines, setOrderLines] = useState<string>('');

  const ItemValidateDetails = useSelector(ItemValidateDetailsSelector);

  const [invalidProductList, setInvalidProductList] = useState<Array<{ itemId: string, quantity: number }>>([]);

  const { row, itemId, data, quantity } = useSelector(ItemValidateDetailsSelector);

  const [addToCartStatus, setAddToCartStatus] = useState<boolean>(false)

  const { loading: validateItemsLoader, data: validatedItemsDetails, shouldCallAPI } = useSelector(validateItemDetailsSelector);

  const { orderdetail } = useSelector(orderhistorydetailSelector)?.orderHistoryDetail;

  const [isQuantityError, setIsQuantityError] = useState(false);

  useEffect(() => {
    if (addCartItemStatus && addCartItemStatus?.length > 0 && addCartItemStatus?.some((item: any) => item?.messageCode === 3132)) {
      setIsQuantityError(true)
    }
  }, [userCart])

  // INFO Hook to look for default method of addition of lines to cart
  useEffect(() => {

    if (defaultMethod === 'via_copy_and_paste') {
      setInvalidProductList(() => {
        return []
      })
    }

    if (defaultMethod === 'via_line' && !orderLines) {
      setproductAddList(new Array(3).fill('').map((_, i) => {
        return {
          id: `${Date.now()}${i}`,
          itemCode: '',
          defaultUnit: '',
          units: [{ label: '', value: '' }],
          dateFocus: false,
          deliveryDate: moment(),
          quantity: 0,
          shippingMarks: ""
        }
      }))
    } else if (defaultMethod === 'via_copy_and_paste' && !orderLines) {
      setproductAddList([])
    }
  }, [defaultMethod])

  useEffect(() => {
    // making sure data in an array is populated once entered item code is valid
    if (
      typeof ItemValidateDetails?.data !== "undefined" &&
      ItemValidateDetails?.data !== 'invalid item') {

      const unitKeyValue = ItemValidateDetails?.data?.activeUnitsDesc?.map((desc: any) => {
        return {
          value: desc.salesUnit,
          label: desc.salesUnitDesc
        }
      })

      setproductAddList((prevState) => {
        const copiedArr = [...prevState];
        copiedArr[ItemValidateDetails?.row].defaultUnit = ItemValidateDetails?.data?.unitCode
        copiedArr[ItemValidateDetails?.row].units = unitKeyValue
        return copiedArr;
      })
    } else if (typeof ItemValidateDetails?.data !== "undefined" && ItemValidateDetails?.data === 'invalid item') {
      setproductAddList((prevState) => {
        const copiedArr = [...prevState];
        copiedArr[ItemValidateDetails?.row].defaultUnit = ''
        copiedArr[ItemValidateDetails?.row].units = [{ label: '', value: '' }]
        return copiedArr;
      })
    }
  }, [ItemValidateDetails])

  // Hook to initialize the an item validate details
  useEffect(() => {
    return () => {
      dispatch(setAddCartItemStatus([]));
      dispatch(getItemValidateDetailsSuccess(undefined))
      dispatch(setValidateItemsMessageCode(null))
      dispatch(getValidateItemDetailsSuccess(undefined))
      dispatch(setItemId(''))
      dispatch(setQuantity(undefined))
      dispatch(setRow(undefined))
    }
  }, [])

  useEffect(() => {
    if (defaultMethod === 'via_copy_and_paste') {
      dispatch(getValidateItemDetailsSuccess(undefined))
    }
  }, [defaultMethod])

  // Hook to add or remove item from invalidProductList depending on item validations
  useEffect(() => {
    if (data === 'invalid item') {
      setInvalidProductList(prevState => {
        const copiedArr = [...prevState];
        copiedArr.push({ itemId: itemId, quantity: quantity });
        return copiedArr;
      })
    } else if (data && data !== 'invalid item' && Object.keys(data)?.length > 1) {
      setInvalidProductList(prevState => {
        const copiedArr = [...prevState];
        return copiedArr.filter(item => item.itemId !== itemId);
      })
    }
  }, [data, row, itemId])

  useEffect(() => {

    const ifNoValidationHasNoError = validatedItemsDetails?.every((item: any) => {
      return !item?.isDeliveryDateError && !item?.isItemCodeError && !item?.isUnitCodeError && item?.isBuyAllowed
    })

    if (!ifNoValidationHasNoError) {
      dispatch(setLoading(false))
    }

    if (validatedItemsDetails && validatedItemsDetails?.length !== 0 && shouldCallAPI && ifNoValidationHasNoError) {

      setproductAddList(new Array(3).fill('').map((_, i) => {
        return {
          id: `${Date.now()}${i}`,
          itemCode: '',
          defaultUnit: '',
          units: [{ label: '', value: '' }],
          dateFocus: false,
          deliveryDate: moment(),
          quantity: 0,
          shippingMarks: ""
        }
      }))

      dispatch(addToCart(
        sessionId,
        productAddList.map(product => {
          return {
            itemCode: product.itemCode,
            unitCode: product.defaultUnit,
            shipmentMark: product.shippingMarks,
            deliveryDate: product.deliveryDate?.format(webSettings?.defaultDateFormat.toUpperCase()),
            quantity: product.quantity
          }
        }),
        true
      ))
    }

  }, [validatedItemsDetails])

  // hook to run side effect upon change in referrer key
  useEffect(() => {
    if (referrer && referrer === 'orderDetail') {
      if (orderdetail?.orderLineList) {

        const copiedOrderListList = [...orderdetail.orderLineList];

        setproductAddList(copiedOrderListList.map((order, i) => {

          return {
            id: `${Date.now()}${i}`,
            itemCode: order?.itemCode,
            defaultUnit: order?.unit,
            units: order?.itemUnitsDesc?.map((unit: any) => { return { label: unit.salesUnitDesc, value: unit.salesUnit } }),
            dateFocus: false,
            deliveryDate: moment(),
            quantity: order?.ordered,
            shippingMarks: order?.goodsMarking
          }
        }))

      }
    }
  }, [referrer])

  const orderLinesConvertHandler = () => {

    setDefaultMethod("via_line");

    setproductAddList([]);

    const noOfValueLimiterOccured = orderLines.match(new RegExp(valueLimiter, 'gi'))?.length;

    const matchIfNewLineExist: any = orderLines.match(new RegExp('\\n', 'gi'))

    const noOfNewLinePresence = !orderLines.match(new RegExp('\\n', 'gi')) ? 1 : matchIfNewLineExist?.length + 1;

    const lineList = orderLines.split('\n');

    if (noOfNewLinePresence === 1 && noOfValueLimiterOccured) {

      const orderLine = orderLines.split(valueLimiter);

      const itemCode = orderLine[0];

      const shippingMarks = orderLine[4];

      const unit = orderLine[2];

      setproductAddList((prevState) => {
        return [
          ...prevState,
          {
            id: Date.now(),
            itemCode: itemCode ? itemCode : '',
            dateFocus: false,
            deliveryDate: moment(orderLine[3]).isValid() ? moment(orderLine[3]) : moment(),
            units: orderLine[2] ? [{ label: orderLine[2], value: orderLine[2] }] : [{ label: "", value: "" }],
            quantity: orderLine[1]?.match(/^[0-9]*$/g) ? parseInt(orderLine[1]) : 1,
            shippingMarks: shippingMarks,
            defaultUnit: unit ? unit : ''
          }
        ]
      })
    } else if (noOfNewLinePresence > 1 && noOfValueLimiterOccured) {

      for (let i = 0; i < noOfNewLinePresence; i++) {

        const orderLine = lineList[i].split(valueLimiter);

        const ID = `${Date.now()}${i}`;

        const itemCode = orderLine[0];

        const shippingMarks = orderLine[4];

        const unit = orderLine[2];

        setproductAddList((prevState) => {
          return [
            ...prevState,
            {
              id: ID,
              itemCode: itemCode ? itemCode : '',
              dateFocus: false,
              units: orderLine[2] ? [{ label: orderLine[2], value: orderLine[2] }] : [{ label: "", value: "" }],
              deliveryDate: moment(orderLine[3]).isValid() ? moment(orderLine[3]) : moment(),
              quantity: orderLine[1]?.match(/^[0-9]*$/g) ? parseInt(orderLine[1]) : 1,
              shippingMarks: shippingMarks,
              defaultUnit: unit ? unit : ''
            }
          ]
        })
      }
    }
  }

  return (
    <div style={{ minHeight: "120vh" }}>
      <Header>
        <Link to={CART}>
          <Button
            color="neutral"
            variant="outlined"
            onClick={() => dispatch(setDefaultScreen({
              timeLine: {
                status: true,
                page: "cart"
              },
              addProduct: { status: false },
              interruptedCart: { status: false }
            }))}
            style={{ border: "0", background: "transparent" }}
          >
            <ArrowLeft className="primary-icon-2" style={{ marginRight: "11px" }} />
            <span>{t('CON_GO_TO_CART')}</span>
          </Button>
        </Link>
        <Button
          variant="outlined"
          color="neutral"
          onClick={() => setDefaultMethod("via_copy_and_paste")}
        >
          <CopySVG className='icon' />
          <span
            style={{ marginLeft: "10px" }}
          >{t('CON_COPY/PASTE_ORDER_LINES')}
          </span>
        </Button>
      </Header>

      <ScrollToTop />

      <Card>
        <MainHeader>
          {t('CON_ADD_PRODUCTS')}
        </MainHeader>

        <LoadingOverlay active={loading} />

        {defaultMethod === 'via_line' ?
          // Add via lines
          <Content>
            <ViaOrderLines {...{
              productAddList,
              setproductAddList,
              setInvalidProductList,
              invalidProductList,
              defaultMethod,
              validateItemsLoader,
              setAddToCartStatus,
              validatedItemsDetails,
              ItemValidateDetails
            }} />
          </Content>
          :
          // Add via copy/paste order lines
          <Content>
            <ViaCopyPaste {...{ orderLines, setOrderLines, valueLimiter, orderLinesConvertHandler, setDefaultMethod }} />
          </Content>
        }
      </Card>

      <AddItemToCart status={addToCartStatus} onClose={setAddToCartStatus} />

      <Modal
        isPopUp
        isOpen={isQuantityError}
        icon={<div className="icon-fail" style={{ marginBottom: "10px" }}><CloseSVG className="icon" /></div>}
        title={`${t('CON_BUY')} : ${t('CON_STATUS')}`}
        onRequestClose={() => setIsQuantityError(false)}
        message={addCartItemStatus?.filter((item: any) => item?.messageCode === 3132)?.[0]?.errorMessage}
      />
    </div>
  )
}

export default Index
