import Button from '@common/Button'
import TextArea from '@common/TextArea'
import { IuserWebSettings } from '@constants/interfaces/userWebSettings'
import { UserCartContext } from '@providers/UserCartCtxProvider'
import { WebSettingsContext } from '@providers/WebsettingsProvider'
import moment from 'moment'
import { cssVar, rgba } from 'polished'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'

const CodeFormatBox = styled.div`
  margin-top:12px;
  display:flex;
  flex-direction: column;
  width:70%;
  line-height:25.2px;
  padding:12px 16px;
  border:var(--thin-border) var(--info-alert-border);
  border-radius:var(--border-radius);
  background:${rgba(cssVar(`--info-alert-border`), 0.1)};
  .vd_format{
    font-weight:var(--font-weight-medium);
  }
`
const PasteHeader = styled.div`
  display:flex;
  justify-content: space-between;
  margin-top:15px;
  
  .title{
    font-weight: var(--font-weight-bold);
    font-size: calc(var(--base-font-size) + 4px);
  }
  .clear_all{
    font-weight: var(--font-weight-medium);
  }
`
const ValueLimiterBox = styled.span`
  background-color:${rgba(cssVar(`--primary-color-4`), 0.3)};
  color:black;
  padding:1px 7px;
  border-radius:2px;
`
const ActionButton = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
`

interface Props {
  orderLines: string,
  valueLimiter: string,
  orderLinesConvertHandler: () => void,
  setDefaultMethod: React.Dispatch<React.SetStateAction<"via_line" | "via_copy_and_paste">>,
  setOrderLines: React.Dispatch<React.SetStateAction<string>>
}

function ViaCopyPaste(props: Props) {

  const { orderLines, orderLinesConvertHandler, valueLimiter, setDefaultMethod, setOrderLines } = props;

  const [isOrderLineInvalid, setIsOrderLineInvalid] = useState<{ isValid: boolean, message: string }>({ isValid: true, message: "" });

  const { t }: any = useContext(UserCartContext);

  const webSettingsData: IuserWebSettings | null = useContext(WebSettingsContext);

  useEffect(() => {

    if (orderLines.length === 0) {
      setIsOrderLineInvalid({
        isValid: true,
        message: ''
      })
    }

    if (orderLines) {

      const noOfValueLimiterOccured = orderLines.match(new RegExp(valueLimiter, 'gi'))?.length;

      // To check whether value delimiter does exist in user input or not
      if (typeof noOfValueLimiterOccured === 'undefined') {
        setIsOrderLineInvalid({
          isValid: false,
          message: "Please use , as a value delimiter"
        });
      } else if (noOfValueLimiterOccured >= 1) {
        setIsOrderLineInvalid({
          isValid: true,
          message: ""
        });
      }

      if (noOfValueLimiterOccured && noOfValueLimiterOccured % 4 !== 0) {
        setIsOrderLineInvalid({
          isValid: false,
          message: "Please use 4 value delimiters each line"
        });
      } else if (noOfValueLimiterOccured && noOfValueLimiterOccured % 4 === 0) {
        setIsOrderLineInvalid({
          isValid: true,
          message: ""
        });
      }
      
    }

  }, [orderLines])

  return (
    <>
      <div className="value_delimiter">
        <p className="value_delimiter_title">Use <ValueLimiterBox>{valueLimiter}</ValueLimiterBox> as value delimiter</p>
        <p>{t('CON_DELIVERY_DATE_FORMAT')}: <span className="delivery_date_format">{webSettingsData?.defaultDateFormat.toUpperCase()} (Example - {moment().format(webSettingsData?.defaultDateFormat.toUpperCase())})</span> </p>
      </div>
      <p className="formatting_title">
        {t('TXT_OE_004')}
      </p>

      <CodeFormatBox>
        <p className="vd_format">{`Product code${valueLimiter}Quantity${valueLimiter}Unit code${valueLimiter}Delivery date${valueLimiter}Comment`}</p>
        <p dangerouslySetInnerHTML={{__html:`${t('TXT_OE_005_02')}`}} ></p>
      </CodeFormatBox>

      <PasteHeader>
        <span className="title">{t('CON_PASTE_AREA')}</span>
        <span
          className="clear_all"
          onClick={() => {
            setOrderLines('')
            setIsOrderLineInvalid({
              isValid: true,
              message: ''
            })
          }}
          style={{ cursor: "pointer" }}
        > {t('CON_CLEARALL')} </span>
      </PasteHeader>

      <TextArea
        value={orderLines}
        spellCheck={false}
        onChange={(value) => setOrderLines(value)}
      />

      <ActionButton className="action_button">
        <span style={{ marginRight: "36px", cursor: "pointer" }} onClick={() => setDefaultMethod("via_line")}>{t('CON_CANCEL')}</span>
        <Button
          onClick={orderLinesConvertHandler}
        >{t('CON_CONVERT_TO_ORDER_LINES')}</Button>
      </ActionButton>

    </>
  )
}

export default ViaCopyPaste
