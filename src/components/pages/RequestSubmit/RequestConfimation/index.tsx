import { fetchSubmitBPRequest, initializeRequestSubmitLoader, setScreenStatus } from '@slices/Request/getRequestFilters'
import React, { useContext } from 'react'
import { RequestSubmitCtx } from '../CtxProvider';
import styled from 'styled-components'
import { MainContainer } from '../RequestSubmit/RequestHeader';
import Button from '@common/Button';
import { ArrowLeft } from '@icons';
import { useHistory } from 'react-router';
import { respondTo } from '@utilities/styled-components';
import moment from 'moment';
import { REQUESTRECEIVED } from '@constants/Routes';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom:2rem;


  .table-title{
    font-weight: var(--font-weight-medium);
    font-size: calc(var(--base-font-size) + 8px);
    margin-bottom: 20px;
  }
`

const titleList = [
  'CON_PRODUCT',
  'CON_DESCRIPTION',
  'CON_QUANTITY',
  'CON_UNIT',
  'COH_REQUEST_TYPE',
  'COH_REQUEST_DESCRIPTION'
]

export default function RequestConfirmation() {

  const { dispatch, t, requestHeaderDetails, productsList, isMobile, requestSubmitReference, webSettings } = useContext(RequestSubmitCtx);

  const history = useHistory();

  return (
    <>
      <Button
        color="neutral"
        variant="outlined"
        onClick={() => dispatch(setScreenStatus({
          requestSubmit: true, requestConfirmation: false
        }))}
        style={{ border: "0", marginTop: isMobile ? '2rem' : '0', background: "transparent", marginBottom: "15px", marginLeft: "-12px" }}
      >
        <ArrowLeft className="primary-icon-2" style={{ marginRight: "11px" }} />
        <span>{t('CON_BACK')}</span>
      </Button>
      <MainContainer style={{ marginTop: 0 }}>

        <Header>
          <p className="new_request_title">{t('CON_CONFIRMATION')} - {t('CON_SUBMIT_REQUEST')}? </p>
        </Header>

        <table>
          <tbody className="table-body-rh">
            <tr>
              <td className="table-title" >{t('CON_CUSTOMER')}</td>
              <td>{requestHeaderDetails.customer}</td>
            </tr>
            <tr>
              <td className="table-title">{t('CON_CREATION_DATE')}</td>
              <td>{moment().format(webSettings?.defaultDateFormat?.toUpperCase())}</td>
            </tr>
            <tr>
              <td className="table-title">{t('CON_YOUR_REFERENCE')}</td>
              <td>{requestHeaderDetails.yourReference}</td>
            </tr>
            {
              requestSubmitReference === "order" || requestSubmitReference === "invoice" ?
                <tr>
                  <td className="table-title">{ requestSubmitReference === 'invoice' ? t('CON_INVOICE') : t('CON_ORDER')}</td>
                  <td>{requestHeaderDetails.docType} {requestHeaderDetails.reference}</td>
                </tr>
                : null
            }

            <tr>
              <td className="table-title">{t('CON_REQUEST_TYPE')}</td>
              <td>
                {requestHeaderDetails.requestTypeDesc}
              </td>
            </tr>
            <tr>
              <td className="table-title">{t('CON_DESCRIPTION')}</td>
              <td>
                {requestHeaderDetails.desc}
              </td>
            </tr>
          </tbody>

        </table>

        <div className="confirmation_buttons">
          <span
            style={{ cursor: "pointer" }}
            onClick={() => dispatch(setScreenStatus({
              requestSubmit: true, requestConfirmation: false
            }))}
          >{t('CON_NO')}</span>
          <Button
            style={{ marginLeft: "1rem" }}
            onClick={() => {
              dispatch(initializeRequestSubmitLoader())

              if (productsList?.length > 0) {
                dispatch(fetchSubmitBPRequest([
                  {
                    "requestBase": requestSubmitReference,
                    "customer": String(requestHeaderDetails.customerCode),
                    "yourReference": requestHeaderDetails.yourReference,
                    "probType": requestHeaderDetails.requestType,
                    "reqDesc": requestHeaderDetails.requestTypeDesc,
                    "reference": requestHeaderDetails.reference,
                    "docType": requestHeaderDetails.docType
                  }],
                  productsList.map((product, index) => {
                    return {
                      "lineNumber": product.Line,
                      "invoiceLineNumber": index,
                      "product": product.code,
                      "quantity": product.quantity,
                      "unit": product.defaultUnit,
                      "probType": product.requestType,
                      "requestDesc": product.desc,
                      "validQuantity": true,
                      "itemNumberOfDecimalsAllowed": JSON.stringify(product.itemNumberOfDecimalsAllowed),
                      "restricted": product.restricted
                    }
                  })
                ))
              } else {
                dispatch(fetchSubmitBPRequest([
                  {
                    "requestBase": requestSubmitReference,
                    "customer": String(requestHeaderDetails.customerCode),
                    "yourReference": requestHeaderDetails.yourReference,
                    "probType": requestHeaderDetails.requestType,
                    "reqDesc": requestHeaderDetails.requestTypeDesc,
                    "reference": requestHeaderDetails.reference,
                    "docType": requestHeaderDetails.docType
                  }]
                ))
              }

              history.push(REQUESTRECEIVED)
            }}
          >{t('CON_YES')}</Button>
        </div>
      </MainContainer>

      {productsList?.length > 0 ?

        <div className="card-table" style={{ marginTop: "2rem" }}>
          <div className="card-thead">
            <div className="row">
              {titleList.map((title, i) => (
                <div className="col" key={`${title}${i}`}>
                  {t(title)}
                </div>
              ))}
            </div>

          </div>
          <div className="card-tbody">
            {
              productsList?.map((list, i: number) => (
                <div className="row " key={`${i}${list?.code}`}>
                  {/* List ID */}
                  <div className="col">
                    <div className="flex-container">
                      {isMobile && <label className="label-text">{t('CON_PRODUCT')}</label>}
                      <div>
                        {list.code}
                      </div>
                    </div>
                  </div>
                  {/* List Owner */}
                  <div className="col">
                    <div className="flex-container">
                      {isMobile && <label className="label-text">{t('CON_DESCRIPTION')}</label>}
                      <span>{list?.productDesc}</span>
                    </div>
                  </div>
                  {/* Customer Id */}
                  <div className="col">
                    <div className="flex-container">
                      {isMobile && <label className="label-text">{t('CON_QUANTITY')}</label>}
                      <div>{list?.quantity}</div>
                    </div>
                  </div>
                  {/* Has Shared? */}
                  <div className="col">
                    <div className="flex-container">
                      {isMobile && <label className="label-text">{t('CON_UNIT')}</label>}
                      <div>{list?.defaultUnit}</div>
                    </div>
                  </div>
                  {/* last Used Date */}
                  <div className="col">
                    <div className="flex-container">
                      {isMobile && <label className="label-text">{t('COH_REQUEST_TYPE')}</label>}
                      <div>{list?.requestTypeDesc}</div>
                    </div>
                  </div>
                  {/* Default updater Button */}
                  <div className="col">
                    <div className="flex-container">
                      {isMobile && <label className="label-text">{t('COH_REQUEST_DESCRIPTION')}</label>}
                      <div>{list?.desc}</div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div> :
        null
      }
    </>
  )
}
