import React, { useContext, useEffect, useState } from 'react'
import Button from "@common/Button"
import { AddSVG, CloseSVG, RefreshSVG } from "@icons"
import styled from "styled-components"
import { rgba, cssVar } from "polished"
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { respondTo } from '@utilities/styled-components'
import { UserCartContext } from '../../../../redux/Providers/UserCartCtxProvider'
import { disablePromotionCodeError, fetchcartItems, fetchPromotionCode, fetchRecalculate, initializeCartLoader, setDefaultScreen } from '@slices/cart/getTemporaryOrderData'
import Modal from '@common/Modal'
import { IuserWebSettings } from '@constants/interfaces/userWebSettings'
import { WebSettingsContext } from '@providers/WebsettingsProvider'
import Checkbox from '@common/Checkbox'
import TermsAndCondn from './TermsAndCondn'
import { closeCartSelector, fetchCloseCart, getCloseCartSuccess, initializeCloseCartLoader } from '@slices/cart/getCloseCart'
import { userSelector } from '@slices/UserAccount/userSlice'
import { useHistory } from 'react-router-dom'
import { useMediaQuery } from '@material-ui/core'
import { breakpoints } from '@constants/styled-components'
import { fetchCurbStoneURL, initializeCurbStoneURLLoader } from '@slices/cart/getCurbStoneURL'
import { CART, PAYMENT } from '@constants/Routes'
import { getErrorMsgForShoppingCart, internalServerErrorCode } from '@utilities/error/serviceErrorCodeUtil'

interface Props {

}

const BorderLinearProgress = withStyles((theme): Props => ({
  root: {
    height: 15,
    borderRadius: 7,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: cssVar("--primary-color-1"),
  },
}))(LinearProgress);

const SummarySectionContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 24%;

    ${respondTo.xs`
      width: 100%;
    `}

    ${respondTo.sm`
      width: 24%;
    `}
`
const SectionCard = styled.div`
  display:flex;
  flex-direction: column;
  border-radius: var(--border-radius);
  background-color: var(--white);

  >:not(:last-child){
    border-bottom: var(--thin-border) ${rgba(cssVar(`--primary-color-4`), 0.2)};
  }
`
const SummarySectionHeader = styled.header`
    display:flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom:19px;
`
const SummaryHeader = styled.div`
  display:flex;
  justify-content: space-between;
  padding: 16px;

  >.title{
    color:var(--primary-color-2);
    font-size: calc(var(--base-font-size) + 4px);
    font-weight:var(--font-weight-bold);
  }

  >.recalculate_btn{
    display:flex;
    align-items: center;
    font-size: calc(var(--base-font-size) + 2px);
    font-weight:var(--font-weight-medium);
    color:var(--primary-color-4);
    cursor:pointer;
  }
`
const PromotionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding:12px;

  >:last-child{
    margin-top:8px;
  }
`
const PromotionButtonWrapper = styled.div`
  position:relative;

  >button{
    position:absolute;
    top:0;
    right:0;
  }
`
const PromotionCodeInput = styled.input`

  border:1px dashed var(--primary-color-1);
  width:100%;
  height:35px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  padding-left:5px;

  &:focus{
    outline:none;
  }

  &::placeholder{
    font-size:calc(var(--base-font-size) - 2px);
  }
`
const BillingDetailsWrapper = styled.div`
  display:flex;
  flex-direction:column;
  padding: 16px;

  >:not(:last-child){
    margin-bottom: 15px;
  }

`
const LabelWrapper = styled.div`
  display:flex;
  align-items:center;
  justify-content: space-between;

  >:first-child{
    color:var(--primary-color-4);
  }
  >:last-child{
    color:var(--primary-color-2);
    font-weight: var(--font-weight-bold);
  }
`
const GrandTotalWrapper = styled.div`
  display:flex;
  justify-content:space-between; 
  padding:16px;

  >:first-child{
    color:var(--primary-color-2);
    font-weight: var(--font-weight-medium);
    font-size:calc(var(--base-font-size) + 3px);
  }

  >:last-child{
    color:var(--primary-color-2);
    font-weight: var(--font-weight-bold);
    font-size:calc(var(--base-font-size) + 4px);
  }
  
`
const CaseTitle = styled.div`
  font-weight: var(--font-weight-bold);
  font-size:calc(var(--base-font-size) + 4px);
`
const ProgressWrapper = styled.div`
  display:flex;
  flex-direction:column; 

  >:first-child{
    color:var(--primary-color-2);
    font-weight:var(--font-weight-medium);
  }

  >:last-child{
    margin-top:8px;
  }
`
const ContainerCase = styled.div`
  display:flex;
  flex-direction: column;
  border-radius: var(--border-radius);
  background-color: var(--white);
  margin-top: 16px;
  padding:16px;

  >:not(:last-child){
    margin-bottom:16px;
  }
`
const SummaryHeaderWhenOnPaymentPage = styled.p`
  font-weight:var(--font-weight-bold);
  font-size: calc(var(--base-font-size) + 4px);
`
const ProgressContainer = styled.div`
  position:relative;
  z-index:0;

  #cubePercentage{
    position:absolute;
    top:50%;
    left:50%;
    z-index:120;
    transform: translate(-50%,-50%);

    font-size:calc(var(--base-font-size) - 4px);
    font-weight:var(--font-weight-medium);
  }
`
const AcceptTermsBox = styled.div`
  display:flex;
  flex-direction: column;
  padding:16px;

  .label-text{
    cursor:pointer;
    font-size:calc(var(--base-font-size) + 2px);
    font-weight: var(--font-weight-regular);
  }

  >:last-child{
    margin-top:20px;
  }
`

function SummarySection(props: any) {

  const webSettings: IuserWebSettings | null = useContext(WebSettingsContext);

  const {
    data: userCartData,
    deliveryInformationData,
    isTermsNCondChecked,
    setIsTermsNCondChecked,
    FormattedCurrency,
    dispatch,
    defaultScreen,
    recalculatedCartData,
    sessionId,
    hasPromotionError,
    promotionCode,
    setPromotionCode,
    t,
    defaultPaymentMethod,
    currencyStatus,
    setCurrencyStatus,
  }: any = useContext(UserCartContext);

  const [isTermsNCondClicked, setisTermsNCondClicked] = useState<boolean>(false);


  const FormatIfCartEmpty = (value: any) => {
    return !userCartData?.lineCount ? '0.00' : value
  }

  const history = useHistory()

  const NotAvailableGenerator = (value: any) => value ? value : 'NA';

  const [promotionPopStatus, setPromotionPopStatus] = useState<boolean>(false);

  const isMobile = useMediaQuery(`(max-width:${breakpoints.sm})`);

  const orderValueInfo = userCartData?.nsOrderValueInfo;

  const TotalLines = NotAvailableGenerator(orderValueInfo?.emTotalLines);

  const AdminFees = NotAvailableGenerator(orderValueInfo?.adminFee);

  const InvoiceFees = NotAvailableGenerator(orderValueInfo?.invoiceFee);

  const TotalExcVAT = NotAvailableGenerator(orderValueInfo?.emLineNet);

  const VAT = NotAvailableGenerator(orderValueInfo?.emVAT);

  const Discount = NotAvailableGenerator(orderValueInfo?.emDisCount);

  const CoinAdjustment = NotAvailableGenerator(orderValueInfo?.coinAdjustment);

  const GrandTotal = NotAvailableGenerator(orderValueInfo?.emOrderTotal);

  const TotalWeight = (orderValueInfo?.emTotalWeight);

  const TotalVolume = (orderValueInfo?.emTotalVolume);

  const isPaymentPage = defaultScreen?.timeLine['page'] === "payment" ? true : false;

  const isCartPage = defaultScreen?.timeLine['page'] === "cart" ? true : false;

  const containerCaseValue = orderValueInfo?.cubePercentage?.split('-')[1]?.split('%')[0]?.replace(/,/g, '.');

  const closeCartState: any = userSelector(closeCartSelector)

  useEffect(() => {
    if (closeCartState?.data && Object.keys(closeCartState?.data).length > 0) {
      history.push(`/thankYou/INVOICE/NA/${closeCartState?.data?.orderNumber}`)
      dispatch(fetchcartItems(sessionId))
    }
  }, [closeCartState?.data])

  useEffect(() => {
    if (hasPromotionError) {
      setPromotionPopStatus(true);
      dispatch(disablePromotionCodeError())
    }
  }, [hasPromotionError])

  useEffect(() => {
    return () => {
      setIsTermsNCondChecked(false)
      dispatch(getCloseCartSuccess("unmounted text"))
    }
  }, [])

  return (
    <>
      <SummarySectionContainer style={{ ...props.style }}>
        {/* Header */}
        {isCartPage && !isMobile ?
          <SummarySectionHeader>
            <Button
              variant="outlined"
              color="critical"
              onClick={() => dispatch(setDefaultScreen({
                timeLine: {
                  status: false,
                  page: "cart"
                },
                addProduct: { status: true },
                interruptedCart: { status: false }
              }))}
            >
              <AddSVG width="1.3em" height="1.3em" className="icon" /> <span> {t('CON_ADD_PRODUCTS')} </span>
            </Button>
          </SummarySectionHeader>
          : null
        }
        {/* Billing Summary */}
        <SectionCard>
          <SummaryHeader>
            {isCartPage ?
              <>
                <span className="title">Summary</span>

                {userCartData?.lineCount > 0 ? <span
                  className="recalculate_btn"
                  onClick={() => {
                    dispatch(initializeCartLoader());
                    dispatch(fetchRecalculate(sessionId, recalculatedCartData))
                  }}
                >
                  <RefreshSVG className="primary-icon-4" />
                  <span style={{ marginLeft: "5px" }}>{t('CON_RECALCULATE')}</span>
                </span> : null}
              </>
              :
              <SummaryHeaderWhenOnPaymentPage>
                Order Summary - #{NotAvailableGenerator(userCartData?.currentOrder?.temporaryOrderNumber)}
              </SummaryHeaderWhenOnPaymentPage>
            }

          </SummaryHeader>

          {isCartPage ?

            <PromotionWrapper>

              {userCartData?.lineCount !== 0 ?
                <span>
                  {t('CON_ORDER')}#: {NotAvailableGenerator(userCartData?.currentOrder?.temporaryOrderNumber)}
                </span>
                :
                <span>{t('CON_ORDER')}#: NA </span>
              }

              {webSettings?.allowSalesPromotions ? <PromotionButtonWrapper>
                <PromotionCodeInput placeholder={t('CON_PROMOTION_CODE')} value={promotionCode} onChange={(e) => setPromotionCode(e.target.value)} />
                <Button
                  variant="outlined"
                  disabled={userCartData?.lineCount > 0 ? false : true}
                  style={{ height: "35px", padding: "0 21px", fontSize: "14px" }}
                  onClick={() => {
                    dispatch(initializeCartLoader())
                    dispatch(fetchPromotionCode(sessionId, promotionCode))
                  }}
                >{t('CON_APPLY')}</Button>
              </PromotionButtonWrapper> : null
              }

              {/* if entered code is invalid pops up modal for Promotion code  */}
              <Modal
                isPopUp
                icon={<div className="icon-fail"><CloseSVG className="icon" /></div>}
                title={t('CON_INVALID_PROMOTION_CODE')}
                isOpen={promotionPopStatus}
                onRequestClose={() => {
                  setPromotionCode('')
                  setPromotionPopStatus(false)
                }}
                message={''}
              />
            </PromotionWrapper>
            : null
          }

          <BillingDetailsWrapper>
            <LabelWrapper>
              <span>{t('CON_TOTAL_LINES')}</span>
              <span>{FormattedCurrency(FormatIfCartEmpty(TotalLines))}</span>
            </LabelWrapper>
            {webSettings?.isShowOrderDiscount ?
              <LabelWrapper>
                <span>{t('CON_ORDER_DISCOUNT')}</span>
                <span>{FormattedCurrency(FormatIfCartEmpty(Discount))}</span>
              </LabelWrapper> : null}
            <LabelWrapper>
              <span>{t('CON_ADMINISTRATION_FEE')}</span>
              <span>{FormatIfCartEmpty(AdminFees)}</span>
            </LabelWrapper>
            <LabelWrapper>
              <span>{t('CON_INVOICE_FEE')}</span>
              <span>{FormatIfCartEmpty(InvoiceFees)}</span>
            </LabelWrapper>

            {orderValueInfo?.freightFee &&
              <LabelWrapper>
                <span>{t('CON_FREIGHT_FEE')}</span>
                <span>{FormatIfCartEmpty(NotAvailableGenerator(orderValueInfo?.freightFee))}</span>
              </LabelWrapper>}
            {orderValueInfo?.postageFee &&
              <LabelWrapper>
                <span>{t('CON_POSTAGE_FEE')}</span>
                <span>{FormatIfCartEmpty(NotAvailableGenerator(orderValueInfo?.postageFee))}</span>
              </LabelWrapper>}

            {orderValueInfo?.insuranceFee &&
              <LabelWrapper>
                <span>{t('CON_INSURANCE_FEE')}</span>
                <span>{FormatIfCartEmpty(NotAvailableGenerator(orderValueInfo?.insuranceFee))}</span>
              </LabelWrapper>}

            {orderValueInfo?.insurancePercentage &&
              <LabelWrapper>
                <span>{t('CON_INSURANCE_PERCENTAGE')}</span>
                <span>{FormatIfCartEmpty(NotAvailableGenerator(orderValueInfo?.insurancePercentage))}</span>
              </LabelWrapper>}

            {orderValueInfo?.surcharge &&
              <LabelWrapper>
                <span>{t('CON_SURCHARGE')}</span>
                <span>{FormatIfCartEmpty(NotAvailableGenerator(orderValueInfo?.surcharge))}</span>
              </LabelWrapper>
            }

            <LabelWrapper>
              <span>{t('CON_TOTAL_EXCLUDING_VAT')}</span>
              <span> {FormattedCurrency(FormatIfCartEmpty(TotalExcVAT))}</span>
            </LabelWrapper>
            <LabelWrapper>
              <span>{t('CON_VAT')}</span>
              <span>{FormattedCurrency(FormatIfCartEmpty(VAT))}</span>
            </LabelWrapper>
            <LabelWrapper>
              <span>{t('CON_COIN_ADJUSTMENT')}</span>
              <span>{CoinAdjustment}</span>
            </LabelWrapper>
          </BillingDetailsWrapper>

          <GrandTotalWrapper>
            <span>{t('CON_GRAND_TOTAL')}</span>
            <span>{FormattedCurrency(FormatIfCartEmpty(GrandTotal))} </span>
          </GrandTotalWrapper>

          {
            isPaymentPage ?
              <>
                <AcceptTermsBox>
                  {webSettings?.showSalesTermsAndConditions === 'termsandcondition.html' ?
                    <div className="d-flex">
                      <Checkbox
                        showLabel={false}
                        checked={isTermsNCondChecked}
                        onChange={(e) => {
                          setIsTermsNCondChecked(e.target.checked)
                        }}
                      />
                      <p
                        className="label-text"
                        onClick={() => { setisTermsNCondClicked(prevState => !prevState) }}
                      >{t('SALES_AND_CONDITION')}</p>
                    </div>
                    : null}
                  <Button
                    disabled={isTermsNCondChecked ? false : true}
                    onClick={() => {
                      if (defaultPaymentMethod.invoice.status) {
                        dispatch(initializeCloseCartLoader())
                        dispatch(fetchCloseCart(sessionId, {
                          YourReference: deliveryInformationData?.currentOrder?.yourReference,
                          addressNumber: deliveryInformationData?.ivDispatchAddressCode,
                          freeText: deliveryInformationData?.orderText,
                          emailInvoiceDispatch: '',
                          emailInvoiceDispCheckBox: false
                        }))
                      }
                      if (defaultPaymentMethod.online.status) {
                        if (currencyStatus.currencyCode !== 'USD') {
                          setCurrencyStatus((prevState: any) => {
                            return {
                              ...prevState,
                              showPopUp: true
                            }
                          })
                          return;
                        }
                        dispatch(initializeCurbStoneURLLoader())
                        dispatch(fetchCurbStoneURL(sessionId, {
                          YourReference: deliveryInformationData?.currentOrder?.yourReference,
                          addressNumber: deliveryInformationData?.defaultAddressNumber,
                          freeText: deliveryInformationData?.orderText,
                          nsuiURI: window.location.href.split(CART)[0],
                          nsuiBaseFragment: `thankYou`
                        }))
                        history.push(PAYMENT)
                      }
                    }}
                  > {t('CON_CONFIRM_ORDER')} </Button>
                </AcceptTermsBox>
                {/* Terms and Condition */}
                <TermsAndCondn status={isTermsNCondClicked} handleStatus={setisTermsNCondClicked} />
              </>
              : null
          }
        </SectionCard>


        {/* Container Case */}
        {userCartData?.lineCount > 0 ?
          <ContainerCase>
            <CaseTitle>{t('MSG_CONTAINER_CASE')}</CaseTitle>

            {(!orderValueInfo?.cubePercentageError && webSettings?.showContainerInfo) ?
              <ProgressWrapper>
                <span>{orderValueInfo?.cubePercentage?.split('-')[0]}</span>

                <ProgressContainer>
                  <span
                    id="cubePercentage"
                    style={containerCaseValue > 55 ? { color: `${cssVar('--white')}` } : { color: "inherit" }}
                  >{orderValueInfo?.cubePercentage?.split('-')[1]?.split('%')[0] ? `${orderValueInfo?.cubePercentage?.split('-')[1]?.split('%')[0]}%` : 'NA'}</span>
                  <BorderLinearProgress
                    variant="determinate"
                    value={containerCaseValue}
                  />
                </ProgressContainer>

              </ProgressWrapper> : null
            }
            <LabelWrapper>
              <span>{t('CON_TOTAL_WEIGHT')}</span>
              <span>{TotalWeight}</span>
            </LabelWrapper>
            <LabelWrapper>
              <span>{t('CON_TOTAL_VOLUME')}</span>
              <span>{TotalVolume}</span>
            </LabelWrapper>
          </ContainerCase>
          :
          null
        }
        {/* Modal for USD verification */}
        <Modal
          isPopUp
          icon={<div className="icon-fail"><CloseSVG className="icon" /></div>}
          title={t(getErrorMsgForShoppingCart(internalServerErrorCode))}
          message={'Make Sure preferred currency is set to USD or either pick invoice payment method'}
          isOpen={currencyStatus.showPopUp}
          hasCancelButton={false}
          onRequestClose={() => {
            setCurrencyStatus((prevState: any) => {
              return {
                ...prevState,
                showPopUp: false
              }
            })
          }}
          secondaryActionText={t('CON_OK')}
        />
      </SummarySectionContainer>
    </>
  )
}

export default SummarySection
