import Button from '@common/Button';
import LoadingOverlay from '@common/LoadingOverlay';
import { REQUEST } from '@constants/Routes';
import { alignCenter, respondTo } from '@utilities/styled-components';
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router';
import styled from 'styled-components'
import { requestSubmitSelector } from '@slices/Request/getRequestFilters';
import { useSelector } from 'react-redux';

const Container = styled.div`
  height: 400px;
  ${alignCenter}
  flex-direction: column;
  background: var(--white);
  margin-top: 70px;
  margin-bottom: 20px;

  ${respondTo.xs`
    width:90%
  `}

  ${respondTo.xs`
    width:70%
  `}

  >:not(:first-child){
    margin-top:2rem;
  }

  .confirmation_title{
    color:var(--primary-icon-4);
    font-weight: var(--font-weight-bold);
    font-size: calc(var(--base-font-size) + 15px);
  }

  .message{
    font-weight: var(--font-weight-medium);
    font-size: calc(var(--base-font-size) + 10px);
  }

  .error_text{
    font-weight: var(--font-weight-medium);
    color:var(--secondary-color);
  }
`;

export default function RequestReceived() {

  const { t } = useTranslation();

  const history = useHistory();

  const { loading, data, messageCode } = useSelector(requestSubmitSelector)

  return (
    <div className="d-flex justify-content-center align-items-center flex-column" style={{ width: "100%", minHeight: "90vh" }}>

      <LoadingOverlay active={loading} />

      <Container>
        <p className="confirmation_title">{t('CON_REQUEST_RECEIVED_CONFIRMATION')}</p>
        {messageCode === 4301 ? null :
          <p className="message">
            {t('MSG_REQUEST_YOUR_NUMBER')}:{data?.[0]?.requestNumber} {t('MSG_WAS_SUBMITTED_SUCCESSFULLY')}
          </p>
        }
        <p className="message">{t('TXT_BP_001')}</p>
        {messageCode === 4301 ?
          <p className="error_text">
            {t('MSG_UNEXPECTED_ERROR_OCCURED_WHEN_CLOSING_REQUEST')}
          </p> : null
        }
        { data?.[0]?.lineStatusCodes?.includes(4401) ?
          <p className="error_text">
            {t('CON_REQUEST_LINE_ERROR')}
          </p> : null
        }
        <Button onClick={() => history.push(REQUEST)} >{t('CON_BACK_TO_REQUEST_SEARCH')}</Button>
      </Container>
    </div >
  )
}
