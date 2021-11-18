import React, { useContext, useEffect, useState } from 'react'
import { respondTo } from '@utilities/styled-components'
import styled, { css } from "styled-components"
import Input from "@common/Input"
import Select from "@common/Select"
import { cssVar, rgba } from 'polished'
import Button from "@common/Button"
import { useMediaQuery } from '@material-ui/core'
import { breakpoints } from '@constants/styled-components'
import { UserCartContext } from "@providers/UserCartCtxProvider"
import { WebSettingsContext } from "@providers/WebsettingsProvider"
import Checkbox from '@common/Checkbox'
import TextArea from '@common/TextArea'
import LoadingOverlay from '@common/LoadingOverlay'
import { deliveryInformationSelector, fetchdeliveryInformationData, fetchSaveDeliveryInformation, initializeDeliveryLoader, setDeliveryInfoHasErrors, setDeliveryInfoMessageCode } from '@slices/cart/getDeliveryInformationData'
import { ArrowLeft, ArrowRight, CloseSVG } from '@icons'
import { TimelineContext } from '@fragments/HorizontalTimeline/TimelineContextProvider'
import ScrollToTop from '@common/ScrollToTop'
import { cartSelector } from '@slices/cart/getTemporaryOrderData'
import { useSelector } from 'react-redux'
import Modal from '@common/Modal'
import { getErrorMsgForShoppingCart } from '@utilities/error/serviceErrorCodeUtil'


const DeliveryContainer = styled.div`
  margin-left:-15px;
  margin-right:-15px;
  margin-top: 19px;
  border-radius: var(--border-radius);
    
`
const Header = styled.div`
  font-weight:var(--font-weight-bold);
  margin-bottom:24px;

  ${respondTo.xs`
      font-size:calc(var(--base-font-size) + 4px);
      margin-bottom: 16px;
  `}

  ${respondTo.md`
  font-size:calc(var(--base-font-size) + 10px);
  `}
`
const CardRow = styled.div`
  display:flex;
  flex-grow:1;

  ${respondTo.xs`
    flex-direction:column;
    background-color:transparent;
  `}

  ${respondTo.md`
    flex-direction:row;
    background-color: var(--white);
    border-radius: var(--border-radius);
  `}
`
const Card = styled.div`
  display:flex;
  flex-direction:column;
  border-radius: var(--border-radius);
  background-color: var(--white);

  >:last-child{
    display:flex;
    justify-content:flex-end;
    padding:24px 40px;
    ${respondTo.xs`
      padding:24px 16px;
    `}
    ${respondTo.sm`
      padding:24px 40px;
    `}
    border-top:var(--thin-border) ${rgba(cssVar(`--primary-color-4`), 0.2)};
  }
`
const CardColumn = styled.div`
  display:flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 42px;
  
  :last-child{
    border-left:var(--thin-border) ${rgba(cssVar(`--primary-color-4`), 0.2)}
  }

  ${respondTo.xs`
    padding:16px;
  `}
  ${respondTo.sm`
    padding:42px;
  `}
`
const Title = styled.p`
  font-size: calc(var(--base-font-size) + 4px);
  font-weight:var(--font-weight-bold);
`
const InputListWrapper = styled.div`
  width:70%;

  >:not(:last-child){
    margin-bottom:24px;
  }
`
const AddressInputs = styled.div`
  >:not(:last-child){
      margin-bottom:12px;
  }
`
const CheckBoxWrapper = styled.div`
  display:flex;
  flex-direction:column;

  >:not(:last-child){
    margin-bottom:5px;
  }

  ${respondTo.xl`
    flex-direction:row;
    align-items: center;
    justify-content: space-between;
  `}
`
const TextAreaWrapper = styled.div`
  display:flex;
  flex-direction:column;
`
const Label = styled.label`
  ${() => css`
    font-weight: var(--font-weight-medium);
    color:var(--primary-color-2);
    opacity:var(--high-opacity);
    cursor:pointer;
  `}
`
const ClearButton: any = styled.button`
  appearance: none;
  background:transparent;
  border:0;
  margin-right:34px;
  font-weight:var(--font-weight-medium);
`

const EmailWrapper = styled.div`
  display: flex;
  align-items: center;

  .form-group {
    margin-bottom: 0;
  }
  >:last-child{
    margin-left:10px
  }
`
const ButtonSwitcher = styled.div`
  margin-top:24px ;
  display:flex;
  justify-content: space-between;

  ${respondTo.xs`
    flex-direction:column;
    

    >:last-child{
      margin-top:10px;
    }
  `}

  ${respondTo.md`
    flex-direction:row;
    >:last-child{
      margin-top:0px;
    }
  `}
`

function Index() {

  const isMobile = useMediaQuery(`(max-width:${breakpoints.sm})`);

  const { handleTab } = useContext(TimelineContext);

  const { messageCode, hasErrors } = useSelector(deliveryInformationSelector)

  const { t, deliveryInformationData, countryCodeList, allMannerOftransport, dispatch, sessionId, isDeliveryInformationLoading }: any = useContext(UserCartContext);

  const cartItemsLineCount = useSelector(cartSelector)?.cartItems?.lineCount;

  const webSettings: any = useContext(WebSettingsContext);

  const [addressNumber, setAddressNumber] = useState<number>(0)

  const [fieldList, setFieldList] = useState<{
    name: string,
    addressName: string,
    addressCode: string,
    address1: string,
    address2: string,
    address3: string,
    postalCode: string,
    defaultAddress: number,
    MOTCode: string,
    countyCode:string,
    MOTDesc?: string,
    countryCode: string,
    city: string,
    country: string,
    orderReference: string,
    isEmailDispChecked: boolean,
    userReference: string,
    stateCode: string,
    freeText: string,
    goodsMark: string,
    isCompleteDelivery: boolean,
    isEmailOrderDispChecked: boolean,
    email: string
  }>({
    name: '',
    addressName: '',
    addressCode: '',
    address1: '',
    address2: '',
    address3: '',
    postalCode: '',
    defaultAddress: 0,
    MOTCode: '',
    countyCode:'',
    MOTDesc: '',
    countryCode: '',
    city: '',
    country: '',
    orderReference: '',
    isEmailDispChecked: false,
    userReference: '',
    stateCode: '',
    freeText: '',
    goodsMark: '',
    isCompleteDelivery: false,
    isEmailOrderDispChecked: false,
    email: '',
  })

  useEffect(() => {
    if (typeof deliveryInformationData !== "undefined" && deliveryInformationData !== null && Object.keys(deliveryInformationData).length !== 1) {

      const defaultAddress = deliveryInformationData?.["customerDeliveryAddressList"]?.filter((address: any) => parseInt(address.addressNumber) === deliveryInformationData.defaultAddressNumber);

      setFieldList(() => {


        const currentOrder = deliveryInformationData?.["currentOrder"];

        return {
          name: defaultAddress?.[0]?.name,
          addressName: defaultAddress?.[0]?.addressName,
          addressCode: defaultAddress?.[0]?.addressCode,
          address1: defaultAddress?.[0]?.address1,
          address2: defaultAddress?.[0]?.address2,
          address3: defaultAddress?.[0]?.address3,
          postalCode: defaultAddress?.[0]?.postalCode,
          countryCode: defaultAddress?.[0]?.countryCode,
          stateCode: defaultAddress?.[0]?.stateProvCode,
          countyCode:defaultAddress?.[0]?.countyCode,
          MOTCode: defaultAddress?.[0]?.mannerOfTransportCode,
          defaultAddress: Number(defaultAddress?.[0]?.addressNumber),
          city: defaultAddress?.[0]?.address4,
          country: defaultAddress?.[0]?.countryDesc,
          orderReference: currentOrder?.customerOrderNumber,
          userReference: currentOrder?.yourReference,
          freeText: currentOrder?.orderText,
          isCompleteDelivery: deliveryInformationData?.ivCompleteDelivery,
          isEmailDispChecked: deliveryInformationData?.isShowEmailConfirmDispChecked,
          isEmailOrderDispChecked: deliveryInformationData?.isShowEmailOrderDispChecked,
          goodsMark: currentOrder?.shipmentMark,
          email: deliveryInformationData?.emailOrderDispatch
        }

      })
    }
  }, [deliveryInformationData])


  const onAddressChange = (addressNumber: number) => {

    const ClickedAddress = deliveryInformationData?.["customerDeliveryAddressList"]?.filter((address: any) => address.addressNumber === addressNumber)[0];

    setFieldList((prevState) => {
      return {
        ...prevState,
        addressName: ClickedAddress?.addressName,
        address1: ClickedAddress?.address1,
        defaultAddress: Number(addressNumber),
        address2: ClickedAddress?.address2,
        address3: ClickedAddress?.address3,
        postalCode: ClickedAddress?.postalCode,
        city: ClickedAddress?.address4,
        country: ClickedAddress?.countryDesc,
      }
    });
  }

  const handleFieldChange = () => setAddressNumber(999);

  const dispatchAddressOverrideAllowed = !deliveryInformationData?.allowDispatchAddressOverride;

  return (
    <DeliveryContainer>
      <ScrollToTop />
      {!isMobile && <Header>{t('CON_DELIVERY_INFORMATION')}</Header>}
      <LoadingOverlay active={isDeliveryInformationLoading} />
      <Card>
        <CardRow>
          <CardColumn>
            <InputListWrapper>
              <Title>{t('CON_DELIVERY_ADDRESS')}</Title>

              <Select
                disabled={dispatchAddressOverrideAllowed}
                labelText={t('CON_DELIVERY_ADDRESS')}
                onChange={onAddressChange}
                value={fieldList?.defaultAddress}
                options={deliveryInformationData?.customerDeliveryAddressList?.map((address: any) => { return { label: address.name, value: address.addressNumber } })}
              />

              <Input
                value={fieldList?.addressName}
                disabled={dispatchAddressOverrideAllowed}
                showLabel={true}
                labelText={t('CON_NAME')}
                onChange={(value) => {
                  if (fieldList?.addressName !== value.trim()) {
                    handleFieldChange()
                  }
                  setFieldList((prevState) => {
                    return {
                      ...prevState,
                      addressName: value
                    }
                  })
                }}
              />

              <AddressInputs>
                <Input
                  disabled={dispatchAddressOverrideAllowed}
                  showLabel={true}
                  value={fieldList?.address1}
                  onChange={(value) => {
                    if (fieldList?.address1 !== value.trim()) {
                      handleFieldChange()
                    }
                    setFieldList((prevState) => {
                      return {
                        ...prevState,
                        address1: value
                      }
                    })
                  }}
                  labelText={t('CON_ADDRESS_LINES')} />
                <Input
                  showLabel={false}
                  disabled={dispatchAddressOverrideAllowed}
                  value={fieldList?.address2}
                  optional={true}
                  onChange={(value) => {
                    if (fieldList?.address2 !== value.trim()) {
                      handleFieldChange()
                    }
                    setFieldList((prevState) => {
                      return {
                        ...prevState,
                        address2: value
                      }
                    })
                  }}
                />
                <Input
                  showLabel={false}
                  disabled={dispatchAddressOverrideAllowed}
                  optional={true}
                  value={fieldList?.address3}
                  onChange={(value) => {
                    if (fieldList?.address3 !== value.trim()) {
                      handleFieldChange()
                    }
                    setFieldList((prevState) => {
                      return {
                        ...prevState,
                        address3: value
                      }
                    })
                  }}
                />
              </AddressInputs>

              <Input
                value={fieldList?.postalCode}
                showLabel={true}
                disabled={dispatchAddressOverrideAllowed}
                labelText={t('CON_POSTAL_CODE')}
                onChange={(value) => {
                  if (fieldList?.postalCode !== value.trim()) {
                    handleFieldChange()
                  }
                  setFieldList((prevState) => {
                    return {
                      ...prevState,
                      postalCode: value
                    }
                  })
                }}
              />

              <Input
                value={fieldList?.city}
                showLabel={true}
                disabled={dispatchAddressOverrideAllowed}
                labelText={t('CON_POSTCITY')}
                onChange={(value) => {
                  if (fieldList?.city !== value.trim()) {
                    handleFieldChange()
                  }
                  setFieldList((prevState) => {
                    return {
                      ...prevState,
                      city: value
                    }
                  })
                }}
              />

              <Select
                labelText={t('CON_COUNTRY')}
                disabled={dispatchAddressOverrideAllowed}
                value={fieldList?.countryCode}
                options={countryCodeList?.map((country: any) => { return { label: country.description, value: country.code } })}
                onChange={(value) => {
                  setFieldList((prevState) => {
                    return {
                      ...prevState,
                      countryCode: value
                    }
                  })
                }}
              />

              {
                deliveryInformationData?.stateList && Object.keys(deliveryInformationData?.stateList)?.length>0 ?
                  <Select
                    labelText={t('CON_STATE')}
                    disabled={dispatchAddressOverrideAllowed}
                    value={fieldList?.stateCode}
                    options={Object.values(deliveryInformationData?.stateList).map((state: any) => { return { label: state.stateProvinceDesc, value: state.stateProvincecode } })}
                    onChange={(value) => {
                      setFieldList((prevState) => {
                        return {
                          ...prevState,
                          stateCode: value
                        }
                      })
                    }}
                  />
                  : <></>
              }

              {
                deliveryInformationData?.countyList && deliveryInformationData?.countyList?.length>0 ?
                  <Select
                    labelText={t('CON_COUNTY')}
                    disabled={dispatchAddressOverrideAllowed}
                    value={fieldList?.countyCode}
                    options={deliveryInformationData?.countyList.map((county: any) => { return { label: county.countyDesc, value: county.countyCode } })}
                    onChange={(value) => {
                      setFieldList((prevState) => {
                        return {
                          ...prevState,
                          countyCode: value
                        }
                      })
                    }}
                  />
                  : null
              }

            </InputListWrapper>
          </CardColumn>
          <CardColumn>
            <InputListWrapper>
              <Title>{t('CON_ORDER_REFERENCE')}</Title>

              <Input
                showLabel={true}
                labelText={t('CON_YOUR_ORDER')}
                value={fieldList?.orderReference}
                onChange={(value) => {
                  setFieldList((prevState) => {
                    return {
                      ...prevState,
                      orderReference: value
                    }
                  })
                }}
              />

              <Input
                showLabel={true}
                labelText={t('CON_YOUR_REFERENCE')}
                value={fieldList?.userReference}
                onChange={(value) => {
                  setFieldList((prevState) => {
                    return {
                      ...prevState,
                      userReference: value
                    }
                  })
                }}
              />

              <TextAreaWrapper>
                <TextArea
                  id="free_text"
                  labelText="Free Text"
                  value={fieldList?.freeText}
                  onChange={(value) => {
                    setFieldList((prevState) => {
                      return {
                        ...prevState,
                        freeText: value
                      }
                    })
                  }}
                />
              </TextAreaWrapper>

              <Select
                labelText={t('CON_MANNER_OF_TRANSPORT')}
                disabled={!deliveryInformationData?.allowChangeMannerOfTransport}
                value={fieldList?.MOTCode}
                options={allMannerOftransport?.map((manner: any) => { return { label: manner.description, value: manner.code } })}
                onChange={(value) => {

                  setFieldList((prevState) => {
                    return {
                      ...prevState,
                      MOTDesc: allMannerOftransport?.filter((manner: any) => manner.code === value)[0]?.description
                    }
                  })

                  setFieldList((prevState) => {
                    return {
                      ...prevState,
                      MOTCode: value
                    }
                  })
                }}
              />

              {
                webSettings?.showGoodsMarks ?
                  <Input
                    showLabel={true}
                    labelText={t('CON_GOODS_MARK')}
                    value={fieldList?.goodsMark}
                    onChange={(value) => {
                      setFieldList((prevState) => {
                        return {
                          ...prevState,
                          goodsMark: value
                        }
                      })
                    }}
                  /> :
                  null
              }
              {deliveryInformationData?.isShowEmailConfirmDispatch ?
                <EmailWrapper>
                  <span> {t('CON_EMAIL')} </span>
                  {
                    !deliveryInformationData?.emailOrderOverrideAllowed ?
                      <span>{deliveryInformationData?.emailOrderDispatch}</span>
                      :
                      <Input
                        value={fieldList?.email}
                        onChange={(value) =>
                          setFieldList((prevState) => {
                            return {
                              ...prevState,
                              email: value
                            }
                          })
                        } />
                  }
                </EmailWrapper>
                :
                null
              }
              <CheckBoxWrapper>
                {webSettings?.allowChangeCompleteDelivery && <Checkbox
                  id="delivery"
                  labelText={t('CON_COMPLETE_DELIVERY')}
                  showLabel={true}
                  checked={fieldList?.isCompleteDelivery}
                  onChange={(e) =>
                    setFieldList((prevState) => {
                      return {
                        ...prevState,
                        isCompleteDelivery: e.target.checked
                      }
                    })}
                />}

                {deliveryInformationData?.isShowEmailConfirmDispatch ?
                  <Checkbox
                    id="emailConfirmDispatch"
                    labelText={t('CON_CONFIRM_DISPATCH_VIA_EMAIL')}
                    checked={fieldList?.isEmailDispChecked}
                    showLabel={true}
                    onChange={(e) => {
                      setFieldList((prevState) => {
                        return {
                          ...prevState,
                          isEmailDispChecked: e.target.checked
                        }
                      })
                    }}
                  /> : null
                }

                {deliveryInformationData?.isShowEmailOrderDispatch ?
                  <Checkbox
                    id="confirmation"
                    labelText={t('CON_CONFIRM_ORDER_DISPATCH_VIA_EMAIL')}
                    checked={fieldList?.isEmailOrderDispChecked}
                    showLabel={true}
                    onChange={(e) => {
                      setFieldList((prevState) => {
                        return {
                          ...prevState,
                          isEmailOrderDispChecked: e.target.checked
                        }
                      })
                    }}
                  /> : null
                }
              </CheckBoxWrapper>
            </InputListWrapper>
          </CardColumn>
        </CardRow>

        <div>
          <ClearButton onClick={() => {
            dispatch(initializeDeliveryLoader())
            dispatch(fetchdeliveryInformationData(sessionId))
          }}>{t('CON_CLEAR')}</ClearButton>
          <Button
            variant="solid"
            color="critical"
            style={{ padding: "6px 20px" }}
            onClick={() => {
              dispatch(initializeDeliveryLoader())
              dispatch(fetchSaveDeliveryInformation(
                sessionId,
                [{
                  "name": fieldList?.name,
                  "addressName": fieldList?.addressName,
                  "adressCode": fieldList?.addressCode,
                  "addressLine1": fieldList?.address1,
                  "addressLine2": fieldList?.address2,
                  "addressLine3": fieldList?.address3,
                  "adressLine4": fieldList?.city,
                  "postalCode": fieldList?.postalCode,
                  "countryCode": fieldList?.countryCode,
                  "stateProvCode": fieldList?.stateCode,
                  "countyCode": fieldList?.countyCode,
                  "mannerOfTransportCode": fieldList?.MOTCode,
                  "mannerOfTransportDesc": fieldList?.MOTDesc,
                  "emailOrderDispatch": fieldList?.email,
                  "isCompleteDelivery": fieldList?.isCompleteDelivery ? "YES" : "",
                  "emailConfirmDispatch": fieldList?.isEmailDispChecked,
                  "emailOrderDispCheckBox": fieldList?.isEmailOrderDispChecked ,
                  "emailConfirmDispCheckBox": fieldList?.isEmailDispChecked ? "YES" : "",
                  // "emailInvoiceDispCheckBox": "false",
                  "yourOrder": fieldList?.orderReference,
                  "yourReference": fieldList?.userReference,
                  "orderText": fieldList?.freeText,
                  "shipmentMark": fieldList?.goodsMark,
                  "addressNumber": addressNumber === 0 ? deliveryInformationData.defaultAddressNumber : 999,
                }]
              ))
            }}
          >{t('CON_SAVE')}</Button>
        </div>

        <Modal
          isAlert
          icon={<div className="icon-fail"><CloseSVG className="icon" /></div>}
          title={t(getErrorMsgForShoppingCart(messageCode))}
          message={''}
          isOpen={hasErrors}
          hasCancelButton={false}
          onRequestClose={() => {
            dispatch(setDeliveryInfoMessageCode(null));
            dispatch(setDeliveryInfoHasErrors(false));
          }}
          secondaryActionText={t('CON_OK')}
          onSecondaryButtonClick={() => {
            dispatch(setDeliveryInfoMessageCode(null));
            dispatch(setDeliveryInfoHasErrors(false));
          }}
        />
      </Card>
      {/* Button Switcher */}
      <ButtonSwitcher>
        <Button variant="outlined" onClick={() => handleTab(1)}> <ArrowLeft className="icon" /> <span>{t('CON_SHOPPINGCART')}</span>  </Button>
        <Button variant="solid" className="secondary-icon-2" disabled={cartItemsLineCount > 0 ? false : true} onClick={() => handleTab(3)}> <span>{t('CON_CONFIRM')} {t('CON_ORDER')}</span> <ArrowRight className="icon" />   </Button>
      </ButtonSwitcher>
    </DeliveryContainer>
  )
}

export default Index
