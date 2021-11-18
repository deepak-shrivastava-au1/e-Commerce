import Input from '@common/Input'
import Quantity from '@common/Quantity'
import Select from '@common/Select'
import { cssVar } from 'polished'
import React, { useContext } from 'react'
import { RequestSubmitCtx } from '../CtxProvider'

export default function ProductGridList() {

  const { isMobile, t, webSettings, productsList, setProductsList, filterData } = useContext(RequestSubmitCtx);

  return (
    <div style={{ display: productsList?.length > 0 ? 'block' : 'none' }}>
      <p className="title" style={{ marginTop: "1.5rem" }}>{t('CON_REQUEST_LINES')}</p>

      <div className="card-table">
        {
          !isMobile &&
          <div className="card-thead">
            <div className="row">
              <div className="col">
                <span>{t('CON_LINE')}</span>
              </div>
              <div className="col">
                <span>{t('COH_PRODUCT_CODE')}</span>
              </div>
              <div className="col">
                <span>{t('CON_QUANTITY')}</span>
              </div>
              <div className="col">
                <span>{t('CON_UNIT')}</span>
              </div>
              <div className="col">
                <span>{t('COH_REQUEST_TYPE')}</span>
              </div>
              <div className="col">
                <span>{t('CON_DESCRIPTION')}</span>
              </div>
              <div className="col">
                <span>{t('CON_DELETE')}</span>
              </div>
            </div>

          </div>
        }
        <div className="card-tbody">
          {
            productsList?.map((product, i) => (
              <div className="row">
                <div className="col">
                  <div className="flex-container">
                    <label className="label">{t('CON_LINE')}</label>
                    <div>{product.Line}</div>
                  </div>
                </div>
                <div className="col">
                  <div className="flex-container">
                    <label className="label">{t('COH_PRODUCT_CODE')}</label>
                    <div>{product.code}</div>
                  </div>
                </div>
                <div className="col">
                  <div className="flex-container">
                    <label className="label">{t('CON_QUANTITY')}</label>

                    <Quantity
                      showLabel={false}
                      quantity={product.quantity}
                      isInvalid={product.quantity === 0 || product.quantity > Number(webSettings?.maxQuantity)}
                      onChange={(quantity: any) => {
                        setProductsList(prevState => {
                          const copiedArr = [...prevState];
                          copiedArr[i].quantity = quantity
                          return copiedArr;
                        })
                      }}
                    />
                  </div>

                </div>
                <div className="col">
                  <div className="flex-container">
                    <label className="label">{t('CON_UNIT')}</label>
                    <Select
                      value={product.defaultUnit}
                      options={product.unit}
                      showLabel={false}
                      onChange={(value) => {
                        setProductsList(prevState => {
                          const copiedArr = [...prevState];
                          copiedArr[i].defaultUnit = value
                          return copiedArr;
                        })
                      }}
                      style={{ width: '50%' }}
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="flex-container">
                    <label className="label">{t('COH_REQUEST_TYPE')}</label>
                    <Select
                      showLabel={false}
                      value={product.requestType}
                      options={filterData?.submitRequestType?.map((type: any) => { return { label: type.description, value: type.code } })}
                      onChange={(value) => {
                        setProductsList(prevState => {
                          const copiedArr = [...prevState];
                          copiedArr[i].requestType = value
                          copiedArr[i].requestTypeDesc = filterData?.submitRequestType?.filter((type: any) => type.code === value)[0].description
                          return copiedArr;
                        })
                      }}
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="flex-container">
                    <label className="label">{t('CON_DESCRIPTION')}</label>
                    <Input
                      value={product.desc}
                      onChange={(value) => {
                        setProductsList(prevState => {
                          const copiedArr = [...prevState];
                          copiedArr[i].desc = value
                          return copiedArr;
                        })
                      }}
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="flex-container">
                    <u
                      onClick={() => {
                        setProductsList(prevState => {
                          const copiedArr = [...prevState];
                          return copiedArr.filter(item => item.code !== product.code)
                        })
                      }}
                      style={{
                        cursor: "pointer",
                        color: `${cssVar('--primary-color-4')}`,
                        fontWeight: Number(cssVar('--font-weight-regular')),
                        fontSize: `${cssVar('--base-font-size')}`
                      }}
                    >{t('CON_DELETE')}</u>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
