import React from 'react'
import 'react-dates/initialize';
import { CalendarSVG } from "@icons"


import { SingleDatePicker as SingleDatePicker_, CalendarDayShape,SingleDatePickerInputShape  } from "react-dates"
import { Moment } from "moment"
import styled from "styled-components"
import { useTranslation } from 'react-i18next';

const CalendarContainer = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  .SingleDatePickerInput_calendarIcon{
    padding:0;
    margin-left:5px;
  }
  .DateInput {
    width:90px;
  }
  .DateInput_input{
    padding:6px 0;
  }
`
const LabelBold = styled.label`
  font-weight: var(--font-weight-medium);
`;

interface Props extends SingleDatePickerInputShape {
  date: Moment,
  onDateChange:(day:Moment|null)=>void,
  focused:boolean,
  onFocusChange:({focused}:{focused:boolean})=>void,
  numberOfMonths?:number,
  showLabel?:boolean
}

function SingleDatePicker(props: Props) {

  const { readOnly, date, onDateChange,focused,onFocusChange,id,numberOfMonths } = props

  const { t } = useTranslation();

  return (
    <>
    {props.showLabel &&
      <LabelBold className="pb-2">{t('CON_DATE')}</LabelBold>
    }
    <CalendarContainer>
      <SingleDatePicker_
        readOnly={readOnly}
        customInputIcon={<CalendarSVG className="primary-icon-5" width="19px" />}
        horizontalMonthPadding={23}
        numberOfMonths={numberOfMonths}
        date={date}
        onDateChange={onDateChange }
        focused={focused}
        onFocusChange={onFocusChange}
        id={id}
      />
    </CalendarContainer>
    </>
  )
}

export default SingleDatePicker
