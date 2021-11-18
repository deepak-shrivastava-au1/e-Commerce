import Input from '@common/Input';
import Radio from '@common/Radio';
import { fetchFilterDetails, GetFilterDetailsSelector } from '@slices/getFilterDetails';
import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { RequestSubmitCtx } from '../CtxProvider'
import { useSelector } from 'react-redux'
import Select from '@common/Select';
import TextArea from '@common/TextArea';
import { respondTo } from '@utilities/styled-components';

const ErrorText = styled.p`
  color: red; 
  font-weight: var(--font-weight-bold);
  font-size: 9px;
`

export const MainContainer = styled.div`

  display:flex;
  flex-direction: column;
  border-radius: var(--border-radius);
  background-color: var(--white);
  margin-top: 4rem;
  padding: 2rem;

  ${respondTo.xs`
    margin-top: 1rem;
  `}
  
  ${respondTo.sm`
    margin-top: 4rem;
  `}

.confirmation_buttons{
  display :flex;
  justify-content: flex-end;
  align-items: center;
  margin-top:1rem;
}

table{
  /* width:40%; */
  /* border-collapse: separate;
  border-spacing: 0.5rem; */
}

.table-body-rh{
    
    width:40%;
    
    ${respondTo.xs`
      width:100%;
    `}

    ${respondTo.sm`
      width:40%;
    `}

    font-size: calc(var(--base-font-size) + 2px);
    
    .table-row{
      display:flex;

      ${respondTo.xs`
        flex-direction:column;
        margin-top:1rem;
      `}

      ${respondTo.sm`
        flex-direction:row;
      `}
      
      &-title{
        flex-shrink: 0;
        font-weight: var(--font-weight-medium);
      }
    
    }
  }
`
interface Iprops {
  descStatus: boolean
  setDescStatus: React.Dispatch<React.SetStateAction<boolean>>
}

export default function RequestHeader({ descStatus, setDescStatus }: Iprops) {

  const { t, filterData, setRequestHeaderDetails, isMobile , requestHeaderDetails } = useContext(RequestSubmitCtx);

  useEffect(() => {
    setRequestHeaderDetails(prevState => {
      return {
        ...prevState,
        requestType: filterData?.submitRequestType?.[0].code,
        requestTypeDesc: filterData?.submitRequestType?.[0].description
      }
    })
  }, [filterData])

  return (
    <MainContainer>
        <div className="table-body-rh">
          <div className="table-row">
            <span className="table-row-title">{t('CON_CUSTOMER')}</span>
            <span style={{marginLeft: isMobile ? '0rem' : "3rem"}}>{requestHeaderDetails.customer}</span>
          </div>
          <div className="table-row">
            <span className="table-row-title">{t('CON_YOUR_REFERENCE')}</span>
            <span style={{marginLeft: isMobile ? '0rem' : "0.5rem"}}>
              <Input
                value={requestHeaderDetails.yourReference}
                showLabel={false}
                onChange={(value)=>setRequestHeaderDetails(prevState => {
                  return {
                    ...prevState,
                    yourReference: value
                  }
                })}
              />
            </span>
          </div>
          <div className="table-row">
            <span className="table-row-title">{t('CON_REQUEST_TYPE')}</span>
            <span style={{marginLeft: isMobile ? '0rem' : "1rem"}}>
              <Select
                showLabel={false}
                options={filterData?.submitRequestType?.map((type: any) => { return { label: type.description, value: type.code } })}
                value={requestHeaderDetails.requestType}
                onChange={(value) => {
                  setRequestHeaderDetails(prevState => {
                    return {
                      ...prevState,
                      requestType: value,
                      requestTypeDesc: filterData?.submitRequestType?.filter((type: any) => type.code === value)[0].description
                    }
                  })
                }}
              />
            </span>
          </div>
          <div className="table-row">
            <span className="table-row-title">{t('CON_DESCRIPTION')}</span>
            <span style={{marginLeft: isMobile ? '0rem' : "2rem"}}>
              {descStatus ? <ErrorText>{t('MSG_REQUEST_DESCRIPTION_MUST_BE_ENTERED')}</ErrorText> : null}
              <TextArea
                rows={2}
                showLabel={false}
                value={requestHeaderDetails.desc}
                onChange={(value) => {
                  if (value.length > 0) {
                    setDescStatus(false)
                  }
                  setRequestHeaderDetails(prevState => {
                    return {
                      ...prevState,
                      desc: value
                    }
                  })
                }}
              />
            </span>
          </div>
        </div>

    </MainContainer>
  )
}
